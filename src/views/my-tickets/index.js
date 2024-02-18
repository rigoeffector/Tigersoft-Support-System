/* eslint-disable prettier/prettier */
import React from 'react';
import DataTable from 'ui-component/table';
import { columns } from './columns';
import { Alert, Box, Button, CircularProgress, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import DashBoardLayoutForPage from 'ui-component/layout';
import { isEmpty } from 'lodash';
import { useEffect } from 'react';
import { DELETE_TICKET_REQUEST, GET_TICKETS_LIST_REQUEST } from 'reducers/tickets/constants';
import AlertConfirmDialog from 'ui-component/modal/confirm';
import { useState } from 'react';
import TigerSoftModal from 'ui-component/modal';
import { GET_USERS_LIST_REQUEST } from 'reducers/users/constants';
import { loadFromLocalStorage } from 'utils';
import AddNewButton from 'ui-component/add-new-btn';
import CreateTicketForm from './form/create';
import Chat from './form/chat';
import './style.css';
const MyTicketsViews = () => {
  const dispatch = useDispatch();

  const {
    deleteTicket: { loading: deleteLoading, success: deleteSuccess, message: deleteMessage },
    getTickets: { data: listTicketsData, loading: listTicketLoading },
    updateTicket: { success: updateSuccess },
    createTicket: { success: createSuccess },
    createMessage: { createMessageSuccess }
  } = useSelector((state) => state);
  const initialState = {
    showEditModal: false,
    showDelete: false,
    deleteId: '',
    isEdit: false,
    moreInfo: {},
    tableData: [],
    showAddNewModal: false,
    showChat: false
  };
  const [thisState, setThisState] = useState(initialState);
  useEffect(() => {
    dispatch({ type: GET_TICKETS_LIST_REQUEST });
    dispatch({ type: GET_USERS_LIST_REQUEST });
  }, [dispatch]);
  const handleEdit = (data) => {
    const { row } = data;
    setThisState((prev) => ({
      ...prev,
      showEditModal: true,
      moreInfo: row,
      isEdit: true,
      showAddNewModal: true
    }));
  };
  const handleDelete = (data) => {
    const { row } = data;
    setThisState((prev) => ({
      ...prev,
      showEditModal: false,
      deleteId: row.ticket_id,
      showDelete: true,
      moreInfo: {}
    }));
  };
  const handleClose = () => {
    setThisState((prev) => ({
      ...prev,
      showEditModal: false,
      showAddNewModal: false,
      showDelete: false,
      deleteId: '',
      moreInfo: {},
      isEdit: false,
      showChat: false
    }));
  };

  const handleConfirm = () => {
    const payload = {
      ticket_id: thisState.deleteId
    };

    dispatch({ type: DELETE_TICKET_REQUEST, payload });
  };
  useEffect(() => {
    if (deleteSuccess || updateSuccess || createSuccess || createMessageSuccess) {
      handleClose();
    }
  }, [deleteSuccess, updateSuccess, createSuccess, createMessageSuccess]);
  const getLoginUserData = loadFromLocalStorage('ctx');
  useEffect(() => {
    if (!isEmpty(listTicketsData)) {
      const tableData = listTicketsData.filter((el) => el.client_id === getLoginUserData.data.id);
      setThisState((prev) => ({
        ...prev,
        tableData: tableData
      }));
    }
  }, [getLoginUserData.data.id, getLoginUserData.data.role_name, getLoginUserData.data.user_id, listTicketsData]);

  const handleAddNew = () => {
    setThisState((prv) => ({
      ...prv,
      showAddNewModal: true
    }));
  };

  const handleChat = (data) => {
    const { row } = data;

    setThisState((prv) => ({
      ...prv,
      showChat: true,
      moreInfo: row
    }));
  };
  return (
    <Box>
      <AlertConfirmDialog
        show={thisState.showDelete}
        title={'Delete Ticket'}
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
        title={`All Chats (${thisState.moreInfo?.codes})`}
        id={'all_chat'}
        show={thisState.showChat}
        handleClose={handleClose}
      >
        {<Chat moreInfo={thisState.moreInfo} fromSupport={'OYA'} />}
      </TigerSoftModal>

      <TigerSoftModal
        title={thisState.isEdit ? `Edit ${thisState.moreInfo.title} Ticket` : 'Create New Ticket'}
        show={thisState.showAddNewModal}
        handleClose={handleClose}
      >
        <CreateTicketForm moreInfo={thisState.moreInfo} isEdit={thisState.isEdit} />
      </TigerSoftModal>
      <DashBoardLayoutForPage
        title={'All My Tickets' + '(' + thisState.tableData.length + ')'}
        actionButton={<AddNewButton title={'Create New Ticket'} onClick={handleAddNew} />}
        contents={
          <Box>
            {listTicketLoading ? (
              <CircularProgress />
            ) : !isEmpty(listTicketsData) ? (
              <DataTable
                reportName="Tigersoft Tickets"
                subTitle={'My Tickets Report'}
                enableReport={true}
                rows={thisState.tableData || []}
                columns={columns(handleEdit, handleDelete, handleChat)}
              />
            ) : (
              <Typography>No Tickets Found Yet</Typography>
            )}
          </Box>
        }
      />
    </Box>
  );
};

export default MyTicketsViews;
