import { FavoriteBorderOutlined, RemoveRedEyeOutlined } from "@mui/icons-material";
import { Box, Grid, IconButton, Typography, useTheme } from "@mui/material";
import type { Product } from "../store/slice";
import { countStar, renderStars } from "../utils/rating";

interface FlashSaleSectionProps {
    products: Product[];
    setHovered: (id: string | null) => void;
    hovered: string | null;
    showDiscount: boolean;
    onClick: (id: string) => void;
}

export const ProductsSection = ({ products, setHovered, hovered, showDiscount, onClick }: FlashSaleSectionProps) => {
    const theme = useTheme();

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
                        onClick={() => onClick(product.id)}
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
                                <Typography sx={{ color: '#fff', fontFamily: 'Poppins, sans-serif', fontWeight: 500, fontSize: '16px' }}>
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
                                <Typography variant="h3" sx={{ color: '#fff', fontWeight: 400, fontSize: '12px' }}>
                                    -40%
                                </Typography>
                            </Box>
                        )}
                    </Box>
                    <Box sx={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <Typography variant="h3" sx={{ marginBottom: '1rem' }}>
                            {product.name}
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                            <Typography variant="h3" sx={{ marginBottom: '1rem', color: theme.palette.secondary.main }}>
                                ${product.variants[0].price}
                            </Typography>
                            <Typography variant="h3" sx={{ marginBottom: '1rem', color: theme.palette.grey[600], textDecoration: 'line-through' }}>
                                ${160}
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: 1 }}>
                        {renderStars(countStar(product.reviews), theme)}
                        <Typography variant="h3" sx={{ color: theme.palette.grey[600], marginLeft: '1rem', fontSize: '14px' }}>
                            {'('}{product.reviews?.length}{')'}
                        </Typography>
                    </Box>
                </Grid>
            ))}
        </>
    );
};