import { Box, Typography, Divider } from '@mui/material';
import type { Item } from '../../cart/type';
import type { Product } from '../../products/types';

interface OrderSummaryProps {
  cartItems: Item[];
  products: Product[];
  subtotal: number;
  shippingCost: number;
  totalAmount: number;
}

const OrderSummary = ({
  cartItems,
  products,
  subtotal,
  shippingCost,
  totalAmount,
}: OrderSummaryProps) => {
  return (
    <Box
      sx={{
        border: '1px solid #e0e0e0',
        borderRadius: 2,
        p: 3,
      }}
    >
      <Typography variant='h6' fontWeight={600} mb={2}>
        Order Summary
      </Typography>

      {/* List item */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
        {cartItems.map((item) => {
          const product = products.find((p) => p.id === item.productId);
          const price = product?.price ?? 0;

          return (
            <Box key={item.productId} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ position: 'relative', flexShrink: 0 }}>
                <img
                  src={item.imageUrls}
                  alt={item.name}
                  style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: 8 }}
                />
                {/* Badge quantity */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: -6,
                    right: -6,
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    backgroundColor: '#DB4444',
                    color: '#fff',
                    fontSize: 11,
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {item.quantity}
                </Box>
              </Box>

              <Typography variant='body2' sx={{ flex: 1 }}>
                {item.name}
              </Typography>

              <Typography variant='body2' fontWeight={600}>
                ${price * item.quantity}
              </Typography>
            </Box>
          );
        })}
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Subtotal */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant='body2' color='text.secondary'>
          Subtotal
        </Typography>
        <Typography variant='body2'>${subtotal}</Typography>
      </Box>

      {/* Shipping */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant='body2' color='text.secondary'>
          Shipping
        </Typography>
        <Typography variant='body2' color='success.main' fontWeight={500}>
          {shippingCost === 0 ? 'Free' : `$${shippingCost}`}
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Total */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography fontWeight={700}>Total</Typography>
        <Typography fontWeight={700}>${totalAmount}</Typography>
      </Box>
    </Box>
  );
};

export { OrderSummary };
