import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import LoadingButton from '@mui/lab/LoadingButton';
import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import { Formik } from 'formik';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import colors from '../config/colors';
import { loginValidator } from '../helpers/formValidator';
import useAuth from '../hooks/useAuth';
import * as PATHS from '../helpers/paths';

const useStyles = makeStyles({
  mainContainer: {
    height: '100vh',

    alignItems: 'center',
    justifyContent: 'space-around',
  },

  numbersContainer: {
    marginTop: '2rem',
    display: 'flex',
    flexDirection: 'column',
  },
  textInfo: {
    marginTop: '1rem',
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    width: '30px',
    height: '30px',
    backgroundColor: 'grey',
    marginRight: '1rem',
  },
});

const Landing = ({ currentUser }) => {
  const [showErrorEmail, setShowErrorEmail] = useState(false);
  const [showErrorPassword, setShowErrorPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userError, setUserError] = useState(false);

  const classes = useStyles();
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmitToFirebase = async (email, password) => {
    setLoading(!loading);
    const response = await loginUser(email, password);

    if (response instanceof Error) {
      setUserError(true);
      setLoading(false);
      return;
    }
    navigate('/client');
  };
  const handleNotValidForm = () => {
    if (showErrorEmail || showErrorPassword) return;
    setShowErrorEmail(true);
    setShowErrorPassword(true);
  };

  const handleBlurEmail = () => {
    if (showErrorEmail) return;
    setShowErrorEmail(true);
  };
  const handleBlurPassword = () => {
    if (showErrorPassword) return;
    setShowErrorPassword(true);
  };

  return (
    <>
      <Container maxWidth='xl' fixed>
        <Grid container spacing={2} className={classes.mainContainer}>
          <Grid item xs={6}>
            <Typography variant='h4' fontWeight={450}>
              Bubbo{' '}
              <Typography component='span' variant='h4' fontWeight={200}>
                for Business.
              </Typography>
            </Typography>
            <Typography sx={{ width: '66%', marginTop: '1rem' }}>
              Welcome to Bubbo Advertising Platform. Login and discover the power of Ads.
            </Typography>
            <Box className={classes.numbersContainer}>
              <Box className={classes.textInfo}>
                <Box className={classes.icon}></Box>
                <Box>
                  <Typography variant='body1'>300k Users.</Typography>
                  <Typography variant='subtitle2' fontWeight={100}>
                    More than 100k active users monthly.
                  </Typography>
                </Box>
              </Box>
              <Box className={classes.textInfo}>
                <Box className={classes.icon}></Box>
                <Box>
                  <Typography variant='body1'>4 Countries.</Typography>
                  <Typography variant='subtitle2' fontWeight={100}>
                    Download our app in 6 countries.
                  </Typography>
                </Box>
              </Box>
              <Box className={classes.textInfo}>
                <Box className={classes.icon}></Box>
                <Box>
                  <Typography variant='body1'>24 Platforms.</Typography>
                  <Typography variant='subtitle2' fontWeight={100}>
                    Actually 6 provides but 24 coming soon.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          <Formik
            validationSchema={loginValidator}
            initialValues={{
              email: '',
              password: '',
            }}
            initialErrors={{
              email: 'Email is required',
              password: 'Password is required',
            }}
            onSubmit={({ email, password }) => {
              console.log('el usuario a loguearse es:', email, password);
              handleSubmitToFirebase(email, password);
            }}
          >
            {({ handleChange, handleSubmit, values, errors, isValid }) => (
              <Grid item xs={4} component='form' noValidate autoComplete='off' sx={{ marginTop: '4rem' }}>
                <TextField
                  id='email'
                  label='Email'
                  variant='outlined'
                  sx={{
                    width: '100%',
                    marginBottom: '1rem',
                  }}
                  onBlur={handleBlurEmail}
                  value={values.email}
                  onChange={handleChange}
                />

                <Typography sx={{ color: colors.tomato }}>{showErrorEmail && errors.email}</Typography>

                <TextField
                  id='password'
                  label='Password'
                  variant='outlined'
                  type='password'
                  sx={{
                    width: '100%',
                    marginBottom: '1rem',
                  }}
                  onBlur={handleBlurPassword}
                  value={values.password}
                  onChange={handleChange}
                />
                <Typography sx={{ color: colors.tomato }}>{showErrorPassword && errors.password}</Typography>
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
                  LOGIN
                </LoadingButton>
                {userError && <Typography sx={{ color: colors.tomato }}>Please check user and password</Typography>}
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '1rem',
                  }}
                >
                  <Typography variant='body2'>
                    <Link style={{ color: 'black' }} to={PATHS.RESETPASSWORD}>
                      Forgot password?
                    </Link>
                  </Typography>
                  <Typography variant='body2'>
                    I don't have an account,{' '}
                    <Link style={{ color: 'black' }} to={PATHS.REGISTERPAGE}>
                      Create one
                    </Link>
                  </Typography>
                </Box>
                <Box>
                  <Typography variant='body2' sx={{ marginTop: '3rem', paddingBottom: '3rem' }}>
                    If you don't have an account, please make your business enquire and our team will contact you
                    shortly.
                  </Typography>
                </Box>
                <Button
                  variant='outlined'
                  sx={{
                    width: '100%',
                    borderColor: 'black',
                    color: 'black',
                    '&:hover': {
                      border: '1px solid black',
                      background: colors.primary,
                    },
                  }}
                  disableElevation
                >
                  BUSINESS REQUEST
                </Button>
              </Grid>
            )}
          </Formik>
        </Grid>
      </Container>
    </>
  );
};

export default Landing;
