import { useCart } from '../features/cart/hooks/useCart';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchProducts } from '../features/products/store/productsAsyncAction';
import { useAppDispatch } from '../store/hooks';
import type { RootState } from '../store/store';
import { CartComponents } from '../features/cart';
import { WhitePaper } from '../shared/components/WhitePaper';

const Cart = () => {
  const dispatch = useAppDispatch();
  const { error, status } = useCart();
  const { products } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    if (products.length !== 0) {
      return;
    }
    dispatch(fetchProducts());
  }, [dispatch]);

  if (status === 'loading') return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <WhitePaper>
      <CartComponents />
    </WhitePaper>
  );
};

export { Cart };
