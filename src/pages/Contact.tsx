import { Email, Phone } from "@mui/icons-material"
import { Box, Divider, Grid, Paper, TextField, Typography, useTheme } from "@mui/material"
import { LoadingButton } from '@mui/lab';
import type { Theme } from "@mui/material"
import { CONTACT, MESSAGE_FIELDS } from "../constants/contact"
import { FW } from "../theme"
import { useFormik } from "formik"
import * as yup from "yup"
import type { AppDispatch } from "../store/store"
import { useDispatch } from "react-redux"
import { sendContactMessage } from "../store/asyncAction"
import { buttonSx } from "../styles/buttonSx"
import { useCallback } from "react";
import { SnackBar } from "../components/SnackBar";
import { useSnackBar } from "../hooks/useSnackBar";


const renderContact = (label: string, desc: string[], theme: Theme) => {
    return (
        <Box sx={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '1rem', alignItems: 'center' }}>
                <Box
                    sx={{
                        backgroundColor: theme.palette.secondary.main,
                        color: '#fff',
                        borderRadius: '50%',
                        width: '2.5rem',
                        height: '2.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {label === 'Call To Us' ? <Phone fontSize="medium" /> : <Email fontSize="medium" />}
                </Box>
                <Typography variant="subtitle1" sx={{ color: '#000', fontWeight: FW.medium }}>
                    {label}
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {desc.map((text) => (
                    <Typography key={text} variant="body2" sx={{ color: '#000', textAlign: 'left' }}>
                        {text}
                    </Typography>
                ))}
            </Box>
        </Box>
    )
}

const redStar = () => {
    return (
        <span style={{ color: 'red' }}>*</span>
    )
}

export const Contact = () => {
    const theme = useTheme();
    const dispatch = useDispatch<AppDispatch>();
    const { snackBar, showSnackBar, handleClose } = useSnackBar();

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            message: '',
        },
        validationSchema: yup.object({
            name: yup.string().required('Name is required'),
            email: yup.string().email('Invalid email format').required('Email is required'),
            phone: yup.string().required('Phone number is required'),
            message: yup.string().required('Message is required'),
        }),
        validateOnBlur: true,
        validateOnChange: true,
        onSubmit: async (values) => {
            formik.setTouched({
                name: true,
                email: true,
                phone: true,
                message: true,
            });
            if (formik.isValid) {
                try {
                    await dispatch(sendContactMessage(values));
                    formik.resetForm();
                    showSnackBar('Message sent successfully!', 'success');
                } catch (error) {
                    console.error('Failed to send message:', error);
                    showSnackBar('Failed to send message. Please try again.', 'error');
                }
            }
        },
    });

    type MessageFieldName = 'name' | 'email' | 'phone' | 'message';

    const renderInput = useCallback(() => {
        return MESSAGE_FIELDS.map((field) => (
            <TextField
                key={field.name}
                label={<>{field.label} {redStar()}</>}
                variant="filled"
                name={field.name}
                value={formik.values[field.name as MessageFieldName]}
                onChange={formik.handleChange}
                error={formik.touched[field.name as MessageFieldName] && Boolean(formik.errors[field.name as MessageFieldName])}
                helperText={formik.touched[field.name as MessageFieldName] && formik.errors[field.name as MessageFieldName]}
                fullWidth
                multiline={field.name === 'message'}
                rows={field.name === 'message' ? 5 : 1}
            />
        ));
    }, [formik.values, formik.touched, formik.errors, formik.handleChange]);

    return (
        <Grid container columns={10} spacing={2} sx={{ marginY: '5rem' }}>
            <SnackBar
                open={snackBar.open}
                message={snackBar.message}
                severity={snackBar.severity}
                onClose={handleClose}
            />
            {/* Contacts section */}
            <Grid size={3}>
                <Paper elevation={1} sx={{ padding: '2rem', borderRadius: '4px', boxShadow: '0px 10px 10px rgba(0, 0, 0, 0.1)' }}>
                    {renderContact(CONTACT[0].label, CONTACT[0].desc, theme)}
                    <Divider sx={{ marginY: '1rem', backgroundColor: '#000', opacity: 0.3, borderBottomWidth: '2px' }} />
                    {renderContact(CONTACT[1].label, CONTACT[1].desc, theme)}
                </Paper>
            </Grid>
            {/* Message section */}
            <Grid size={7}>
                <Paper elevation={1} sx={{ padding: '2rem', borderRadius: '4px', boxShadow: '0px 10px 10px rgba(0, 0, 0, 0.1)' }}>
                    <form onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
                        <Grid container spacing={2} sx={{ padding: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Grid size={4}>
                                {renderInput()[0]}
                            </Grid>
                            <Grid size={4}>
                                {renderInput()[1]}
                            </Grid>
                            <Grid size={4}>
                                {renderInput()[2]}
                            </Grid>
                            <Grid size={12}>
                                {renderInput()[3]}
                            </Grid>
                            <Grid size={12}>
                                <LoadingButton type="submit" variant="contained" sx={buttonSx.default} color="primary" fullWidth loading={formik.isSubmitting}>
                                    Send Message
                                </LoadingButton>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Grid >
        </Grid >
    )
}