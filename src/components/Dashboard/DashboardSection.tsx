import { Box, Button, Grid, Typography } from '@mui/material';
import React from 'react';
import { useTheme } from '@mui/material';
interface DashboardSectionProps {
    categoryLabel: string;
    sectionHeader: string;
    sectionHeader2: React.ReactNode;
    buttonHeader: React.ReactNode;
    content: React.ReactNode;
    actionButton: string;
}

export const DashboardSection: React.FC<DashboardSectionProps> = ({
    categoryLabel,
    sectionHeader,
    sectionHeader2,
    buttonHeader,
    content,
    actionButton,
}) => {
    const theme = useTheme();

    return (
        <>
            <Grid container sx={{ marginBottom: '7rem' }}>
                <Grid size={12} sx={{ display: 'flex', justifyContent: 'inline', alignItems: 'center', marginBottom: '2rem' }}>
                    <Box sx={{ width: '20px', height: '40px', backgroundColor: theme.palette.secondary.main, borderRadius: '4px', marginRight: '16px' }} />
                    <Typography variant="subtitle2">
                        {categoryLabel}
                    </Typography>
                </Grid>
                <Grid size={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'inline', alignItems: 'flex-end', gap: 2 }}>
                        <Typography variant='subtitle1'>
                            {sectionHeader}
                        </Typography>
                        {sectionHeader2}
                    </Box>
                    <Box>
                        {buttonHeader}
                    </Box>
                </Grid>
                <Grid size={12} sx={{ marginBottom: '2rem' }}>
                    <Grid container spacing={2}>
                        {content}
                    </Grid>
                </Grid>
                <Grid size={12}>
                    {actionButton && (
                        <Button variant="contained">
                            {actionButton}
                        </Button>
                    )}
                </Grid>
            </Grid >
        </>
    );
};