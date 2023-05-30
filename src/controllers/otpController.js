import otpService from '../services/otpService';
import userService from '../services/userService';
const jwt = require('jsonwebtoken');


let handleCreateOtp = async (req, res) => {

    let message = await otpService.insertOtp(req.body.email, req.body.otp);
    return res.status(message.code).json(message);



}
let handleSendOTPWithSMS = (req, res) => {
    //phone
    const accountSid = "AC8de06f10bae09323f71ecabe1d944b30";
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const verifySid = "VA75e8f1e53519a2846a806caa319a74db";
    const client = require("twilio")(accountSid, authToken);
    if (req.body.phone && req.body.phone !== '') {
        client.verify.v2
            .services(verifySid)
            .verifications.create({ to: "+84" + req.body.phone, channel: "sms" })
            .then((verification) => {
                console.log(verification.status);
                return res.status(200).json({
                    errCode: 0,
                    status: verification.status,
                    message: "Submitted successfully"
                });
            }
            );
    } else {
        return res.status(400).json({
            errCode: 1,
            status: "",
            errMessage: "Missing required parameters"
        })
    }
    // .then(() => {
    //     const readline = require("readline").createInterface({
    //         input: process.stdin,
    //         output: process.stdout,
    //     });
    //     readline.question("Please enter the OTP:", (otpCode) => {
    //         client.verify.v2
    //             .services(verifySid)
    //             .verificationChecks.create({ to: "+84987115786", code: otpCode })
    //             .then((verification_check) => console.log(verification_check.status))
    //             .then(() => readline.close());
    //     });
    // });
}
let handelVerifyOTPWithPhone = (req, res) => {
    //phone , code
    if (req.body.code && req.body.code !== '' && req.body.phone && req.body.phone !== '') {
        const accountSid = "AC8de06f10bae09323f71ecabe1d944b30";
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const verifySid = "VA75e8f1e53519a2846a806caa319a74db";
        const client = require("twilio")(accountSid, authToken);
        const statusVerify = "";
        const otpCode = req.body.code;
        const readline = require("readline").createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        // readline.question(() => {
        try {
            client.verify.v2
                .services(verifySid)
                .verificationChecks.create({ to: "+84" + req.body.phone, code: otpCode })
                .then(async (verification_check) => {
                    //console.log(verification_check.status);
                    if (verification_check.status !== 'pending') {
                        await userService.getUserByPhone('0' + req.body.phone).then((user) => {
                            if (user.users) {
                                const accessToken = jwt.sign(user.users, process.env.ACCESS_TOKEN_SECRET, {
                                    expiresIn: "360000s"

                                });
                                return res.status(200).json(
                                    {
                                        errCode: 0,
                                        status: verification_check.status,
                                        errMessage: "",
                                        user: user.users,
                                        accessToken: accessToken ? accessToken : null
                                    }
                                );
                            }

                        });

                    }
                    return res.status(200).json(
                        {
                            errCode: 0,
                            status: verification_check.status,
                            errMessage: ""
                        }
                    );
                });
        } catch (error) {
            return res.status(400).json(
                {
                    errCode: 1,
                    errMessage: "VerificationCheck was not found"
                });
        }

        //.then(() => readline.close());
        // });

    } else {
        return res.status(400).json(
            {
                errCode: 1,
                errMessage: "Missing required parameter"
            }
        );
    }
}
module.exports = {
    handleCreateOtp: handleCreateOtp,
    handleSendOTPWithSMS: handleSendOTPWithSMS,
    handelVerifyOTPWithPhone: handelVerifyOTPWithPhone

}