import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Typography } from '@mui/material';

export default function WelcomeToBubbo() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ width: '100%', typography: 'body1', marginTop: 10 }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label='lab API tabs example'>
              <Tab label='About Bubbo' value='1' />
              <Tab label='Terms and Conditions' value='2' />
              <Tab label='About Advertising' value='3' />
            </TabList>
          </Box>
          <TabPanel value='1'>
            <Typography variant='h5' sx={{ marginBottom: '1rem' }}>
              Agreement 1.
            </Typography>
            <Typography variant='body1'>
              Welcome to Bubbo advertising platform. Login and discover the power of Ads. Welcome to Bubbo advertising
              platform. Login and discover the power of Ads. Welcome to Bubbo advertising platform. Login and discover
              the power of Ads. Welcome to Bubbo advertising platform. Login and discover the power of Ads.
            </Typography>
          </TabPanel>
          <TabPanel value='2'>
            <Typography variant='h5' sx={{ marginBottom: '1rem' }}>
              Agreement 2.
            </Typography>
            <Typography variant='body1'>
              Welcome to Bubbo advertising platform. Login and discover the power of Ads. Welcome to Bubbo advertising
              platform. Login and discover the power of Ads. Welcome to Bubbo advertising platform. Login and discover
              the power of Ads. Welcome to Bubbo advertising platform. Login and discover the power of Ads.
            </Typography>
          </TabPanel>
          <TabPanel value='3'>
            {' '}
            <Typography variant='h5' sx={{ marginBottom: '1rem' }}>
              Agreement 3.
            </Typography>
            <Typography variant='body1'>
              Welcome to Bubbo advertising platform. Login and discover the power of Ads. Welcome to Bubbo advertising
              platform. Login and discover the power of Ads. Welcome to Bubbo advertising platform. Login and discover
              the power of Ads. Welcome to Bubbo advertising platform. Login and discover the power of Ads.
            </Typography>
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
}
