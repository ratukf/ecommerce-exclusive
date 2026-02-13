import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid } from '@mui/material';
import { DashboardSection } from '../components/Dashboard/DashboardSection';
import { fetchProducts } from '../store/productsAsyncAction';
import type { AppDispatch } from '../store/store';
import type { RootState } from '../store/store';
import { SLIDER } from '../constants/slider';
import { ArrowButton } from '../components/ArrowButton';
import { NavigationList } from '../components/Dashboard/NavigationList';
import { ImageSlider } from '../components/Dashboard/ImageSlider';
import { ProductsSection } from '../components/ProductsSection';
import { FlashSaleTimer } from '../components/Dashboard/FlashSaleTimer';
import { CategoriesSection } from '../components/Dashboard/CategoriesSections';
import { BannerSection } from '../components/Dashboard/BannerSection';
import { NewArrival } from '../components/Dashboard/NewArrival';
import { Benefits } from '../components/Dashboard/Benefits';
import { useNavigate } from 'react-router';
import { buttonSx } from '../styles/buttonSx';

export const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.products);

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [slideIdx, setSlideIdx] = useState(0);

  const handleClickNavigation = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const END_TIME = useMemo(() => new Date(Date.now() + 2 * 60 * 60 * 1000), []);

  // Auto slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIdx((prev) => (prev === SLIDER.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Fetch products on component mount
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const nav = useNavigate();

  return (
    <>
      <Grid container spacing={2} sx={{ marginBottom: '15rem', height: '500px' }}>
        {/* Navigation list*/}
        <Grid size={3} sx={{ height: '100%' }}>
          <NavigationList openIndex={openIndex} handleClick={handleClickNavigation} />
        </Grid>
        {/* Image slider */}
        <Grid size={9} sx={{ height: '100%' }}>
          <ImageSlider slideIdx={slideIdx} />
        </Grid>
      </Grid>
      {/* Flash Sale Section */}
      <DashboardSection
        categoryLabel="Today's"
        sectionHeader='Flash Sale'
        sectionHeader2={<FlashSaleTimer endTime={END_TIME} />}
        actionButton='View All Products'
        buttonHeader={<ArrowButton />}
        content={<ProductsSection products={products.slice(0, 4)} showDiscount={true} />}
        onClickActionButton={() => nav('/products')}
      />
      {/* Categories Section */}
      <DashboardSection
        categoryLabel='Categories'
        sectionHeader='Browse by Category'
        sectionHeader2={null}
        actionButton=''
        buttonHeader={<ArrowButton />}
        content={<CategoriesSection />}
      />
      {/* Best Selling Section */}
      <DashboardSection
        categoryLabel="This Month's"
        sectionHeader='Best Selling Products'
        sectionHeader2={null}
        actionButton=''
        buttonHeader={
          <Button variant='contained' sx={buttonSx.default} onClick={() => nav('/products')}>
            View All
          </Button>
        }
        content={<ProductsSection products={products.slice(4, 8)} showDiscount={false} />}
      />
      {/* Banner Section */}
      <BannerSection />
      {/* Explore Products Section */}
      <DashboardSection
        categoryLabel='Our Products'
        sectionHeader='Explore Our Products'
        sectionHeader2={null}
        actionButton='View All Products'
        buttonHeader={<ArrowButton />}
        content={<ProductsSection products={products} showDiscount={false} />}
        onClickActionButton={() => nav('/products')}
      />
      {/* New Arrival Section */}
      <DashboardSection
        categoryLabel='Featured'
        sectionHeader='New Arrival'
        sectionHeader2={null}
        actionButton=''
        buttonHeader={null}
        content={<NewArrival />}
      />
      {/* Benefits Section */}
      <Benefits />
    </>
  );
};
