import { Paper, Typography } from '@mui/material'
import React from 'react'
import image from "../../../assets/webkriti.jpg"
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import RotateRightRoundedIcon from '@mui/icons-material/RotateRightRounded';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import date from 'date-and-time';



import "./EventContainerMain.css"
import Tag from './components/tag/Tag';
import RegisterButton from '../registerButton/RegisterButton';
import CustomizedDialogs from '../../registrationForm/RegistrationForm';
import LoginFirst from '../../login_first/LoginFirst';
import RegisterFirst from '../../register_first/RegisterFirst';


export default function EventContainerMain({eventDetails,isRegistered}) {
const user = useSelector(state => state.app.authUser);



  return (
    
      <Paper className="event-container-main-paper">
        <div className="event-container-main-subcontainer">
          <div className='event-container-main-image-container'>
            <img src={eventDetails.image2} className="event-container-main-image" />
          </div>
          <div className='event-container-main-details'>
            
            <div className='event-container-main-details-heading'>
              <Typography variant='h2'>{eventDetails.eventName}</Typography>
            </div>
            <div className='event-container-main-details-details'>
              <div className='event-container-main-details-details-info'>
                <CalendarTodayOutlinedIcon fontSize="small" /> <Typography className='event-container-main-details-details-info-text'>{date.format(new Date(eventDetails.date), 'DD MMMM')}</Typography>
              </div>
              <div className='event-container-main-details-details-info'>
                <RotateRightRoundedIcon fontSize="small" /> <Typography className='event-container-main-details-details-info-text'>{eventDetails.rounds} Rounds</Typography>
              </div>
              
                {eventDetails.teamSize==="1"? 
                <div className='event-container-main-details-details-info'> 

                  <PersonOutlineOutlinedIcon fontSize="small" /> <Typography className='event-container-main-details-details-info-text'>Individual</Typography>
                </div>
                :
                <div className='event-container-main-details-details-info'> 
                <PeopleAltOutlinedIcon fontSize="small" /> <Typography className='event-container-main-details-details-info-text'>{eventDetails.teamSize}</Typography>
                  </div>
              }
                
            </div>

              <div className='event-container-main-details-tags'>
                <Tag tagName={eventDetails.category} />
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
              
            
          </div>
        </div>
      </Paper>
    
  )
}
