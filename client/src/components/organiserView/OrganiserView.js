import React from 'react'
import { useSelector } from 'react-redux';

export default function OrganiserView({children}) {

  const user = useSelector(state => state.app.authUser);

  return (
    <>
      {user && user.isOrganiser ?  <>{children}</> : null}
    </>
  )
}
