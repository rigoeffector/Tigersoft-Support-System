/* eslint-disable prettier/prettier */
import React from 'react';
import DataTable from 'ui-component/table';
import { columns } from './columns';
import DashBoardLayoutForPage from 'ui-component/layout';
import AddNewButton from 'ui-component/add-new-btn';

const AllUsersViews = () => {
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
  const handleEdit =()=>{};
  const  handleDelete =()=>{};

  const handleAddNew=()=>{};
  return (
    <DashBoardLayoutForPage
        title={'All Users'}
                actionButton={<AddNewButton title={'Add New'} onClick={handleAddNew} />}
                contents={
    
     
      <DataTable rows={listUsers} columns={columns(handleEdit, handleDelete)} />
                }>
    </DashBoardLayoutForPage>
  );
};

export default AllUsersViews;
