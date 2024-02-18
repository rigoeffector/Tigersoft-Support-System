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
import { DELETE_USER_REQUEST, GET_USERS_LIST_REQUEST } from 'reducers/users/constants';
import CreateUserForm from './form/create';
import { GET_ROLES_LIST_REQUEST } from 'reducers/roles/constants';
import { GET_PERMISSIONS_LIST_REQUEST } from 'reducers/permissions/constants';
import AlertConfirmDialog from 'ui-component/modal/confirm';
const AllUsersViews = () => {
  const dispatch = useDispatch();

  const {
    getUsers: { data: listUserData, loading: listUserLoading },
    deleteUser: { loading: deleteLoading, success: deleteSuccess, message: deleteMessage },
    updateUser: { loading: updateLoading, updateSuccess },
    createUser: { success: createSuccess },
    getRoles: { data: listRolesData, loading: listRolesLoading },
    getPermissions: { data: listPermissionsData, loading: listPermissionsLoading }
  } = useSelector((state) => state);
  useEffect(() => {
    dispatch({ type: GET_ROLES_LIST_REQUEST });
    dispatch({ type: GET_USERS_LIST_REQUEST });
  }, [dispatch]);

  const initialState = {
    showAddNewModal: false,
    showDelete: false,
    deleteId: '',
    moreInfo: {},
    isEdit: false
  };
  const [thisState, setThisState] = useState(initialState);

  const handleEdit = (data) => {
    const { row } = data;
    setThisState((prev) => ({
      ...prev,
      moreInfo: row,
      showAddNewModal: true,
      isEdit: true
    }));
  };
  const handleDelete = (data) => {
    const { row } = data;

    setThisState((prev) => ({
      ...prev,
      showAddNewModal: false,
      deleteId: row.user_id,
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
      showDelete: false,
      isEdit: false,
      moreInfo: {}
    }));
  };
  const handleConfirm = () => {
    const payload = {
      user_id: thisState.deleteId
    };
    dispatch({
      type: DELETE_USER_REQUEST,
      payload
    });
  };

  useEffect(() => {
    if (deleteSuccess || updateSuccess || createSuccess) {
      handleClose();
    }
  }, [createSuccess, deleteSuccess, updateSuccess]);
  return (
    <Box>
      <TigerSoftModal
        title={thisState.isEdit ? `Edit ${thisState.moreInfo.username} information` : 'Add New User'}
        show={thisState.showAddNewModal}
        handleClose={handleClose}
      >
        {listRolesLoading ? (
          <CircularProgress variant="soft" />
        ) : (
          <CreateUserForm roles={listRolesData} moreInfo={thisState.moreInfo} isEdit={thisState.isEdit} />
        )}
      </TigerSoftModal>
      <DashBoardLayoutForPage
        title={'All Users'}
        actionButton={<AddNewButton title={'Add New'} onClick={handleAddNew} />}
        contents={
          <Box>
            <AlertConfirmDialog
              show={thisState.showDelete}
              title={'Delete User'}
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
            {listUserLoading ? (
              <CircularProgress variant="soft" />
            ) : !isEmpty(listUserData) ? (
              <DataTable rows={listUserData || []} columns={columns(handleEdit, handleDelete)} />
            ) : (
              <Typography>No Users Found</Typography>
            )}
          </Box>
        }
      ></DashBoardLayoutForPage>
    </Box>
  );
};

export default AllUsersViews;
