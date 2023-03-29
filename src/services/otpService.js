import db from "../models/index";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

let insertOtp = (email, otp) => {
    return new Promise(async (resolve, reject) => {
        try {

            let hashOtp = await bcrypt.hashSync(otp, salt);
            let OTP = await db.Otp.create({
                email: email,
                otp: hashOtp
            });
            resolve({
                errCode: 0,
                errMessage: '',
                message: 'OK',

            })
        } catch (error) {
            reject(error)
        }
    })

}

let validOtp = (otp, hashOtp) => {
    return new Promise(async (resolve, reject) => {
        try {

            let isValid = await bcrypt.compareSync(otp, hashOtp);
            resolve(isValid)
        } catch (error) {
            reject(error)
        }
    })

}
module.exports = {
    insertOtp: insertOtp,
    validOtp: validOtp
}