import db from "../models/index";
let createNewSurcharger = (data) => {
    return new Promise(async (resolve, reject) => {
        try {


            await db.Surcharger.create({
                tourId: data.tourId,
                surchargerName: data.surchargerName,
                personVi: data.personVi,

                foreigner: data.foreigner,

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

module.exports = {
    createNewSurcharger: createNewSurcharger
}