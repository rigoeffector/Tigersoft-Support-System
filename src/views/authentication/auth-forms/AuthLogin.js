/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
  useMediaQuery
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import Google from 'assets/images/icons/social-google.svg';
import { Link } from 'react-router-dom';
import SubmitButton from 'ui-component/button';
import { LOGIN_USER_REQUEST } from 'reducers/auth/constants';
import TigerSoftsAlerts from 'ui-component/alerts';

// ============================|| FIREBASE - LOGIN ||============================ //

const FirebaseLogin = ({ ...others }) => {
  const theme = useTheme();
  const scriptedRef = useScriptRef();
  const [checked, setChecked] = useState(true);
  const dispatch = useDispatch();

  const {
    auth: { loading, success, message, error }
  } = useSelector((state) => state);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
          type: ''
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required'),
          type: Yup.string().max(255).required('Type is required')
        })}
        onSubmit={async (values) => {
          const payload = {
            email: values.email,
            password: values.password,
            type: values.type
          };
          dispatch({ type: LOGIN_USER_REQUEST, payload });
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                {/* <InputLabel htmlFor="outlined-adornment-email-login">Sign In As </InputLabel> */}
                <TextField
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Sign In as"
                  value={values.type}
                  name="type"
                  select
                  onBlur={handleBlur}
                  onChange={handleChange}
                >
                  <MenuItem value={'member'}>Staff</MenuItem>
                  <MenuItem value={'client'}>Client</MenuItem>
                </TextField>
                {touched.type && errors.type && (
                  <FormHelperText error id="standard-weight-helper-text-email-login">
                    {errors.type}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email-login">Email Address</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-login"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Email Address / Username"
                inputProps={{}}
              />
              {touched.email && errors.email && (
                <FormHelperText error id="standard-weight-helper-text-email-login">
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-login"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                inputProps={{}}
              />
              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-login">
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>

            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <SubmitButton disabled={isSubmitting || loading} isLoading={loading}>
                  {'Sign In'}
                </SubmitButton>
              </AnimateButton>
              {error && <TigerSoftsAlerts show={error} message={message} variant={'error'} />}
              {/* {success && <TigerSoftsAlerts show={success} message={message} variant={'success'} />} */}
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default FirebaseLogin;
