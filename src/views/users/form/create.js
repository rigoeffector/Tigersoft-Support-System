/* eslint-disable react/prop-types */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CREATE_USER_REQUEST } from 'reducers/users/constants';
import Autocomplete from '@mui/material/Autocomplete';
import { useFormik } from 'formik';
import TigerSoftsAlerts from 'ui-component/alerts';
import SubmitButton from 'ui-component/button';
import { Box, FormControl, Grid, MenuItem, TextField } from '@mui/material';
import { validationSchema } from './validation';
const CreateUserForm = ({ roles }) => {
  const dispatch = useDispatch();

  const {
    createUser: { loading, error }
  } = useSelector((state) => state);

  const initialValues = {
    username: '',
    email: '',
    password: '',
    role_id: '',
    permission_id: ''
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const payload = {
        username: values.username,
        password: '12345',
        email: values.email
      };
      dispatch({ type: CREATE_USER_REQUEST, payload });
      // setImageUrls({});
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
                name="usernam"
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
          <Grid item xs={6}>
            <FormControl fullWidth>
              <TextField
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Role Name"
                name="role"
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
          <Grid item xs={6}>
            <Autocomplete
              id="free-solo-demo"
              freeSolo
              // options={.map((option) => option.title)}
              options={[]}
              value={formik.values.permission_id}
              onChange={formik.handleChange}
              error={formik.touched.permission_id && Boolean(formik.errors.permission_id)}
              helperText={formik.touched.permission_id && formik.errors.permission_id}
              renderInput={(params) => <TextField {...params} label="Permission" />}
            />
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

        {error && <TigerSoftsAlerts show={error} message={error} variant={'error'} />}
      </form>
    </div>
  );
};

export default CreateUserForm;
