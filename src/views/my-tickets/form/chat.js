/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Box, CircularProgress, TextField } from '@mui/material';
import React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { loadFromLocalStorage } from 'utils';
import { CREATE_MESSAGE_REQUEST, GET_MESSAGES_LIST_REQUEST } from 'reducers/messages/constants';
import { useFormik } from 'formik';
import SubmitButton from 'ui-component/button';
import { useEffect } from 'react';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}));
const Chat = ({ moreInfo }) => {
  debugger;
  const dispatch = useDispatch();

  const {
    getMessages: { data: listMessagesData, loading: listMessagesLoading },
    createMessage: { loading: loading, success: createSuccess, message }
  } = useSelector((state) => state);
  useEffect(() => {
    dispatch({ type: GET_MESSAGES_LIST_REQUEST, payload: { ticket_id: moreInfo.ticket_id } });
  }, [dispatch, moreInfo.ticket_id]);
  const getUserData = loadFromLocalStorage('ctx');
  //   const groupedData = messages.reduce((acc, curr) => {
  //     if (!acc[curr.sent_by]) {
  //       acc[curr.sent_by] = {
  //         sent_by: curr.sent_by,
  //         all_messages: []
  //       };
  //     }
  //     acc[curr.sent_by].all_messages.push({
  //       message: curr.message,
  //       createdAt: curr.createAt
  //     });
  //     return acc;
  //   }, {});

  //   const result = {
  //     data: Object.values(groupedData)
  //   };

  const initialValues = {
    message_text: '',
    ticket_id: moreInfo?.ticket_id,
    clients_id: getUserData?.data.status == 'client' ? getUserData?.data.id : getUserData?.data.user_id,
    assigned_user_id: moreInfo?.assigned_user_id,
    sent_by: moreInfo?.clientNames
  };

  const formik = useFormik({
    initialValues: initialValues,
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      const payload = {
        message_text: values.message_text,
        ticket_id: moreInfo?.ticket_id,
        clients_id: getUserData?.data.status == 'client' ? getUserData?.data.id : getUserData?.data.user_id,
        assigned_user_id: moreInfo?.assigned_user_id,
        sent_by: moreInfo?.clientNames
      };

      dispatch({ type: CREATE_MESSAGE_REQUEST, payload: payload });
    }
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid item xs={8}>
            <Box
              sx={{
                margin: '4px 0px'
              }}
            >
              <TextField
                fullWidth
                id="message_text"
                name="message_text"
                InputLabelProps={{
                  shrink: true
                  // Add red color to the label
                }}
                label={
                  <div>
                    Message <span style={{ color: 'red', fontSize: '20px' }}>*</span>
                  </div>
                }
                value={formik.values.message_text}
                onChange={formik.handleChange}
                error={formik.touched.message_text && Boolean(formik.errors.message_text)}
                helperText={formik.touched.message_text && formik.errors.message_text}
              />
            </Box>
          </Grid>
          <Grid item xs={4}>
            <SubmitButton isLoading={loading} disabled={loading}>
              Send
            </SubmitButton>
          </Grid>
        </Box>
      </form>
      <hr />
      {listMessagesLoading ? (
        <CircularProgress />
      ) : (
        !listMessagesLoading &&
        listMessagesData.map((m, i) => (
          <Box sx={{ flexGrow: 1 }} key={i}>
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                sx={{
                  margin: '20px 0px'
                }}
              >
                {' '}
                <Box
                  sx={
                    m.sent_by === getUserData.data?.names
                      ? {
                          fontWeight: '700',
                          color: '#795548',
                          textAlign: 'left'
                        }
                      : { textAlign: 'right', fontWeight: '700', color: '#607D8B' }
                  }
                >
                  {m.sent_by === getUserData.data?.names ? 'You' : m.sent_by}{' '}
                </Box>
                <Item
                  sx={
                    m.sent_by === getUserData.data?.names
                      ? {
                          textAlign: 'left',

                          color: '#878787',
                          padding: '6px 0px'
                        }
                      : { textAlign: 'right', color: '#878787', padding: '6px 0px' }
                  }
                >
                  {m?.message}
                </Item>
                <Box
                  sx={
                    m.sent_by === getUserData.data?.names
                      ? {
                          width: '100%',
                          textAlign: 'left'
                        }
                      : {
                          width: '100%',
                          textAlign: 'right'
                        }
                  }
                >
                  <span
                    style={{
                      fontSize: '9px',
                      fontStyle: 'italic',
                      color: '#b0aeae',
                      position: 'relative',
                      bottom: '12px'
                    }}
                  >
                    {m.createAt}
                  </span>
                </Box>
              </Grid>
            </Grid>
          </Box>
        ))
      )}
    </div>
  );
};

export default Chat;
