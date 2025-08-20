import { Grid } from "@mui/material"
import { Profile } from "../components/Account/Profile"
import { SideBar } from "../components/Account/SideBar"
import { useEffect, useState } from "react";
import { AddressBook } from "../components/Account/AddressBook";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { getUserProfile } from "../store/asyncAction";

export const Account = () => {
    const [activeList, setActiveList] = useState('My Profile');
    const dispatch = useDispatch<AppDispatch>();
    const account = useSelector((state: RootState) => state.account.account)
    const userProfile = useSelector((state: RootState) => state.account.userProfile);

    const useAccount = () => {
        switch (activeList) {
            case 'My Profile':
                return <Profile />;
            case 'Address Book':
                return <AddressBook />;
            default:
                return <Profile />;
        }
    }

    useEffect(() => {
        if (account) {
            dispatch(getUserProfile(account.id));
            console.log("🚀 ~ useEffect ~ account.id:", account.id)
        }
    }, [account, dispatch])

    useEffect(() => {
        if (userProfile) {
            console.log("🚀 ~ useEffect ~ userProfile:", userProfile)
        }
    }, [userProfile])

    return (
        <Grid container spacing={2} columns={10} sx={{ marginY: '5rem' }}>
            <SideBar activeList={activeList} setActiveList={setActiveList} />
            <Grid size={7}>
                {useAccount()}
            </Grid>
        </Grid>
    )
}