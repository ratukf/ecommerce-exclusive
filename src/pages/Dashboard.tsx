import { Box, Button, Collapse, Grid, IconButton, List, ListItemButton, ListItemText, Typography, useTheme } from '@mui/material';
import { ArrowForwardOutlined, ExpandLess, ExpandMore, FavoriteBorderOutlined, RemoveRedEyeOutlined, Star, StarHalf } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { DashboardSection } from '../components/DashboardSection';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/asyncAction';
import type { AppDispatch } from '../store/store';
import type { RootState } from '../store/store';
import { NAV_LIST } from '../contants/navigation';
import { ArrowButton } from '../components/ArrowButton';

export const Dashboard = () => {
    const theme = useTheme();
    const dispatch = useDispatch<AppDispatch>();
    const products = useSelector((state: RootState) => state.products.products);
    const [hovered, setHovered] = useState<string | null>(null);

    const SLIDER = [
        { label: 'iPhone 16 Pro Max', img: 'hero1.png', title: 'iPhone 16 Series', desc: 'Up to 10% off Voucher' },
        { label: 'Bleu de Chanel', img: 'hero2.png', title: 'Bleu de Chanel', desc: 'Up to 20% off Voucher' },
        { label: 'Vellaro Shoes', img: 'hero3.jpg', title: 'Vellaro Shoes', desc: 'Up to 30% off Voucher' },
        { label: 'Orient Watch', img: 'hero4.jpg', title: 'Orient Watch', desc: 'Up to 40% off Voucher' },
        { label: 'MF Serum', img: 'hero5.jpg', title: 'MF Serum', desc: 'Up to 50% off Voucher' },
    ];

    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [slideIdx, setSlideIdx] = useState(0);

    const handleClick = (idx: number) => {
        setOpenIndex(openIndex === idx ? null : idx);
    };

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

    const FlashSaleSection = () => {
        const countStar = (reviews: { rating: number }[]) => {
            const n = reviews.length;
            const sum = reviews.reduce((acc: number, curr) => acc + curr.rating, 0);
            return n > 0 ? (sum / n).toFixed(1) : null;
        }
        const renderStars = (rating: number) => {
            const stars = [];
            const rounded = Math.round(rating * 2) / 2;
            for (let i = 1; i <= 5; i++) {
                if (rounded >= i) {
                    stars.push(<Star key={i} sx={{ color: '#FFD700', fontSize: 20 }} />);
                } else if (rounded + 0.5 === i) {
                    stars.push(<StarHalf key={i} sx={{ color: '#FFD700', fontSize: 20 }} />);
                } else {
                    stars.push(<Star key={i} sx={{ color: theme.palette.grey[400], fontSize: 20 }} />);
                }
            }
            return stars;
        };
        return (
            <>
                {
                    products.map((product) => (
                        <Grid size={3} key={product.id} sx={{ marginBottom: '1rem', }}>
                            <Box
                                sx={{ width: '100%', aspectRatio: '1/1', overflow: 'hidden', borderRadius: '4px', position: 'relative', cursor: hovered === product.id ? 'pointer' : 'default', }}
                                onMouseEnter={() => setHovered(product.id)}
                                onMouseLeave={() => setHovered(null)}
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
                                <Box sx={{ position: 'absolute', top: '1rem', left: '1rem', paddingY: '4px', paddingX: '12px', backgroundColor: theme.palette.secondary.main, borderRadius: '4px' }}>
                                    <Typography variant="h3" sx={{ color: '#fff', fontWeight: 400, fontSize: '12px' }}>
                                        -40%
                                    </Typography>
                                </Box>
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
                                {renderStars(Number(countStar(product.reviews)) || 0)}
                                <Typography variant="h3" sx={{ color: theme.palette.grey[600], marginLeft: '1rem', fontSize: '14px' }}>
                                    {'('}{product.reviews?.length}{')'}
                                </Typography>
                            </Box>
                        </Grid>
                    ))
                }
            </>
        )
    }

    return (
        <>
            <Grid container spacing={2} sx={{ marginBottom: '15rem', height: '500px' }}>
                {/* Navigation */}
                <Grid size={3} sx={{ height: '100%' }}>
                    <List sx={{ paddingY: 4 }}>
                        {NAV_LIST.map((item, idx) => (
                            <Box key={item.label}>
                                {item.children ? (
                                    <>
                                        <ListItemButton onClick={() => handleClick(idx)} sx={{ pl: 0 }}>
                                            <ListItemText primary={item.label} />
                                            {openIndex === idx ? <ExpandLess /> : <ExpandMore />}
                                        </ListItemButton>
                                        <Collapse in={openIndex === idx} timeout="auto" unmountOnExit>
                                            <List component="div" disablePadding>
                                                {item.children.map((child) => (
                                                    <ListItemButton key={child.label} sx={{ pl: 4 }}>
                                                        <ListItemText primary={child.label} />
                                                    </ListItemButton>
                                                ))}
                                            </List>
                                        </Collapse>
                                    </>
                                ) : (
                                    <ListItemButton sx={{ pl: 0 }}>
                                        <ListItemText primary={item.label} />
                                    </ListItemButton>
                                )}
                            </Box>
                        ))}
                    </List>
                </Grid>
                {/* Image slider */}
                <Grid size={9} sx={{ height: '100%' }}>
                    <Box
                        sx={{
                            position: 'relative',
                            width: '100%',
                            height: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: '#222',
                            overflow: 'hidden',
                            minWidth: 0,
                        }}
                    >
                        <img
                            src={SLIDER[slideIdx].img}
                            alt={SLIDER[slideIdx].label}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                display: 'block',
                            }}
                        />
                        <Box
                            sx={{
                                position: 'absolute',
                                left: 0,
                                top: 0,
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'flex-start',
                                p: 4,
                                gap: 4,
                            }}
                        >
                            <Typography
                                variant="h5"
                                sx={{
                                    color: '#fff',
                                    fontWeight: 400,
                                    fontFamily: 'Inter, sans-serif',
                                    mb: 1,
                                    wordBreak: 'break-word',
                                }}
                            >
                                {SLIDER[slideIdx].title}
                            </Typography>
                            <Typography
                                variant="h1"
                                sx={{
                                    color: '#fff',
                                    fontWeight: 700,
                                    fontFamily: 'Inter, sans-serif',
                                    mb: 2,
                                    wordBreak: 'break-word',
                                }}
                            >
                                {SLIDER[slideIdx].desc}
                            </Typography>
                            <Box sx={{ display: 'inline' }}>
                                <Button
                                    variant="text"
                                    sx={{
                                        backgroundColor: 'transparent',
                                        border: 'none',
                                        boxShadow: 'none',
                                        padding: 0,
                                        minWidth: 0,
                                        textDecoration: 'underline',
                                        textUnderlineOffset: '10px',
                                        color: '#fff',
                                        textTransform: 'none',
                                        fontWeight: 500,
                                        fontSize: '16px'
                                    }}
                                >
                                    Shop now {' '}
                                </Button>
                                <IconButton>
                                    <ArrowForwardOutlined sx={{ color: '#fff' }} />
                                </IconButton>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            {/* Flash Sale Section */}
            <DashboardSection
                categoryLabel="Today's"
                sectionHeader="Flash Sale"
                sectionHeader2=""
                actionButton="View All Products"
                buttonHeader={<ArrowButton />}
                content={<FlashSaleSection />}
                data={products}
            />
        </>
    );
}