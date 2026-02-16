import { Grid } from '@mui/material';
import { ProfileComponent } from '../features/userProfile/components/ProfileComponent';
import { SideBar } from '../features/userProfile/components/SideBar';
import { useEffect, useState } from 'react';
import { AddressBookComponent } from '../features/userProfile/components/AddressBookComponent';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store/store';
import { getUserProfile } from '../features/userProfile/store/userProfileAsyncAction';
import { resetAsyncState } from '../features/userProfile/store/userProfile.slice';
import { UserOrdersComponent } from '../features/orders/component/UserOrdersComponent';
import { getOrdersAsyncAction } from '../features/orders/store/ordersAsyncActions';
import { WishListComponent } from '../features/userProfile/components/WishListComponent';

export const Account = () => {
  const [activeList, setActiveList] = useState('My Profile');
  const dispatch = useDispatch<AppDispatch>();
  const account = useSelector((state: RootState) => state.auth.auth);
  const status = useSelector(
    (state: RootState) => state.userProfile.asyncState.deleteAddress.status,
  );

  useEffect(() => {
    if (status === 'succeeded') {
      dispatch(resetAsyncState('deleteAddress'));
    }
  }, [status]);

  const renderAccount = () => {
    switch (activeList) {
      case 'My Profile':
        return <ProfileComponent />;
      case 'Address Book':
        return <AddressBookComponent />;
      case 'My Orders':
        return <UserOrdersComponent />;
      case 'My Wishlist':
        return <WishListComponent />;
      default:
        return <ProfileComponent />;
    }
  };

  // Fetch user profile
  useEffect(() => {
    if (account) {
      dispatch(getUserProfile(account.id));
      dispatch(getOrdersAsyncAction());
    }
  }, [account, dispatch]);

  return (
    <Grid container spacing={2} columns={10} sx={{ marginY: '5rem' }}>
      <SideBar activeList={activeList} setActiveList={setActiveList} />
      <Grid size={7}>{renderAccount()}</Grid>
    </Grid>
  );
};
