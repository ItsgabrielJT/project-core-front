import { styled, css } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { forwardRef } from 'react';
import { Button } from '@mui/base';
import { Fade, Popover } from '@mui/material';

export const CssButtonContained = {
  boxShadow: 'none',
  borderRadius: '50px',
  textTransform: 'none',
  fontSize: 16,
  padding: '6px 12px',
  border: '1px solid',
  lineHeight: 1.5,
  backgroundColor: '#319795',
  '&:hover': {
    backgroundColor: '#5CDDDB',
    borderColor: '#5CDDDB',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#5CDDDB',
    borderColor: '#5CDDDB',
  },
}

export const CssButtonOutline = {
  boxShadow: 'none',
  borderRadius: '50px',
  color: '#319795',
  textTransform: 'none',
  fontSize: 16,
  padding: '6px 12px',
  border: '2px solid',
  lineHeight: 1.5,
  borderColor: '#319795',
  '&:hover': {
    backgroundColor: 'rgba(92, 221, 219, 0.3)',
    borderColor: '#5CDDDB',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: 'rgba(92, 221, 219, 0.3)',
    borderColor: '#5CDDDB',
  },
}

export const CssNavOutline = {
  marginTop: '10px',
  boxShadow: 'none',
  borderRadius: '50px',
  color: '#319795',
  textTransform: 'none',
  borderColor: "#fff",
  display: 'flex',
  justifyContent: 'start ',
  fontSize: 16,
  padding: '6px 12px',
  '&:hover': {
    backgroundColor: 'rgba(92, 221, 219, 0.3)',
    borderColor: '#5CDDDB',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: 'rgba(92, 221, 219, 0.3)',
    borderColor: '#5CDDDB',
  },
}


export const CssTexField = {

  '& .MuiInput-underline:after': {
    borderBottomColor: '#319795',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderRadius: '50px',
      border: '3px solid #319795'
    },
    '&:hover fieldset': {
      border: '3px solid #5CDDDB',
      borderRadius: '50px'
    },
    '&.Mui-focused fieldset': {
      border: '3px solid #5CDDDB',
      borderRadius: '50px'
    },
  },
}

export const CustomizedPopover = styled(Popover)`
  color: #20b2aa;
  .MuiPopover-paper {
    margin-top: 20px;
    background-color: #F2F1EE;
    width: 244px;
    border-radius: 20px;
    text-align: left;
  }
  
`;

const blue = {
  200: '#99CCFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0066CC',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

export const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContent = styled('div')(
  ({ theme }) => css`
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: #FFFDFA;
    border-radius: 20px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0 4px 12px
      ${theme.palette.mode === 'dark' ? 'rgb(0 0 0 / 0.5)' : 'rgb(0 0 0 / 0.2)'};
    padding: 24px;
    color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};

    & .modal-title {
      margin: 0;
      line-height: 1.5rem;z
      margin-bottom: 8px;
    }

    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
      margin-bottom: 4px;
    }
  `,
);

export const ModalContentConfirm = styled('div')(
  ({ theme }) => css`
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: #F2F1EE;
    border-radius: 30px;
    border: 1px solid #F3F6F9;
    box-shadow: 0 4px 12px
      ${theme.palette.mode === 'dark' ? 'rgb(0 0 0 / 0.5)' : 'rgb(0 0 0 / 0.2)'};
    padding: 24px;
    color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};

    & .modal-title {
      margin: 0;
      line-height: 1.5rem;z
      margin-bottom: 8px;
    }

    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
      margin-bottom: 4px;
    }
  `,
);

const Backdrop = forwardRef((props, ref) => {
  const { open, ...other } = props;
  return (
    <Fade in={open}>
      <div ref={ref} {...other} />
    </Fade>
  );
});

export const StyledBackdrop = styled(Backdrop)(
  `
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgba(155, 190, 200, 0.3);
  -webkit-tap-highlight-color: transparent;
`,
);

export const ModalButton = styled(Button)(
  ({ theme }) => `
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  background-color: #319795;
  padding: 8px 16px;
  border-radius: 50px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: 1px solid #319795;
  &:hover {
    background-color: #5CDDDB;
  border: 1px solid #319795;
  }

  &:active {
    background-color: #5CDDDB;
    box-shadow: none;
  }

  &:focus-visible {
    outline: none;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    box-shadow: none;
    &:hover {
      background-color: ${blue[500]};
    }
  }
`,
);

export const CssContentInfo = {
  display: 'block',
  backgroundColor: "#F2F1EE",
  margin: '30px 0px 0px 0px',
  borderRadius: "20px",
  padding: "20px 30px 30px 30px",
}