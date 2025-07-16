import { Box, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";

interface FlashSaleTimerProps {
    endTime: Date | string | number;
}

const getTimeLeft = (endTime: Date | string | number) => {
    const total = new Date(endTime).getTime() - new Date().getTime();
    const seconds = Math.max(Math.floor((total / 1000) % 60), 0);
    const minutes = Math.max(Math.floor((total / 1000 / 60) % 60), 0);
    const hours = Math.max(Math.floor((total / (1000 * 60 * 60)) % 24), 0);
    const days = Math.max(Math.floor(total / (1000 * 60 * 60 * 24)), 0);
    return { total, days, hours, minutes, seconds };
};

export const FlashSaleTimer: React.FC<FlashSaleTimerProps> = ({ endTime }) => {
    const theme = useTheme();
    const [timeLeft, setTimeLeft] = useState(getTimeLeft(endTime));

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(getTimeLeft(endTime));
        }, 1000);
        return () => clearInterval(timer);
    }, [endTime]);

    const items = [
        { label: "Days", value: timeLeft.days },
        { label: "Hours", value: timeLeft.hours },
        { label: "Minutes", value: timeLeft.minutes },
        { label: "Seconds", value: timeLeft.seconds },
    ];

    return (
        <Box sx={{ display: "flex", backgroundColor: 'transparent', alignItems: 'center' }}>
            {items.map((item, idx) => (
                <React.Fragment key={item.label}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            minWidth: 56,
                            padding: "8px 12px",
                        }}
                    >
                        <Typography
                            variant="caption"
                            sx={{
                                color: '#000',
                                fontWeight: 500,
                                fontFamily: "Poppins, sans-serif",
                                fontSize: "12px"
                            }}
                        >
                            {item.label}
                        </Typography>
                        <Typography
                            variant="h3"
                            sx={{
                                color: '#000',
                                fontWeight: 700,
                                fontSize: "32px",
                                fontFamily: "Poppins, sans-serif",
                            }}
                        >
                            {String(item.value).padStart(2, "0")}
                        </Typography>
                    </Box>
                    {idx < items.length - 1 && (
                        <Typography
                            variant="h3"
                            sx={{
                                color: theme.palette.secondary.main,
                                fontWeight: 500,
                                fontSize: "32px",
                                fontFamily: "Poppins, sans-serif",
                                mx: 0.5,
                                userSelect: 'none'
                            }}
                        >
                            :
                        </Typography>
                    )}
                </React.Fragment>
            ))}
        </Box>
    );
};