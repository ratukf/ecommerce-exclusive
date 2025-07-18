import { FavoriteBorderOutlined, RemoveRedEyeOutlined } from "@mui/icons-material";
import { Box, Grid, IconButton, Typography, useTheme } from "@mui/material";
import type { Product } from "../store/slice";
import { countStar, renderStars } from "../utils/rating";
import { FW } from "../theme";
import { useNavigate } from "react-router";
import { useState } from "react";

interface ProductsSectionProps {
    products: Product[];
    showDiscount: boolean;
}

export const ProductsSection = ({ products, showDiscount }: ProductsSectionProps) => {
    const nav = useNavigate();
    const theme = useTheme();
    const [hovered, setHovered] = useState<string | null>(null);


    return (
        <>
            {products.map((product) => (
                <Grid size={3} key={product.id} sx={{ marginBottom: '1rem' }}>
                    <Box
                        sx={{
                            width: '100%',
                            aspectRatio: '1/1',
                            overflow: 'hidden',
                            borderRadius: '4px',
                            position: 'relative',
                            cursor: hovered === product.id ? 'pointer' : 'default',
                        }}
                        onMouseEnter={() => setHovered(product.id)}
                        onMouseLeave={() => setHovered(null)}
                        onClick={() => nav(`/product/${product.id}`)}
                    >
                        <img
                            src={product.imageUrls[0]}
                            alt={product.name}
                            loading='lazy'
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        />
                        {hovered === product.id && (
                            <Box
                                sx={{
                                    position: 'absolute',
                                    bottom: 0,
                                    width: '100%',
                                    height: '40px',
                                    backgroundColor: '#000',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    display: 'flex',
                                    pointerEvents: hovered === product.id ? 'auto' : 'none',
                                }}
                            >
                                <Typography variant="subtitle1" sx={{ fontWeight: FW.semiBold, color: '#fff' }}>
                                    Add to cart
                                </Typography>
                            </Box>
                        )}
                        <Box sx={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2 }}>
                            <Box sx={{
                                backgroundColor: '#fff',
                                borderRadius: '50%',
                                width: '2.5rem',
                                height: '2.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <IconButton>
                                    <FavoriteBorderOutlined sx={{ color: '#000' }} />
                                </IconButton>
                            </Box>
                            <Box sx={{
                                backgroundColor: '#fff',
                                borderRadius: '50%',
                                width: '2.5rem',
                                height: '2.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <IconButton>
                                    <RemoveRedEyeOutlined sx={{ color: '#000' }} />
                                </IconButton>
                            </Box>
                        </Box>
                        {showDiscount && (
                            <Box sx={{ position: 'absolute', top: '1rem', left: '1rem', paddingY: '4px', paddingX: '12px', backgroundColor: theme.palette.secondary.main, borderRadius: '4px' }}>
                                <Typography variant="caption" sx={{ color: '#fff' }}>
                                    -40%
                                </Typography>
                            </Box>
                        )}
                    </Box>
                    <Box sx={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <Typography variant="subtitle1" sx={{ marginBottom: '0.75rem', fontWeight: FW.semiBold }}>
                            {product.name}
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                            <Typography variant="subtitle1" sx={{ marginBottom: '0.75rem', color: theme.palette.secondary.main, fontWeight: FW.semiBold }}>
                                ${product.variants[0].price}
                            </Typography>
                            <Typography variant="subtitle1" sx={{ marginBottom: '0.75rem', color: theme.palette.grey[600], textDecoration: 'line-through', fontWeight: FW.semiBold }}>
                                ${160}
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: 1 }}>
                        {renderStars(countStar(product.reviews), theme)}
                        <Typography variant="body2" sx={{ color: theme.palette.grey[600], marginLeft: '1rem' }}>
                            {'('}{product.reviews?.length}{')'}
                        </Typography>
                    </Box>
                </Grid>
            ))}
        </>
    );
};