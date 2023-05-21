import db from "../models/index";
let createNewFavoriteTour = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let getTour = await db.FavoriteTour.findOne({
                where: {
                    tourId: data.tourId,
                    customerId: data.customerId,
                }
            })
            if (!getTour) {
                await db.FavoriteTour.create({
                    tourId: data.tourId,
                    customerId: data.customerId,




                })
                resolve({
                    code: 201,
                    errCode: 0,
                    errMessage: '',
                    message: 'OK',

                })

            } else {
                resolve({
                    code: 401,
                    errCode: 1,
                    errMessage: '',
                    message: 'coincident',

                })
            }


        } catch (error) {
            reject(error)
        }
    })
}
let getFavoriteTour = (id) => {

    return new Promise(async (resolve, reject) => {

        try {

            let favoriteTour = '';
            if (id === 'ALL') {
                favoriteTour = await db.FavoriteTour.findAll({

                });
            }
            if (id && id !== 'ALL') {
                favoriteTour = await db.FavoriteTour.findAll({
                    where: { customerId: id }

                })
            }
            resolve({
                code: 200,
                errCode: 0,
                errMessage: '',
                message: 'OK',
                favoriteTour: favoriteTour

            })
        } catch (error) {
            reject(error)
        }
    })
}
let deleteFavoriteTour = (tourId, customerId) => {
    return new Promise(async (resolve, reject) => {
        let favoriteTour = await db.FavoriteTour.findOne({
            where: {
                tourId: tourId,
                customerId: customerId
            }
        })
        if (!favoriteTour) {
            resolve({
                code: 404,
                errCode: 2,
                errMessage: `The FavoriteTour isn't exist`
            })

        }
        await db.FavoriteTour.destroy({
            where: {
                tourId: tourId,
                customerId: customerId
            }
        })
        resolve({
            code: 200,
            errCode: 0,
            message: `The FavoriteTour is deleted`
        })

    })
}
let updateFavoriteTourData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.customerId) {
                resolve({
                    code: 400,
                    errCode: 1,
                    Message: 'Missing required parameters!'
                })
            }
            let favoriteTour = await db.FavoriteTour.findOne({
                where: { customerId: data.customerId }, raw: false
            })
            if (favoriteTour) {
                favoriteTour.tourId = data.tourId;
                favoriteTour.customerId = data.customerId;

                await favoriteTour.save();
                resolve({
                    code: 202,
                    errCode: 0,
                    Message: 'Update the FavoriteTour succeeds!'
                })


            } else {
                resolve({
                    code: 204,
                    errCode: 2,
                    Message: `FavoriteTour's not found!`
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    getFavoriteTour: getFavoriteTour,
    createNewFavoriteTour: createNewFavoriteTour,
    deleteFavoriteTour: deleteFavoriteTour,
    updateFavoriteTourData: updateFavoriteTourData
}