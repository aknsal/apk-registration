import { Typography } from '@mui/material'
import React from 'react'
import "./Tag.css"

export default function Tag({tagName}) {
  return (
    <span className='tag-class'>{tagName} </span>
  )
}
