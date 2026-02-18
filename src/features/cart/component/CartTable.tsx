import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useSelector, shallowEqual } from 'react-redux';
import type { RootState } from '../../../store/store';
import { useMemo, useState, useRef, useEffect } from 'react';
import { useAddCart } from '../hooks/useAddCart';
import type { Item } from '../type';
import { auth } from '../../../services/firebase';
import { Loading } from '../../../shared/components/Loading';

const CartTable = () => {
  const uid = auth.currentUser?.uid;
  const products = useSelector((state: RootState) => state.products.products, shallowEqual);
  const cartItems = useSelector((state: RootState) => state.cart.cart?.item ?? [], shallowEqual);
  const cartStatus = useSelector((state: RootState) => state.cart.asyncState.addCart.status);
  const { addItem } = useAddCart();

  const [localQuantities, setLocalQuantities] = useState<Record<string, number>>(() =>
    cartItems.reduce(
      (acc, item) => {
        acc[item.productId] = item.quantity;
        return acc;
      },
      {} as Record<string, number>,
    ),
  );

  useEffect(() => {
    setLocalQuantities((prev) => {
      const next = { ...prev };
      const activeIds = new Set(cartItems.map((item) => item.productId));

      Object.keys(next).forEach((id) => {
        if (!activeIds.has(id)) delete next[id];
      });

      cartItems.forEach((item) => {
        if (!(item.productId in next)) {
          next[item.productId] = item.quantity;
        }
      });

      return next;
    });
  }, [cartItems]);

  const localQuantitiesRef = useRef(localQuantities);
  useEffect(() => {
    localQuantitiesRef.current = localQuantities;
  }, [localQuantities]);

  const debounceRefs = useRef<Record<string, NodeJS.Timeout>>({});

  const rowData = useMemo(() => {
    return cartItems.map((item) => {
      const product = products.find((p) => p.id === item.productId);
      const price = product?.price ?? 0;
      const quantity = localQuantities[item.productId] ?? item.quantity;
      return {
        id: item.productId,
        product: {
          name: product?.name ?? item.productId,
          image: product?.imageUrls?.[0] ?? '',
        },
        quantity,
        price,
        subtotal: price * quantity,
      };
    });
  }, [cartItems, products, localQuantities]);

  const handleQuantityChange = (productId: string, delta: number) => {
    setLocalQuantities((prev) => {
      const newQuantity = Math.max((prev[productId] ?? 0) + delta, 0);
      return { ...prev, [productId]: newQuantity };
    });

    if (debounceRefs.current[productId]) clearTimeout(debounceRefs.current[productId]);
    debounceRefs.current[productId] = setTimeout(() => {
      const product = products.find((p) => p.id === productId);
      if (!product || !uid) return;

      const quantity = localQuantitiesRef.current[productId] ?? 0;

      const item: Item = {
        productId,
        quantity,
        name: product.name,
        imageUrls: product.imageUrls[0] ?? '',
      };

      addItem(uid, item).catch(console.error);
    }, 500);
  };

  const columns: GridColDef[] = [
    {
      field: 'product',
      headerName: 'Product',
      flex: 1,
      renderCell: (params: any) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <img
            src={params.value.image}
            alt={params.value.name}
            style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 4 }}
          />
          <span>{params.value.name}</span>
        </div>
      ),
    },
    {
      field: 'price',
      headerName: 'Price',
      flex: 0.5,
      type: 'number',
      renderCell: (params: any) => <>${params.value}</>,
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      flex: 0.5,
      renderCell: (params: any) => {
        const productId = params.row.id;
        const quantity = localQuantities[productId] ?? params.value;

        return cartStatus === 'loading' ? (
          <Loading />
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <button onClick={() => handleQuantityChange(productId, -1)}>-</button>
            <span>{quantity}</span>
            <button onClick={() => handleQuantityChange(productId, 1)}>+</button>
          </div>
        );
      },
    },
    {
      field: 'subtotal',
      headerName: 'Subtotal',
      flex: 0.5,
      type: 'number',
      renderCell: (params: any) => <>${params.value.toFixed(2)}</>,
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rowData}
        columns={columns}
        pageSizeOptions={[5, 10]}
        sx={{
          '& .MuiDataGrid-columnHeader, & .MuiDataGrid-cell': {
            color: 'black',
            fontWeight: 400,
          },
          '& .MuiCheckbox-root.Mui-checked': {
            color: 'green',
          },
        }}
      />
    </div>
  );
};

export { CartTable };
