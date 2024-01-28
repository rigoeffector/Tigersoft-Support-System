/* eslint-disable react/prop-types */
import React from 'react';
import Button from '@mui/material/Button';
const AddNewButton = ({ title, onClick, disabled }) => {
  return (
    <Button
      variant="outlined"
      onClick={onClick}
      disabled={disabled}
      style={{
        borderColor: '#058441',
        color: '#058441'
      }}
    >
      {title}
    </Button>
  );
};

export default AddNewButton;
