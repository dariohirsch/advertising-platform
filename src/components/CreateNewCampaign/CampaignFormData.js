import { TextField, Typography, Button, Box } from '@mui/material';
import { Formik } from 'formik';
import React from 'react';

import { campaignValidator } from '../../helpers/formValidator';
import { ErrorMessage } from '../ErrorMessage';
import { CAMPAIGN_INITIAL_VALUES } from './constants';
import { formStyles } from './styles';

export const CampaignFormData = ({
  handleSubmitCampaign,
  platform,
  showFormError,
  handleStepDown,
  handleNotValidForm,
  campaignId,
}) => {
  const classes = formStyles();

  return (
    <>
      <Typography variant='h5' fontWeight={450} sx={{ marginBottom: '1.5rem' }}>
        Create Campaign for {platform}
      </Typography>
      <Formik
        validationSchema={campaignValidator}
        initialValues={CAMPAIGN_INITIAL_VALUES}
        onSubmit={({ campaignName, campaignDescription, campaignStartDate, campaignEndDate }) =>
          handleSubmitCampaign(campaignName, campaignDescription, campaignStartDate, campaignEndDate)
        }
      >
        {({ handleChange, handleSubmit, values, errors, isValid }) => (
          <>
            <TextField
              value={values.campaignName}
              onChange={handleChange}
              id='campaignName'
              label='Name'
              variant='outlined'
              className={classes.textField}
            />
            <TextField
              value={values.campaignDescription}
              onChange={handleChange}
              id='campaignDescription'
              label='Description'
              variant='outlined'
              className={classes.textField}
            />
            <TextField
              className={classes.textField}
              value={values.campaignStartDate}
              onChange={handleChange}
              label='Start Date'
              type='date'
              id='campaignStartDate'
              variant='outlined'
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              className={classes.textField}
              value={values.campaignEndDate}
              onChange={handleChange}
              label='End Date'
              type='date'
              id='campaignEndDate'
              variant='outlined'
              InputLabelProps={{
                shrink: true,
              }}
            />
            {showFormError && <ErrorMessage>Please complete all fields or enter a valid date</ErrorMessage>}

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                className={classes.backButton}
                variant='contained'
                onClick={(campaignId) => handleStepDown(campaignId)}
              >
                BACK
              </Button>
              <Button
                variant='contained'
                type='submit'
                className={classes.submitButton}
                onClick={isValid ? handleSubmit : handleNotValidForm}
              >
                CONTINUE AND CREATE AD GROUP
              </Button>
            </Box>
          </>
        )}
      </Formik>
    </>
  );
};
