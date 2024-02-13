/* eslint-disable no-debugger */
/* eslint-disable react/prop-types */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import TigerSoftsAlerts from 'ui-component/alerts';
import SubmitButton from 'ui-component/button';
import { Box, FormControl, Grid, MenuItem, TextField } from '@mui/material';
import { validationSchema } from './validation';
import { CREATE_ROLE_REQUEST, UPDATE_ROLE_REQUEST } from 'reducers/roles/constants';
const CreateRoleForm = ({ isEdit, moreInfo, permissions }) => {
  const dispatch = useDispatch();

  const {
    createRole: { loading, error, message }
  } = useSelector((state) => state);

  const initialValues = {
    permission_id: isEdit ? moreInfo?.permission_id : '',
    role_name: isEdit ? moreInfo?.role_name : ''
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const payload = {
        role_name: values.role_name,
        permission_id: values.permission_id
      };

      const payloadWithId = {
        ...payload,
        role_id: moreInfo.role_id
      };
      dispatch(isEdit ? { type: UPDATE_ROLE_REQUEST, payload: payloadWithId } : { type: CREATE_ROLE_REQUEST, payload: payload });
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
                id="role_name"
                name="role_name"
                InputLabelProps={{
                  shrink: true
                  // Add red color to the label
                }}
                label={
                  <div>
                    Role Name <span style={{ color: 'red', fontSize: '20px' }}>*</span>
                  </div>
                }
                value={formik.values.role_name}
                onChange={formik.handleChange}
                error={formik.touched.role_name && Boolean(formik.errors.role_name)}
                helperText={formik.touched.role_name && formik.errors.role_name}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Permission Name"
                name="permission_id"
                select
                value={formik.values.permission_id}
                onChange={formik.handleChange}
                error={formik.touched.permission_id && Boolean(formik.errors.permission_id)}
                helperText={formik.touched.permission_id && formik.errors.permission_id}
              >
                {permissions.map((opt, i) => (
                  <MenuItem key={i} value={opt.permission_id}>
                    {opt.permission_name}
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

export default CreateRoleForm;
