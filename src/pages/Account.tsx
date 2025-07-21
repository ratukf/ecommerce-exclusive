import { Grid } from "@mui/material"
import { Profile } from "../components/Account/Profile"
import { SideBar } from "../components/Account/SideBar"
import { useState } from "react";

export const Account = () => {
    const [activeList, setActiveList] = useState('My Profile');
    return (
        <Grid container spacing={2} columns={10} sx={{ marginY: '5rem' }}>
            <SideBar activeList={activeList} setActiveList={setActiveList} />
            <Profile />
        </Grid>
    )
}