import { Box, Button, Grid, Typography, useTheme } from "@mui/material"
import { useEffect, useMemo, useState } from "react";
import { FW } from "../../theme";
import { buttonSx } from "../../styles/buttonSx";

function useCountdown(endTime: Date | string | number) {
    const getTimeLeft = () => {
        const total = new Date(endTime).getTime() - new Date().getTime();
        const seconds = Math.max(Math.floor((total / 1000) % 60), 0);
        const minutes = Math.max(Math.floor((total / 1000 / 60) % 60), 0);
        const hours = Math.max(Math.floor((total / (1000 * 60 * 60)) % 24), 0);
        const days = Math.max(Math.floor(total / (1000 * 60 * 60 * 24)), 0);
        return { days, hours, minutes, seconds };
    };
    const [timeLeft, setTimeLeft] = useState(getTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(getTimeLeft());
        }, 1000);
        return () => clearInterval(timer);
    }, [endTime]);
    return timeLeft;
}

const CountdownCircle = ({ value, label }: { value: number; label: string }) => (
    <Box
        sx={{
            backgroundColor: "#fff",
            borderRadius: "50%",
            width: '4rem',
            height: '4rem',
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: 1,
            mx: 0.5,
        }}
    >
        <Typography
            variant="subtitle1"
            sx={{
                color: "#000",
                fontWeight: FW.bold,
                lineHeight: 1,
            }}
        >
            {String(value).padStart(2, "0")}
        </Typography>
        <Typography
            variant="caption"
            sx={{
                color: "#000",
                fontWeight: 500,
                fontFamily: "Poppins, sans-serif",
                fontSize: "12px",
                lineHeight: 1,
            }}
        >
            {label}
        </Typography>
    </Box>
);

export const BannerSection = () => {
    const theme = useTheme();
    // Misal countdown 2 jam dari sekarang
    const endTime = useMemo(() => new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), []);
    const { days, hours, minutes, seconds } = useCountdown(endTime);

    return (
        <Grid container sx={{ marginBottom: '7rem' }}>
            <Grid size={12}>
                <Box sx={{ position: 'relative', width: '100%' }}>
                    <img src="/banner.jpeg" alt="Promo" style={{ width: '100%', height: 'auto', display: 'block' }} />
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: '5rem',
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                            color: '#fff',
                            textAlign: 'center',
                            gap: 3
                        }}
                    >
                        <Typography variant="subtitle1" sx={{ color: theme.palette.secondary.main }}>
                            Categories
                        </Typography>
                        <Typography variant="h3">
                            Enhance Your Music Experience
                        </Typography>
                        {/* Countdown Timer */}
                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                            <CountdownCircle value={days} label="Days" />
                            <Typography variant="h5" sx={{ color: "#000", mx: 0.5, fontWeight: 700 }}>:</Typography>
                            <CountdownCircle value={hours} label="Hours" />
                            <Typography variant="h5" sx={{ color: "#000", mx: 0.5, fontWeight: 700 }}>:</Typography>
                            <CountdownCircle value={minutes} label="Minutes" />
                            <Typography variant="h5" sx={{ color: "#000", mx: 0.5, fontWeight: 700 }}>:</Typography>
                            <CountdownCircle value={seconds} label="Seconds" />
                        </Box>
                        <Button variant="contained" sx={{ ...buttonSx.default }}>Buy Now!</Button>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    )
}