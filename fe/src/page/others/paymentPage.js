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
          <div class="text-center">
            <iframe style={{ alignContent: 'center', height: "650px", width: "450px" }} src={`https://nhantien.momo.vn/0886031112/${bookingInfo.total_money}`}></iframe>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};