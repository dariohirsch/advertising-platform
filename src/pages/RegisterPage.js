import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import { Formik } from 'formik';

import { registerValidator } from '../helpers/formValidator';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Stepper from '@mui/material/Stepper';
import StepButton from '@mui/material/StepButton';
import Step from '@mui/material/Step';
import colors from '../config/colors';

export default function RegisterPage() {
  const [showErrorEmail, setShowErrorEmail] = useState(false);
  const [showErrorName, setShowErrorName] = useState(false);
  const [showErrorPassword, setShowErrorPassword] = useState(false);
  const [showErrorSurname, setShowErrorSurname] = useState(false);
  const [showErrorCompany, setShowErrorCompany] = useState(false);
  const [activeStep, setActiveStep] = React.useState(0);

  const navigate = useNavigate();
  const classes = useStyles();
  const { registerUser } = useAuth();

  const steps = ['Personal Details', 'User Details'];

  const handleStepUp = () => () => {
    setActiveStep(activeStep + 1);
  };
  const handleStepDown = () => () => {
    setActiveStep(activeStep - 1);
  };

  const handleNotValidForm = () => {
    if (showErrorEmail || showErrorPassword) return;
    setShowErrorEmail(true);
    setShowErrorPassword(true);
  };
  const handleSubmitToFirebase = (email, password) => {
    console.log('este es el usuario a registrar', email, password);
    registerUser(email, password).then(() => {
      navigate('/');
    });
  };

  const handleBlurEmail = () => {
    if (showErrorEmail) return;
    setShowErrorEmail(true);
  };
  const handleBlurName = () => {
    if (showErrorName) return;
    setShowErrorName(true);
  };
  const handleBlurSurname = () => {
    if (showErrorSurname) return;
    setShowErrorSurname(true);
  };
  const handleBlurCompany = () => {
    if (showErrorCompany) return;
    setShowErrorCompany(true);
  };
  const handleBlurPassword = () => {
    if (showErrorPassword) return;
    setShowErrorPassword(true);
  };

  return (
    <Grid container spacing={1} className={classes.mainContainer}>
      <Grid item xs={3}>
        <Box sx={{ width: '100%', marginBottom: '4rem' }}>
          <Stepper nonLinear activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepButton color='inherit'>{label}</StepButton>
              </Step>
            ))}
          </Stepper>
        </Box>
        <Typography variant='h5' fontWeight={450} sx={{ marginBottom: '1.5rem' }}>
          Create Account
        </Typography>
        {activeStep === 0 && (
          <Formik
            validationSchema={registerValidator}
            initialValues={{
              name: '',
              surname: '',
              company: '',
            }}
            initialErrors={{
              name: 'Name is required',
              surname: 'Surname is required',
              company: 'Company is required',
            }}
            onSubmit={({ email, password }) => handleSubmitToFirebase(email, password)}
          >
            {({ handleChange, handleSubmit, values, errors, isValid }) => (
              <>
                <TextField
                  id='name'
                  label='Name'
                  sx={{
                    width: '100%',
                    marginBottom: '1rem',
                  }}
                  onBlur={handleBlurName}
                  value={values.name}
                  onChange={handleChange}
                />
                <Typography sx={{ color: colors.tomato }}>{showErrorName && errors.name}</Typography>
                <TextField
                  id='surname'
                  label='Surname'
                  sx={{
                    width: '100%',
                    marginBottom: '1rem',
                  }}
                  onBlur={handleBlurSurname}
                  value={values.surname}
                  onChange={handleChange}
                />
                <Typography sx={{ color: colors.tomato }}>{showErrorSurname && errors.surname}</Typography>
                <TextField
                  id='company'
                  label='Company'
                  sx={{
                    width: '100%',
                    marginBottom: '1rem',
                  }}
                  onBlur={handleBlurCompany}
                  value={values.company}
                  onChange={handleChange}
                />
                <Typography sx={{ color: colors.tomato }}>{showErrorCompany && errors.company}</Typography>
                <Button
                  variant='contained'
                  sx={{
                    backgroundColor: 'black',
                    width: '100%',
                    marginTop: '1.5rem',
                    '&:hover': {
                      background: colors.black,
                    },
                  }}
                  disableElevation
                  onClick={handleStepUp()}
                >
                  NEXT
                </Button>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '1rem',
                  }}
                >
                  <Typography variant='body2'>
                    Ya tengo cuenta,{' '}
                    <Link style={{ color: 'black' }} to='/'>
                      Iniciar sesión
                    </Link>
                  </Typography>
                </Box>
              </>
            )}
          </Formik>
        )}
        {activeStep === 1 && (
          <Formik
            validationSchema={registerValidator}
            initialValues={{
              email: '',
              password: '',
              confirmPassword: '',
            }}
            initialErrors={{
              email: '* Email is required',
              password: '* Password is required',
              confirmPassword: '* Confirm password is required',
            }}
            onSubmit={({ email, password }) => handleSubmitToFirebase(email, password)}
          >
            {({ handleChange, handleSubmit, values, errors, isValid }) => (
              <>
                <TextField
                  id='email'
                  label='Email'
                  sx={{
                    width: '100%',
                    marginBottom: '1rem',
                  }}
                  onBlur={handleBlurEmail}
                  onChange={handleChange}
                  value={values.email}
                />
                <Typography>{showErrorEmail && errors.email}</Typography>
                <TextField
                  id='password'
                  label='Password'
                  sx={{
                    width: '100%',
                    marginBottom: '1rem',
                  }}
                  onBlur={handleBlurPassword}
                  onChange={handleChange}
                  value={values.password}
                />
                <Typography>{showErrorPassword && errors.password}</Typography>
                <TextField
                  id='confirmPassword'
                  label='Confirm Password'
                  sx={{
                    width: '100%',
                    marginBottom: '1rem',
                  }}
                  onBlur={handleBlurPassword}
                  onChange={handleChange}
                  value={values.confirmPassword}
                />
                <Typography>{showErrorPassword && errors.confirmPassword}</Typography>
                <Typography variant='body2'>
                  By clicking 'Continue' you are accepting our{' '}
                  <Link style={{ color: 'black' }} to='/'>
                    terms and conditions
                  </Link>{' '}
                  to use Bubbo App Platform
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button
                    variant='contained'
                    sx={{
                      backgroundColor: colors.primary,
                      border: '1px solid rgba(0, 0, 0, 0.5)',
                      color: '#7D7D7D',
                      width: '30%',
                      marginTop: '1.5rem',
                      '&:hover': {
                        background: 'none',
                      },
                    }}
                    disableElevation
                    onClick={handleStepDown()}
                  >
                    BACK
                  </Button>
                  <Button
                    variant='contained'
                    sx={{
                      backgroundColor: 'black',
                      width: '60%',
                      marginTop: '1.5rem',
                      '&:hover': {
                        background: colors.black,
                      },
                    }}
                    disableElevation
                    onClick={isValid ? handleSubmit : handleNotValidForm}
                  >
                    CREATE ACCOUNT
                  </Button>
                </Box>
              </>
            )}
          </Formik>
        )}
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles({
  mainContainer: {
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
