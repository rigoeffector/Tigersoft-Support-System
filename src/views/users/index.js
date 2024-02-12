/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import DataTable from 'ui-component/table';
import { columns } from './columns';
import DashBoardLayoutForPage from 'ui-component/layout';
import AddNewButton from 'ui-component/add-new-btn';
import { Box, CircularProgress } from '@mui/material';


import TigerSoftModal from 'ui-component/modal';
// import CreateUserForm from './columns/create';
import { useDispatch, useSelector } from 'react-redux';
import { GET_USERS_LIST_REQUEST } from 'reducers/users/constants';
const AllUsersViews = () => {
  const dispatch = useDispatch();

  const {
    getUsers: { data: listUserData, loading: listUserLoading }
  } = useSelector((state) => state);
  useEffect(() => {
    dispatch({ type: GET_USERS_LIST_REQUEST });
  }, [dispatch]);
  const initialState = {
    showAddNewModal: false
  };

  const [thisState, setThisState] = useState(initialState);
  
  const handleEdit = () => {};
  const handleDelete = () => {};

  const handleAddNew = () => {
    setThisState((prv) => ({
      ...prv,
      showAddNewModal: true
    }));
  };

  const handleClose = () => {
    setThisState((prev) => ({
      ...prev,
      showAddNewModal: false
    }));
  };
  return (
    <Box>
      <TigerSoftModal title={'Add New User'} show={thisState.showAddNewModal} handleClose={handleClose}>
        {/* <CreateUserForm /> */}
      </TigerSoftModal>
      <DashBoardLayoutForPage
        title={'All Users'}
        actionButton={<AddNewButton title={'Add New'} onClick={handleAddNew} />}
        contents={
          listUserLoading ? <CircularProgress variant="soft" /> : <DataTable rows={listUserData} columns={columns(handleEdit, handleDelete)} />
        }
      ></DashBoardLayoutForPage>
    </Box>
  );
};

export default AllUsersViews;
