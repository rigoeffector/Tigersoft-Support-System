import React from 'react';
import Button from '@mui/material/Button';
import { CircularProgress } from '@mui/material';
const SubmitButton = ({ children, isLoading, disabled }) => {
  return (
    <div>
      <Button
        disabled={disabled}
        variant="contained"
        type="submit"
        style={{
          background: '#f59424',
          marginTop: '2rem',
          width: '100%',
          display: 'flex',
          height: '45px',
          padding: '2px 0px',
          justifyContent: 'center',
          alignItems: 'center',
          flexShrink: '0',
          color: '#fff',
          borderRadius: '8px'
        }}
      >
        {isLoading ? (
          <CircularProgress
            size={25}
            style={{
              color: 'white'
            }}
          />
        ) : (
          children
        )}
      </Button>
    </div>
  );
};

export default SubmitButton;
