import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import EventAboutContainer from '../../components/eventPage/EventAboutContainer/EventAboutContainer'
import EventContainerMain from '../../components/eventPage/EventContainerMain/EventContainerMain'
import EventDetailsContainer from '../../components/eventPage/EventDetailsContainer/EventDetailsContainer'
import axios from "axios";
import "./EventPage.css"
import { useSelector } from 'react-redux'
import { Grid } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress';

export default function EventPage() {
  let eventCodeOb = useParams();
  const [eventDetails, setEventDetails] = useState({});
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // console.log(eventCode.id);

  const user = useSelector(state => state.app.authUser);

  useEffect(async()=>{
    setIsLoading(true);
    const response = await axios.get(`/api/getevent/${eventCodeOb.eventCode}`).catch((err) => {
      console.log(`Error Getting Event ${eventCodeOb.eventCode}`, err);
    });

    if (response && response.data) {
      console.log("Event Recieved",response.data);
      setEventDetails(response.data.event)
    }
    setIsLoading(false);
  },[])

  useEffect(async() => {
    if(eventDetails && user){
      if(user.Events.find(ele => ele.id===eventDetails.id )){
        setIsRegistered(true);
      }
    }
  },[user,eventDetails])


  return (
    <div className='event-page-container-layout-super'>
      {
        isLoading ?
        <div>
          <br/>
          <br/>
        <CircularProgress className='circular-progress' />
          </div>
        :
        <div>
        {(eventDetails && user) ?  
          <div className="event-page-container-layout">
          <Grid container spacing={4} >
              <Grid item lg={12}>
    
              <EventContainerMain style={{flexGrow:"1"}} xs={12} sm={12} md={12} lg={12} xl={12} eventDetails={eventDetails} isRegistered={isRegistered}  />
              </Grid>
              <Grid item xs={12} lg={9}>
              <EventAboutContainer eventDetails={eventDetails} />
              </Grid>
    
              <Grid item xs={12} lg={3}>
              <EventDetailsContainer eventDetails={eventDetails} isRegistered={isRegistered}/>
              </Grid>
    
          </Grid>
        </div>
        : <div className="event-page-container-layout">
          <Grid container spacing={4} >
              <Grid item lg={12}>
    
              <EventContainerMain style={{flexGrow:"1"}} xs={12} sm={12} md={12} lg={12} xl={12} eventDetails={eventDetails} isRegistered={isRegistered}  />
              </Grid>
              <Grid item xs={12} lg={9}>
              <EventAboutContainer eventDetails={eventDetails} />
              </Grid>
    
              <Grid item xs={12} lg={3}>
              <EventDetailsContainer eventDetails={eventDetails} isRegistered={isRegistered}/>
              </Grid>
    
          </Grid>
          
          
      </div>
        }
        </div>
      }


      
      
    </div>
  )
}
