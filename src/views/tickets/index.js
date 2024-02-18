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
import UpdateStatus from './form/update.status';
import { GET_USERS_LIST_REQUEST } from 'reducers/users/constants';
import { loadFromLocalStorage } from 'utils';
import Chat from 'views/my-tickets/form/chat';
import './style.css';
const AllTicketsViews = () => {
  const dispatch = useDispatch();

  const {
    deleteTicket: { loading: deleteLoading, success: deleteSuccess, message: deleteMessage },
    getUsers: { data: listUsersData, loading: listUsersLoading },
    getTickets: { data: listTicketsData, loading: listTicketLoading },
    updateTicket: { success: updateSuccess },
    createMessage: { createMessageSuccess }
  } = useSelector((state) => state);
  const initialState = {
    showEditModal: false,
    showDelete: false,
    deleteId: '',
    moreInfo: {},
    tableData: [],
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
      moreInfo: row
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
      showDelete: false,
      deleteId: '',
      moreInfo: {},
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
    if (deleteSuccess || updateSuccess || createMessageSuccess) {
      handleClose();
    }
  }, [deleteSuccess, updateSuccess, createMessageSuccess]);
  const getLoginUserData = loadFromLocalStorage('ctx');
  useEffect(() => {
    if (getLoginUserData.data.role_name !== 'Admin' && !isEmpty(listTicketsData)) {
      const tableData = listTicketsData.filter((el) => el.assigned_user_id === getLoginUserData.data.user_id);
      setThisState((prev) => ({
        ...prev,
        tableData: tableData
      }));
    } else {
      setThisState((prev) => ({
        ...prev,
        tableData: listTicketsData
      }));
    }
  }, [getLoginUserData.data.role_name, getLoginUserData.data.user_id, listTicketsData]);
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
      <TigerSoftModal
        title={`All Chats (${thisState.moreInfo?.codes})`}
        id={'all_chat'}
        show={thisState.showChat}
        handleClose={handleClose}
      >
        {<Chat moreInfo={thisState.moreInfo} fromSupport={'YEGO'} />}
      </TigerSoftModal>
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

      <TigerSoftModal title={`Edit ${thisState.moreInfo.clientNames} Ticket`} show={thisState.showEditModal} handleClose={handleClose}>
        <UpdateStatus moreInfo={thisState.moreInfo} users={listUsersData} />
      </TigerSoftModal>
      <DashBoardLayoutForPage
        title={'All Requested Tickets'}
        actionButton={''}
        contents={
          <Box>
            {listTicketLoading || listUsersLoading ? (
              <CircularProgress />
            ) : !isEmpty(listTicketsData) ? (
              <DataTable
                reportName="Tigersoft Tickets"
                subTitle={'All Clients Tickets Report'}
                enableReport={true}
                rows={thisState.tableData || []}
                columns={columns(handleEdit, handleDelete, getLoginUserData, handleChat)}
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

export default AllTicketsViews;
