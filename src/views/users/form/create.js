/* eslint-disable no-debugger */
/* eslint-disable react/prop-types */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CREATE_USER_REQUEST, UPDATE_USER_REQUEST } from 'reducers/users/constants';
// import Autocomplete from '@mui/material/Autocomplete';
import { useFormik } from 'formik';
import TigerSoftsAlerts from 'ui-component/alerts';
import SubmitButton from 'ui-component/button';
import { Box, FormControl, Grid, MenuItem, TextField } from '@mui/material';
import { validationSchema } from './validation';
const CreateUserForm = ({ roles, moreInfo, isEdit }) => {
  const dispatch = useDispatch();

  const {
    createUser: { loading, error },
    updateUser: { loading: updateLoading, error: updateError, message }
  } = useSelector((state) => state);
  debugger;
  const initialValues = {
    username: isEdit ? moreInfo.username : '',
    email: isEdit ? moreInfo.email : '',
    role_id: isEdit ? moreInfo.role_id : '',
    level: isEdit ? moreInfo.level : ''
  };
  debugger;
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const payload = {
        username: values.username,
        password: '12345',
        email: values.email,
        role_id: values.role_id,
        level: values.level
      };
      const payloadWithId = {
        ...payload,
        user_id: moreInfo.user_id
      };
      dispatch(isEdit ? { type: UPDATE_USER_REQUEST, payloadWithId } : { type: CREATE_USER_REQUEST, payload });
    }
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box
              sx={{
                margin: '4px 0px'
              }}
            >
              <TextField
                fullWidth
                id="username"
                name="username"
                InputLabelProps={{
                  shrink: true
                  // Add red color to the label
                }}
                label={
                  <div>
                    User Name <span style={{ color: 'red', fontSize: '20px' }}>*</span>
                  </div>
                }
                value={formik.values.username}
                onChange={formik.handleChange}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username}
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
              sx={{
                margin: '4px 0px'
              }}
            >
              <TextField
                fullWidth
                id="email"
                name="email"
                InputLabelProps={{
                  shrink: true
                  // Add red color to the label
                }}
                label={
                  <div>
                    Email <span style={{ color: 'red', fontSize: '20px' }}>*</span>
                  </div>
                }
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Role Name"
                name="role_id"
                select
                value={formik.values.role_id}
                onChange={formik.handleChange}
                error={formik.touched.role_id && Boolean(formik.errors.role_id)}
                helperText={formik.touched.role_id && formik.errors.role_id}
              >
                {roles.map((opt, i) => (
                  <MenuItem key={i} value={opt.role_id}>
                    {opt.role_name}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Level"
                name="level"
                select
                value={formik.values.level}
                onChange={formik.handleChange}
                error={formik.touched.level && Boolean(formik.errors.level)}
                helperText={formik.touched.level && formik.errors.level}
              >
                <MenuItem value={'Level 1'}>Level 1</MenuItem>
                <MenuItem value={'Level 2'}>Level 2</MenuItem>
                <MenuItem value={'Level 3'}>Level 3</MenuItem>
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
        {updateError && <TigerSoftsAlerts show={updateError} message={message} variant={'error'} />}
      </form>
    </div>
  );
};

export default CreateUserForm;
