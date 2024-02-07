/* eslint-disable prettier/prettier */
import React from 'react';
import DataTable from 'ui-component/table';
import { columns } from './columns';
import DashBoardLayoutForPage from 'ui-component/layout';
import { Box } from '@mui/material';

// import CreateUserForm from './columns/create';

const AllClientsViews = () => {
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

  const handleDelete = () => {};

  return (
    <Box>
      <DashBoardLayoutForPage
        title={'All Clients'}
        actionButton={''}
        contents={<DataTable rows={listUsers} columns={columns(handleDelete)} />}
      ></DashBoardLayoutForPage>
    </Box>
  );
};

export default AllClientsViews;
