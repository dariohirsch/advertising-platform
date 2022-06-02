import React, { useState, useEffect } from 'react';
import Stepper from '@mui/material/Stepper';
import StepButton from '@mui/material/StepButton';
import Step from '@mui/material/Step';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { database, storage } from '../../firebaseConfig/firebase';
import { Grid } from '@mui/material';
import { addDoc, collection, deleteDoc, doc } from 'firebase/firestore';

import Dropdown from '../Dropdown';
import { formStyles } from './styles';
import { CampaignFormData } from './CampaignFormData';
import { GroupFormData } from './GroupFormData';
import { AdFormData } from './AdFormData';
import Modal from '../Modal';

export default function CreateNewAd({ setPageToRender }) {
  const MEDIA_INITIAL_VALUES = {
    buttonLink: '',
  };
  const [activeStep, setActiveStep] = useState(0);
  const [showFormError, setShowFormError] = useState(false);
  const [campaignData, setCampaignData] = useState({});
  const [groupData, setGroupData] = useState({});
  const [valueLink, setValueLink] = useState(true);
  const [media, setMedia] = useState(null);
  const [platform, setPlatform] = useState('');
  const [activityId, setActivityId] = useState('');
  const [campaignId, setCampaignId] = useState('');
  const [groupId, setGroupId] = useState('');
  const [allStories, setAllStories] = useState({});
  const [open, setOpen] = useState(false);
  const [buttonLink, setButtonLink] = useState(MEDIA_INITIAL_VALUES);
  const [storyNumber, setStoryNumber] = useState(0);

  const steps = ['Platform', 'Campaign', 'Group Ads', 'Ads'];
  const classes = formStyles();
  const activitiesCollection = collection(database, 'activities');

  useEffect(() => {
    handleCurrentData();
    handleOpenModal();
  }, []);

  const handleCurrentData = () => {
    const localStorageData = localStorage.getItem('activeStep');
    setActiveStep(Number(localStorageData));
    setActivityId(localStorage.getItem('activityId'));
    setCampaignId(localStorage.getItem('campaignId'));
    setPlatform(localStorage.getItem('platform'));
    setGroupId(localStorage.getItem('campaignGroupId'));
  };

  const handleStepUp = () => {
    localStorage.setItem('activeStep', activeStep + 1);
    setActiveStep(activeStep + 1);
  };
  const handleStepDown = (pathToDelete) => {
    console.log('id', pathToDelete);
    localStorage.setItem('activeStep', activeStep - 1);
    if (activeStep > 0) setActiveStep(activeStep - 1);
    deleteDoc(doc(database, pathToDelete));
    setShowFormError(false);
  };

  const handleNotValidForm = () => {
    if (showFormError) return;
    setShowFormError(true);
  };

  const handleSubmitPlatform = async (platform) => {
    setPlatform(platform);
    const provider = platform.split('-')[1];
    const activity = await addDoc(activitiesCollection, { provider: provider });
    localStorage.setItem('activityId', activity.id);
    localStorage.setItem('platform', platform);
    setActivityId(activity.id);
    handleStepUp();
  };

  const handleSubmitCampaign = async (name, description, startDate, finishDate) => {
    const campaignDetails = {
      name,
      description,
      startDate: new Date(startDate).getTime(),
      finishDate: new Date(finishDate).getTime(),
    };
    setCampaignData(campaignDetails);
    setShowFormError(false);
    const newCampaign = await addDoc(collection(database, `activities/${activityId}/campaigns`), campaignDetails);
    localStorage.setItem('campaignId', newCampaign.id);
    setCampaignId(newCampaign.id);
    handleStepUp();
  };

  const handleSubmitGroup = async (groupName, groupDescription) => {
    const groupDetails = {
      groupName,
      groupDescription,
    };
    setGroupData(groupDetails);
    setShowFormError(false);
    const newCampaignGroup = await addDoc(
      collection(database, `activities/${activityId}/campaigns/${campaignId}/groups`),
      groupDetails
    );
    localStorage.setItem('campaignGroupId', newCampaignGroup.id);
    setGroupId(newCampaignGroup.id);
    handleStepUp();
  };

  const handleMediaUpload = (e) => {
    e.preventDefault();
    setMedia(e.target.files[0]);
  };

  const handleSaveStory = async (buttonLink) => {
    const imageRef = ref(storage, `images/${media.name}`);
    await uploadBytes(imageRef, media);
    const mediaUrl = await getDownloadURL(imageRef);

    setAllStories({ ...allStories, [storyNumber]: { buttonLink, mediaUrl, valueLink } });
    setStoryNumber(storyNumber + 1);
    setMedia(null);
    setValueLink(true);
    setButtonLink(MEDIA_INITIAL_VALUES);
    console.log('allStories', allStories);
  };

  const handleSubmitStorie = async (loading, setLoading) => {
    setLoading(!loading);

    await addDoc(
      collection(database, `activities/${activityId}/campaigns/${campaignId}/groups/${groupId}/ads`),
      allStories
    );
    setPageToRender(2);
    localStorage.clear();
  };

  const handleShowComponent = (activeStep) => {
    switch (activeStep) {
      case 0:
        return <Dropdown handleStepUp={handleStepUp} handleSubmitPlatform={handleSubmitPlatform} />;
      case 1:
        return (
          <CampaignFormData
            handleSubmitCampaign={handleSubmitCampaign}
            platform={platform}
            showFormError={showFormError}
            handleNotValidForm={handleNotValidForm}
          />
        );
      case 2:
        return (
          <GroupFormData
            handleSubmitGroup={handleSubmitGroup}
            showFormError={showFormError}
            handleNotValidForm={handleNotValidForm}
            handleClick={() => handleStepDown(`activities/${activityId}/campaigns/${campaignId}`)}
            campaignId={campaignId}
          />
        );
      case 3:
        return (
          <AdFormData
            groupData={groupData}
            handleSubmitStorie={handleSubmitStorie}
            valueLink={valueLink}
            setValueLink={setValueLink}
            media={media}
            setButtonLink={setButtonLink}
            buttonLink={buttonLink}
            handleMediaUpload={handleMediaUpload}
            handleSaveStory={handleSaveStory}
            allStories={allStories}
            storyNumber={storyNumber}
            handleClick={() => {
              handleStepDown(`activities/${activityId}/campaigns/${campaignId}/groups/${groupId}`);
              setAllStories({});
            }}
          />
        );
      default:
    }
  };

  const handleOpenModal = () => {
    if (localStorage.length > 0) setOpen(true);
  };
  const handleCloseModalAndReset = () => {
    setOpen(false);
    localStorage.clear();
    setActiveStep(0);
  };
  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <>
      <Grid container spacing={1} className={classes.mainContainer}>
        <Grid item xs={12} sx={{ margin: 6 }}>
          <Grid item xs={10} className={classes.bar}>
            <Stepper nonLinear activeStep={activeStep}>
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepButton color='inherit'>{label}</StepButton>
                </Step>
              ))}
            </Stepper>
          </Grid>
          <Grid item xs={10}>
            <>
              {handleShowComponent(activeStep)}
              <Modal
                handleOpenModal={handleOpenModal}
                handleCloseModal={handleCloseModal}
                handleCloseModalAndReset={handleCloseModalAndReset}
                open={open}
                platform={platform}
              />
            </>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
