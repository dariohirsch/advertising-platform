import React, { useState, useEffect } from 'react';
import { collection, deleteDoc, getDocs, doc } from 'firebase/firestore';

import { watchCampaignsStyles } from '../WatchCampaigns/styles';
import { database } from '../../firebaseConfig/firebase';
import CampaignCard from '../CampaignCard/CampaignCard';
import { Box, Typography } from '@mui/material';

export const WatchCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const activitiesCollection = collection(database, 'activities');

  const classes = watchCampaignsStyles();

  useEffect(() => {
    setCampaigns([]);
    getActivities();
  }, []);

  const getActivities = async () => {
    const docs = await getDocs(activitiesCollection);
    docs.forEach(async (doc) => {
      const campaignCollection = collection(database, `activities/${doc.id}/campaigns`);
      const campaignDocs = await getDocs(campaignCollection);
      campaignDocs.forEach((campaignDoc) => {
        setCampaigns((p) => [...p, { id: campaignDoc.id, activityId: doc.id, data: campaignDoc.data() }]);
      });
    });
  };

  const deleteCampaign = async (pathToDelete, id) => {
    await deleteDoc(doc(database, pathToDelete));
    setCampaigns((p) => p.filter((campaign) => campaign.id !== id));
  };
  return (
    <Box className={classes.mainContainer}>
      {console.log('campaigns', campaigns)}
      {campaigns.length > 0 ? (
        campaigns?.map(({ data, activityId, id }) => (
          <CampaignCard
            deleteCampaign={deleteCampaign}
            name={data.name}
            description={data.description}
            startDate={data.startDate}
            finishDate={data.finishDate}
            activityId={activityId}
            id={id}
          />
        ))
      ) : (
        <Box>
          <Typography>There are no campaigns listed.</Typography>
        </Box>
      )}
    </Box>
  );
};
