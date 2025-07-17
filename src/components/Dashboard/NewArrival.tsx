import { Box, Button, Grid, Typography } from "@mui/material"
import { NEW_ARRIVAL } from "../../contants/newArrival"

interface OverlayBoxProps {
    label: string;
    desc: string;
}

const OverlayBox = ({ label, desc }: OverlayBoxProps) => (
    <Box
        sx={{
            position: "absolute",
            left: '2rem',
            bottom: '2rem',
            width: "100%",
            height: "100%",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-end",
            fontWeight: 600,
            fontSize: "1.2rem",
            letterSpacing: 1,
            zIndex: 1,
            gap: 1,
        }}
    >
        <Typography sx={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '24px' }}>
            {label}
        </Typography>
        <Typography variant="body2">
            {desc}
        </Typography>
        <Button sx={{ padding: 0, textDecoration: 'underline' }}>
            Shop Now
        </Button>
    </Box>
);

export const NewArrival = () => (
    <Grid container spacing={2}>
        <Grid size={6} sx={{ position: 'relative' }}>
            <img src={NEW_ARRIVAL[0].src} alt={NEW_ARRIVAL[0].label} style={{ width: "100%", display: 'block' }} />
            <OverlayBox label={NEW_ARRIVAL[0].label} desc={NEW_ARRIVAL[0].desc} />
        </Grid>
        <Grid size={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, height: '100%' }}>
                <Box sx={{ position: 'relative', }}>
                    <img src={NEW_ARRIVAL[1].src} alt={NEW_ARRIVAL[1].label} style={{ width: "100%" }} />
                    <OverlayBox label={NEW_ARRIVAL[1].label} desc={NEW_ARRIVAL[1].desc} />
                </Box>
                <Grid container spacing={2}>
                    {NEW_ARRIVAL.slice(2, 4).map((item) => (
                        <Grid size={6} key={item.label} sx={{ position: 'relative' }}>
                            <img src={item.src} alt={item.label} style={{ width: "100%" }} />
                            <OverlayBox label={item.label} desc={item.desc} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Grid>
    </Grid>
)