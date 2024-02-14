/* eslint-disable react/prop-types */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import TigerSoftsAlerts from 'ui-component/alerts';
import SubmitButton from 'ui-component/button';
import { Box, FormControl, Grid, MenuItem, TextField } from '@mui/material';
import { UPDATE_TICKET_REQUEST } from 'reducers/tickets/constants';

const UpdateStatus = ({ moreInfo, users }) => {
  const dispatch = useDispatch();
  const {
    updateTicket: { loading, error, message }
  } = useSelector((state) => state);
  const initialValues = {
    priority: moreInfo?.priority,
    status: moreInfo?.status,
    assigned_user_id: moreInfo?.assigned_user_id
  };
  const formik = useFormik({
    initialValues: initialValues,
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      const payload = {
        priority: values.priority,
        status: values.status,
        ticket_id: moreInfo?.ticket_id,
        assigned_user_id: values.assigned_user_id,
        client_id: moreInfo?.client_id,
        title: moreInfo?.title,
        description: moreInfo?.description
      };

      dispatch({ type: UPDATE_TICKET_REQUEST, payload: payload });
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
                id="status"
                name="status"
                InputLabelProps={{
                  shrink: true
                  // Add red color to the label
                }}
                label={
                  <div>
                    Ticket Status <span style={{ color: 'red', fontSize: '20px' }}>*</span>
                  </div>
                }
                select
                value={formik.values.status}
                onChange={formik.handleChange}
                error={formik.touched.status && Boolean(formik.errors.status)}
                helperText={formik.touched.status && formik.errors.status}
              >
                <MenuItem value={'PENDING'}>PENDING</MenuItem>
                <MenuItem value={'IN PROGRESS'}>IN PROGRESS</MenuItem>
                <MenuItem value={'APPROVED'}>APPROVED</MenuItem>
                <MenuItem value={'COMPLETED'}>COMPLETED</MenuItem>
              </TextField>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Priority"
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
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Assign Ticket"
                name="assigned_user_id"
                select
                value={formik.values.assigned_user_id}
                onChange={formik.handleChange}
                error={formik.touched.assigned_user_id && Boolean(formik.errors.assigned_user_id)}
                helperText={formik.touched.assigned_user_id && formik.errors.assigned_user_id}
              >
                {users.map((usr, i) => (
                  <MenuItem key={i} value={usr.user_id}>
                    {usr.username}
                  </MenuItem>
                ))}
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
          <SubmitButton isLoading={loading} disabled={loading}>
            Save
          </SubmitButton>
        </Box>

        {error && <TigerSoftsAlerts show={error} message={message} variant={'error'} />}
        {/* {success && <TigerSoftsAlerts show={success} message={message} variant={'success'} />} */}
      </form>
    </div>
  );
};

export default UpdateStatus;
