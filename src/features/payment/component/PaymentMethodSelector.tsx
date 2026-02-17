import {
  Box,
  Typography,
  Card,
  CardContent,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { AccountBalance, CreditCard, Wallet, LocalShipping } from '@mui/icons-material';
import type { PaymentMethod } from '../type';

interface PaymentMethodSelectorProps {
  method: PaymentMethod;
  onChange: (method: PaymentMethod) => void;
}

const PAYMENT_OPTIONS: {
  value: PaymentMethod;
  label: string;
  description: string;
  icon: React.ReactNode;
}[] = [
  {
    value: 'bank_transfer',
    label: 'Bank Transfer',
    description: 'Transfer manually to bank account',
    icon: <AccountBalance sx={{ color: '#555' }} />,
  },
  {
    value: 'credit_card',
    label: 'Credit / Debit Card',
    description: 'Visa, Mastercard, dll',
    icon: <CreditCard sx={{ color: '#555' }} />,
  },
  {
    value: 'e_wallet',
    label: 'E-Wallet',
    description: 'GoPay, OVO, Dana, dll',
    icon: <Wallet sx={{ color: '#555' }} />,
  },
  {
    value: 'cod',
    label: 'Cash on Delivery',
    description: 'Pay right when the package delivered',
    icon: <LocalShipping sx={{ color: '#555' }} />,
  },
];

const PaymentMethodSelector = ({ method, onChange }: PaymentMethodSelectorProps) => {
  return (
    <Box>
      <Typography variant='h6' fontWeight={600} mb={2}>
        Payment Method
      </Typography>

      <FormControl fullWidth>
        <RadioGroup value={method} onChange={(e) => onChange(e.target.value as PaymentMethod)}>
          {PAYMENT_OPTIONS.map((option) => (
            <Card
              key={option.value}
              variant='outlined'
              sx={{
                mb: 1.5,
                borderColor: method === option.value ? '#DB4444' : '#e0e0e0',
                borderWidth: method === option.value ? 2 : 1,
                borderRadius: 2,
                transition: 'border-color 0.2s',
              }}
            >
              <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>
                <FormControlLabel
                  value={option.value}
                  control={
                    <Radio sx={{ color: '#DB4444', '&.Mui-checked': { color: '#DB4444' } }} />
                  }
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      {option.icon}
                      <Box>
                        <Typography fontWeight={600}>{option.label}</Typography>
                        <Typography variant='body2' color='text.secondary'>
                          {option.description}
                        </Typography>
                      </Box>
                    </Box>
                  }
                  sx={{ width: '100%', mx: 0 }}
                />
              </CardContent>
            </Card>
          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export { PaymentMethodSelector };
