import otpService from '../services/otpService';
let handleCreateOtp = async (req, res) => {

    let message = await otpService.insertOtp(req.body.email, req.body.otp);





    return res.status(message.code).json(message);



}
module.exports = {
    handleCreateOtp: handleCreateOtp
}