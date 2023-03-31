import db from '../models/index';

let createNewHotel = (data) => {
    return new Promise(async (resolve, reject) => {
        try {


            await db.Hotel.create({
                hotelName: data.hotelName,
                address: data.address,
                phoneNumber: data.phoneNumber,

                website: data.website,
                starRating: data.starRating,
                note: data.note,
                service: data.service,

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
let updateHotelData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    code: 400,
                    errCode: 1,
                    Message: 'Missing required parameters!'
                })
            }
            let hotel = await db.Hotel.findOne({
                where: { id: data.id }, raw: false
            })
            if (hotel) {
                hotel.hotelName = data.hotelName;
                hotel.address = data.address;
                hotel.phoneNumber = data.phoneNumber;
                hotel.website = data.website;
                hotel.starRating = data.starRating;
                hotel.note = data.note;
                await hotel.save();
                resolve({
                    code: 202,
                    errCode: 0,
                    Message: 'Update the hotel succeeds!'
                })


            } else {
                resolve({
                    code: 204,
                    errCode: 2,
                    Message: `hotel's not found!`
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
let getAllHotel = (hotelId) => {

    return new Promise(async (resolve, reject) => {

        try {

            let hotel = '';
            if (hotelId === 'ALL') {
                hotel = await db.Hotel.findAll();
            }
            if (hotelId && hotelId !== 'ALL') {
                hotel = await db.Hotel.findOne({
                    where: { id: hotelId },

                })
            }
            resolve({
                code: 200,
                errCode: 0,
                Message: '',
                hotel: hotel
            })
        } catch (error) {
            reject(error)
        }
    })
}
let deleteHotel = (hotelId) => {
    return new Promise(async (resolve, reject) => {
        let hotel = await db.Hotel.findOne({
            where: { id: hotelId }
        })
        if (!hotel) {
            resolve({
                code: 404,
                errCode: 2,
                errMessage: `The hotel isn't exist`
            })

        }
        await db.Hotel.destroy({
            where: { id: hotelId }
        })
        resolve({
            code: 200,
            errCode: 0,
            message: `The hotel is deleted`
        })

    })
}
module.exports = {
    createNewHotel: createNewHotel,
    updateHotelData: updateHotelData,
    getAllHotel: getAllHotel,
    deleteHotel: deleteHotel

}