import React, { useState } from "react";
import "./Reservation.css";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

export default function Reservation() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="container_reservation">
      <div className="menuReservation">
        <button className="btnRoom">Room</button>
        <button className="btnReser">Reservation</button>
        <button className="btnUser">User</button>
        <button className="btnMess">Messenger</button>
      </div>
      <div className="reservation_table">
        <div className="reservation_header">
          <div>Total</div>
          <div>Reservation number</div>
          <div>Phone number</div>
          <div>Room number</div>
          <Link to="/createReservation">
            {" "}
            <button className="btnAdd">Add new reservation</button>
          </Link>
          <div></div>
        </div>
        <div className="reservation_row">
          <div>1</div>
          <div>001</div>
          <div>0961596435</div>
          <div>004</div>

          <div>
            <Link to ="/updateReser">
              <button className="btnUpdate">Update</button>
            </Link>
            <button className="btnDel" onClick={handleShow}>
              Delete
            </button>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title
                  style={{
                    color: "#ff6347",
                    textAlign: "center",
                    fontSize: "20px",
                  }}
                >
                
                </Modal.Title>
              </Modal.Header>
              <Modal.Body
                style={{
                  color: "#black",
                  textAlign: "center",
                  fontSize: "18px",
                }}
              >
                Are you sure delete this reservation?
              </Modal.Body>
              <Modal.Footer>
                <Button className="btnYes"
                  variant="secondary"
                 
                  onClick={handleClose}
                >
                  Yes
                </Button>
                <Button className="btnNo"
                  variant="primary"
                  
                  onClick={handleClose}
                >
                  No
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}
