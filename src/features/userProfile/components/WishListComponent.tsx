import { Box, Typography, useTheme } from '@mui/material';
import { WhitePaper } from '../../../shared/components/WhitePaper';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store/store';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router';

const WishListComponent = () => {
  const theme = useTheme();
  const nav = useNavigate();
  const whishlist = useSelector((state: RootState) => state.userProfile.userProfile.wishlist);
  return (
    <>
      <Typography
        variant='h6'
        sx={{ color: theme.palette.secondary.main, textAlign: 'left', mb: 2 }}
      >
        Whishlist
      </Typography>
      <WhitePaper>
        {whishlist.length === 0 ? (
          <Typography variant='body2' color='text.secondary'>
            No whishlist found
          </Typography>
        ) : (
          whishlist.map((item) => (
            <Box
              onClick={() => nav(`/product/${item.productId}`)}
              key={item.id}
              width='100%'
              sx={{ display: 'flex', alignItems: 'top', gap: 2 }}
            >
              <img
                src={item.imageUrls}
                alt={item.name}
                style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 4 }}
              />
              <Box width='100%'>
                <Box display={'flex'} justifyContent={'space-between'}>
                  <Typography variant='subtitle1' textAlign={'left'}>
                    <strong>{item.name}</strong>
                  </Typography>
                  <Typography variant='subtitle2'>
                    Added at {dayjs(item.addedAt).format('DD MMM YYYY')}
                  </Typography>
                </Box>
                <Typography variant='subtitle2' textAlign={'left'}>
                  {item.description}
                </Typography>
                <Typography variant='subtitle1' textAlign={'left'}>
                  <strong>${item.price}</strong>
                </Typography>
              </Box>
            </Box>
          ))
        )}
      </WhitePaper>
    </>
  );
};

export { WishListComponent };
