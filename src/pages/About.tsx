import { Box, Grid, IconButton, Typography, useTheme } from "@mui/material"
import { Benefits } from "../components/Dashboard/Benefits"
import { ACHIEVEMENTS, TEAM_MEMBERS } from "../constants/about"
import { Instagram, LinkedIn, Twitter } from "@mui/icons-material";


export const About = () => {
    const theme = useTheme();

    const boxSx = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        marginY: '2rem',
        border: '1px solid #e0e0e0',
        padding: '2rem',
        borderRadius: '4px',
        ':&hover': {
            backgroundColor: theme.palette.secondary.main,
        }
    }
    return (
        <Grid container sx={{ marginY: '5rem' }}>
            <Grid size={12} sx={{ display: 'flex', flexDirection: 'column', gap: '10rem' }}>
                {/* Our story section */}
                <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Grid size={6} sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <Typography variant="h2">
                            Our Story
                        </Typography>
                        <Typography variant="subtitle1" sx={{ textAlign: 'left' }}>
                            Launced in 2015, Exclusive is South Asia’s premier online shopping makterplace with an active presense in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sallers and 300 brands and serves 3 millioons customers across the region.
                        </Typography>
                        <Typography variant="subtitle1" sx={{ textAlign: 'left' }}>
                            Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse assotment in categories ranging  from consumer.
                        </Typography>
                    </Grid>
                    <Grid size={6} >
                        <img src="/about.png" alt="About Us" style={{ width: '100%', height: 'auto', }} />
                    </Grid>
                </Grid>
                {/* Achievement section */}
                <Grid container spacing={2}>
                    {ACHIEVEMENTS.map((item, index) => (
                        <Grid size={3} key={index} sx={boxSx}>
                            <img src={item.icon} alt={item.label} style={{ width: '80px', height: '80px' }} />
                            <Typography variant="h4" sx={{ fontWeight: 'bold', marginTop: 2 }}>{item.label}</Typography>
                            <Typography variant="subtitle1">{item.desc}</Typography>
                        </Grid>
                    ))}
                </Grid>
                {/* Team section */}
                <Grid container spacing={2}>
                    {TEAM_MEMBERS.map((member, index) => (
                        <Grid size={4} key={index} sx={{ textAlign: 'left' }}>
                            <img src={member.image} alt={member.name} style={{ width: '100%' }} />
                            <Typography variant="h4" >{member.name}</Typography>
                            <Typography variant="subtitle1">{member.role}</Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
                                <IconButton>
                                    <Twitter />
                                </IconButton>
                                <IconButton>
                                    <Instagram />
                                </IconButton>
                                <IconButton>
                                    <LinkedIn />
                                </IconButton>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
                {/* Benefits section */}
                <Benefits />
            </Grid>
        </Grid>
    )
}