/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable prettier/prettier */
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { Typography } from '@mui/material';
// import './style.css';
import ChatIcon from '@mui/icons-material/Chat';
export const columns = (handleEdit, handleDelete, handleChat) => [
  {
    field: 'title',
    headerName: 'Ticket Title ',
    width: 200,
    editable: true
  },
  {
    field: 'codes',
    headerName: 'Ticket Number',
    width: 120,
    editable: true
  },
  {
    field: 'clientNames',
    headerName: 'Ticket Created By',
    width: 150,
    editable: true
  },
  {
    field: 'clientPhone',
    headerName: 'Client Phone',
    width: 100,
    editable: true
  },
  {
    field: 'clientEmail',
    headerName: 'Client Email',
    width: 150,
    editable: true
  },
  {
    field: 'clientAddress',
    headerName: 'Client Address',
    width: 130,
    editable: true
  },
  {
    field: 'status',
    headerName: 'Ticket Status',
    width: 150,
    editable: true,
    renderCell: (params) => (
      <Typography
        sx={
          params.row.status === 'PENDING'
            ? {
                color: 'white',
                border: '1px solid white',
                padding: '6px',
                borderRadius: '10px',
                background: '#f59422'
              }
            : params.row.status === 'IN PROGRESS'
            ? {
                color: 'white',
                border: '1px solid white',
                padding: '6px',
                borderRadius: '10px',
                background: '#009688'
              }
            : params.row.status === 'APPROVED'
            ? {
                color: 'white',
                border: '1px solid white',
                padding: '6px',
                borderRadius: '10px',
                background: '#4caf50'
              }
            : {
                color: 'white',
                border: '1px solid white',
                padding: '6px',
                borderRadius: '10px',
                background: '#795548'
              }
        }
      >
        {params.row.status}
      </Typography>
    )
  },

  {
    field: 'priority',
    headerName: 'Ticket Priority ',
    width: 120,
    editable: true,
    renderCell: (params) => (
      <Typography
        sx={
          params.row.priority === 'LOW'
            ? {
                color: 'red',
                border: '1px solid #ddd',
                padding: '6px',
                borderRadius: '10px'
              }
            : params.row.priority === 'MEDIUM'
            ? {
                color: 'green',
                border: '1px solid #ddd',
                padding: '6px',
                borderRadius: '10px'
              }
            : {
                color: 'blue',
                border: '1px solid #ddd',
                padding: '6px',
                borderRadius: '10px'
              }
        }
      >
        {params.row.priority}
      </Typography>
    )
  },

  {
    field: 'assignedUser',
    headerName: 'Ticket Assigned To',
    width: 150,
    editable: true,
    renderCell: (params) => <Typography>{params.row.assignedUser ? params.row.assignedUser : '-------'}</Typography>
  },
  {
    field: 'assignedUserRole',
    headerName: 'Assigned User Role',
    width: 150,
    editable: true,
    renderCell: (params) => <Typography>{params.row.assignedUserRole ? params.row.assignedUserRole : '-------'}</Typography>
  },

  {
    field: 'createdAt',
    headerName: 'Created At',
    width: 150,
    editable: true
  },
  {
    field: 'description',
    headerName: 'Description ',
    width: 350,
    editable: true
  },

  {
    field: '',
    headerName: 'Actions',
    type: 'actions',
    width: 260,
    getActions: (params) =>
      params.row.status !== 'COMPLETED'
        ? [
            <div className="actions_button">
              <GridActionsCellItem
                style={{
                  border: params.row.assignedUser !== null ? '1px solid #ddd' : '1px solid #3b2517'
                }}
                icon={
                  <EditIcon
                    sx={{
                      color: params.row.assignedUser === null ? '#3b2517' : '#ddd'
                    }}
                  />
                }
                label="Edit"
                disabled={params.row.assignedUser !== null}
                color="success"
                onClick={() => handleEdit(params)}
              />
            </div>,
            <div className="actions_button">
              <GridActionsCellItem
                style={{
                  border: params.row.assignedUser === null ? '1px solid ' : '1px solid #ddd'
                }}
                icon={
                  <DeleteForeverIcon
                    sx={{
                      color: params.row.assignedUser !== null && '#ddd'
                    }}
                  />
                }
                label="Delete"
                color="error"
                disabled={params.row.assignedUser !== null }
                onClick={() => handleDelete(params)}
              />
            </div>,

            <div className="actions_button">
              <GridActionsCellItem
                style={{
                  border: params.row.assignedUser === null ? '1px solid ' : '1px solid #ddd'
                }}
                icon={<ChatIcon  sx={{
                      color: params.row.assignedUser == null && '#ddd'
                    }}/>}
                label="chat"
                color="info"
                disabled={params.row.assignedUser == null }
                onClick={() => handleChat(params)}
              />
            </div>
          ]
        : []
  }
];
