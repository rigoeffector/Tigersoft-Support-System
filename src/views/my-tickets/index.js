/* eslint-disable prettier/prettier */
import React from 'react';
import DataTable from 'ui-component/table';
import { columns } from './columns';
import { Box } from '@mui/material';

const MyTicketsViews = () => {
  const listTicktes = [
    {
      id: '1',
      name: 'Laptop Repair',
      priority: 'URGENT',
      description: 'Hsabati est une plateforme de gestion modulaire et adaptable à votre entreprise. A partir de 149 dhs/utilisateur/mois.',
      client_id: 'John Doe',
      assigned: 'IT Technician',
      added_on: '28, Jan 2024',
      status: 'Pending'
    },
    {
      id: '2',
      name: 'Laptop Maintenance',
      priority: 'MEDIUM',
      description: 'Hsabati est une plateforme de gestion modulaire et adaptable à votre entreprise. A partir de 149 dhs/utilisateur/mois.',
      client_id: 'John Wick',
      assigned: 'Developer',
      added_on: '28, Jan 2024',
      status: 'Pending'
    },
    {
      id: '3',
      name: 'Fun Mobile',
      priority: 'URGENT',
      description: 'Hsabati est une plateforme de gestion modulaire et adaptable à votre entreprise. A partir de 149 dhs/utilisateur/mois.',
      client_id: 'John Doe',
      assigned: 'IT Technician',
      added_on: '28, Jan 2024',
      status: 'Pending'
    },
    {
      id: '1',
      name: 'Laptop Repair',
      priority: 'URGENT',
      description: 'Hsabati est une plateforme de gestion modulaire et adaptable à votre entreprise. A partir de 149 dhs/utilisateur/mois.',
      client_id: 'John Doe',
      assigned: 'IT Technician',
      added_on: '28, Jan 2024',
      status: 'Pending'
    },
    {
      id: '2',
      name: 'Laptop Maintenance',
      priority: 'MEDIUM',
      description: 'Hsabati est une plateforme de gestion modulaire et adaptable à votre entreprise. A partir de 149 dhs/utilisateur/mois.',
      client_id: 'John Wick',
      assigned: 'Developer',
      added_on: '28, Jan 2024',
      status: 'Pending'
    },
    {
      id: '3',
      name: 'Fun Mobile',
      priority: 'URGENT',
      description: 'Hsabati est une plateforme de gestion modulaire et adaptable à votre entreprise. A partir de 149 dhs/utilisateur/mois.',
      client_id: 'John Doe',
      assigned: 'IT Technician',
      added_on: '28, Jan 2024',
      status: 'Pending'
    }
  ];
  const handleEdit =()=>{};
  const  handleDelete =()=>{};
  return (
    <Box sx={{
      margin: '0px',
      background:'white',
      padding: '20px',
      borderRadius: '10px'
    }}>
      <h2 style={{
        color: '#3b2517'
      }}>All My Tickets</h2>
      <DataTable rows={listTicktes} columns={columns(handleEdit, handleDelete)} />
    </Box>
  );
};

export default MyTicketsViews;
