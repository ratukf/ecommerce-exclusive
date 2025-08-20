import { useFormik } from "formik"
import { WhitePaper } from "../WhitePaper"
import { Box, Button, Divider, Grid, IconButton, TextField, Tooltip, Typography, useTheme } from "@mui/material"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import type { UserProfile } from "../../store/slice";
import { buttonSx } from "../../styles/buttonSx";
import { DeleteOutlineOutlined, EditOutlined } from "@mui/icons-material";
import * as yup from "yup";

export const AddressBook = () => {
    const theme = useTheme();
    const [isEditing, setIsEditing] = useState([{ id: null, status: false }]);
    const userProfile = useSelector((state: RootState) => state.account.userProfile) as UserProfile | null;
    const addressBooks = userProfile?.addressBooks ?? [];

    const redStar = () => {
        return (
            <span style={{ color: 'red' }}>*</span>
        )
    }

    const formik = useFormik({
        initialValues: [{
            name: '',
            address: {
                street: '',
                city: '',
                state: '',
                zipCode: '',
                country: '',
            }
        }],
        validationSchema: yup.object({
            name: yup.string().required('Address Name is required'),
            address: yup.object({
                street: yup.string().required('Street is required'),
                city: yup.string().required('City is required'),
                state: yup.string().required('State is required'),
                zipCode: yup.string().required('Zip Code is required'),
                country: yup.string().required('Country is required')
            })
        }),
        onSubmit: (values) => {
            console.log('Address Book submitted with values:', values);
        },
    });

    useEffect(() => {
        console.log("🚀 ~ AddressBook ~ formik.values:", formik.values)
    }, [formik.values]);

    const getTextFieldWidth = (label: string) => {
        switch (label) {
            case 'Street':
                return 12;
            case 'City':
            case 'Address Name':
            case 'State':
            case 'Zip Code':
            case 'Country':
            case 'Action':
                return 6;
            default:
                return 12;
        }
    };

    useEffect(() => {
        if (addressBooks.length > 0) {
            console.log("🚀 ~ useEffect ~ addressBooks:", addressBooks)
            formik.setValues(addressBooks);
        }
    }, [addressBooks]);

    return (
        <WhitePaper>
            <form onSubmit={formik.handleSubmit}>
                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <Typography variant="h6" sx={{ color: theme.palette.secondary.main, textAlign: 'left' }}>
                        Edit Your Address Book
                    </Typography>
                    <Grid container spacing='1.5rem'>
                        <>
                            {addressBooks.map((addressBook, idx) => (
                                <Box key={addressBook.id ?? idx} sx={{ mb: 4 }}>
                                    {idx > 0 && <Divider sx={{ marginY: '2rem', backgroundColor: '#000', opacity: 1 }} />}
                                    <Grid container spacing='1.5rem'>
                                        {/* Address Name */}
                                        <Grid size={getTextFieldWidth('Address Name')} sx={{ display: 'flex', flexDirection: 'column' }}>
                                            <Typography variant="subtitle1" sx={{ color: '#000', textAlign: 'left' }}>
                                                Address Name {redStar()}
                                            </Typography>
                                            <TextField
                                                variant="filled"
                                                placeholder="Home/Office/Other"
                                                name={`addressBooks[${idx}].name`}
                                                value={formik.values[idx]?.name ?? ""}
                                                InputProps={
                                                    isEditing
                                                        ? { disableUnderline: true }
                                                        : { readOnly: true, disableUnderline: true }
                                                }
                                                fullWidth
                                                sx={{
                                                    "& .MuiInputBase-input": {
                                                        color: '#000',
                                                        opacity: isEditing ? 1 : 0.5,
                                                    },
                                                    "& .MuiInputLabel-root": {
                                                        color: '#000',
                                                        opacity: isEditing ? 1 : 0.5,
                                                    },
                                                }}
                                                onChange={formik.handleChange}
                                            />
                                            <Divider sx={{ marginY: '1rem', backgroundColor: '#000', opacity: 0.2 }} />
                                        </Grid>
                                        <Grid size={getTextFieldWidth('Action')} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '1rem' }}>
                                            <IconButton sx={{ color: theme.palette.secondary.main }}>
                                                <Tooltip title="Delete">
                                                    <DeleteOutlineOutlined />
                                                </Tooltip>
                                            </IconButton>
                                            {isEditing ? (
                                                <Button type="submit" variant="contained" sx={buttonSx.default} onClick={() => {
                                                    setIsEditing(prev => {
                                                        const newEditingState = [...prev];
                                                        const index = newEditingState.findIndex(item => item.id === addressBook.id);
                                                        if (index !== -1) {
                                                            newEditingState[index].status = !newEditingState[index].status;
                                                        }
                                                        return newEditingState;
                                                    })
                                                }}>
                                                    Save
                                                </Button>
                                            ) : (
                                                <IconButton
                                                    onClick={() => setIsEditing(prev => {
                                                        const newEditingState = [...prev];
                                                        const index = newEditingState.findIndex(item => item.id === addressBook.id);
                                                        if (index !== -1) {
                                                            newEditingState[index].status = !newEditingState[index].status;
                                                        }
                                                        return newEditingState;
                                                    })}
                                                    sx={{ color: theme.palette.secondary.main }}>
                                                    <Tooltip title="Edit"><EditOutlined /></Tooltip>
                                                </IconButton>
                                            )}
                                        </Grid>
                                        {/* Address Fields */}
                                        {[
                                            { label: 'Street', field: 'street' },
                                            { label: 'City', field: 'city' },
                                            { label: 'State', field: 'state' },
                                            { label: 'Zip Code', field: 'zipCode' },
                                            { label: 'Country', field: 'country' }
                                        ].map(child => (
                                            <Grid size={getTextFieldWidth(child.label)} key={child.field} sx={{ display: 'flex', flexDirection: 'column' }}>
                                                <Typography variant="subtitle1" sx={{ color: '#000', textAlign: 'left' }}>
                                                    {child.label}
                                                </Typography>
                                                <TextField
                                                    variant="filled"
                                                    name={`addressBooks[${idx}].address.${child.field}`}
                                                    value={formik.values[idx]?.address?.[child.field]}
                                                    InputProps={
                                                        isEditing
                                                            ? { disableUnderline: true }
                                                            : { readOnly: true, disableUnderline: true }
                                                    }
                                                    fullWidth
                                                    sx={{
                                                        "& .MuiInputBase-input": {
                                                            color: '#000',
                                                            opacity: isEditing ? 1 : 0.5,
                                                        },
                                                        "& .MuiInputLabel-root": {
                                                            color: '#000',
                                                            opacity: isEditing ? 1 : 0.5,
                                                        },
                                                    }}
                                                    multiline={child.label === 'Street'}
                                                    rows={child.label === 'Street' ? 3 : 1}
                                                    onChange={formik.handleChange}
                                                />
                                            </Grid>
                                        ))}
                                        {/* Action Buttons */}
                                    </Grid>
                                </Box>
                            ))}
                        </>
                        <Box width='100%' sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Button disabled={isEditing.some(item => !item.status)} variant="outlined" sx={buttonSx.defaultOutlined}>
                                Add New Address
                            </Button>
                        </Box>
                    </Grid>
                </Box>
            </form>

        </WhitePaper>
    )
}