import React from "react";
import "./CreateReser.css"
export default function CreateReser() {
  return (
    <div className="container_reservation">
      <div className="menuReservation">
        <button className="btnRoom">Room</button>
        <button className="btnReser">Reservation</button>
        <button className="btnUser">User</button>
        <button className="btnMess">Messenger</button>
      </div>
      
        <div className="formAdd">
        <h1>Add new reservation</h1>
        <p>Room number</p>
        <input type="text" placeholder="Enter room number"></input>
        <p>Phone number</p>
        <input type="text" placeholder="Enter phone number"></input>
        <button className="createReser">Create</button>
        </div>

    </div>
  );
}
