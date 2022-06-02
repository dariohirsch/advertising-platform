import { LoadingButton } from '@mui/lab';
import { Grid, TextField, Box, Typography } from '@mui/material';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import colors from '../config/colors';
import useAuth from '../hooks/useAuth';
import { resetPasswordValidator } from '../helpers/formValidator';

export default function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const [showErrorEmail, setShowErrorEmail] = useState(false);
  const [userError, setUserError] = useState(false);

  const navigate = useNavigate();

  const { resetUserPassword } = useAuth();

  const handleNotValidForm = () => {
    if (showErrorEmail) return;
    setShowErrorEmail(true);
  };

  const handleSubmitToFirebase = async (email) => {
    setLoading(!loading);
    const response = await resetUserPassword(email);

    if (response instanceof Error) {
      console.log('es error');
      setUserError(true);
      setLoading(false);
      return;
    }
    navigate('/');
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Formik
        validationSchema={resetPasswordValidator}
        initialValues={{
          email: '',
        }}
        initialErrors={{
          email: 'Email is required',
        }}
        onSubmit={({ email }) => handleSubmitToFirebase(email)}
      >
        {({ handleChange, handleSubmit, values, errors, isValid }) => (
          <Grid item xs={4} component='form' autoComplete='off' sx={{ marginTop: '4rem' }}>
            <TextField
              id='email'
              label='Email'
              variant='filled'
              sx={{
                width: '100%',
                marginBottom: '1rem',
                borderBottom: '2px solid black',
              }}
              value={values.email}
              onChange={handleChange}
            />

            <LoadingButton
              variant='contained'
              sx={{
                backgroundColor: colors.black,
                width: '100%',
                marginTop: '1.5rem',
                '&:hover': {
                  background: colors.black,
                },
              }}
              onClick={isValid ? handleSubmit : handleNotValidForm}
              loading={loading}
            >
              Reset Password
            </LoadingButton>
            {userError && <Typography sx={{ color: colors.tomato }}>User not found!</Typography>}
          </Grid>
        )}
      </Formik>
    </Box>
  );
}
