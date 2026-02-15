// --- Adress's type ---

// Address' array main type
export type AddressBooks = Address[];

// Address type
export interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

const emptyAddress: Address = {
  id: Date.now().toString(),
  name: '',
  street: '',
  city: '',
  state: '',
  zipCode: '',
  country: '',
};

export { emptyAddress };
