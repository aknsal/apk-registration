import { Typography } from '@mui/material'
import React from 'react'
import "./Homepage.css"


export default function Homepage() {
  return (
    <div className='homepage-super-container'>
      <div className='homepage-container'>

      <p class="glitch">
        <span aria-hidden="true">Aparoksha</span>
        Aparoksha
        <Typography variant='h4'> Annual Techfest of IIIT Allahabd </Typography>
        <span aria-hidden="true">Aparoksha</span>
      </p>

      <Typography variant='h5'> Log in to get into the Rip Roaring World of Aparoksha. </Typography>

      </div>
    </div>
  )
}
