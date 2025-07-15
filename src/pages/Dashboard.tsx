import { Box, Button, Collapse, Grid, IconButton, List, ListItemButton, ListItemText, Typography } from '@mui/material';
import { ArrowForwardOutlined, ExpandLess, ExpandMore } from '@mui/icons-material';
import { useState, useEffect } from 'react';

export const Dashboard = () => {
    const NAV_LIST = [
        {
            label: "Woman's Fashion", children: [
                { label: 'Clothing', path: '/' },
                { label: 'Shoes', path: '/' },
                { label: 'Bags & Accessories', path: '/' },
            ]
        },
        {
            label: "Men's Fashion", children: [
                { label: 'Clothing', path: '/' },
                { label: 'Shoes', path: '/' },
                { label: 'Bags & Accessories', path: '/' },
            ]
        },
        { label: "Electronics", path: '/' },
        { label: "Home & Lifestyle", path: '/' },
        { label: "Medicine", path: '/' },
        { label: "Sports & Outdoors", path: '/' },
        { label: "Baby & Toys", path: '/' },
        { label: "Grociers & Pets", path: '/' },
        { label: "Health & Beauty", path: '/' },
    ];

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

    useEffect(() => {
        const timer = setInterval(() => {
            setSlideIdx((prev) => (prev === SLIDER.length - 1 ? 0 : prev + 1));
        }, 3000);
        return () => clearInterval(timer);
    }, [SLIDER.length]);

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
                                bgcolor: 'rgba(0,0,0,0.35)',
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
                            <Button sx={{ textDecoration: 'underline', backgroundColor: 'transparent' }}>Shop now {' '}
                                <IconButton>
                                    <ArrowForwardOutlined />
                                </IconButton>
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>

    );
}