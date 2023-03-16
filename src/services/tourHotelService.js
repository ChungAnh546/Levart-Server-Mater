import db from "../models/index";

let createNewTourHotel = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.TourHotel.create({
                hotelId: data.hotelId,
                tourId: data.tourId,


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
let updateTourHotelData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 1,
                    Message: 'Missing required parameters!'
                })
            }
            let tourHotel = await db.TourHotel.findOne({
                where: { id: data.id }, raw: false
            })
            if (tourHotel) {
                tourHotel.hotelId = data.hotelId;
                tourHotel.tourId = data.tourId;
                await tourHotel.save();
                resolve({
                    errCode: 0,
                    Message: 'Update the tourHotel succeeds!'
                })


            } else {
                resolve({
                    errCode: 2,
                    Message: `tourHotel's not found!`
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
let deleteTourHotel = (tourHotelId) => {
    return new Promise(async (resolve, reject) => {
        let tourHotel = await db.TourHotel.findOne({
            where: { id: tourHotelId }
        })
        if (!tourHotel) {
            resolve({
                errCode: 2,
                errMessage: `The tourHotel isn't exist`
            })

        }
        await db.TourHotel.destroy({
            where: { id: tourHotelId }
        })
        resolve({
            errCode: 0,
            message: `The tourHotel is deleted`
        })

    })
}
module.exports = {
    createNewTourHotel: createNewTourHotel,
    updateTourHotelData: updateTourHotelData,
    deleteTourHotel: deleteTourHotel
}