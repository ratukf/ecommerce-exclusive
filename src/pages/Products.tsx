import { Grid, Typography, Chip, Box } from '@mui/material';
import { SideBar } from '../components/Products/Sidebar';
import { ProductsSection } from '../shared/components/ProductsSection';
import type { AppDispatch, RootState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchProducts } from '../features/products/store/productsAsyncAction';

const normalize = (str: string) =>
  str
    .toLowerCase()
    .replace(/\s+&\s+/g, '-')
    .replace(/\s+/g, '-');

export const Products = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.products);
  const [searchParams, setSearchParams] = useSearchParams();

  const activeCategory = searchParams.get('category');
  const searchQuery = searchParams.get('search');

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts = useMemo(() => {
    let result = products;

    if (activeCategory) {
      result = result.filter((p) =>
        p.categories.map(normalize).includes(normalize(activeCategory)),
      );
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.categories.some((c) => c.toLowerCase().includes(q)),
      );
    }

    return result;
  }, [products, activeCategory, searchQuery]);

  const displayLabel = searchQuery
    ? `Search: "${searchQuery}"`
    : activeCategory
      ? activeCategory.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
      : 'All Products';

  return (
    <Grid container sx={{ marginY: '5rem' }} spacing={2}>
      <Grid size={12}>
        <Typography
          variant='h4'
          sx={{ mb: 2, fontWeight: 600, textAlign: 'center', marginBottom: '2rem' }}
        >
          Browse Products
        </Typography>
      </Grid>

      <Grid
        size={3}
        sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
      >
        <SideBar />
      </Grid>

      <Grid size={9}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Typography variant='subtitle1' fontWeight={600}>
            {displayLabel}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            ({filteredProducts.length} products)
          </Typography>
          {(activeCategory || searchQuery) && (
            <Chip
              label='Clear filter'
              size='small'
              onDelete={() => setSearchParams({})}
              sx={{
                ml: 1,
                color: 'green',
                '& .MuiChip-deleteIcon': {
                  color: 'green',
                  '&:hover': { color: 'darkgreen' },
                },
              }}
            />
          )}
        </Box>

        <Grid container display='flex' flexDirection='row' spacing={2}>
          <ProductsSection products={filteredProducts} showDiscount={true} />
        </Grid>
      </Grid>
    </Grid>
  );
};
