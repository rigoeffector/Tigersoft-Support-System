/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import DataTable from 'ui-component/table';
import { columns } from './columns';
import DashBoardLayoutForPage from 'ui-component/layout';
import AddNewButton from 'ui-component/add-new-btn';
import { Box } from '@mui/material';
import TigerSoftModal from 'ui-component/modal';
// import CreateUserForm from './columns/create';

const AllUsersViews = () => {
  const initialState = {
    showAddNewModal: false
  };

  const [thisState, setThisState] = useState(initialState);
  const listUsers = [
    {
      id: '1',
      name: 'MUNYANEZA Emmae',
      email: 'munayahe23@gmail.com',
      address: 'Kigali, Rwanda 108 ST',
      role: 'IT Technician'
    },
    {
      id: '2',
      name: 'UWASE Carine',
      email: 'uwase45@gmail.com',
      address: 'Kigali, Rwanda 108 ST',
      role: 'IT Technician'
    },
    {
      id: '3',
      name: 'CYUSA Jean  Hule',
      email: 'cyusa34@gmail.com',
      address: 'Kigali, Rwanda 108 ST',
      role: 'IT Technician'
    },
    {
      id: '3',
      name: 'CYUSA Jean  Hule',
      email: 'cyusa34@gmail.com',
      address: 'Kigali, Rwanda 108 ST',
      role: 'IT Technician'
    },
    {
      id: '3',
      name: 'CYUSA Jean  Hule',
      email: 'cyusa34@gmail.com',
      address: 'Kigali, Rwanda 108 ST',
      role: 'IT Technician'
    },
    {
      id: '3',
      name: 'CYUSA Jean  Hule',
      email: 'cyusa34@gmail.com',
      address: 'Kigali, Rwanda 108 ST',
      role: 'IT Technician'
    },
    {
      id: '3',
      name: 'CYUSA Jean  Hule',
      email: 'cyusa34@gmail.com',
      address: 'Kigali, Rwanda 108 ST',
      role: 'IT Technician'
    },
    {
      id: '3',
      name: 'CYUSA Jean  Hule',
      email: 'cyusa34@gmail.com',
      address: 'Kigali, Rwanda 108 ST',
      role: 'IT Technician'
    }
  ];
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
      <TigerSoftModal title={'Add New User'} show={thisState.showAddNewModal} handleClose={handleClose} >
      {/* <CreateUserForm /> */}
      </TigerSoftModal>
      <DashBoardLayoutForPage
        title={'All Users'}
        actionButton={<AddNewButton title={'Add New'} onClick={handleAddNew} />}
        contents={<DataTable rows={listUsers} columns={columns(handleEdit, handleDelete)} />}
      ></DashBoardLayoutForPage>
    </Box>
  );
};

export default AllUsersViews;
