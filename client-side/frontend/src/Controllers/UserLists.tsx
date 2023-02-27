import React from 'react'
import SessionService from '../Services/SessionService';

function UserLists() {
    const session = new SessionService();
    if (session.isUserLoggedIn() !== true) {
        window.location.href = "/login";
    }
    if(session.getLoggedInUserRole() !== "ROLE_ADMIN"){
        window.location.href = "/home";
    }

  return (
    <div>UserLists</div>
  )
}

export default UserLists