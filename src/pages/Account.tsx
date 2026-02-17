import { Grid } from '@mui/material';
import { ProfileComponent } from '../features/userProfile/components/ProfileComponent';
import { SideBar } from '../features/userProfile/components/SideBar';
import { useEffect } from 'react';
import { AddressBookComponent } from '../features/userProfile/components/AddressBookComponent';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store/store';
import { getUserProfile } from '../features/userProfile/store/userProfileAsyncAction';
import { resetAsyncState } from '../features/userProfile/store/userProfile.slice';
import { UserOrdersComponent } from '../features/orders/component/UserOrdersComponent';
import { WishListComponent } from '../features/userProfile/components/WishListComponent';
import { useParams } from 'react-router';

export const Account = () => {
  const dispatch = useDispatch<AppDispatch>();
  const account = useSelector((state: RootState) => state.auth.auth);
  const status = useSelector(
    (state: RootState) => state.userProfile.asyncState.deleteAddress.status,
  );
  const param = useParams();
  const activeList = param['*'];

  useEffect(() => {
    if (status === 'succeeded') {
      dispatch(resetAsyncState('deleteAddress'));
    }
  }, [status]);

  const renderAccount = () => {
    switch (activeList) {
      case 'profile':
        return <ProfileComponent />;
      case 'address':
        return <AddressBookComponent />;
      case 'orders':
        return <UserOrdersComponent />;
      case 'wishlist':
        return <WishListComponent />;
      default:
        return <ProfileComponent />;
    }
  };

  // Fetch user profile
  useEffect(() => {
    if (account) {
      dispatch(getUserProfile());
    }
  }, [account, dispatch]);

  return (
    <Grid container spacing={2} columns={10} sx={{ marginY: '5rem' }}>
      <SideBar />
      <Grid size={7}>{renderAccount()}</Grid>
    </Grid>
  );
};
