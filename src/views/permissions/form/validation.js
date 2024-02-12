import * as yup from 'yup';

export const validationSchema = yup.object({
  permission_name: yup
    .string('Enter Permission name')
    .min(2, 'Permission name should be of minimum 5 characters length')
    .required('Permission name is required')
    .nullable(),
  description: yup
    .string('Enter Description ')
    .min(2, 'Description  should be of minimum 5 characters length')
    .required('Description  is required')
});
