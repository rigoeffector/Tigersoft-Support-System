/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React from 'react';
import DataTable from 'ui-component/table';
import { columns } from './columns';
import DashBoardLayoutForPage from 'ui-component/layout';
import { Alert, Box, Button, CircularProgress, Typography } from '@mui/material';
import AlertConfirmDialog from 'ui-component/modal/confirm';
import { useState } from 'react';
import { useSelector } from 'react-redux';

// import CreateUserForm from './columns/create';

const AllClientsViews = () => {
  const {
   
    deleteUser: { success: deleteSuccess, error: deleteError, message: deleteMessage, loading: deleteLoading },

  } = useSelector((state) => state);
  const initialState = {
    showAddNewModal: false,
    showDelete: false,
    deleteId: '',
    moreInfo: {},
    isEdit: false
  };

  const [thisState, setThisState] = useState(initialState);
  const listUsers = [
    {
      id: '1',
      name: 'MUNYANEZA Emmae',
      email: 'munayahe23@gmail.com',
      address: 'Kigali, Rwanda 108 ST'
    },
    {
      id: '2',
      name: 'UWASE Carine',
      email: 'uwase45@gmail.com',
      address: 'Kigali, Rwanda 108 ST'
    },
    {
      id: '3',
      name: 'CYUSA Jean  Hule',
      email: 'cyusa34@gmail.com',
      address: 'Kigali, Rwanda 108 ST'
    },
    {
      id: '3',
      name: 'CYUSA Jean  Hule',
      email: 'cyusa34@gmail.com',
      address: 'Kigali, Rwanda 108 ST'
    },
    {
      id: '3',
      name: 'CYUSA Jean  Hule',
      email: 'cyusa34@gmail.com',
      address: 'Kigali, Rwanda 108 ST'
    },
    {
      id: '3',
      name: 'CYUSA Jean  Hule',
      email: 'cyusa34@gmail.com',
      address: 'Kigali, Rwanda 108 ST'
    },
    {
      id: '3',
      name: 'CYUSA Jean  Hule',
      email: 'cyusa34@gmail.com',
      address: 'Kigali, Rwanda 108 ST'
    },
    {
      id: '3',
      name: 'CYUSA Jean  Hule',
      email: 'cyusa34@gmail.com',
      address: 'Kigali, Rwanda 108 ST'
    }
  ];
 
  const handleDelete = (data) => {
    const { row } = data;

    setThisState((prev) => ({
      ...prev,
      showAddNewModal: false,
      // deleteId: row.client,
      showDelete: true
    }));
  };
  const handleClose=()=>{
    setThisState((prev) => ({
      ...prev,
      showAddNewModal: false,
      deleteId: '',
      showDelete: false,
      isEdit: false,
      moreInfo: {}
    }));
  };
  const handleConfirm =()=>{}
  return (
    <Box>
    <AlertConfirmDialog
        show={thisState.showDelete}
        title={'Delete Client'}
        handleClose={handleClose}
        action={
          <Box>
            <Button
              onClick={handleClose}
              sx={{
                border: '1px solid #795548',
                margin: '0px 10px',
                color: '#795548'
              }}
            >
              No
            </Button>
            <Button
              onClick={handleConfirm}
              autoFocus
              variant="contained"
              sx={{
                background: '#f59424',
                '&:hover': {
                  background: '#e88e0c' // Change to the desired hover color
                }
              }}
            >
              {deleteLoading ? <CircularProgress /> : '  Yes, Delete'}
            </Button>
          </Box>
        }
      >
        <Typography>Are you sure you want to delete this info</Typography>
        <Box sx={{ marginTop: '20px', width: '100%' }}>
          {!deleteSuccess && deleteMessage && (
            <Alert variant="filled" severity="error">
              {deleteMessage}
            </Alert>
          )}
        </Box>
      </AlertConfirmDialog>
      <DashBoardLayoutForPage
        title={'All Clients'}
        actionButton={''}
        contents={<DataTable rows={listUsers} columns={columns(handleDelete)} />}
      ></DashBoardLayoutForPage>
    </Box>
  );
};

export default AllClientsViews;
