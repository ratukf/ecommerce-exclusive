import { Box, Button, Grid, TextField, Typography, useTheme } from "@mui/material"
import { WhitePaper } from "../WhitePaper"
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { buttonSx } from "../../styles/buttonSx";
import { useEffect, useState } from "react";
import { useFormik } from "formik";

type Account = {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
};

export const Profile = () => {
    const theme = useTheme();
    const [isEditing, setIsEditing] = useState(false);
    const account = useSelector((state: RootState) => state.account.account) as Account | null;

    const PROFILE = [
        { label: 'First Name', value: account?.firstName ?? '', field: 'firstName' },
        { label: 'Last Name', value: account?.lastName ?? '', field: 'lastName' },
        { label: 'Email', value: account?.email ?? '', field: 'email' },
        { label: 'Phone', value: account?.phone ?? '', field: 'phone' },
    ];


    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
        },
        onSubmit: (values) => {
            console.log('Form submitted with values:', values);
        },
    });

    useEffect(() => {
        if (account) {
            formik.setValues({
                firstName: account.firstName ?? '',
                lastName: account.lastName ?? '',
                email: account.email ?? '',
                phone: account.phone ?? '',
            });
        }
    }, [account]);

    return (
        <Grid size={7}>
            <WhitePaper>
                <form onSubmit={formik.handleSubmit}>
                    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <Typography variant="h6" sx={{ color: theme.palette.secondary.main, textAlign: 'left' }}>
                            Edit Your Profile
                        </Typography>
                        <Grid container spacing='1.5rem'>

                            {PROFILE.map((item) => (
                                <Grid size={6}>
                                    <Typography variant="subtitle1" sx={{ color: '#000', textAlign: 'left' }}>
                                        {item.label}
                                    </Typography>
                                    <TextField
                                        name={item.field}
                                        key={item.label}
                                        value={formik.values[item.field as keyof typeof formik.values]}
                                        variant="filled"
                                        fullWidth
                                        InputProps={
                                            isEditing && item.field !== 'email'
                                                ? { disableUnderline: true }
                                                : { readOnly: true, disableUnderline: true }
                                        }
                                        sx={{
                                            "& .MuiInputBase-input": {
                                                color: '#000',
                                                opacity: isEditing && item.field !== 'email' ? 1 : 0.5,
                                            },
                                            "& .MuiInputLabel-root": {
                                                color: '#000',
                                                opacity: isEditing && item.field !== 'email' ? 1 : 0.5,
                                            },
                                        }}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', gap: '1.5rem' }}>

                            {isEditing ? (
                                <>
                                    <Button variant="outlined" sx={buttonSx.transparent} onClick={() => setIsEditing(false)}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" variant="contained" sx={buttonSx.default}>
                                        Save Changes
                                    </Button>
                                </>
                            ) : (
                                <Button onClick={() => setIsEditing(true)} variant="contained" sx={buttonSx.default}>
                                    Edit
                                </Button>
                            )}
                        </Box>
                    </Box>
                </form>
            </WhitePaper>
        </Grid >
    )
}