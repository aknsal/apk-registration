import { Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import EventCard from '../components/eventCard/EventCard'
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import { useDispatch, useSelector } from 'react-redux';
import { setAllEvents } from "../../../redux/appSlice";
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios";

import "./EventList.css"

export default function EventList() {
  const user = useSelector(state => state.app.authUser);
  const isAuthenticated = useSelector(state => state.app.isAuthenticated);
  const allEventsOb = useSelector(state => state.app.allEvents);

  const [isLoading, setIsLoading] = useState(false);

  // use it after words
  const [allEventsArr, setAllEventsArr] = useState([]);
  // console.log("All Events in Event Page", allEventsOb);

  const dispatch = useDispatch();

  useEffect(async () => {
    setIsLoading(true);
    const response = await axios.get("/api/getevents").catch((err) => {
      console.log("Error Getting Events", err);
    });

    if (response && response.data) {
      // console.log("Event Data", response.data);
      dispatch(setAllEvents(response.data));
      setAllEventsArr(response.data.allEvents);
    }
    setIsLoading(false);
  }, [])


  return (
    <div className='event-list-container'>


      {
        isLoading?
        <div className="event-list-sub-container">
          <br/>
          <br/>
        <CircularProgress className='circular-progress' />
          </div>
        :
        <div>
      <div className="event-list-container-header">
        <Typography className='event-list-container-heading' variant="h3">Events </Typography>
        {isAuthenticated && user && user.isAdmin ? <Button variant='outlined' component={Link} to="/addevent" > <AddBoxRoundedIcon /> <Typography className='event-list-container-add-event' > Add Event </Typography></Button> : null}
      </div>
      <div className='event-list-category-section'>
        <div className='event-list-category-heading'> <Typography variant='h6'>Development</Typography> </div>
        <hr />
        <div className='event-list-category-items'>
          <Grid container spacing={3}>
            {
              allEventsOb ?
                allEventsOb.allEvents.map((event) => {
                  
                  if(event.category==="Development"){
                    return <Grid key={event.id} item xs={12} sm={6} md={4} lg={3} >
                    <EventCard id={event.id} eventName={event.eventName} image={event.image1} eventCode={event.eventCode} />
                  </Grid>
                  }   
                }
                )
                :
                null
            }
          </Grid>
        </div>
      </div>

      {/* <div className='event-list-category-section'>
        <div className='event-list-category-heading'> <Typography variant='h6'>Coding</Typography> </div>
        <hr />
        <div className='event-list-category-items'>
          <Grid container spacing={3}>
            {
              allEventsOb ?
                allEventsOb.allEvents.map((event) => {
                  
                  if(event.category==="Coding"){
                    return <Grid key={event.id} item xs={12} sm={6} md={4} lg={3} >
                    <EventCard id={event.id} eventName={event.eventName} image={event.image1} eventCode={event.eventCode} />
                  </Grid>
                  }   
                }
                )
                :
                null
            }
          </Grid>
        </div>
      </div>

      <div className='event-list-category-section'>
        <div className='event-list-category-heading'> <Typography variant='h6'>Design</Typography> </div>
        <hr />
        <div className='event-list-category-items'>
          <Grid container spacing={3}>
            {
              allEventsOb ?
                allEventsOb.allEvents.map((event) => {
                  
                  if(event.category==="Design"){
                    return <Grid key={event.id} item xs={12} sm={6} md={4} lg={3} >
                    <EventCard id={event.id} eventName={event.eventName} image={event.image1} eventCode={event.eventCode} />
                  </Grid>
                  }   
                }
                )
                :
                null
            }
          </Grid>
        </div>
      </div> */}

      {/* <div className='event-list-category-section'>
        <div className='event-list-category-heading'> <Typography variant='h6'>Blockchain</Typography> </div>
        <hr />
        <div className='event-list-category-items'>
          <Grid container spacing={3}>
            {
              allEventsOb ?
                allEventsOb.allEvents.map((event) => {
                  
                  if(event.category==="Blockchain"){
                    return <Grid key={event.id} item xs={12} sm={6} md={4} lg={3} >
                    <EventCard id={event.id} eventName={event.eventName} image={event.image1} eventCode={event.eventCode} />
                  </Grid>
                  }   
                }
                )
                :
                null
            }
          </Grid>
        </div>
      </div> */}
      </div>
          }
    </div>
  )
}
