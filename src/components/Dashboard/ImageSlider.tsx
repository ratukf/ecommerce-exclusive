import { ArrowForwardOutlined } from "@mui/icons-material"
import { Box, Button, IconButton, Typography } from "@mui/material"
import { SLIDER } from "../../constants/slider"

interface ImageSliderProps {
    slideIdx: number;
}

export const ImageSlider = ({ slideIdx }: ImageSliderProps) => {
    return (
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
                    variant="subtitle1"
                    sx={{
                        color: '#fff',
                        fontFamily: 'Inter, sans-serif',
                        mb: 1,
                        wordBreak: 'break-word',
                    }}
                >
                    {SLIDER[slideIdx].title}
                </Typography>
                <Typography
                    variant="h3"
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
    )
}