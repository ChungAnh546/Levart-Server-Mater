
import userService from '../services/userService';
import mailer from '../utils/mailer';
import bcrypt from "bcryptjs";
const jwt = require('jsonwebtoken');
const salt = bcrypt.genSaltSync(10);
let handleLogin = async (req, res) => {

    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(400).json({
            code: 400,
            errCode: 1,
            errMessage: 'Missing input parameter!'

        })
    }
    let userData = await userService.handleUserLogin(email, password);
    //tao jwt

    if (userData.errCode === 0) {
        const accessToken = jwt.sign(userData.user, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "360000s"

        });
        return res.status(200).json(
            {
                errCode: userData.errCode,
                errMessage: userData.errMessage,
                user: userData.user ? userData.user : {},
                accessToken: accessToken
            }
        )
    }

    return res.status(400).json(
        {
            errCode: userData.errCode,
            errMessage: userData.errMessage,
            user: userData.user ? userData.user : {},
            accessToken: null
        }
    )


}
let handleLoginByPhone = async (req, res) => {

    let phone = req.body.phoneNumber;
    let password = req.body.password;

    if (!phone || !password) {
        return res.status(400).json({
            code: 400,
            errCode: 1,
            errMessage: 'Missing input parameter!'

        })
    }
    let userData = await userService.handleUserLoginByPhone(phone, password);
    //tao jwt

    if (userData.errCode === 0) {
        const accessToken = jwt.sign(userData.user, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "360000s"

        });
        return res.status(200).json(
            {
                errCode: userData.errCode,
                errMessage: userData.errMessage,
                user: userData.user ? userData.user : {},
                accessToken: accessToken
            }
        )
    }

    return res.status(400).json(
        {
            errCode: userData.errCode,
            errMessage: userData.errMessage,
            user: userData.user ? userData.user : {},
            accessToken: null
        }
    )


}
let handleGetAllUsers = async (req, res) => {
    let id = req.query.id;//all,id

    if (!id) {
        return res.status(400).json(
            {
                code: 400,
                errCode: 1,
                errMessage: 'Missing required parameters',
                user: user
            }
        )
    }

    let user = await userService.getAllUsers(id);

    return res.status(user.code).json(
        {

            errCode: 0,
            errMessage: 'Ok',
            user: user.users
        }
    )

}

let handleGetUserByEmail = async (req, res) => {
    let email = req.query.email;//all,id

    if (!email) {
        return res.status(400).json(
            {
                code: 400,
                errCode: 1,
                errMessage: 'Missing required parameters',
                user: user
            }
        )
    }

    let user = await userService.getUserByEmail(email);
    if (user.users) {
        return res.status(user.code ? user.code : 400).json(
            {

                errCode: 0,
                errMessage: 'Ok',
                user: user.users
            }
        )
    } else {
        return res.status(user.code ? user.code : 404).json(
            {

                errCode: 1,
                errMessage: 'User does not exist',
                user: user.users
            })
    }


}
let handleGetUserByPhone = async (req, res) => {
    let phone = req.query.phone;//all,id

    if (!phone) {
        return res.status(400).json(
            {
                code: 400,
                errCode: 1,
                errMessage: 'Missing required parameters',
                user: user
            }
        )
    }

    let user = await userService.getUserByPhone(phone);
    if (user.users) {
        return res.status(user.code ? user.code : 400).json(
            {

                errCode: 0,
                errMessage: 'Ok',
                user: user.users
            }
        )
    } else {
        return res.status(user.code ? user.code : 404).json(
            {

                errCode: 1,
                errMessage: 'User does not exist',
                user: user.users
            })
    }


}
let handleCreateNewUser = async (req, res) => {

    let message = await userService.createNewUser(req.body);
    return res.status(message.code).json(message);



}
let handleCreateNewUserWhenBookTourByPhone = async (req, res) => {

    let message = await userService.createNewUserWhenBookTourByPhone(req.body);
    return res.status(message.code).json(message);



}

let hash = (code) => {
    return new Promise(async (resolve, reject) => {
        try {

            let hashCode = await bcrypt.hashSync(code, salt);
            resolve(hashCode);
        } catch (error) {
            reject(error)
        }
    })
}
let handleDeleteUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(400).json({
            code: 400,
            errCode: 1,
            errMessage: 'Missing required parameters'

        })
    }
    let message = await userService.deleteUser(req.body.id);

    return res.status(message.code).json(message);

}
let handleEditUser = async (req, res) => {
    let data = req.body;
    let message = await userService.updateUserData(data);

    return res.status(message.code).json(message);

}
let verify = async (req, res) => {
    let result = bcrypt.compareSync(req.query.email, req.query.token)
    if (result === true) {

        await userService.verify(req.query.email);
        res.redirect('/crud');
    } else {
        console.log('fail');
    }

}
let regisUserOtp = async (req, res, next) => {

    try {
        let email = req.body.email;
        let message = await userService.regisUser(email);

        return res.status(message.code).json(message);

    } catch (error) {
        console.error(error)
        next(error)
    }
}
let createOtp = async (req, res, next) => {

    try {
        let email = req.body.email;
        let message = await userService.createOtp(email);

        return res.status(message.code).json(message);

    } catch (error) {
        console.error(error)
        next(error)
    }
}
let verifyOtp = async (req, res, next) => {
    try {
        let { email, otp } = req.body;
        let message = await userService.verifyOtp(email, otp);

        return res.status(message.code).json(message);

    } catch (error) {
        next(error)
    }
}
module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser,
    verify: verify,
    regisUserOtp: regisUserOtp,
    verifyOtp: verifyOtp,
    createOtp: createOtp,
    handleGetUserByPhone: handleGetUserByPhone,
    handleGetUserByEmail: handleGetUserByEmail,
    handleCreateNewUserWhenBookTourByPhone: handleCreateNewUserWhenBookTourByPhone,
    handleLoginByPhone: handleLoginByPhone
}