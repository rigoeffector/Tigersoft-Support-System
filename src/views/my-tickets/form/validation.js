import * as yup from 'yup';

export const validationSchema = yup.object({
  title: yup.string('Enter Title name').required('Title  is required').nullable(),
  priority: yup.string('Enter Priority').required('Priority  is required').nullable(),
  description: yup
    .string('Enter Description ')
    .min(2, 'Description  should be of minimum 5 characters length')
    .required('Description  is required')
});
