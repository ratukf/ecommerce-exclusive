import React from "react";
import { Box, Grid, Icon, Typography } from "@mui/material"
import { CATEGORIES } from "../../contants/categories"
import { CameraAltOutlined, HeadphonesOutlined, MonitorOutlined, SmartphoneOutlined, SportsEsportsOutlined, WatchOutlined } from "@mui/icons-material"

const categoryIcons: Record<string, React.ReactNode> = {
    Phones: <SmartphoneOutlined sx={{ fontSize: '2rem' }} />,
    Computers: <MonitorOutlined sx={{ fontSize: '2rem' }} />,
    SmartWatch: <WatchOutlined sx={{ fontSize: '2rem' }} />,
    Camera: <CameraAltOutlined sx={{ fontSize: '2rem' }} />,
    Headphones: <HeadphonesOutlined sx={{ fontSize: '2rem' }} />,
    Gaming: <SportsEsportsOutlined sx={{ fontSize: '2rem' }} />
}

export const CategoriesSection = () => {
    return (
        <>
            {CATEGORIES.map((category) => (
                <Grid size={2} key={category.label}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        textAlign: 'center',
                        border: '1px solid rgba(0,0,0,0.2)',
                        paddingY: '5rem',
                        borderRadius: '4px',
                        '&:hover': { cursor: 'pointer' }
                    }}>
                        <Icon sx={{ width: '100%', height: '100%' }}>
                            {categoryIcons[category.label] || null}
                        </Icon>
                        <Typography variant="subtitle1" sx={{ marginTop: '1rem' }}>
                            {category.label}
                        </Typography>
                    </Box>
                </Grid >
            ))}
        </>
    )
}