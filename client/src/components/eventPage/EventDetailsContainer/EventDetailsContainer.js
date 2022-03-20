import { Paper, Typography } from '@mui/material'
import React from 'react'
import RegisterButton from '../registerButton/RegisterButton'
import date from 'date-and-time';

import "./EventDetailsContainer.css"
import CustomizedDialogs from '../../registrationForm/RegistrationForm';

export default function EventDetailsContainer({eventDetails,isRegistered}) {
  
  


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
      {isRegistered?
      <RegisterButton />
    :<CustomizedDialogs eventDetails={eventDetails} />}
      <div className='event-details-container-heading'>
        <Typography variant='h5'>Contact</Typography>
      </div>
      <div className='event-details-container-items'>
        <div className='event-details-container-item'>
          <Typography><b>Aditya Verma: </b>9321783271</Typography>
        </div>
        <div className='event-details-container-item'>
          <Typography><b>Mudit Agarwal: </b>9474387422</Typography>
        </div>
        
      </div>
    </Paper>

  )
}
