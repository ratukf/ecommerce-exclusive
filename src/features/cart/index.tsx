import { Container } from '@mui/material';
import { WhitePaper } from '../../shared/components/WhitePaper';
import { CartSummary } from './component/CartSummary';
import { CartTable } from './component/CartTable';

const CartComponents = () => {
  return (
    <Container sx={{ my: 5 }}>
      <WhitePaper>
        <CartTable />
      </WhitePaper>
      <CartSummary />
    </Container>
  );
};

export { CartComponents };
