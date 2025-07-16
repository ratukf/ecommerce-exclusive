import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@mui/material';
import { DashboardSection } from '../components/Dashboard/DashboardSection';
import { fetchProducts } from '../store/asyncAction';
import type { AppDispatch } from '../store/store';
import type { RootState } from '../store/store';
import { SLIDER } from '../contants/slider';
import { ArrowButton } from '../components/ArrowButton';
import { NavigationList } from '../components/Dashboard/NavigationList';
import { ImageSlider } from '../components/Dashboard/ImageSlider';
import { FlashSaleSection } from '../components/Dashboard/FlashSaleSection';
import { FlashSaleTimer } from '../components/Dashboard/FlashSaleTimer';

export const Dashboard = () => {
    const dispatch = useDispatch<AppDispatch>();
    const products = useSelector((state: RootState) => state.products.products);
    const [hovered, setHovered] = useState<string | null>(null);

    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [slideIdx, setSlideIdx] = useState(0);

    const handleClickNavigation = (idx: number) => {
        setOpenIndex(openIndex === idx ? null : idx);
    };

    const END_TIME = useMemo(
        () => new Date(Date.now() + 2 * 60 * 60 * 1000),
        []
    );

    // Auto slide functionality
    useEffect(() => {
        const timer = setInterval(() => {
            setSlideIdx((prev) => (prev === SLIDER.length - 1 ? 0 : prev + 1));
        }, 3000);
        return () => clearInterval(timer);
    }, [SLIDER.length]);

    // Fetch products on component mount
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);


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
                sectionHeader="Flash Sale"
                sectionHeader2={<FlashSaleTimer endTime={END_TIME} />}
                actionButton="View All Products"
                buttonHeader={<ArrowButton />}
                content={<FlashSaleSection products={products.slice(0, 4)} setHovered={setHovered} hovered={hovered} />}
                data={products.slice(0, 4)}
            />
        </>
    );
}