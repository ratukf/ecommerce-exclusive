import {
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Card,
  CardContent,
  Button,
} from '@mui/material';
import { LocationOn } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import type { AddressBooks } from '../../userProfile/types';

interface AddressSelectorProps {
  addressBooks: AddressBooks[];
  selectedAddressId: string;
  onSelect: (id: string) => void;
}

const AddressSelector = ({ addressBooks, selectedAddressId, onSelect }: AddressSelectorProps) => {
  const navigate = useNavigate();

  return (
    <Box>
      <Typography variant='h6' fontWeight={600} mb={2}>
        Shipping Address
      </Typography>

      {addressBooks.length === 0 ? (
        <Box
          sx={{
            border: '1px dashed #ccc',
            borderRadius: 2,
            p: 3,
            textAlign: 'center',
          }}
        >
          <Typography color='text.secondary' mb={2}>
            No address. Please go to your account to add address.
          </Typography>
          <Button
            variant='outlined'
            onClick={() => navigate('/account')}
            sx={{ textTransform: 'none', borderColor: '#DB4444', color: '#DB4444' }}
          >
            Add Address
          </Button>
        </Box>
      ) : (
        <FormControl fullWidth>
          <RadioGroup value={selectedAddressId} onChange={(e) => onSelect(e.target.value)}>
            {addressBooks.map((address) => (
              <Card
                key={address.id}
                variant='outlined'
                sx={{
                  mb: 1.5,
                  borderColor: selectedAddressId === address.id ? '#DB4444' : '#e0e0e0',
                  borderWidth: selectedAddressId === address.id ? 2 : 1,
                  borderRadius: 2,
                  transition: 'border-color 0.2s',
                }}
              >
                <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>
                  <FormControlLabel
                    value={address.id}
                    control={
                      <Radio sx={{ color: '#DB4444', '&.Mui-checked': { color: '#DB4444' } }} />
                    }
                    label={
                      <Box>
                        <Typography fontWeight={600} sx={{ color: 'black' }} textAlign={'left'}>
                          {address.name}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 0.5, mt: 0.5 }}>
                          <LocationOn sx={{ fontSize: 16, color: 'text.secondary', mt: 0.2 }} />
                          <Typography variant='body2' color='text.secondary'>
                            {address.street}, {address.city}, {address.state} {address.zipCode},{' '}
                            {address.country}
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
      )}
    </Box>
  );
};

export { AddressSelector };
