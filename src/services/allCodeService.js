import db from "../models/index";
let createNewAllCode = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.AllCode.create({
                key: data.key,
                valueEn: data.valueEn,
                valueVi: data.valueVi,



            })
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
let getAllCode = (type) => {

    return new Promise(async (resolve, reject) => {

        try {

            let allCodes = '';
            if (type === 'ALL') {
                allCodes = await db.AllCode.findAll({

                });
            }
            if (type && type !== 'ALL') {
                allCodes = await db.AllCode.findOne({
                    where: { type: type }

                })
            }
            resolve(allCodes)
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    createNewAllCode: createNewAllCode,
    getAllCode: getAllCode
}