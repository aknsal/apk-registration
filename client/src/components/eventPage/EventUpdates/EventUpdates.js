import { Box, Button, Checkbox, CircularProgress, FormControlLabel, FormGroup, IconButton, Input, Modal, Paper, TextField, Typography } from '@mui/material'
import AddSharpIcon from '@mui/icons-material/AddSharp';
import React, { useEffect, useState } from 'react'
import "./EventUpdates.css"
import OrganiserView from '../../organiserView/OrganiserView';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
export default function EventUpdates({eventCode}) {

  const [openNewupdate, setOpenNewUpdate] = useState(false)
  const [notificationText, setNotificationText] = useState('')
  const [sendingNotification, setSendingNotification] = useState(false)
  const [eventUpdates, setEventUpdates] = useState([])

  // const eventUpdates = [{created_at: "26 July, 5:50PM", message:"Hello"}]

  async function getEventsUpdate(){
    const getEventUpdatesUrl = `/api/get-updates/${eventCode}`
    const response = await axios.get(getEventUpdatesUrl, {withCredentials:true}).catch(err => {console.log("Error occured", err)})
    console.log(response?.data);
    if(response && response.data && response.data.eventUpdates)
    setEventUpdates(response.data.eventUpdates)
  }

  function timeAgo(inputDate) {
    const currentDate = new Date();
    const inputDateTime = new Date(inputDate);
  
    const timeDifference = currentDate - inputDateTime;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    if (seconds < 60) {
      return seconds + ' seconds ago';
    } else if (minutes === 1) {
      return 'a minute ago';
    } else if (minutes < 60) {
      return minutes + ' minutes ago';
    } else if (hours === 1) {
      return 'an hour ago';
    } else if (hours < 24) {
      return hours + ' hours ago';
    } else if (days === 1) {
      return 'yesterday';
    } else if (days < 7) {
      return days + ' days ago';
    } else {
      return inputDateTime.toDateString();
    }
  }

  useEffect(()=> {
    getEventsUpdate()
  },[])

  async function handleSendNotification(){
    if(!eventCode){
      return
    }
    const url = `/api/add-event-notification/${eventCode}`
    setSendingNotification(true)
    const response = await axios.post(url, {message:notificationText}, {withCredentials:true}).catch(err => {console.log("Some error occured", err)})
    setSendingNotification(false)
    setOpenNewUpdate(false)
    console.log(response);
  }

  return (
    <Paper className='event-updates-container-paper'>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
      <Typography variant='h5'>Live Updates</Typography>
      <OrganiserView>
        <IconButton onClick={()=> {setOpenNewUpdate(true)}}>
          <AddSharpIcon/>
        </IconButton>
      </OrganiserView>
      
      </div>
      <Modal
        open={openNewupdate}
        onClose={() => {setOpenNewUpdate(false)}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography style={{marginBottom:'1.5rem'}} id="modal-modal-title" variant="h6" component="h2" gutterBottom>
            Push an update
          </Typography>
          <div id="modal-modal-description"  >
            <TextField value={notificationText} onChange={(e) => setNotificationText(e.target.value)} multiline fullWidth maxRows={10}/>
            <FormGroup style={{marginBottom:'1rem'}}>
              <FormControlLabel control={<Checkbox />} label="Send email to participants" />
            </FormGroup>
          </div>

          <Button disabled={sendingNotification} color="success" variant='contained' onClick={handleSendNotification} >Push Notification  {sendingNotification ? <CircularProgress style={{marginLeft:10}} size={14} color='secondary' /> : null} </Button>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
        </Box>
      </Modal>
      
      {console.log(eventUpdates)}
      {eventUpdates.map((item,index) => {
        return (
        <div className='event-updates-container-items'>
          <Typography variant='subtitle2'>{timeAgo(item.createdAt)}:</Typography>
          <Typography variant='body2'>{item.message}</Typography>
          <span></span>
        </div>
        )
      })
      }
    </Paper>
  )
}
