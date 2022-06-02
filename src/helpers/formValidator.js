import * as yup from 'yup';

const emailVerifier = yup.string().email('Please enter a valid email').required('Email is required');

const passwordVerifier = yup
  .string()
  .min(6, 'Password must have 6 or more characters')
  .required('Password is required');

const confirmPasswordVerifier = yup
  .string()
  .oneOf([yup.ref('password'), null], 'Passwords do not match')
  .required('Confirm password is required');

export const loginValidator = () =>
  yup.object().shape({
    email: emailVerifier,
    password: passwordVerifier,
  });

export const registerValidator = () =>
  yup.object().shape({
    email: emailVerifier,
    password: passwordVerifier,
    confirmPassword: confirmPasswordVerifier,
  });

export const resetPasswordValidator = () =>
  yup.object().shape({
    email: emailVerifier,
  });

export const campaignValidator = () =>
  yup.object().shape({
    campaignName: yup.string().required('Name is required'),
    campaignDescription: yup.string().required('Description is required'),
    campaignStartDate: yup
      .date()
      .required('Start date is required')
      .min(new Date(), 'Start date must be in the future'),
    campaignEndDate: yup
      .date()
      .required('Finish date is required')
      .min(yup.ref('campaignStartDate'), 'Finish date must be after start date'),
  });
export const groupValidator = () =>
  yup.object().shape({
    groupName: yup.string().required('Name is required'),
    groupDescription: yup.string().required('Description is required'),
  });
