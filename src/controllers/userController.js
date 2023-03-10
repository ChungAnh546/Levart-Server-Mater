
import userService from '../services/userSerbice';
let handleLogin = async (req, res) => {

    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(500).json({
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
        return res.status(200).json(
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
    console.log(message);
    return res.status(200).json(message);


}
let handleDeleteUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters'

        })
    }
    let message = await userService.deleteUser(req.body.id);
    console.log(message);
    return res.status(200).json(message);
}
let handleEditUser = () => { }

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser
}