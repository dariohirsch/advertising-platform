import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import { ListItemButton, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import BarChartIcon from '@mui/icons-material/BarChart';
import LogoutIcon from '@mui/icons-material/Logout';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandMore from '@mui/icons-material/ExpandMore';

const drawerWidth = 300;
const useStyles = makeStyles({
  icon: {
    width: '28px',
    height: '28px',
    marginRight: '1rem',
  },
});
export default function Sidebar({ setPageToRender }) {
  const [open, setOpen] = React.useState(false);

  const classes = useStyles();
  const { logoutUser } = useAuth();
  const navigate = useNavigate();

  const handlePageToRender = (pageToRender) => {
    setPageToRender(pageToRender);
    if (pageToRender === 1) setOpen(!open);
  };

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  return (
    <Box>
      <Drawer
        variant='permanent'
        sx={{
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            top: '64px',
            bottom: 'auto',
          },
        }}
      >
        <Box
          sx={{
            height: '92.9%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <List>
            <ListItem button key='Welcome to Bubbo' onClick={() => handlePageToRender(0)}>
              <HomeIcon className={classes.icon} />
              <Typography>Welcome to Bubbo</Typography>
            </ListItem>
            <Divider />
            <ListItemButton button key='Analytics' onClick={() => handlePageToRender(1)}>
              <DisplaySettingsIcon className={classes.icon} />
              <Typography>Ads</Typography>

              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout='auto' unmountOnExit>
              <List>
                <ListItemButton sx={{ pl: 4 }} onClick={() => handlePageToRender(1)}>
                  <ListItemText primary='Create new campaign' />
                </ListItemButton>
                <ListItemButton onClick={() => handlePageToRender(2)} sx={{ pl: 4 }}>
                  <ListItemText primary='Campaigns listed' />
                </ListItemButton>
              </List>
            </Collapse>
            <Divider />
            <ListItem button key='Ads' onClick={() => handlePageToRender(3)}>
              <BarChartIcon className={classes.icon} />
              <Typography>Analytics</Typography>
            </ListItem>
            <Divider />
          </List>
          <List>
            <Divider />

            <ListItem button key='logout' sx={{ paddingTop: '12px' }} onClick={handleLogout}>
              <LogoutIcon className={classes.icon} />
              <Typography>Logout</Typography>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}
