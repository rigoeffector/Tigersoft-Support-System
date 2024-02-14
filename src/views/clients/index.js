/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React from 'react';
import DataTable from 'ui-component/table';
import { columns } from './columns';
import DashBoardLayoutForPage from 'ui-component/layout';
import { Alert, Box, Button, CircularProgress, Typography } from '@mui/material';
import AlertConfirmDialog from 'ui-component/modal/confirm';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { DELETE_CLIENT_REQUEST, GET_CLIENTS_LIST_REQUEST } from 'reducers/clients/constants';
import { isEmpty } from 'lodash';

const AllClientsViews = () => {
  const {
    listClients: { data: listClientData, loading: listClientDataLoading },
    updateClient: { success: updateClientSuccess, loading: updateClientLoading, error: updateClientError, message: updateClientMessage },
    deleteClient: { success: deleteSuccess, error: deleteError, message: deleteMessage, loading: deleteLoading }
  } = useSelector((state) => state);
  const initialState = {
    showAddNewModal: false,
    showDelete: false,
    deleteId: '',
    moreInfo: {},
    isEdit: false
  };

  const [thisState, setThisState] = useState(initialState);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: GET_CLIENTS_LIST_REQUEST });
  }, [dispatch]);

  const handleDelete = (data) => {
    const { row } = data;
    setThisState((prev) => ({
      ...prev,
      showAddNewModal: false,
      deleteId: row.id,
      showDelete: true
    }));
  };
  const handleClose = () => {
    setThisState((prev) => ({
      ...prev,
      showAddNewModal: false,
      deleteId: '',
      showDelete: false,
      isEdit: false,
      moreInfo: {}
    }));
  };
  const handleConfirm = () => {
    const payload = {
      id: thisState.deleteId
    };
    dispatch({ type: DELETE_CLIENT_REQUEST, payload });
  };
  useEffect(() => {
    if (updateClientSuccess || deleteSuccess) {
      setTimeout(() => {
        handleClose();
      }, 2000);
    }
  }, [updateClientSuccess, deleteSuccess]);
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
        contents={
          listClientDataLoading ? (
            <CircularProgress />
          ) : !isEmpty(listClientData) ? (
            <DataTable rows={listClientData || []} columns={columns(handleDelete)} />
          ) : (
            <Typography>No Clients Found</Typography>
          )
        }
      ></DashBoardLayoutForPage>
    </Box>
  );
};

export default AllClientsViews;
