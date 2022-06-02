import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActions, Button } from '@mui/material';
import image from './image.jpg';

export default function CampaignCard({ name, description, startDate, finishDate, id, activityId, deleteCampaign }) {
  startDate = new Date(startDate).toLocaleDateString();
  finishDate = new Date(finishDate).toLocaleDateString();
  const pathToDelete = `activities/${activityId}`;

  return (
    <Card sx={{ width: 260, margin: 2 }}>
      <CardMedia component='img' height='120' image={image} alt='logo' />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {name}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {description}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          From: {startDate}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          To: {finishDate}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size='small' onClick={() => deleteCampaign(pathToDelete, id)}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
