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
import EventUpdates from '../../components/eventPage/EventUpdates/EventUpdates'

export default function EventPage() {
  let eventCodeOb = useParams();
  const [eventDetails, setEventDetails] = useState({});
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // console.log(eventCode.id);

  const user = useSelector(state => state.app.authUser);

  

  useEffect(()=>{
    async function getEventDetails() {
      setIsLoading(true);
      const response = await axios.get(`http://localhost:5000/api/getevent/${eventCodeOb.eventCode}`).catch((err) => {
        console.log(`Error Getting Event ${eventCodeOb.eventCode}`, err);
      });
      if (response && response.data) {
        setEventDetails(response.data.event)
      }
      setIsLoading(false);
    }
    getEventDetails() //gets the event data and updates the states
  },[eventCodeOb])

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
          <Grid container spacing={4}  >
              <Grid item lg={12} style={{flexGrow:"1"}} >
    
              <EventContainerMain xs={12} sm={12} md={12} lg={12} xl={12} eventDetails={eventDetails} isRegistered={isRegistered}  />
              </Grid>
              <Grid item xs={12} lg={9}>
              <EventAboutContainer eventDetails={eventDetails} />
              </Grid>
    
              <Grid item xs={12} lg={3} >
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <EventUpdates eventCode={eventDetails.eventCode}/>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <EventDetailsContainer eventDetails={eventDetails} isRegistered={isRegistered}/>
                  </Grid>
                </Grid>
                
              
              </Grid>
    
          </Grid>
        </div>
        : <div className="event-page-container-layout">
          <Grid container spacing={4} >
              <Grid item lg={12} style={{flexGrow:"1"}}>
    
              <EventContainerMain  xs={12} sm={12} md={12} lg={12} xl={12} eventDetails={eventDetails} isRegistered={isRegistered}  />
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
