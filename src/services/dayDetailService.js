import db from "../models/index";
let createNewDayDetail = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.TourDetails.create({
                title: data.title,
                schedule: data.schedule,
                tourId: data.tourId,



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
let getDayDetail = (id) => {

    return new Promise(async (resolve, reject) => {

        try {

            let dayDetail = '';
            if (id === 'ALL') {
                dayDetail = await db.TourDetails.findAll({

                });
            }
            if (id && id !== 'ALL') {
                dayDetail = await db.TourDetails.findOne({
                    where: { id: id }

                })
            }
            resolve({
                code: 200,
                errCode: 0,
                errMessage: '',
                message: 'OK',
                dayDetail: dayDetail

            })
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    getDayDetail: getDayDetail,
    createNewDayDetail: createNewDayDetail
}