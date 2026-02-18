import { useEffect, useState } from 'react';
import { Box, Typography, Grid, Button, Divider, CircularProgress, Alert } from '@mui/material';
import { useSelector, shallowEqual } from 'react-redux';
import { useLocation } from 'react-router-dom';
import type { RootState } from '../../store/store';
import { auth } from '../../services/firebase';
import type { PaymentMethod, ShippingAddress } from './type';
import { useCreatePayment } from './hooks/useCreatePayment';
import { OrderSummary } from './component/OrderSummary';
import { AddressSelector } from './component/AddressSelector';
import { PaymentMethodSelector } from './component/PaymentMethodSelector';
import { CheckoutConfirmation } from './component/CheckoutConfirmation';
import type { OrderItem } from '../orders/types';

type CheckoutStep = 'form' | 'confirmed';

export interface BuyNowState {
  buyNow: true;
  item: OrderItem;
}

const CheckoutFeature = () => {
  const uid = auth.currentUser?.uid;
  const location = useLocation();

  const cartItems = useSelector((state: RootState) => state.cart.cart?.item ?? [], shallowEqual);
  const products = useSelector((state: RootState) => state.products.products, shallowEqual);
  const addressBooks = useSelector(
    (state: RootState) => state.userProfile.userProfile.addressBooks,
    shallowEqual,
  );

  const { submitPayment, currentPayment, status, error } = useCreatePayment();

  const [step, setStep] = useState<CheckoutStep>('form');
  const [selectedAddressId, setSelectedAddressId] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('bank_transfer');

  const buyNowState = location.state as BuyNowState | null;
  const isBuyNow = !!buyNowState?.buyNow;

  const orderItems: OrderItem[] = isBuyNow
    ? [buyNowState.item]
    : cartItems.map((item) => {
        const product = products.find((p) => p.id === item.productId);
        return {
          productId: item.productId,
          name: item.name,
          price: product?.price ?? 0,
          quantity: item.quantity,
          imageUrls: item.imageUrls,
        };
      });

  const subtotal = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingCost = 0;
  const totalAmount = subtotal + shippingCost;

  useEffect(() => {
    if (addressBooks.length > 0 && !selectedAddressId) {
      setSelectedAddressId(addressBooks[0].id);
    }
  }, [addressBooks]);

  const selectedAddress = addressBooks.find((a) => a.id === selectedAddressId);

  const handlePlaceOrder = async () => {
    if (!uid || !selectedAddress) return;

    const shippingAddress: ShippingAddress = {
      name: selectedAddress.name,
      street: selectedAddress.street,
      city: selectedAddress.city,
      state: selectedAddress.state,
      zipCode: selectedAddress.zipCode,
      country: selectedAddress.country,
    };

    await submitPayment({
      userId: uid,
      orderId: `order_${Date.now()}`,
      items: orderItems,
      subtotal,
      shippingCost,
      totalAmount,
      method: paymentMethod,
      shippingAddress,
      fromCart: !isBuyNow,
    });

    setStep('confirmed');
  };

  if (step === 'confirmed' && currentPayment) {
    return <CheckoutConfirmation payment={currentPayment} />;
  }

  return (
    <Box sx={{ px: { xs: 2, md: 8 }, py: 4, fontFamily: 'Poppins, sans-serif' }}>
      <Typography variant='h5' fontWeight={600} mb={3}>
        Checkout
      </Typography>

      <Grid container spacing={4}>
        {/* Left: Form */}
        <Grid size={{ xs: 12, md: 7 }}>
          <AddressSelector
            addressBooks={addressBooks}
            selectedAddressId={selectedAddressId}
            onSelect={setSelectedAddressId}
          />
          <Divider sx={{ my: 3 }} />
          <PaymentMethodSelector method={paymentMethod} onChange={setPaymentMethod} />
        </Grid>

        {/* Right: Order Summary */}
        <Grid size={{ xs: 12, md: 5 }}>
          <OrderSummary
            cartItems={orderItems.map((i) => ({
              productId: i.productId,
              name: i.name,
              quantity: i.quantity,
              imageUrls: i.imageUrls,
            }))}
            products={products}
            subtotal={subtotal}
            shippingCost={shippingCost}
            totalAmount={totalAmount}
          />

          {error && (
            <Alert severity='error' sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          <Button
            fullWidth
            variant='contained'
            onClick={handlePlaceOrder}
            disabled={!selectedAddressId || status === 'loading'}
            sx={{
              mt: 3,
              py: 1.5,
              backgroundColor: '#DB4444',
              fontWeight: 600,
              textTransform: 'none',
              borderRadius: 1.5,
              '&:hover': { backgroundColor: '#c03333' },
              '&:disabled': { backgroundColor: '#e0e0e0' },
            }}
          >
            {status === 'loading' ? (
              <CircularProgress size={22} sx={{ color: '#fff' }} />
            ) : (
              'Place Order'
            )}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export { CheckoutFeature };
