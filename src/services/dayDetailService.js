import db from "../models/index";
let createNewDayDetail = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.TourDetails.create({
                title: data.title,
                schedule: data.schedule,
                tourId: data.tourId,
                day: data.day,



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
let deleteDayDetail = (dayDetailId) => {
    return new Promise(async (resolve, reject) => {
        let dayDetail = await db.TourDetails.findOne({
            where: { id: dayDetailId }
        })
        if (!dayDetail) {
            resolve({
                code: 404,
                errCode: 2,
                errMessage: `The dayDetail isn't exist`
            })

        }
        await db.TourDetails.destroy({
            where: { id: dayDetailId }
        })
        resolve({
            code: 200,
            errCode: 0,
            message: `The dayDetail is deleted`
        })

    })
}
let updateDayDetailData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    code: 400,
                    errCode: 1,
                    Message: 'Missing required parameters!'
                })
            }
            let dayDetail = await db.TourDetails.findOne({
                where: { id: data.id }, raw: false
            })
            if (dayDetail) {
                dayDetail.title = data.title;
                dayDetail.schedule = data.schedule;
                dayDetail.day = data.day;
                await dayDetail.save();
                resolve({
                    code: 202,
                    errCode: 0,
                    Message: 'Update the dayDetail succeeds!'
                })


            } else {
                resolve({
                    code: 204,
                    errCode: 2,
                    Message: `dayDetail's not found!`
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    getDayDetail: getDayDetail,
    createNewDayDetail: createNewDayDetail,
    deleteDayDetail: deleteDayDetail,
    updateDayDetailData: updateDayDetailData
}