import React from 'react'
import { useSelector } from 'react-redux'

export default function Welcome() {
  const user = useSelector(state => state.app.authUser);
  return (
      <div>
      {user ? <div> Welcome {user.fullName} </div> : <div>Welcome User </div>}
      </div>
    
  )
}
