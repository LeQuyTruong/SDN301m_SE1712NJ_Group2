// const Booking = require("./../../models/Booking.model");
// const Room = require("./../../models/Room.model");
// const Discount = require("./../../models/Discount.model");

// const nodemailer =  require('nodemailer');
// const moment = require("moment");
// const axios = require("axios");


// async function sendBookingConfirmationEmail(bookingData) {
//     try {
//         // Tạo một đối tượng transporter để gửi email
//         let transporter = nodemailer.createTransport({
//             host: 'smtp.gmail.com',
//             port: 465,
//             secure: true, // sử dụng SSL
//             auth: {
//                 user: 'giangpham.sdn@gmail.com', // Địa chỉ email của bạn
//                 pass: 'pzang1611' // Mật khẩu email của bạn
//             }
//         });

//         // Chuẩn bị nội dung email
//         let content = `
//             <div style="background-color: #003375; margin: 0 auto; max-width: 600px; ">
//                 <div style="padding: 10px; background-color: white;">
//                     <h4 style="color: #0d6efd">Xin chào ${bookingData.customer_name}</h4>
//                     <p style="color: black">Cảm ơn bạn đã đặt phòng tại chúng tôi. Dưới đây là thông tin chi tiết về đặt phòng của bạn:</p>
                    
//                     <span style="color: black">Tên khách hàng: <b>${bookingData.customer_name}</b></span> <br>
//                     <span style="color: black">Ngày nhận phòng: <b>${bookingData.check_in}</b></span> <br>
//                     <span style="color: black">Ngày trả phòng: <b>${bookingData.check_out}</b></span><br>
//                     <span style="color: black">Hạng phòng: <b>${bookingData.room_name}</b></span> <br>
//                     <span style="color: black">Số lượng: <b>${bookingData.amount_of_people}</b></span><br>
//                     <span style="color: black">Tổng tiền: <b>${bookingData.total_money} VNĐ</b></span><br>
//                     <span style="color: black">Phương thức thanh toán: <b>Chuyển khoản</b></span><br>
//                     <p>Vui lòng kiểm tra thông tin trên và đảm bảo rằng chúng là chính xác. Nếu có bất kỳ sai sót nào hoặc bạn có bất kỳ yêu cầu nào khác, xin hãy liên hệ với chúng tôi ngay để chúng tôi có thể hỗ trợ bạn tốt nhất.</p>
//                     <p>Trân trọng,</p>
//                     <p><b>Tên Khách Sạn</b></p>
//                 </div>
//             </div>
//         `;

//         // Thông tin cơ bản về email
//         let mailOptions = {
//             from: 'giangpham.sdn@gmail.com', // Địa chỉ email người gửi
//             to: bookingData.customer_email, // Địa chỉ email người nhận
//             subject: 'Xác nhận đặt phòng', // Tiêu đề email
//             html: content // Nội dung email dưới dạng HTML
//         };

//         // Gửi email và xử lý kết quả
//         let info = await transporter.sendMail(mailOptions);
//         console.log('Email sent: ' + info.response);
//     } catch (error) {
//         console.error('Error sending email:', error);
//     }
// }

// // Sử dụng hàm để gửi email sau khi đặt phòng thành công
// let bookingData = {
//     customer_name: 'Tên khách hàng',
//     customer_email: 'email_khach_hang@gmail.com',
//     check_in: '2024-03-20',
//     check_out: '2024-03-25',
//     room_name: 'Loại phòng',
//     amount_of_people: 2,
//     total_money: 5000000 // giá tiền tổng cộng
// };

// sendBookingConfirmationEmail(bookingData);
