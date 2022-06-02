import { TextField, Typography, Button, Box } from '@mui/material';
import { Formik } from 'formik';
import React from 'react';

import { groupValidator } from '../../helpers/formValidator';
import { ErrorMessage } from '../ErrorMessage';
import { GROUP_INITIAL_VALUES } from './constants';
import { formStyles } from './styles';

export const GroupFormData = ({
  handleSubmitGroup,
  showFormError,
  handleStepDown,
  handleNotValidForm,
  campaignId,
  handleClick,
}) => {
  const classes = formStyles();

  return (
    <>
      <Typography variant='h5' fontWeight={450} sx={{ marginBottom: '1.5rem' }}>
        Ad Group
      </Typography>
      <Formik
        validationSchema={groupValidator}
        initialValues={GROUP_INITIAL_VALUES}
        onSubmit={({ groupName, groupDescription }) => handleSubmitGroup(groupName, groupDescription)}
      >
        {({ handleChange, handleSubmit, values, errors, isValid }) => (
          <>
            <TextField
              value={values.groupName}
              onChange={handleChange}
              id='groupName'
              label='Name'
              variant='outlined'
              className={classes.textField}
            />
            <TextField
              value={values.groupDescription}
              onChange={handleChange}
              id='groupDescription'
              label='Description'
              variant='outlined'
              className={classes.textField}
            />

            {showFormError && <ErrorMessage>Please complete all fields</ErrorMessage>}

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant='contained' className={classes.backButton} onClick={handleClick}>
                BACK
              </Button>
              <Button
                variant='contained'
                className={classes.submitButton}
                onClick={isValid ? handleSubmit : handleNotValidForm}
              >
                NEXT
              </Button>
            </Box>
          </>
        )}
      </Formik>
    </>
  );
};
