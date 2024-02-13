import * as yup from 'yup';

export const validationSchema = yup.object({
  permission_id: yup.string('Enter Permission name').required('Permission name is required').nullable(),
  role_name: yup.string('Enter Role ').min(2, 'Role  should be of minimum 5 characters length').required('Role  is required')
});
