
import sendMailService from "../services/sendMailService";
let hashSendGmailBookTour = async (req, res) => {
    let message = await sendMailService.handleSendGmailBookTour(req.body);
    return res.status(message.code).json({
        errCode: message.errCode,
        billId: message.billId
    });
}
let handleSendGmailBookTourByMoney = async (req, res) => {
    let message = await sendMailService.handleSendGmailBookTourByMoney(req.body);
    return res.status(message.code).json({
        errCode: message.errCode,
        billId: message.billId
    });
}
module.exports = {
    hashSendGmailBookTour: hashSendGmailBookTour,
    handleSendGmailBookTourByMoney: handleSendGmailBookTourByMoney

}