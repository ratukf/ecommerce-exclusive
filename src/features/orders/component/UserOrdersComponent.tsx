import { Typography, useTheme, Box, Stack, Divider } from '@mui/material';
import dayjs from 'dayjs';
import { WhitePaper } from '../../../shared/components/WhitePaper';
import { useAppSelector } from '../../../store/hooks';
import type { RootState } from '../../../store/store';
import { auth } from '../../../services/firebase';
import { useEffect } from 'react';
import { useFetchPayments } from '../../payment/hooks/useFetchPayments';
import { orderStatus } from '../constant/orderStatus';

const UserOrdersComponent = () => {
  const uid = auth.currentUser?.uid;
  const theme = useTheme();
  const { fetchPayments } = useFetchPayments();
  const asyncState = useAppSelector((state: RootState) => state.payment.asyncState.getPayments);
  const orders = useAppSelector((state: RootState) => state.payment.payments);

  useEffect(() => {
    if (!uid) return;
    fetchPayments(uid);
  }, [fetchPayments]);

  if (asyncState.status === 'loading')
    return (
      <WhitePaper>
        <Typography variant='body1' color='text.secondary'>
          Loading orders...
        </Typography>
      </WhitePaper>
    );

  if (asyncState.error)
    return (
      <WhitePaper>
        <Typography variant='body1' color='error'>
          {asyncState.error}
        </Typography>
      </WhitePaper>
    );

  return (
    <>
      <Typography
        variant='h6'
        sx={{ color: theme.palette.secondary.main, textAlign: 'left', mb: 2 }}
      >
        Orders
      </Typography>
      <WhitePaper>
        {orders.length === 0 ? (
          <Typography variant='body2' color='text.secondary'>
            No orders found
          </Typography>
        ) : (
          orders.map((order) => (
            <Box key={order.id}>
              {/* Display order items */}
              <Stack spacing={2}>
                {order.items.map((item) => (
                  <>
                    <Box
                      width='100%'
                      key={item.productId}
                      sx={{ display: 'flex', alignItems: 'top', gap: 2 }}
                    >
                      <img
                        src={item.imageUrls}
                        alt={item.name}
                        style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 4 }}
                      />
                      <Box width='100%'>
                        <Box
                          display={'flex'}
                          justifyContent={'space-between'}
                          alignItems={'center'}
                          width='100%'
                        >
                          <Typography variant='subtitle1'>{item.name}</Typography>
                          <Typography variant='subtitle1'>
                            <strong>{orderStatus[order.status]}</strong>
                          </Typography>
                        </Box>
                        <Box textAlign={'right'}>
                          <Typography variant='subtitle2'>
                            Price ${item.price.toFixed(2)} x {item.quantity}
                          </Typography>
                          <Typography variant='subtitle2'>
                            Shipping fee ${order.shippingCost}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Box display={'flex'} justifyContent={'space-between'}>
                      <Typography variant='subtitle2' sx={{ mt: 2 }} textAlign={'right'}>
                        <strong>Ordered at </strong> {dayjs(order.createdAt).format('DD MMM YYYY')}
                      </Typography>
                      <Typography variant='subtitle1' sx={{ mt: 2 }} textAlign={'right'}>
                        Total: <strong>${order.totalAmount.toFixed(2)}</strong>
                      </Typography>
                    </Box>
                    <Divider sx={{ mb: 3 }} />
                  </>
                ))}
              </Stack>
            </Box>
          ))
        )}
      </WhitePaper>
    </>
  );
};

export { UserOrdersComponent };
