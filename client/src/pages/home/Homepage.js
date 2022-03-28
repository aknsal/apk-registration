import { Typography } from '@mui/material'
import React from 'react'
import "./Homepage.css"
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


export default function Homepage() {

  const user = useSelector(state => state.app.authUser);

  return (
    <div className='homepage-super-container'>
      <div className='homepage-container'>

      <p class="glitch">
        <span aria-hidden="true">Aparoksha</span>
        Aparoksha
        <Typography variant='h4'> Annual Techfest of IIIT Allahabad </Typography>
        <span aria-hidden="true">Aparoksha</span>
      </p>
      {
        user?
        <div>
        <Typography variant='h5'> Welcome to the world of Aparoksha</Typography>
        <Typography>Go on <Typography style={{textDecoration:"none", color:"#c1f5b8"}} component={Link} to={"/events"} color="success" textDecoration="none">Events Tab</Typography> and register for some events</Typography>
        </div>
        :
        <Typography variant='h5'> Log in to get into the Rip Roaring World of Aparoksha. </Typography>
        
      }
      

      </div>
    </div>
  )
}
