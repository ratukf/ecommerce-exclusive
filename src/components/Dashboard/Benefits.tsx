import { Grid, Typography } from '@mui/material';
import { BENEFITS } from '../../shared/constants/benefits';
import { FW } from '../../theme';

export const Benefits = () => {
  return (
    <Grid container sx={{ marginBottom: '7rem' }}>
      {BENEFITS.map((benefit, index) => (
        <Grid
          size={4}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 2,
            gap: '1rem',
          }}
          key={index}
        >
          <img src={benefit.src} alt={benefit.label} />
          <Typography variant='h6' sx={{ fontWeight: FW.semiBold }}>
            {benefit.label}
          </Typography>
          <Typography variant='body2'>{benefit.desc}</Typography>
        </Grid>
      ))}
    </Grid>
  );
};
