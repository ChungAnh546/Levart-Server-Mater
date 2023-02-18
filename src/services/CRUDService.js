import bcrypt from "bcryptjs";
import db from "../models/index";
const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    return new Promise(async (resovle, reject) => {

        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                fullName: data.fullname,
                address: data.address,
                phonenumber: data.phonenumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleid,

            })
            resovle('Create new user completed')
        } catch (error) {
            reject(error)
        }
    })



}

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
let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {

            let users = db.User.findAll({
                raw: true,
            });
            resolve(users)

        } catch (error) {
            reject(error)
        }
    })


}
let getUserInfoById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId }, raw: true
            })
            if (user) { resolve(user) } else {
                resolve({})
            }

        } catch (error) {
            reject(error)
        }
    })

}
let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            let user = await db.User.findOne({
                where: {
                    id: data.id
                }
            });
            if (user) {
                user.fullName = data.fullName;
                user.address = data.address;
                console.log(user.id);
                await user.save();
                let allUser = await db.User.findAll();

                resolve(allUser)
            } else {
                resolve('Update false')
            }

        } catch (error) {
            reject(error)
        }
    })

}
let deleteUserById = (userId) => {

    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId }
            })
            if (user) {
                await user.destroy();
            }
            resolve();
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById
}