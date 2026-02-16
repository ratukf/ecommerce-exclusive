import { Grid, Typography } from '@mui/material';
import { SideBar } from '../components/Products/Sidebar';
import { ProductsSection } from '../shared/components/ProductsSection';
import type { AppDispatch } from '../store/store';
import type { RootState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchProducts } from '../features/products/store/productsAsyncAction';

export const Products = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Grid container sx={{ marginY: '5rem' }} spacing={2}>
      <Grid size={12}>
        <Typography
          variant='h4'
          sx={{
            mb: 2,
            fontWeight: 600,
            textAlign: 'center',
            marginBottom: '2rem',
          }}
        >
          Browse Products
        </Typography>
      </Grid>

      <Grid
        size={3}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <SideBar />
      </Grid>
      <Grid size={9}>
        <Grid container display='flex' flexDirection={'row'} spacing={2}>
          <ProductsSection products={products} showDiscount={true} />
        </Grid>
      </Grid>
    </Grid>
  );
};
