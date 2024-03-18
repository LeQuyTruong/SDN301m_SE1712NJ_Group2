import React from 'react'
import './UpdateReser.css'
export default function UpdateReser() {
  return (
    <div className="container_reservation">
      <div className="menuReservation">
        <button className="btnRoom">Room</button>
        <button className="btnReser">Reservation</button>
        <button className="btnUser">User</button>
        <button className="btnMess">Messenger</button>
      </div>
      
        <div className="formAdd">
        <h1>Update reservation</h1>
        <p>Room number</p>
        <input type="text" placeholder="Enter room number"></input>
        <p>Phone number</p>
        <input type="text" placeholder="Enter phone number"></input>
        <button className="createReser">Update</button>
        </div>

    </div>
  )
}
