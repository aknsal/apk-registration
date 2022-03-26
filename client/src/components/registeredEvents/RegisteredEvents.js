import { Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import EventCard from '../events/components/eventCard/EventCard';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function RegisteredEvents() {

    const user = useSelector(state => state.app.authUser);


  return (


    <div className='event-list-container'>
        <Typography variant='h3' > Registered Events</Typography>
        <hr/>

        <div className='event-list-category-items'>
          <Grid container spacing={3}>
            {
              user ?

              (user &&
                user.Events.length===0 ? 
                <div>
                  <br/>
                  <br/>
                <Typography > You have not registered for any Events. Go to <Typography color={success} component={Link} to={"/events"}> Events Tab </Typography> and register for some exciting Events.</Typography>
                </div>
                :
                user.Events.map((event) => 
                  
                  <Grid key={event.id} item xs={12} sm={6} md={4} lg={3} >
                    <EventCard id={event.id} eventName={event.eventName} image={event.image1} eventCode={event.eventCode} />
                  </Grid>
                )
                )
                : 
                null
            }
          </Grid>
        </div>
        
    </div>
  )
}
