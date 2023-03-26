
import userService from '../services/userSerbice';
import mailer from '../utils/mailer';
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);
let handleLogin = async (req, res) => {

    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(400).json({
            errCode: 1,
            errMessage: 'Missing input parameter!'

        })
    }
    let userData = await userService.handleUserLogin(email, password);

    return res.status(200).json(
        {
            errCode: userData.errCode,
            errMessage: userData.errMessage,
            user: userData.user ? userData.user : {}
        }
    )


}
let handleGetAllUsers = async (req, res) => {
    let id = req.query.id;//all,id

    if (!id) {
        return res.status(400).json(
            {
                errCode: 1,
                errMessage: 'Missing required parameters',
                user: user
            }
        )
    }

    let user = await userService.getAllUsers(id);

    return res.status(200).json(
        {
            errCode: 0,
            errMessage: 'Ok',
            user: user
        }
    )

}
let handleCreateNewUser = async (req, res) => {

    let message = await userService.createNewUser(req.body);

    let hashFromBcrypt = await hash(req.body.email);

    mailer.sendMail(req.body.email, "Verify Email", `<b>Bạn đang đăng kí tài khoản Levart World bằng email này:</b><br><b>Xác nhận với chúng tôi</b><a href="${process.env.APP_URL}/verify?email=${req.body.email}&token=${hashFromBcrypt}"> Verify </a>`)
    if (message.errCode === 0) {
        return res.status(200).json(message);
    } else {
        return res.status(400).json(message);
    }


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
            errCode: 1,
            errMessage: 'Missing required parameters'

        })
    }
    let message = await userService.deleteUser(req.body.id);
    if (message.errCode === 0) {
        return res.status(200).json(message);
    } else {
        return res.status(400).json(message);
    }
}
let handleEditUser = async (req, res) => {
    let data = req.body;
    let message = await userService.updateUserData(data);
    if (message.errCode === 0) {
        return res.status(200).json(message);
    } else {
        return res.status(400).json(message);
    }
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

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser,
    verify: verify
}