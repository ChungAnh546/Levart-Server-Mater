import otpService from '../services/otpService';
let handleCreateOtp = async (req, res) => {

    let message = await otpService.insertOtp(req.body.email, req.body.otp);




    if (message.errCode === 0) {
        return res.status(200).json(message);
    } else {
        return res.status(400).json(message);
    }


}
module.exports = {
    handleCreateOtp: handleCreateOtp
}