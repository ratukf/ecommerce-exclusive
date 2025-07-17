import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from '../store/store'
import { Link, useParams } from "react-router";
import { useEffect, useState } from "react";
import { fetchProductById } from "../store/asyncAction";
import { Box, Button, Divider, Grid, IconButton, Typography, useTheme } from "@mui/material";
import { countStar, renderStars } from "../utils/rating";
import { Favorite, LocalShippingOutlined, LoopOutlined } from "@mui/icons-material";
import { buttonSx } from "../styles/buttonSx";

export const ProductDetail = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { id } = useParams<{ id: string }>();
    const productDetail = useSelector((state: RootState) => state.products.productDetail);
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

    return (
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
                    <Typography sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '24px', color: '#000' }}>
                        {name}
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}>
                        {renderStars(countStar(reviews || []), theme)}
                        <Typography sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 400, fontSize: '16px', color: '#000', opacity: 0.5 }}>
                            ({reviews?.length} reviews)
                        </Typography>
                        <Typography sx={{ marginLeft: '8px', color: '#000', opacity: 0.5 }}>
                            |
                        </Typography>
                        {isStockExist() ? (
                            <Typography sx={{ color: '#00FF66', marginLeft: '8px' }}>
                                In Stock
                            </Typography>
                        ) : (
                            <Typography sx={{ color: 'red', marginLeft: '8px' }}>
                                Out of Stock
                            </Typography>
                        )}
                    </Box>
                    <Typography sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 400, fontSize: '24px' }}>
                        ${price?.toLocaleString('en-US')}
                    </Typography>
                    <Typography sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 400, fontSize: '14px' }}>
                        {description}
                    </Typography>
                </Box>
                <Divider sx={{ width: '100%', my: 2, backgroundColor: '#000', opacity: 0.2 }} />
                {/* Action */}
                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 4 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', gap: 2 }}>
                        <Typography sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 400, fontSize: '20px' }}>Variants:</Typography>
                        {variants?.map((variant, index) => (
                            <Button
                                key={index}
                                onClick={() => setSelectedVariant(index)}
                                variant={selectedVariant === index ? "contained" : "outlined"}
                                sx={selectedVariant === index ? buttonSx.defaultSmall : buttonSx.greyOutlinedSmall
                                }
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
                                // minWidth: 110,
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
                        <Box sx={{ display: "flex", flexDirection: 'row', alignItems: 'center', gap: 2, p: 2, borderBottom: "1px solid #ccc" }}>
                            <LocalShippingOutlined sx={{ fontSize: '3rem' }} />
                            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                <Typography fontWeight={500} fontFamily={'Poppins, sans-serif'} fontSize={'16px'}>Free Delivery</Typography>
                                <Link to="#" style={{ textDecoration: 'underline', color: '#000', fontFamily: 'Poppins, sans-serif', fontSize: '12px', fontWeight: 500 }} >
                                    Enter your postal code for Delivery Availability
                                </Link>
                            </Box>
                        </Box>

                        {/* Bottom Section */}
                        <Box sx={{ display: "flex", flexDirection: 'row', alignItems: 'center', gap: 2, p: 2 }}>
                            <LoopOutlined sx={{ fontSize: '3rem' }} />
                            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                <Typography fontWeight={500} fontFamily={'Poppins, sans-serif'} fontSize={'16px'}>Return Delivery</Typography>
                                <Typography sx={{ color: '#000', fontFamily: 'Poppins, sans-serif', fontSize: '12px', fontWeight: 500 }}>
                                    Free 30 Days Delivery Returns.{" "}
                                    <Link to="#" style={{ textDecoration: 'underline', color: '#000' }}>Details</Link>
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>

            </Grid>
        </Grid >
    )
}