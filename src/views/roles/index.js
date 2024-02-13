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
import CreateRoleForm from './form/create';
import { GET_PERMISSIONS_LIST_REQUEST } from 'reducers/permissions/constants';
import AlertConfirmDialog from 'ui-component/modal/confirm';
import { DELETE_ROLE_REQUEST, GET_ROLES_LIST_REQUEST } from 'reducers/roles/constants';
const RolesViews = () => {
  const dispatch = useDispatch();

  const {
    createRole: { success: createSuccess },
    updateRole: { success: updateSuccess },
    deleteRole: { success: deleteSuccess, error: deleteError, message: deleteMessage, loading: deleteLoading },
    getRoles: { data: listRolesData, loading: listRolesLoading },
    getPermissions: { data: listPermissionsData, loading: listPermissionsLoading }
  } = useSelector((state) => state);
  useEffect(() => {
    dispatch({ type: GET_ROLES_LIST_REQUEST });
    dispatch({ type: GET_PERMISSIONS_LIST_REQUEST });
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
      showDelete: false,
      isEdit: false,
      moreInfo: {}
    }));
  };

  useEffect(() => {
    if (createSuccess || deleteSuccess || updateSuccess) {
      setTimeout(() => {
        handleClose();
      }, 2000);
    }
  }, [createSuccess, deleteSuccess, updateSuccess]);
  const handleConfirm = () => {
    const payload = {
      role_id: thisState.deleteId
    };
    dispatch({
      type: DELETE_ROLE_REQUEST,
      payload
    });
  };
  return (
    <Box>
      <AlertConfirmDialog
        show={thisState.showDelete}
        title={'Delete Role'}
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
      <TigerSoftModal
        title={thisState.isEdit ? `Edit  ${thisState.moreInfo.permission_name} Role` : 'Add New Role'}
        show={thisState.showAddNewModal}
        handleClose={handleClose}
      >
        {listRolesLoading || listPermissionsLoading ? (
          <CircularProgress variant="soft" />
        ) : (
          <CreateRoleForm isEdit={thisState.isEdit} moreInfo={thisState.moreInfo} permissions={listPermissionsData} />
        )}
      </TigerSoftModal>
      <DashBoardLayoutForPage
        title={'All Roles'}
        actionButton={<AddNewButton title={'Add New'} onClick={handleAddNew} />}
        contents={
          <Box sx={{ marginTop: '20px', width: '100%' }}>
            {!deleteSuccess && deleteMessage && (
              <Alert variant="filled" severity="error">
                {deleteMessage}
              </Alert>
            )}
            {listRolesLoading ? (
              <CircularProgress variant="soft" />
            ) : (
              !isEmpty(listRolesData) ? <DataTable rows={listRolesData || []} columns={columns(handleEdit, handleDelete)} />: <Typography>No Roles Found</Typography>
            )}
          </Box>
        }
      ></DashBoardLayoutForPage>
    </Box>
  );
};

export default RolesViews;
