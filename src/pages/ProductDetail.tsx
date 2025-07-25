import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from '../store/store'
import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import { fetchProductById, fetchProducts } from "../store/asyncAction";
import { Box, Button, Divider, Grid, IconButton, Typography, useTheme } from "@mui/material";
import { countStar, renderStars } from "../utils/rating";
import { Favorite, LocalShippingOutlined, LoopOutlined } from "@mui/icons-material";
import { buttonSx } from "../styles/buttonSx";
import { FW } from "../theme";
import { DashboardSection } from "../components/Dashboard/DashboardSection";
import { ProductsSection } from "../components/ProductsSection";

export const ProductDetail = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { id } = useParams<{ id: string }>();
    const { products, productDetail } = useSelector((state: RootState) => state.products);
    const { name, price, imageUrls, reviews, variants, description } = productDetail || {};
    const theme = useTheme();
    const isStockExist = () => {
        return variants?.some(variant => variant.stock > 0);
    }
    const [selectedVariant, setSelectedVariant] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [favorite, setFavorite] = useState(false);

    useEffect(() => {
        if (id) {
            dispatch(fetchProductById(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch])

    return (
        <>
            <Grid container columns={10} spacing={2} sx={{ marginY: '5rem' }}>
                {/* Thumbnail List */}
                <Grid size={1} spacing={2}>
                    {imageUrls?.map((url, index, name) => (
                        <img
                            key={index}
                            src={url}
                            alt={`${name} ${index + 1}`}
                            style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
                        />
                    ))}
                </Grid>
                {/* Image Viewer */}
                <Grid size={5} spacing={2}>
                    <img
                        src={imageUrls?.[0]}
                        alt={name}
                        style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
                    />
                </Grid>
                {/* Products Detail */}
                <Grid size={4} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 1.5 }}>
                    {/* Product name, reviews, stock, price, description */}
                    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 1.5 }}>
                        <Typography variant="h5">
                            {name}
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}>
                            {renderStars(countStar(reviews || []), theme)}
                            <Typography variant="body2" sx={{ opacity: 0.5 }}>
                                ({reviews?.length} reviews)
                            </Typography>
                            <Typography sx={{ marginLeft: '8px', color: '#000', opacity: 0.5 }}>
                                |
                            </Typography>
                            {isStockExist() ? (
                                <Typography variant="body2" sx={{ color: '#00FF66', marginLeft: '8px' }}>
                                    In Stock
                                </Typography>
                            ) : (
                                <Typography sx={{ color: 'red', marginLeft: '8px' }}>
                                    Out of Stock
                                </Typography>
                            )}
                        </Box>
                        <Typography variant="h5" sx={{ fontWeight: FW.regular }}>
                            ${price?.toLocaleString('en-US')}
                        </Typography>
                        <Typography variant="body2">
                            {description}
                        </Typography>
                    </Box>
                    <Divider sx={{ width: '100%', my: 2, backgroundColor: '#000', opacity: 0.2 }} />
                    {/* Action */}
                    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 4 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', gap: 2 }}>
                            <Typography variant="h6" sx={{ fontWeight: FW.regular }} >Variants:</Typography>
                            {variants?.map((variant, index) => (
                                <Button
                                    key={index}
                                    onClick={() => setSelectedVariant(index)}
                                    variant={selectedVariant === index ? "contained" : "outlined"}
                                    sx={{
                                        ...theme.typography.body2,
                                        ...(selectedVariant === index ? buttonSx.defaultSmall : buttonSx.greyOutlinedSmall)
                                    }}
                                >
                                    {variant.name} - ${variant.price.toLocaleString('en-US')}
                                </Button>
                            ))}
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                width: '100%',
                                gap: 2,
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    height: 48,
                                    background: '#fff',
                                    borderTop: `1px solid ${theme.palette.secondary.main}`,
                                    borderBottom: `1px solid ${theme.palette.secondary.main}`,
                                    borderRadius: '4px',
                                }}
                            >
                                <Button
                                    variant="contained"
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                    sx={{ ...buttonSx.default, height: '100%', borderRadius: '4px 0 0 4px', padding: 0 }}
                                >-</Button>
                                <Typography sx={{ textAlign: 'center', width: '40px' }}>{quantity}</Typography>
                                <Button
                                    variant="contained"
                                    onClick={() => setQuantity(q => q + 1)}
                                    sx={{ ...buttonSx.default, height: '100%', borderRadius: '0 4px 4px 0', padding: 0 }}
                                >+</Button>
                            </Box>
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{
                                    ...buttonSx.default,
                                    height: 48,
                                    flex: 1,
                                }}
                            >
                                Buy Now
                            </Button>
                            <Box
                                sx={{
                                    borderColor: theme.palette.grey[400],
                                    borderWidth: 1,
                                    borderStyle: 'solid',
                                    borderRadius: '4px',
                                    height: 48,
                                    width: 48,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                onClick={() => setFavorite(!favorite)}
                            >
                                <IconButton sx={{ height: '100%' }}>
                                    <Favorite sx={{ color: favorite ? theme.palette.secondary.main : theme.palette.grey[400] }} />
                                </IconButton>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                border: "1px solid #ccc",
                                borderRadius: "8px",
                                overflow: "hidden",
                                width: '100%',
                            }}
                        >
                            {/* Top Section */}
                            <Box sx={{ display: "flex", flexDirection: 'row', alignItems: 'center', gap: 2, p: 3, borderBottom: "1px solid #ccc" }}>
                                <LocalShippingOutlined sx={{ fontSize: '3rem' }} />
                                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                    <Typography sx={{ fontWeight: FW.medium }} variant="subtitle1">Free Delivery</Typography>
                                    <Typography variant="caption" sx={{ fontWeight: FW.medium }}>
                                        <Link to="#" style={{ textDecoration: 'underline', color: '#000' }} >
                                            Enter your postal code for Delivery Availability
                                        </Link>
                                    </Typography>
                                </Box>
                            </Box>

                            {/* Bottom Section */}
                            <Box sx={{ display: "flex", flexDirection: 'row', alignItems: 'center', gap: 2, p: 3 }}>
                                <LoopOutlined sx={{ fontSize: '3rem' }} />
                                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                    <Typography sx={{ fontWeight: FW.medium }} variant="subtitle1">Return Delivery</Typography>
                                    <Typography variant="caption" sx={{ fontWeight: FW.medium }}>
                                        Free 30 Days Delivery Returns.{" "}
                                        <Link to="#" style={{ textDecoration: 'underline', color: '#000' }}>Details</Link>
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
            </Grid >
            <Grid container spacing={2} sx={{ marginTop: '10rem' }}>
                <DashboardSection
                    categoryLabel="Related Items"
                    sectionHeader=""
                    sectionHeader2=""
                    buttonHeader={null}
                    content={<ProductsSection products={products.filter(product => product.id !== id).slice(0, 4)} showDiscount={true} />}
                    actionButton=""
                />
            </Grid>
        </>
    )
}