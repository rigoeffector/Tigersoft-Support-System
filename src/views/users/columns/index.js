/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable prettier/prettier */

import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {GridActionsCellItem} from '@mui/x-data-grid';

// import './style.css';
export const columns =(handleEdit, handleDelete)=>[
   
    {
        field: 'username',
        headerName: 'User name ',
        width: 200,
        editable: true
    },
    {
        field: 'email',
        headerName: 'Email ',
        width: 200,
        editable: true
    },
    
    {
        field: 'role_name',
        headerName: 'Role Name',
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
                        border: '1px solid #058441'
                    }}
                    icon={<EditIcon sx={{
                        color:'#058441'
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