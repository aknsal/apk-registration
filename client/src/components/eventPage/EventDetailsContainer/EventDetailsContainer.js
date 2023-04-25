import { Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import RegisterButton from '../registerButton/RegisterButton'
import date from 'date-and-time';
import { useSelector } from 'react-redux';

import "./EventDetailsContainer.css"
import CustomizedDialogs from '../../registrationForm/RegistrationForm';
import axios from 'axios';
import LoginFirst from '../../login_first/LoginFirst';
import RegisterFirst from '../../register_first/RegisterFirst';

export default function EventDetailsContainer({eventDetails,isRegistered}) {
  const user = useSelector(state => state.app.authUser);

  const [organiser1, setOrganiser1] = useState({});
  const [organiser2, setOrganiser2] = useState({});
  const [organiser3, setOrganiser3] = useState({});

  
  useEffect(async() =>{
    if(Object.keys(eventDetails).length !== 0){
      const organiser1Res = await axios.get(`/api/getorganiser/${eventDetails.organiser1}`).catch("Error getting Organiser")
      if(organiser1Res && organiser1Res.data){
        setOrganiser1(organiser1Res.data);
      }

      if(eventDetails.organiser2){
        const organiser2Res = await axios.get(`/api/getorganiser/${eventDetails.organiser2}`).catch("Error getting Organiser")
      if(organiser2Res && organiser2Res.data){
        setOrganiser2(organiser2Res.data);
      }
    }

      if(eventDetails.organiser3){
        const organiser3Res = await axios.get(`/api/getorganiser/${eventDetails.organiser3}`).catch("Error getting Organiser")
      if(organiser3Res && organiser3Res.data){
        setOrganiser3(organiser3Res.data);
      }


      }
      
    }
  },[eventDetails])


  return (
    <Paper className='event-details-container-paper'>
      <div className='event-details-container-heading'>
        <Typography variant='h5'>Event Details</Typography>
      </div>
      <div className='event-details-container-items'>
        <div className='event-details-container-item'>
          <Typography><b>Event Code:</b> {eventDetails.eventCode}</Typography>
        </div>
        <div className='event-details-container-item'>
          <Typography><b>Date:</b> {date.format(new Date(eventDetails.date), 'DD MMMM')} </Typography>
        </div>
        <div className='event-details-container-item'>
          <Typography><b>Team Size:</b> {eventDetails.teamSize} </Typography>
        </div>
        {/* <div className='event-details-container-item'>
          <Typography><b>Deadline:</b> 6 April</Typography>
        </div> */}
        <div className='event-details-container-item'>
          <Typography><b>Rounds: </b>{eventDetails.rounds}</Typography>
        </div>
      </div>


      {
              user?

              <div>
              {user.username? 
                <div className='event-container-main-details-register-button'>
                  {isRegistered?<RegisterButton/>:<CustomizedDialogs eventDetails={eventDetails} />}
              </div>
              :
              <RegisterFirst />
            }
                </div>
              :
              <div>
                <LoginFirst />
              </div>
            }

      


      <div className='event-details-container-heading'>
        <Typography variant='h5'>Contact</Typography>
      </div>
      <div className='event-details-container-items'>


        {Object.keys(organiser1).length !== 0 ? <div className='event-details-container-item'>
          <Typography><b>{organiser1.fullName}: </b>{organiser1.whatsappNumber}</Typography>
        </div> :null }

        {Object.keys(organiser2).length !== 0 ? <div className='event-details-container-item'>
          <Typography><b>{organiser2.fullName}: </b>{organiser2.whatsappNumber}</Typography>
        </div> :null }

        {Object.keys(organiser3).length !== 0 ? <div className='event-details-container-item'>
          <Typography><b>{organiser3.fullName}: </b>{organiser3.whatsappNumber}</Typography>
        </div> :null }
        
      </div>
    </Paper>

  )
}
