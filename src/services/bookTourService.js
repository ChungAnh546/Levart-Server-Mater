import db from "../models/index";

let createNewBookTour = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            await db.BookTour.create({
                tourId: data.tourId,
                customerId: data.customerId,
                numPersonA: data.numPersonA,
                numPersonB: data.numPersonB,
                date: data.date,
                type: data.type,
                paymentId: data.paymentId,
                state: data.state,
                note: data.note,
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
let updateBookTourData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 1,
                    Message: 'Missing required parameters!'
                })
            }
            let bookTour = await db.BookTour.findOne({
                where: { id: data.id }, raw: false
            })
            if (bookTour) {
                bookTour.numPersonA = data.numPersonA;
                bookTour.numPersonB = data.numPersonB;
                bookTour.note = data.note;
                await bookTour.save();
                resolve({
                    errCode: 0,
                    Message: 'Update the bookTour succeeds!'
                })


            } else {
                resolve({
                    errCode: 2,
                    Message: `bookTour's not found!`
                })
            }
        } catch (error) {
            reject(error)
        }
    })

}
let getBookTour = (bookTourId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let bookTour = '';
            if (bookTourId === 'ALL') {
                bookTour = await db.BookTour.findAll();
            }
            if (bookTourId && bookTourId !== 'ALL') {
                bookTour = await db.BookTour.findOne({
                    where: { id: bookTourId }
                })
            }
            resolve(bookTour)
        } catch (error) {
            reject(error)
        }
    })
}
let deleteBookTour = (bookTourId) => {
    return new Promise(async (resolve, reject) => {
        let bookTour = await db.BookTour.findOne({
            where: { id: bookTourId }
        })
        if (!bookTour) {
            resolve({
                errCode: 2,
                errMessage: `The bookTour isn't exist`
            })

        }
        await db.BookTour.destroy({
            where: { id: bookTourId }
        })
        resolve({
            errCode: 0,
            message: `The bookTour is deleted`
        })

    })
}
module.exports = {
    createNewBookTour: createNewBookTour,
    updateBookTourData: updateBookTourData,
    getBookTour: getBookTour,
    deleteBookTour: deleteBookTour
}