import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useSelect, SelectProvider } from '@mui/base/useSelect';
import { useOption } from '@mui/base/useOption';
import { styled } from '@mui/system';
import UnfoldMoreRoundedIcon from '@mui/icons-material/UnfoldMoreRounded';


const blue = {
    100: '#DAECFF',
    200: '#99CCF3',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
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

const Root = styled('div')`
  position: relative;
`;

const Toggle = styled('button')(
    ({ theme }) => `
  font-size: 1rem;
  box-sizing: border-box;
  min-width: 100%;
  height: 54px;
  padding: 8px 12px;
  border-radius: 30px;
  text-align: left;
  line-height: 1.5;
  background: #FFFDFA;
  border: 3px solid #319795;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  position: relative;
  box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;


  &:hover {
    border-color: #9AD0C2;
  }

  &:focus-visible {
    outline: 0;
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
  }

  & > svg {
    font-size: 1rem;
    position: absolute;
    height: 100%;
    top: 0;
    right: 10px;
  }
  `,
);

const Listbox = styled('ul')(
    ({ theme }) => `
  font-size: 1rem;
  box-sizing: border-box;
  min-height: calc(1.5em + 22px);
  min-width: 320px;
  padding: 12px;
  border-radius: 12px;
  text-align: left;
  line-height: 1.5;
  background: #FFFDFA;
  border: 1px solid #9AD0C2;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  padding: 5px;
  margin: 5px 0 0 0;
  position: absolute;
  height: auto;
  width: 100%;
  overflow: auto;
  z-index: 5;
  outline: 0px;
  list-style: none;
  box-shadow: 0px 2px 6px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.50)' : 'rgba(0,0,0, 0.05)'
        };

  &.hidden {
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.4s ease, visibility 0.4s step-end;
  }
  `,
);

const Option = styled('li')(
    ({ theme }) => `
  padding: 8px;
  border-radius: 0.45em;

  &[aria-selected='true'] {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &.highlighted,
  &:hover {
    background-color: #E1F9F3;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &[aria-selected='true'].highlighted {
    background-color: #9AD0C2;
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &:focus-visible {
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
  }

  &::before {
    content: '';
    width: 1ex;
    height: 1ex;
    margin-right: 1ex;
    background-color: var(--color);
    display: inline-block;
    border-radius: 50%;
    vertical-align: middle;
  }
  `,
);

function renderSelectedValue(value, options) {
    const selectedOption = options.find((option) => option.value === value);
    return selectedOption ? `${selectedOption.label}` : null;
}

function CustomOption(props) {
    const { children, value, className, disabled = false } = props;
    const { getRootProps, highlighted } = useOption({
        value,
        disabled,
        label: children,
    });

    return (
        <Option
            {...getRootProps()}
            className={clsx({ highlighted }, className)}
        >
            {children}
        </Option>
    );
}

CustomOption.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    value: PropTypes.string.isRequired,
};

export default function CustomSelect({ options, placeholder, onSelect }) {
    const listboxRef = React.useRef(null);
    const [listboxVisible, setListboxVisible] = React.useState(false);


    const { getButtonProps, getListboxProps, contextValue, value } = useSelect({
        listboxRef,
        onOpenChange: (isOpen) => {
            setListboxVisible(isOpen)
        },
        onChange: (e,v) => {
            onSelect(v)
        },
        open: listboxVisible,
    });

    return (
        <Root>
            <Toggle {...getButtonProps()} style={{ '--color': value }}>
                {renderSelectedValue(value, options) || (
                    <span className="placeholder">{placeholder ?? ' '}</span>
                )}

                <UnfoldMoreRoundedIcon />
            </Toggle>
            <Listbox
                {...getListboxProps()}
                aria-hidden={!listboxVisible}
                className={listboxVisible ? '' : 'hidden'}
            >
                <SelectProvider value={contextValue}>
                    {options.map((option) => {
                        return (
                            <CustomOption key={option.value}
                             
                                value={option.value}>

                                {option.label}
                            </CustomOption>
                        );
                    })}
                </SelectProvider>
            </Listbox>
        </Root>
    );
}

CustomSelect.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            disabled: PropTypes.bool,
            label: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
        }),
    ).isRequired,
    placeholder: PropTypes.string,
};
