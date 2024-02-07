/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable prettier/prettier */


import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {GridActionsCellItem} from '@mui/x-data-grid';

// import './style.css';
export const columns =( handleDelete)=>[
   
    {
        field: 'name',
        headerName: 'Names ',
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
        field: 'address',
        headerName: 'Address',
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