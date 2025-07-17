import { Grid, Typography } from "@mui/material";
import { SideBar } from "../components/Products/Sidebar";
import { ProductsSection } from "../components/ProductsSection";
import type { AppDispatch } from '../store/store';
import type { RootState } from '../store/store';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchProducts } from "../store/asyncAction";
import { useNavigate } from "react-router";


export const Products = () => {
    const dispatch = useDispatch<AppDispatch>();
    const products = useSelector((state: RootState) => state.products.products);
    const [hovered, setHovered] = useState<string | null>(null);
    const nav = useNavigate();

    const onProductClick = (id: string) => {
        nav(`/product/${id}`);
    }

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch])

    return (
        <Grid container sx={{ marginY: '5rem' }} spacing={2}>
            <Grid size={12}>
                <Typography variant="h4" sx={{ mb: 2, fontWeight: 600, textAlign: 'center', marginBottom: '2rem' }}>
                    Browse Products
                </Typography>
            </Grid>

            <Grid size={3} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <SideBar />
            </Grid>
            <Grid size={9}>
                <Grid container display="flex" flexDirection={'row'} spacing={2}>
                    <ProductsSection
                        products={products}
                        setHovered={setHovered}
                        hovered={hovered}
                        showDiscount={true}
                        onClick={onProductClick}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};