import db from "../models/index";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {

            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
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
                    attributes: ['email', 'roleId', 'password'],//lấy thuộc tính cần thiết
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
                            errCode: 0,
                            errMessage: `Ok`,
                            user: user
                        }

                    } else {
                        userData = {
                            errCode: 3,
                            errMessage: `Wrong password`,
                            user: user
                        }
                    }

                } else {
                    userData = {
                        errCode: 2,
                        errMessage: `User's not found`

                    }
                    resolve(userData)
                }

            }
            else {
                userData = {
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
            resolve(users)
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
                    errCode: 1,
                    errMessage: 'Missing required parameters',
                })

            }
            let check = await checkUserEmail(data.email)
            if (check === true) {
                resolve({
                    errCode: 2,
                    errMessage: 'Your email is already in used, Plz try another email ',


                })
            } else {
                let hashPasswordFromBcrypt = await hashUserPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    fullName: data.fullName,

                    address: data.address,
                    phoneNumber: data.phoneNumber,
                    gender: data.gender === '1' ? true : false,
                    roleId: data.roleId,

                })
                resolve({
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
                errCode: 2,
                errMessage: `The user isn't exist`
            })

        }
        await db.User.destroy({
            where: { id: userId }
        })
        resolve({
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
                    errCode: 0,
                    Message: 'Update the user succeeds!'
                })


            } else {
                resolve({
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
module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUserData: updateUserData,
    verify: verify
}