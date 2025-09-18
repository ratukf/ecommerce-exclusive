export const buttonSx = {
  default: {
    color: '#fafafa',
    padding: '1rem 3rem',
    backgroundColor: '#DB4444',
    fontSize: '1rem',
  },
  defaultOutlined: {
    color: '#DB4444',
    borderColor: '#DB4444',
    borderWidth: '1.5px',
    padding: '1rem 3rem',
    backgroundColor: 'transparent',
    fontSize: '1rem',
    '&:hover': {
      backgroundColor: '#DB4444',
      color: '#fafafa',
    },
  },
  defaultSmall: {
    color: '#fafafa',
    padding: '0.5rem 1rem',
    backgroundColor: '#DB4444',
    fontSize: '1rem',
  },
  greyOutlinedSmall: {
    color: '#000',
    borderColor: 'rgba(0, 0, 0, 0.5)',
    borderWidth: '1.5px',
    padding: '0.5rem 1rem',
    backgroundColor: 'transparent',
    fontSize: '1rem',
    '&:hover': {
      backgroundColor: '#DB4444',
      color: '#fafafa',
    },
  },
  transparent: {
    color: '#000',
    padding: '0.5rem 1rem',
    backgroundColor: 'transparent',
    fontSize: '1rem',
  },
};

export const linkSx = {
  default: {
    fontFamily: 'Poppins, sans-serif',
    textDecoration: 'none',
    color: '#DB4444',
    fontSize: '1rem',
    '&:hover': {
      textDecoration: 'underline',
      color: '#DB4444',
    },
  },
};
