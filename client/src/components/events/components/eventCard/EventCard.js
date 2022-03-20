import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { CardActionArea } from '@mui/material';
import image from "../../../../assets/webD.jpg"

import "./EventCard.css"
import { Link } from 'react-router-dom';


export default function EventCard({id, eventName, image, eventCode}) {

  return (
    <Card sx={{ maxWidth: 380 }}>
      <CardActionArea component={Link} to={`/eventpage/${eventCode}`} >

    <Box sx={{ position: 'relative' }}>
      <CardMedia
        component="img"
        image={image}
        />
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          bgcolor: 'rgba(0, 0, 0, 0.3)',
          color: 'white',
          padding: '10px',
        }}
        >
        <Typography variant="h5">{eventName}</Typography>
      </Box>
    </Box>
        </CardActionArea>
  </Card>
  );
}
