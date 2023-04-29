import db from "../models/index";
import tourService from "../services/tourService";
const { set, get, setnx, incrby, exists } = require('../config/config.redis');
let checkReservation = (tour, bookTour) => {
    let numberAdult = tour.numPersonA;
    let numberChildren = tour.numPersonB;
    let numberAdultBook = bookTour.numPersonA;
    let numberChildrenBook = bookTour.numPersonB;
    if (numberAdult < numberAdultBook) {
        if (numberChildren < numberChildrenBook) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}
let bookTour = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let tour = tourService.getAllTour(data.tourId).tour;
            //ktra tour co ton tai
            if (tour) {
                //ktra con cho ko
                let checkReservation = checkReservation(tour, data);

                if (checkReservation) {
                    let reservation = tour.numPersonA;
                    let keyNameBookTour = 'bookTour' + tour.id;
                    let keyBeyondTheLimit = keyNameBookTour + 'Beyond';
                    let numberAdult = data.numPersonA;
                    const getKey = await exists(keyName);
                    if (!getKey) {
                        await setnx(keyNameBookTour, 0);
                    }
                    const numBookTour = await incrby(keyNameBookTour, numberAdult);
                    console.log('truoc khi user order thanh cong thi so luong ban ra =', numBookTour);
                    if (numBookTour > reservation) {
                        console.log('Reservation fail');
                        resolve({
                            code: 401,
                            errCode: 1,
                            errMessage: '',
                            message: 'Fail',
                        });
                    } else {
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
                            code: 201,
                            errCode: 0,
                            errMessage: '',
                            message: 'OK',
                        })
                    }



                    // if (numBookTour > reservation) {
                    //     await set('BanQua', reservation - numBookTour);
                    // }

                } else {
                    resolve({
                        code: 401,
                        errCode: 1,
                        errMessage: '',
                        message: 'Fail',
                    })


                }
            }
        } catch (error) {
            reject(error)
        }
    })
}
let createNewBookTour = (data) => {
    const time = new Date().getTime();
    return new Promise(async (resolve, reject) => {
        try {
            //check tourid
            //check custormerId
            //date>date.now
            //
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
                code: 201,
                errCode: 0,
                errMessage: '',
                message: 'OK',
                time: time
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
                    code: 400,
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
                    code: 202,
                    errCode: 0,
                    Message: 'Update the bookTour succeeds!'
                })


            } else {
                resolve({
                    code: 404,
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
            resolve({
                code: 200,
                errCode: 0,
                Message: '',
                bookTour: bookTour
            })
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
                code: 404,
                errCode: 2,
                errMessage: `The bookTour isn't exist`
            })

        }
        await db.BookTour.destroy({
            where: { id: bookTourId }
        })
        resolve({
            code: 200,
            errCode: 0,
            message: `The bookTour is deleted`
        })

    })
}
module.exports = {
    createNewBookTour: createNewBookTour,
    updateBookTourData: updateBookTourData,
    getBookTour: getBookTour,
    deleteBookTour: deleteBookTour,
    bookTour: bookTour
}