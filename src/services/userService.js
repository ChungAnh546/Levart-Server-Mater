import db from "../models/index";
import bcrypt from "bcryptjs";
import OtpGenerator from "otp-generator";
import mailer from '../utils/mailer';
import otpService from "./otpService"
const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {

            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve({
                code: 200,
                errCode: 0,
                hashPassword: hashPassword
            });
        } catch (error) {
            reject(error)
        }
    })
}
let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {

            let isExist = await checkUserEmail(email);//email có tồn tại
            let userData = {}
            if (isExist) {
                let user = await db.User.findOne({
                    attributes: ['id', 'email', 'roleId', 'password'],//lấy thuộc tính cần thiết
                    where: {

                        email: email//điều kiện
                    },
                    raw: true //chuyển sang dạng object dạng thô 
                });
                if (user) {
                    //check hamf băm
                    let check = await bcrypt.compareSync(password, user.password);
                    delete user.password;//xóa thuộc tính pass
                    if (check) {

                        userData = {
                            code: 201,
                            errCode: 0,
                            errMessage: `Ok`,
                            user: user
                        }

                    } else {
                        userData = {
                            code: 400,
                            errCode: 3,
                            errMessage: `Wrong password`,
                            user: user
                        }
                    }

                } else {
                    userData = {
                        code: 404,
                        errCode: 2,
                        errMessage: `User's not found`

                    }
                    resolve(userData)
                }

            }
            else {
                userData = {
                    code: 400,
                    errCode: 1,
                    errMessage: `Your's email isn't exist is your system, Plz try other email! `

                };
                resolve(userData)

            }
            resolve(userData)
        } catch (error) {
            reject(error)
        }

    })
}
let compareUserPassword = () => {

    return new Promise((resolve, reject) => {
        try {
            resolve()
        } catch (error) {
            reject(error)
        }
    })
}
let checkUserEmail = (userEmail) => {

    return new Promise(async (resolve, reject) => {
        try {

            let user = await db.User.findOne(
                {

                    where: { email: userEmail }



                }
            )
            if (user) { resolve(true) } else {
                resolve(false)
            }

        } catch (error) {
            reject(error)
        }
    })
}
let checkUserPhone = (userPhone) => {

    return new Promise(async (resolve, reject) => {
        try {

            let user = await db.User.findOne(
                {

                    where: { phoneNumber: userPhone }



                }
            )
            if (user) { resolve(true) } else {
                resolve(false)
            }

        } catch (error) {
            reject(error)
        }
    })
}
let getAllUsers = (userId) => {

    return new Promise(async (resolve, reject) => {

        try {

            let users = '';
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                });
            }
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            resolve({
                code: 200,
                errCode: 0,
                users: users
            })
        } catch (error) {
            reject(error)
        }
    })
}
let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!data.email) {
                resolve({
                    code: 400,
                    errCode: 1,
                    errMessage: 'Missing required parameters',
                })

            }
            let checkEmail = await checkUserEmail(data.email);
            let checkPhone = await checkUserPhone(data.phoneNumber);
            if (checkEmail === true || checkPhone === true) {

                resolve({
                    code: 400,
                    errCode: 2,
                    errMessage: 'Your email or phone is already in used, Plz try another email ',


                })
            } else {
                let hashPasswordFromBcrypt = await hashUserPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt.hashPassword,
                    fullName: data.fullName,

                    address: data.address,
                    phoneNumber: data.phoneNumber,
                    gender: data.gender === '1' ? true : false,
                    roleId: data.roleId,

                })
                resolve({
                    code: 201,
                    errCode: 0,
                    errMessage: '',
                    message: 'OK',

                })
            }

        } catch (error) {
            reject(error)
        }
    })
}
let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        let user = await db.User.findOne({
            where: { id: userId }
        })
        if (!user) {
            resolve({
                code: 404,
                errCode: 2,
                errMessage: `The user isn't exist`
            })

        }
        await db.User.destroy({
            where: { id: userId }
        })
        resolve({
            code: 200,
            errCode: 0,
            message: `The user is deleted`
        })

    })
}
let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    code: 400,
                    errCode: 1,
                    Message: 'Missing required parameters!'
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id }, raw: false
            })
            if (user) {
                user.fullName = data.fullName;
                user.address = data.address;
                await user.save();
                resolve({
                    code: 200,
                    errCode: 0,
                    Message: 'Update the user succeeds!'
                })


            } else {
                resolve({
                    code: 404,
                    errCode: 2,
                    Message: `User's not found!`
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
let verify = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = checkUserEmail(email);
            if (check) {
                let user = await db.User.findOne({
                    where: { email: email }, raw: false
                });
                user.verify = 'S3';
                user.save();
                resolve(true);
            }

        } catch (error) {
            reject(error)
        }
    })
}
let regisUser = (email) => {
    return new Promise(async (resolve, reject) => {
        try {

            let user = await db.User.findOne({
                where: { email: email }
            })
            if (user) {
                resolve({
                    ///400
                    code: 409,
                    errCode: 1,
                    errMessage: 'This email is already in user!'
                })
            } else {
                let OTP = OtpGenerator.generate(6,
                    {
                        digits: true,
                        lowerCaseAlphabets: false,
                        upperCaseAlphabets: false,
                        specialChars: false,
                    }
                )
                await otpService.insertOtp(email, OTP);
                mailer.sendMail(email, "LEVART-Travel to your favorite city with respectful of the environment",
                    `<div style="text-align: center;">
                    <div style="display: inline-block; text-align: center; padding: 20px; border: 1px solid #ccc; border-radius: 10px; margin: 0 auto;">
                      <div >Bạn đang đăng kí tài khoản LEVART WORLD bằng email này.</div>
                      <div >Mã xác nhận của bạn là:</div>
                      <h2 >${OTP}</h2>
                      <h4 >Mã xác nhận này sẽ hết hạn trong 2 phút.</h4>
                      <div >Nếu bạn không tạo yêu cầu này vui lòng liên hệ với chúng tôi để được hỗ trợ kiểm tra.</div>
                    </div>
                  </div>`)

                resolve({
                    code: 200,
                    errCode: 0,
                    errMessage: ''

                })
            }



        } catch (error) {
            reject(error)
        }
    })
}
let createOtp = (email) => {
    return new Promise(async (resolve, reject) => {
        try {


            let OTP = OtpGenerator.generate(6,
                {
                    digits: true,
                    lowerCaseAlphabets: false,
                    upperCaseAlphabets: false,
                    specialChars: false,
                }
            )
            await otpService.insertOtp(email, OTP);
            mailer.sendMail(email, "LEVART-Travel to your favorite city with respectful of the environment",
                `<div style="text-align: center;">
                    <div style="display: inline-block; text-align: center; padding: 20px; border: 1px solid #ccc; border-radius: 10px; margin: 0 auto;">
                      <div >LEVART WORLD hân hạnh được phục vụ quý khách.</div>
                      <div >Mã xác nhận của bạn là:</div>
                      <h2 >${OTP}</h2>
                      <h4 >Mã xác nhận này sẽ hết hạn trong 2 phút.</h4>
                      <div >Nếu bạn không tạo yêu cầu này vui lòng liên hệ với chúng tôi để được hỗ trợ kiểm tra.</div>
                    </div>
                  </div>`)

            resolve({
                code: 200,
                errCode: 0,
                errMessage: ''

            })




        } catch (error) {
            reject(error)
        }
    })
}
let verifyOtp = (email, otp) => {
    return new Promise(async (resolve, reject) => {
        try {


            let otpHolder = await db.Otp.findOne({
                where: { email: email },
                raw: false
            })
            if (!otpHolder) {
                resolve({
                    code: 400,
                    errCode: 1,
                    errMessage: 'Expired OTP!'
                })
            }
            let getAllOtp = await db.Otp.findAll({
                where: {
                    email: email

                }, raw: true
            });
            let isValid = {};
            for (let index = 0; index < getAllOtp.length; index++) {
                const element = getAllOtp[index].otp;
                isValid = await otpService.validOtp(otp, element);
                if (isValid.isValid) { break; }
                console.log(isValid.isValid);

            }
            console.log(getAllOtp);
            if (!isValid.isValid) {
                resolve({
                    code: 400,
                    errCode: 2,
                    errMessage: 'Invalid OTP!'
                })

            }
            if (isValid.isValid && (email === otpHolder.email)) {
                //create user
                //delete otp
                await db.Otp.destroy({
                    where: { email: email }
                })
                //getAllOtp.destroy();
                resolve({
                    code: 200,
                    errCode: 0,
                    errMessage: 'ok',

                })
            }
        } catch (error) {
            reject(error)
        }
    })

}
module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUserData: updateUserData,
    verify: verify,
    regisUser: regisUser,
    verifyOtp: verifyOtp,
    createOtp: createOtp
}