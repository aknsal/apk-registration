import { Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import "./EventAboutContainer.css"

export default function EventAboutContainer({ eventDetails }) {

  const [participantList, setParticipantList] = useState([]);
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([
    {headerName: "Name", field: "fullName", width: 150},
    {headerName:"Email",  field: "email",width: 220},
    {headerName:"Username",  field: "username",width: 100},
    {headerName:"College",  field: "college",width: 250},
  ]);
  const [areColumnsSet, setAreColumnsSet] =useState(false);
  const [areRowsSet, setAreRowsSet] =useState(false);
  const user = useSelector(state => state.app.authUser)

  // const rows= [
  //   { id: 1, col1: 'Hello', col2: 'World' },
  //   { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
  //   { id: 3, col1: 'MUI', col2: 'is Amazing' },
  // ];
  
  // const columns = [
  //   { field: 'col1', headerName: 'Column 1', width: 150 },
  //   { field: 'col2', headerName: 'Column 2', width: 150 },
  // ];

  useEffect(async()=>{

    if(user&&Object.keys(eventDetails).length !== 0){
      if(Object.keys(eventDetails).length !== 0 && eventDetails.Inputs.length !==0 && !areColumnsSet ){
        // setColumns(col => col.concat.eventDetails.Inputs)
        setAreColumnsSet(true)
        if(eventDetails.Inputs.find(ele => ele.inputVar==="whatsappNumber")){
          setColumns (col => [...col,{headerName: "WhatsApp Number", field: "whatsappNumber", width: 120}])
        }
        if(eventDetails.Inputs.find(ele => ele.inputVar==="githubUsername")){
          setColumns (col => [...col,{headerName: "Github Username", field: "githubUsername", width: 120}])
        }
        if(eventDetails.teamSize!=="1"){
          setColumns (col => [...col,{headerName: "Team Name", field: "teamName", width: 120}])
        }
      }
      const eventWithParticipants = await axios.get(`http://localhost:5000/api/getparticipants/${eventDetails.eventCode}`,{withCredentials:true}).catch(err=>console.log("Error getting participants",err))
      if(eventWithParticipants && eventWithParticipants.data && !areRowsSet){
        setParticipantList(eventWithParticipants.data.Users)
        const showData = eventWithParticipants.data.Users;
        if(eventDetails.teamSize!=="1"){

          showData.forEach(ele => {
            ele.teamName = ele.EventUserJuction.teamName;
          });
        }
        setAreRowsSet(true);
        
        // console.log(eventWithParticipants.data.Users);
        setRows(rows=> [...showData])
      }
      
    }
  },[eventDetails,user])

  return (
    <div className='event-about-container'>

      <div className='event-about-container-section'>
        <div className='event-about-container-heading'>
          <Typography variant='h4'>About</Typography>
        </div>
        <hr />
        <div className='event-about-container-text'>
          {eventDetails.about}
        </div>
      </div>

      <div className='event-about-container-section'>
        <div className='event-about-container-heading'>
          <Typography variant='h4'>Prizes</Typography>
        </div>
        <hr />
        <div className='event-about-container-text'>
          <Typography> {eventDetails.prizes} </Typography>

        </div>
      </div>

      {user && user.isOrganiser && participantList ? 
      <div className='event-about-container-section'>
      <div className='event-about-container-heading'>
        <Typography variant='h4'>Participants</Typography>
      </div>
      <hr />

      { rows.length && columns.length ?
      <div style={{ height: 300, width: '100%' }}>
          <DataGrid rows={rows} columns={columns} components={{ Toolbar: GridToolbar }} />
      </div>
: null
      }

    </div>  
    :null
    }
      
    </div>
  )
}
