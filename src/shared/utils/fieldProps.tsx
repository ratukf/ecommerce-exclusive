import { getIn } from 'formik';
import type { FormikProps } from 'formik';
import type { TextFieldProps } from '@mui/material/TextField';

interface FieldPropsArgs {
  formik: FormikProps<any>;
  name: string;
  readOnly?: boolean;
  placeholder?: string;
}

const getFieldProps = ({
  formik,
  name,
  readOnly = false,
  placeholder = '',
}: FieldPropsArgs): TextFieldProps => {
  const touched = getIn(formik.touched, name);
  const error = getIn(formik.errors, name);

  return {
    name,
    value: getIn(formik.values, name) ?? '',
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    placeholder,
    variant: 'filled',
    fullWidth: true,
    error: Boolean(touched && error),
    helperText: touched && error,
    InputProps: {
      readOnly,
      disableUnderline: readOnly,
    },
    sx: {
      '& .MuiInputBase-input': {
        color: '#000',
        opacity: readOnly ? 0.5 : 1,
      },
      '& .MuiInputLabel-root': {
        color: '#000',
        opacity: readOnly ? 0.5 : 1,
      },
    },
  };
};

export { getFieldProps };
