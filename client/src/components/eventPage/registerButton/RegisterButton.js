import React from 'react'
import { Button } from '@mui/material'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';

export default function RegisterButton() {
  return (
    <Button variant="contained" color="success" endIcon={<CheckCircleOutlinedIcon />} size="large" >
              Registered
    </Button>
  )
}
