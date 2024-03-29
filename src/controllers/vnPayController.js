import vnPayService from "../services/vnPayService.js";
import { Buffer } from "buffer";
const moment = require('moment');
const vnPay_Payment = async (req, res, next) => {
    try {
        var ipAddr = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;

        // var config = require('config');
        var dateFormat = require('dateformat');


        var tmnCode = 'KFXXYZ3X';
        var secretKey = 'JJOENCOSZYKDXLZXTCVNAJZHFTXILJKG';
        var vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
        var returnUrl = 'http://localhost:3000/payment/' + req.body.param;

        var date = new Date();

        var createDate = dateFormat(date, 'yyyymmddHHmmss');
        var orderId = dateFormat(date, 'yyyymmddHHmmsss');
        var amount = req.body.amount;
        var bankCode = "";//req.body.bankCode;

        var orderInfo = req.body.orderDescription;
        var orderType = "billpayment";//req.body.orderType;
        var locale = "vn";//req.body.language;
        if (locale === null || locale === '') {
            locale = 'vn';
        }
        //console.log(ipAddr);
        var currCode = 'VND';
        var vnp_Params = {};
        vnp_Params['vnp_Version'] = '2.1.0';
        vnp_Params['vnp_Command'] = 'pay';
        vnp_Params['vnp_TmnCode'] = tmnCode;
        //vnp_Params['vnp_Merchant'] = '';
        vnp_Params['vnp_Locale'] = locale;
        vnp_Params['vnp_CurrCode'] = currCode;
        vnp_Params['vnp_TxnRef'] = orderId;
        vnp_Params['vnp_OrderInfo'] = orderInfo;
        vnp_Params['vnp_OrderType'] = orderType;
        vnp_Params['vnp_Amount'] = amount * 100;
        vnp_Params['vnp_ReturnUrl'] = returnUrl;
        vnp_Params['vnp_IpAddr'] = ipAddr;
        vnp_Params['vnp_CreateDate'] = createDate;
        if (bankCode !== null && bankCode !== '') {
            vnp_Params['vnp_BankCode'] = bankCode;
        }

        vnp_Params = sortObject(vnp_Params);

        var querystring = require('qs');
        var signData = querystring.stringify(vnp_Params, { encode: false });
        var crypto = require("crypto");
        var hmac = crypto.createHmac("sha512", secretKey);//sha512....256sha 
        var signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");
        vnp_Params['vnp_SecureHash'] = signed;
        vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

        res.redirect(vnpUrl)
        // var tmnCode = 'KFXXYZ3X';
        // var secretKey = 'JJOENCOSZYKDXLZXTCVNAJZHFTXILJKG';
        // var vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
        // var returnUrl = 'http://localhost:3000/payment/1';

        //const { amount, orderInfo, returnUrl, cancelUrl } = req.body;

    } catch (error) {
        console.log(error)
    }


}
function sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}

module.exports = { vnPay_Payment: vnPay_Payment }