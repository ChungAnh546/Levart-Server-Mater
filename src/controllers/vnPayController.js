import vnPayService from "../services/vnPayService.js";

const vnPay_Payment = (req, res, next) => {

    var vnp_Params = req.query;
    var secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);
    // var config = require('config');
    var secretKey = 'JJOENCOSZYKDXLZXTCVNAJZHFTXILJKG';
    var querystring = require('qs');
    var signData = querystring.stringify(vnp_Params, { encode: false });
    var crypto = require("crypto");
    var hmac = crypto.createHmac("sha512", secretKey);
    var signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");


    if (secureHash === signed) {
        var orderId = vnp_Params['vnp_TxnRef'];
        var rspCode = vnp_Params['vnp_ResponseCode'];
        //Kiem tra du lieu co hop le khong, cap nhat trang thai don hang va gui ket qua cho VNPAY theo dinh dang duoi
        res.status(200).json({ RspCode: '00', Message: 'success' })
    }
    else {
        res.status(200).json({ RspCode: '97', Message: 'Fail checksum' })
    }

    // var tmnCode = 'KFXXYZ3X';
    // var secretKey = 'JJOENCOSZYKDXLZXTCVNAJZHFTXILJKG';
    // var vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
    // var returnUrl = 'http://localhost:3000/payment/1';

    //const { amount, orderInfo, returnUrl, cancelUrl } = req.body;


}

module.exports = { vnPay_Payment: vnPay_Payment }