import {
  TextField,
  Typography,
  Button,
  Box,
  Grid,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { Formik } from 'formik';
import React, { useState, useRef, useEffect } from 'react';
import { formStyles } from './styles';
import LoadingButton from '@mui/lab/LoadingButton';

export const AdFormData = ({
  groupData,
  handleSubmitStorie,
  valueLink,
  setValueLink,
  handleClick,
  media,
  handleMediaUpload,
  handleNotValidForm,
  handleSaveStory,
  buttonLink,
  allStories,
  storyNumber,
}) => {
  const [loading, setLoading] = useState(false);

  const classes = formStyles();
  const hiddenFileInput = useRef(null);
  const video = useRef(null);

  useEffect(() => {
    video.current?.load();
  }, [media]);

  return (
    <>
      <Grid container spacing={12} className={classes.adContainer}>
        <Grid item xs={4}>
          <Typography variant='h5' fontWeight={450} sx={{ marginBottom: '1.5rem' }}>
            Create Ad for: {groupData.groupName}
          </Typography>
          <Formik initialValues={buttonLink} onSubmit={() => handleSubmitStorie(loading, setLoading)}>
            {({ handleChange, handleSubmit, values, errors, isValid, resetForm }) => (
              <>
                <FormControl sx={{ marginBottom: 4 }}>
                  <FormLabel id='demo-controlled-radio-buttons-group'>Include button link?</FormLabel>
                  <RadioGroup
                    aria-labelledby='demo-controlled-radio-buttons-group'
                    name='controlled-radio-buttons-group'
                    value={valueLink}
                    onChange={(event) => setValueLink(+event.target.value === 0 ? false : true)}
                  >
                    <FormControlLabel value={1} checked={valueLink} control={<Radio />} label='Yes' />
                    <FormControlLabel value={0} checked={!valueLink} control={<Radio />} label='No' />
                  </RadioGroup>
                </FormControl>
                <TextField
                  disabled={!valueLink}
                  value={values.buttonLink}
                  onChange={handleChange}
                  id='buttonLink'
                  label='Button link'
                  variant='outlined'
                  className={classes.textField}
                />
                <Button
                  disabled={!media}
                  variant='contained'
                  className={classes.storyButton}
                  onClick={() => {
                    handleSaveStory(values.buttonLink);
                    resetForm();
                  }}
                >
                  Save story
                </Button>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                  <Button variant='contained' className={classes.backButton} onClick={handleClick}>
                    BACK
                  </Button>
                  <LoadingButton
                    disabled={Object.keys(allStories).length < 1 ? true : false}
                    variant='contained'
                    className={classes.submitButton}
                    onClick={isValid ? handleSubmit : handleNotValidForm}
                    loading={loading}
                  >
                    CREATE CAMPAIGN
                  </LoadingButton>

                  {console.log('all stories', allStories)}
                </Box>
              </>
            )}
          </Formik>
        </Grid>
        <Grid item xs={8}>
          <Box sx={{ marginLeft: 10, display: 'flex' }}>
            <div>
              <div className={`${classes.imageContainer} ${classes.imageContainer2} `}>
                {media && (
                  /* <video className={classes.imageFit} alt='storie' ref={video} autoPlay loop>
                    <source src={URL.createObjectURL(media)} type='video/mp4' />
                  </video> */
                  <img className={classes.imageFit} src={URL.createObjectURL(media)} alt='story' />
                )}
                <Button className={`${media && classes.uploadButton}`} onClick={() => hiddenFileInput.current.click()}>
                  {media ? 'Change image' : 'Upload image'}
                </Button>
              </div>
            </div>
            <input type='file' ref={hiddenFileInput} hidden onChange={(e) => handleMediaUpload(e)} />
            <Box sx={{ maxWidth: 260, height: 380, marginLeft: 5, overflowY: 'auto' }}>
              {Object.values(allStories).map((value) => (
                <img
                  src={value.mediaUrl}
                  alt='story'
                  key={value.buttonLink}
                  style={{ objectFit: 'cover' }}
                  height='90%'
                />
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
