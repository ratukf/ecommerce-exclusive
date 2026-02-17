import { Box, Typography, Button, Divider, Chip } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import type { Payment, PaymentMethod } from '../type';

interface CheckoutConfirmationProps {
  payment: Payment;
}

const METHOD_LABEL: Record<PaymentMethod, string> = {
  bank_transfer: 'Bank Transfer',
  credit_card: 'Credit / Debit Card',
  e_wallet: 'E-Wallet',
  cod: 'Cash on Delivery',
};

const CheckoutConfirmation = ({ payment }: CheckoutConfirmationProps) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        px: { xs: 2, md: 8 },
        py: 6,
        fontFamily: 'Poppins, sans-serif',
      }}
    >
      {/* Success Icon */}
      <CheckCircle sx={{ fontSize: 72, color: '#4caf50', mb: 2 }} />

      <Typography variant='h5' fontWeight={700} mb={1}>
        Order Placed!
      </Typography>
      <Typography color='text.secondary' mb={4} textAlign='center'>
        Thanks! Your order is being processed.
      </Typography>

      {/* Order Detail */}
      <Box
        sx={{
          width: '100%',
          maxWidth: 480,
          border: '1px solid #e0e0e0',
          borderRadius: 2,
          p: 3,
        }}
      >
        {/* Order ID */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
          <Typography variant='body2' color='text.secondary'>
            Order ID
          </Typography>
          <Typography variant='body2' fontWeight={600}>
            #{payment.id.slice(0, 8).toUpperCase()}
          </Typography>
        </Box>

        {/* Date */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
          <Typography variant='body2' color='text.secondary'>
            Tanggal
          </Typography>
          <Typography variant='body2'>
            {new Date(payment.createdAt).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </Typography>
        </Box>

        {/* Payment method */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
          <Typography variant='body2' color='text.secondary'>
            Metode Bayar
          </Typography>
          <Typography variant='body2'>{METHOD_LABEL[payment.method]}</Typography>
        </Box>

        {/* Address */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
          <Typography variant='body2' color='text.secondary'>
            Dikirim ke
          </Typography>
          <Typography variant='body2' textAlign='right' maxWidth={220}>
            {payment.shippingAddress.name}, {payment.shippingAddress.city}
          </Typography>
        </Box>

        {/* Status */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
          <Typography variant='body2' color='text.secondary'>
            Status Pembayaran
          </Typography>
          <Chip
            label='Pending'
            size='small'
            sx={{ backgroundColor: '#fff3e0', color: '#e65100', fontWeight: 600 }}
          />
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Total */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography fontWeight={700}>Total</Typography>
          <Typography fontWeight={700}>${payment.totalAmount}</Typography>
        </Box>
      </Box>

      {/* Navigation button */}
      <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
        <Button
          variant='outlined'
          onClick={() => navigate('/')}
          sx={{
            textTransform: 'none',
            borderColor: '#DB4444',
            color: '#DB4444',
            '&:hover': { borderColor: '#c03333', color: '#c03333' },
          }}
        >
          Continue shopping
        </Button>
        <Button
          variant='contained'
          onClick={() => navigate('/account/orders')}
          sx={{
            textTransform: 'none',
            backgroundColor: '#DB4444',
            '&:hover': { backgroundColor: '#c03333' },
          }}
        >
          Check my orders
        </Button>
      </Box>
    </Box>
  );
};

export { CheckoutConfirmation };
