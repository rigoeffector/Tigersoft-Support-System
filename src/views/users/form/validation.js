import * as yup from 'yup';

export const validationSchema = yup.object({
  username: yup
    .string('Enter User name')
    .min(2, 'User name should be of minimum 5 characters length')
    .required('User name is required')
    .nullable(),
  email: yup.string('Enter Email name').min(2, 'Email should be of minimum 8 characters length').required('Email is required').nullable(),
  role_id: yup.string('Choose Role name').required('Role is required').nullable(),
  permission_id: yup.string('Choose Permission name').required('Permission is required').nullable()
});
