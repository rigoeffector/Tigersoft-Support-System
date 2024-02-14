/* eslint-disable no-debugger */
/* eslint-disable react/prop-types */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import TigerSoftsAlerts from 'ui-component/alerts';
import SubmitButton from 'ui-component/button';
import { Box, FormControl, Grid, MenuItem, TextField } from '@mui/material';
import { validationSchema } from './validation';
import { CREATE_TICKET_REQUEST, UPDATE_TICKET_REQUEST } from 'reducers/tickets/constants';
import { loadFromLocalStorage } from 'utils';
const CreateTicketForm = ({ moreInfo, isEdit }) => {
  const dispatch = useDispatch();

  const {
    createTicket: { loading, error, message },
    updateTicket: { loading: updateLoading, error: updateError, message: updateMessage }
  } = useSelector((state) => state);

  const initialValues = {
    title: isEdit ? moreInfo?.title : '',
    description: isEdit ? moreInfo?.description : '',
    priority: isEdit ? moreInfo?.priority : '',
    client_id: isEdit ? moreInfo?.client_id : ''
  };
  const getUserData = loadFromLocalStorage('ctx');
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const payload = {
        title: values.title,
        priority: values.priority,
        client_id: getUserData.data.id,
        description: values.description
      };

      const payloadWithId = {
        ...payload,
        ticket_id: moreInfo.ticket_id,
        status: moreInfo.status,
        assigned_user_id: moreInfo.assigned_user_id
      };
      dispatch(isEdit ? { type: UPDATE_TICKET_REQUEST, payload: payloadWithId } : { type: CREATE_TICKET_REQUEST, payload: payload });
    }
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box
              sx={{
                margin: '4px 0px'
              }}
            >
              <TextField
                fullWidth
                id="title"
                name="title"
                InputLabelProps={{
                  shrink: true
                  // Add red color to the label
                }}
                label={
                  <div>
                    Title <span style={{ color: 'red', fontSize: '20px' }}>*</span>
                  </div>
                }
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                margin: '4px 0px'
              }}
            >
              <TextField
                fullWidth
                id="description"
                name="description"
                minRows={4}
                InputLabelProps={{
                  shrink: true
                  // Add red color to the label
                }}
                label={
                  <div>
                    Description <span style={{ color: 'red', fontSize: '20px' }}>*</span>
                  </div>
                }
                value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Ticket Priority"
                name="priority"
                select
                value={formik.values.priority}
                onChange={formik.handleChange}
                error={formik.touched.priority && Boolean(formik.errors.priority)}
                helperText={formik.touched.priority && formik.errors.priority}
              >
                <MenuItem value={'LOW'}>LOW</MenuItem>
                <MenuItem value={'MEDIUM'}>MEDIUM</MenuItem>
                <MenuItem value={'HIGH'}>HIGH</MenuItem>
              </TextField>
            </FormControl>
          </Grid>
        </Grid>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          <SubmitButton isLoading={loading || updateLoading} disabled={loading || updateLoading}>
            Save
          </SubmitButton>
        </Box>

        {error && <TigerSoftsAlerts show={error} message={message} variant={'error'} />}
        {updateError && <TigerSoftsAlerts show={updateError} message={updateMessage} variant={'error'} />}
        {/* {success && <TigerSoftsAlerts show={success} message={message} variant={'success'} />} */}
      </form>
    </div>
  );
};

export default CreateTicketForm;
