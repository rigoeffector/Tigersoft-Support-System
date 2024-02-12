/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import DataTable from 'ui-component/table';
import { columns } from './columns';
import DashBoardLayoutForPage from 'ui-component/layout';
import AddNewButton from 'ui-component/add-new-btn';
import { Alert, Box, Button, CircularProgress, Typography } from '@mui/material';
import { isEmpty } from 'lodash';
import TigerSoftModal from 'ui-component/modal';
// import CreateUserForm from './columns/create';
import { useDispatch, useSelector } from 'react-redux';
import { GET_USERS_LIST_REQUEST } from 'reducers/users/constants';
import CreatePermissionForm from './form/create';
import { GET_ROLES_LIST_REQUEST } from 'reducers/roles/constants';
import { DELETE_PERMISSION_REQUEST, GET_PERMISSIONS_LIST_REQUEST } from 'reducers/permissions/constants';
import AlertConfirmDialog from 'ui-component/modal/confirm';
const PermissionsViews = () => {
  const dispatch = useDispatch();

  const {
    createPermission: { success: createSuccess },
    deletePermission: { success: deleteSuccess, error: deleteError, message: deleteMessage, loading: deleteLoading },
    getPermissions: { data: listPermissionsData, loading: listPermissionsLoading }
  } = useSelector((state) => state);
  useEffect(() => {
    dispatch({ type: GET_PERMISSIONS_LIST_REQUEST });
  }, [dispatch]);
  const initialState = {
    showAddNewModal: false,
    showDelete: false,
    deleteId: ''
  };

  const [thisState, setThisState] = useState(initialState);

  const handleEdit = () => {};
  const handleDelete = (data) => {
    const { row } = data;

    setThisState((prev) => ({
      ...prev,
      showAddNewModal: false,
      deleteId: row.permission_id,
      showDelete: true
    }));
  };

  const handleAddNew = () => {
    setThisState((prv) => ({
      ...prv,
      showAddNewModal: true
    }));
  };

  const handleClose = () => {
    setThisState((prev) => ({
      ...prev,
      showAddNewModal: false,
      deleteId: '',
      showDelete: false
    }));
  };

  useEffect(() => {
    if (createSuccess || deleteSuccess) {
      setTimeout(() => {
        handleClose();
      }, 2000);
    }
  }, [createSuccess, deleteSuccess]);
  const handleConfirm = () => {
    const payload = {
      permission_id: thisState.deleteId
    };
    dispatch({
      type: DELETE_PERMISSION_REQUEST,
      payload
    });
  };
  return (
    <Box>
      <AlertConfirmDialog
        show={thisState.showDelete}
        title={'Delete Permission'}
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
      <TigerSoftModal title={'Add New User'} show={thisState.showAddNewModal} handleClose={handleClose}>
        {listPermissionsLoading ? <CircularProgress variant="soft" /> : <CreatePermissionForm />}
      </TigerSoftModal>
      <DashBoardLayoutForPage
        title={'All Permissions'}
        actionButton={<AddNewButton title={'Add New'} onClick={handleAddNew} />}
        contents={
          <Box sx={{ marginTop: '20px', width: '100%' }}>
            {!deleteSuccess && deleteMessage && (
              <Alert variant="filled" severity="error">
                {deleteMessage}
              </Alert>
            )}
            {listPermissionsLoading ? (
              <CircularProgress variant="soft" />
            ) : (
              !isEmpty(listPermissionsData) && <DataTable rows={listPermissionsData || []} columns={columns(handleEdit, handleDelete)} />
            )}
          </Box>
        }
      ></DashBoardLayoutForPage>
    </Box>
  );
};

export default PermissionsViews;
