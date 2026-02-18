import { Grid } from '@mui/material';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useAppDispatch } from '../../store/hooks';
import type { RootState } from '../../store/store';
import { resetAsyncState } from './store/userProfile.slice';
import { ProfileComponent } from './components/ProfileComponent';
import { AddressBookComponent } from './components/AddressBookComponent';
import { UserOrdersComponent } from './components/UserOrdersComponent';
import { WishListComponent } from './components/WishListComponent';
import { getUserProfile } from './store/userProfileAsyncAction';
import { SideBar } from './components/SideBar';

export const UserProfileFeature = () => {
  const dispatch = useAppDispatch();
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
  }, [dispatch, status]);

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
