import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./paymentPage.css"; 
import { BookingService } from "../../services/feService/bookingService.js";
import { customNumber } from "../../common/helper";

export const PaymentPage = () => {
  const { id } = useParams();
  const [bookingInfo, setBookingInfo] = useState(null);

  useEffect(() => {
    if (id) {
      BookingService.getDetailData(id)
        .then((res) => setBookingInfo(res.data))
        .catch((err) => console.log(err));
    }
  }, [id]);

  if (bookingInfo) {
    return (
      <div className="payment-container">
        <div className="info-container">
          <h2>Thông tin booking:</h2>
          <p>Id Booking: {bookingInfo._id}</p>
          <p>Tên khách hàng: {bookingInfo.customer_name || ''}</p>
          <p>Status: {bookingInfo.status}</p>
          <p>Status thanh toán: {bookingInfo.status_payment}</p>
          <p>Nội dung chuyển khoản:{bookingInfo.customer_name} + {bookingInfo._id}</p>
          <p>Giá: {customNumber(bookingInfo.total_money, '.', ' đ')}</p>
        </div>

        <div className="divider"></div>
  
        <div className="qr-container">
          <h2>Thanh toán qua mã QR:</h2>
          <img className="qr-code" src='../momo/qr.jpg' alt="../momo/bef6fb02-6b2b-432d-a898-8119386c8845.jpg" />
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};