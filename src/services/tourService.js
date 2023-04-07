import db from "../models/index";
let createNewTour = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Tour.create({
                nameTour: data.nameTour,
                placeDest: data.placeDest,
                placeGo: data.placeGo,

                dateGo: data.dateGo,
                dateBack: data.dateBack,
                state: data.state,
                note: data.note,
                imgUML: data.imgUML,
                numPersonA: data.numPersonA,
                numPersonB: data.numPersonB,
                pricePersonA: data.pricePersonA,
                pricePersonB: data.pricePersonB,
                type: data.type,
                unit: data.unit,


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
let updateTourData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    code: 400,
                    errCode: 1,
                    Message: 'Missing required parameters!'
                })
            }
            let tour = await db.Tour.findOne({
                where: { id: data.id }, raw: false
            })
            if (tour) {
                //
                tour.nameTour = data.nameTour;
                tour.placeDest = data.placeDest;
                tour.placeGo = data.placeGo;
                tour.dateGo = data.dateGo;
                tour.dateBack = data.dateBack;
                tour.state = data.state;
                tour.note = data.note;
                tour.imgUML = data.imgUML;
                tour.numPersonA = data.numPersonA;
                tour.numPersonB = data.numPersonB;
                tour.pricePersonA = data.pricePersonA;
                tour.pricePersonB = data.pricePersonB;
                tour.type = data.type;
                tour.unit = data.unit;
                //
                await tour.save();
                resolve({
                    code: 202,
                    errCode: 0,
                    Message: 'Update the tour succeeds!'
                })


            } else {
                resolve({
                    code: 404,
                    errCode: 2,
                    Message: `tour's not found!`
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
let getAllTour = (tourId) => {

    return new Promise(async (resolve, reject) => {

        try {

            let tour = '';
            if (tourId === 'ALL') {
                tour = await db.Tour.findAll(
                    {
                        include: [
                            { model: db.Destination }
                        ],
                        raw: true,
                        nest: true
                    }
                );
            }
            if (tourId && tourId !== 'ALL') {
                tour = await db.Tour.findOne({
                    where: { id: tourId },
                    include: [
                        { model: db.Destination }
                    ],
                    raw: true,
                    nest: true
                })
            }
            resolve({
                code: 200,
                errCode: 0,
                Message: '',
                tour: tour
            })
        } catch (error) {
            reject(error)
        }
    })
}
let deleteTour = (tourId) => {
    return new Promise(async (resolve, reject) => {
        let tour = await db.Tour.findOne({
            where: { id: tourId }
        })
        if (!tour) {
            resolve({
                code: 404,
                errCode: 2,
                errMessage: `The tour isn't exist`
            })

        }
        await db.Tour.destroy({
            where: { id: tourId },

        })
        resolve({
            code: 200,
            errCode: 0,
            message: `The tour is deleted`
        })

    })
}
module.exports = {
    createNewTour: createNewTour,
    updateTourData: updateTourData,
    getAllTour: getAllTour,
    deleteTour: deleteTour
}