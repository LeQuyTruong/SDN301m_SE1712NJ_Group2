const axios = require('axios');
const crypto = require('crypto');
const querystring = require('querystring');
exports.createPayment = async (req, res) => {
  try {
    const vnpUrl = "http://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
    const returnUrl = "http://localhost:3000/payment/vnpay_return"; //Change to your return url
    const ipAddr = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
  
    const tmnCode = process.env.vnp_TmnCode;
    const secretKey = process.env.vnp_HashSecret;
   
    let vnp_Params = {};
    vnp_Params['vnp_Version'] = '2';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    vnp_Params['vnp_TxnRef'] = Date.now();
    vnp_Params['vnp_OrderInfo'] = "order info";
    vnp_Params['vnp_OrderType'] = "billpayment";
    vnp_Params['vnp_Amount'] = req.body.amount * 100;
    vnp_Params['vnp_CurrCode'] = "VND";
    vnp_Params['vnp_BankCode'] = "NCB";
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;

    vnp_Params = sortObject(vnp_Params);
    const signData = secretKey + querystring.stringify(vnp_Params, { encode: false });
    const secureHash = crypto.createHash('sha256').update(signData).digest('hex');

    vnp_Params['vnp_SecureHashType'] = 'SHA256';
    vnp_Params['vnp_SecureHash'] = secureHash;
    const vnpayData = vnpUrl + '?' + querystring.stringify(vnp_Params, { encode: true });

    //send payment url to the client
    res.status(200).json({ code: '00', data: vnpayData });
  } catch (error) {
    res.status(500).json({ code: '99', error });
  }
}
exports.vnpay_return = async (req, res) => {
  const vnp_Params = req.query;
  const secureHash = vnp_Params['vnp_SecureHash'];

  delete vnp_Params['vnp_SecureHash'];
  delete vnp_Params['vnp_SecureHashType'];

  vnp_Params = sortObject(vnp_Params);
  const secretKey = process.env.vnp_HashSecret;
  
  const signData = secretKey + querystring.stringify(vnp_Params, { encode: false });
  const checkSum = crypto.createHash('sha256').update(signData).digest('hex');

  // check if payment success or not
  if (secureHash === checkSum) {
    //success action here

    res.status(200).json({ code: '00', message: 'Payment Success' });
  } else {
    //error action here

    res.status(200).json({ code: '97', message: 'Invalid Checksum' });
  }
}