import { useState } from 'react';
import Sidebar from '../components/Sidebar';

import Analytics from '../components/Analytics';
import WelcomeToBubbo from '../components/WelcomeToBubbo';
import { Box } from '@mui/material';
import CreateNewCampaign from '../components/CreateNewCampaign/CreateNewCampaign';
import { WatchCampaigns } from '../components/WatchCampaigns/WatchCampaigns';

export default function ClientPage({ currentUser }) {
  const [pageToRender, setPageToRender] = useState(0);

  return (
    <>
      <Sidebar setPageToRender={setPageToRender} />
      <Box style={{ marginLeft: '300px' }}>
        {pageToRender === 0 && <WelcomeToBubbo />}
        {pageToRender === 1 && <CreateNewCampaign setPageToRender={setPageToRender} />}
        {pageToRender === 2 && <WatchCampaigns />}
        {pageToRender === 3 && <Analytics />}
      </Box>
    </>
  );
}
