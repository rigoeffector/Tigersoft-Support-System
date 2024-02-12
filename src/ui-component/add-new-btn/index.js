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
        borderColor: '#3b2517',
        color: '#3b2517'
      }}
    >
      {title}
    </Button>
  );
};

export default AddNewButton;
