/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable prettier/prettier */
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {GridActionsCellItem} from '@mui/x-data-grid';
// import './style.css';
export const columns = (handleEdit, handleDelete) => [
   
    {
        field: 'name',
        headerName: 'Ticket Title ',
        width: 200,
        editable: true
    },
    {
        field: 'priority',
        headerName: 'Ticket Priority ',
        width: 200,
        editable: true
    },
    {
        field: 'status',
        headerName: 'Ticket Status ',
        width: 200,
        editable: true
    },
    {
        field: 'client_id',
        headerName: 'Ticket Created By',
        width: 150,
        editable: true
    },
    {
        field: 'description',
        headerName: 'Ticket Description',
        width: 320,
        editable: true
    },
    {
        field: 'assigned',
        headerName: 'Ticket Assigned to',
        width: 320,
        editable: true
    },
    {
        field: 'added_on',
        headerName: 'Created At',
        width: 150,
        editable: true
    },

    {
        field: '',
        headerName: 'Actions',
        type: 'actions',
        width: 260,
        getActions: (params) => [
            <div className="actions_button">
                <GridActionsCellItem
                    style={{
                        border: '1px solid #3b2517'
                    }}
                    icon={<EditIcon sx={{
                        color:'#3b2517'
                    }} />}
                    label="Edit"
                    color="success"
                    onClick={() => handleEdit(params)}
                />
         
            </div>,
            <div className="actions_button">
                <GridActionsCellItem
                    style={{
                        border: '1px solid'
                    }}
                    icon={<DeleteForeverIcon />}
                    label="Delete"
                    color="error"
                    onClick={() => handleDelete(params)}
                />
            </div>
        ]
    }
];