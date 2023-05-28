
import sendMailService from "../services/sendMailService";
let hashSendGmailBookTour = async (req, res) => {
    let message = await sendMailService.handleSendGmailBookTour(req.body);
    return res.status(message.code).json({
        errCode: message.errCode,

    });
}
module.exports = {
    hashSendGmailBookTour: hashSendGmailBookTour

}