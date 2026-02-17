import { Box, Button, Divider, Typography } from '@mui/material';
import { useSelector, shallowEqual } from 'react-redux';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../../../store/store';

const CartSummary = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.cart?.item ?? [], shallowEqual);
  const products = useSelector((state: RootState) => state.products.products, shallowEqual);

  const totalSubtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      const product = products.find((p) => p.id === item.productId);
      const price = product?.price ?? 0;
      return acc + price * item.quantity;
    }, 0);
  }, [cartItems, products]);

  return (
    <Box
      sx={{
        mt: 3,
        ml: 'auto',
        width: { xs: '100%', sm: 340 },
        border: '1px solid #e0e0e0',
        borderRadius: 2,
        p: 3,
      }}
    >
      <Typography variant='h6' fontWeight={600} mb={2} sx={{ color: 'black' }}>
        Cart Total
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
        <Typography variant='body2' color='text.secondary'>
          Shipping
        </Typography>
        <Typography variant='body2' fontWeight={500} color='success.main'>
          Free
        </Typography>
      </Box>

      <Divider sx={{ my: 1.5 }} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant='body1' fontWeight={600} sx={{ color: 'black' }}>
          Total
        </Typography>
        <Typography variant='body1' fontWeight={600} sx={{ color: 'black' }}>
          ${totalSubtotal}
        </Typography>
      </Box>

      {totalSubtotal > 0 && (
        <Button
          fullWidth
          variant='contained'
          onClick={() => navigate('/checkout')}
          sx={{
            backgroundColor: '#DB4444',
            color: '#fff',
            fontWeight: 600,
            textTransform: 'none',
            borderRadius: 1.5,
            py: 1.2,
            '&:hover': {
              backgroundColor: '#c03333',
            },
          }}
        >
          Proceed to Checkout
        </Button>
      )}
    </Box>
  );
};

export { CartSummary };
