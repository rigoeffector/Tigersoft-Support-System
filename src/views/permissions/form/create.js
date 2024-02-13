/* eslint-disable no-debugger */
/* eslint-disable react/prop-types */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import TigerSoftsAlerts from 'ui-component/alerts';
import SubmitButton from 'ui-component/button';
import { Box, Grid, TextField } from '@mui/material';
import { validationSchema } from './validation';
import { CREATE_PERMISSION_REQUEST, UPDATE_PERMISSION_REQUEST } from 'reducers/permissions/constants';
const CreatePermissionForm = ({ isEdit, moreInfo }) => {
  const dispatch = useDispatch();

  const {
    createPermission: { loading, error, message }
  } = useSelector((state) => state);

  const initialValues = {
    permission_name: isEdit ? moreInfo?.permission_name : '',
    description: isEdit ? moreInfo?.description : ''
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const payload = {
        permission_name: values.permission_name,
        description: values.description
      };

      const payloadWithId = {
        ...payload,
        permission_id: moreInfo.permission_id
      };
      dispatch(
        isEdit ? { type: UPDATE_PERMISSION_REQUEST, payload: payloadWithId } : { type: CREATE_PERMISSION_REQUEST, payload: payload }
      );
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
                id="Name"
                name="permission_name"
                InputLabelProps={{
                  shrink: true
                  // Add red color to the label
                }}
                label={
                  <div>
                    Permission Name <span style={{ color: 'red', fontSize: '20px' }}>*</span>
                  </div>
                }
                value={formik.values.permission_name}
                onChange={formik.handleChange}
                error={formik.touched.permission_name && Boolean(formik.errors.permission_name)}
                helperText={formik.touched.permission_name && formik.errors.permission_name}
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
                maxRows={4}
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

export default CreatePermissionForm;
