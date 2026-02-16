import { Typography, useTheme, Box, Stack } from '@mui/material';
import { WhitePaper } from '../../../shared/components/WhitePaper';
import { useAppSelector } from '../../../store/hooks';
import type { RootState } from '../../../store/store';

const UserOrdersComponent = () => {
  const theme = useTheme();
  const { asyncState, orders } = useAppSelector((state: RootState) => state.orders);

  if (asyncState.getOrders.status === 'loading')
    return (
      <WhitePaper>
        <Typography variant='body1' color='text.secondary'>
          Loading orders...
        </Typography>
      </WhitePaper>
    );

  if (asyncState.getOrders.error)
    return (
      <WhitePaper>
        <Typography variant='body1' color='error'>
          {asyncState.getOrders.error}
        </Typography>
      </WhitePaper>
    );

  return (
    <WhitePaper>
      <Typography
        variant='h6'
        sx={{ color: theme.palette.secondary.main, textAlign: 'left', mb: 2 }}
      >
        Orders
      </Typography>

      {orders.length === 0 ? (
        <Typography variant='body2' color='text.secondary'>
          No orders found
        </Typography>
      ) : (
        <Stack spacing={2}>
          {orders.map((order) => (
            <Box
              key={order.id}
              sx={{
                p: 2,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
              }}
            >
              <Typography variant='subtitle1'>
                <strong>Order ID:</strong> {order.id}
              </Typography>
              <Typography variant='subtitle1'>
                <strong>Total:</strong> ${order.totalAmount.toFixed(2)}
              </Typography>
              <Typography variant='subtitle1'>
                <strong>Status:</strong> {order.status}
              </Typography>
            </Box>
          ))}
        </Stack>
      )}
    </WhitePaper>
  );
};

export { UserOrdersComponent };
