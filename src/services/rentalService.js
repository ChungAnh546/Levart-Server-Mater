import db from "../models/index";
let createNewRentalService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.RentalService.create({
                rentalType: data.rentalType,
                state: data.state,
                address: data.address,

                contactInfo: data.contactInfo

            })
            resolve({
                code: 201,
                errCode: 0,
                errMessage: '',
                message: 'OK',

            })


        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    createNewRentalService: createNewRentalService
}