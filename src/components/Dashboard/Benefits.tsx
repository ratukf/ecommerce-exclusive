import { Grid, Typography } from "@mui/material"
import { BENEFITS } from "../../contants/benefits"

export const Benefits = () => {
    return (
        <Grid container sx={{ marginBottom: '7rem' }}>
            {BENEFITS.map((benefit, index) => (
                <Grid size={4} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 2, gap: '1rem' }} key={index}>
                    <img src={benefit.src} alt={benefit.label} />
                    <Typography sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '20px' }}>
                        {benefit.label}
                    </Typography>
                    <Typography sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 400, fontSize: '14px' }}>
                        {benefit.desc}
                    </Typography>
                </Grid>
            ))}

        </Grid>
    )
}