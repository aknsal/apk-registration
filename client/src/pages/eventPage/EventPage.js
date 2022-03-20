import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import EventAboutContainer from '../../components/eventPage/EventAboutContainer/EventAboutContainer'
import EventContainerMain from '../../components/eventPage/EventContainerMain/EventContainerMain'
import EventDetailsContainer from '../../components/eventPage/EventDetailsContainer/EventDetailsContainer'
import axios from "axios";
import "./EventPage.css"
import { useSelector } from 'react-redux'

export default function EventPage() {
  let eventCodeOb = useParams();
  const [eventDetails, setEventDetails] = useState({});
  const [isRegistered, setIsRegistered] = useState(false);
  // console.log(eventCode.id);

  const user = useSelector(state => state.app.authUser);

  useEffect(async()=>{
    const response = await axios.get(`/api/getevent/${eventCodeOb.eventCode}`).catch((err) => {
      console.log(`Error Getting Event ${eventCodeOb.eventCode}`, err);
    });

    if (response && response.data) {
      console.log("Event Recieved",response.data);
      setEventDetails(response.data.event)
    }

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
      {(eventDetails && user) ?  
      <div className="event-page-container-layout">
      <EventContainerMain eventDetails={eventDetails} isRegistered={isRegistered} />
      <div className='event-page-container-layout-sub'>
        <EventAboutContainer eventDetails={eventDetails} />
        <div className='event-page-container-layout-space'></div>
        <EventDetailsContainer eventDetails={eventDetails} isRegistered={isRegistered}/>
      </div>
    </div>
    : null
    }
      
    </div>
  )
}
