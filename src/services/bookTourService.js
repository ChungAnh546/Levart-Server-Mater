import db from "../models/index";
import tourService from "../services/tourService";
import userService from "../services/userService";
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
                adultSlot: data.adultSlot,
                childrenSlot: data.childrenSlot,
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
                bookTour.adultSlot = data.adultSlot;
                bookTour.childrenSlot = data.childrenSlot;
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
let cancellationBookTour = (data) => {
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
            //update tour
            let tourData = await db.Tour.findOne({
                where: { id: bookTour.tourId }, raw: false
            })
            if (tourData && bookTour) {
                tourData.adultSlot = parseInt(tourData.adultSlot) + parseInt(bookTour.adultSlot);
                tourData.childrenSlot = parseInt(tourData.childrenSlot) + parseInt(bookTour.childrenSlot);
                await tourData.save();
                bookTour.state = 'S4';
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
            if (bookTourId && bookTourId === 'ALL') {
                bookTour = await db.BookTour.findAll();
            }
            if (bookTourId && bookTourId !== 'ALL') {
                bookTour = await db.BookTour.findOne({
                    where: { id: bookTourId }
                })
            }


            if (bookTour !== null) {
                resolve({
                    code: 200,
                    errCode: 0,
                    Message: '',
                    bookTour: bookTour
                })
            } else {
                resolve({
                    code: 400,
                    errCode: 1,
                    Message: 'fail',
                    bookTour: bookTour
                })
            }

        } catch (error) {

            resolve({
                code: 400,
                errCode: 1,
                Message: 'fail',

            })
        }
    })
}
let getBookTourByCustomerId = (customerId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let bookTour = '';
            if (customerId && customerId !== '') {
                bookTour = await db.BookTour.findAll({
                    where: { customerId: customerId }
                })
            }


            if (bookTour !== null) {
                resolve({
                    code: 200,
                    errCode: 0,
                    Message: '',
                    bookTour: bookTour
                })
            } else {
                resolve({
                    code: 400,
                    errCode: 1,
                    Message: 'fail',
                    bookTour: bookTour
                })
            }

        } catch (error) {

            resolve({
                code: 400,
                errCode: 1,
                Message: 'fail',

            })
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

let bookTourBasic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Tour = await tourService.getAllTour(data.tourId);
            let Customer = await userService.getAllUsers(data.customerId);

            if (Tour.tour && Customer.users) {
                let numRemaining = 0;
                let slot = 0;
                //kiểm tra có tồn tại tour custormer và creator ko 
                if (Tour.tour.childrenSlot < data.childrenSlot) {
                    Tour.tour.childrenSlot = 0;
                    numRemaining = parseInt(data.childrenSlot) - parseInt(Tour.tour.childrenSlot);
                } else {
                    Tour.tour.childrenSlot = parseInt(Tour.tour.childrenSlot) - parseInt(data.childrenSlot);
                }

                if (Tour.tour.adultSlot < (parseInt(data.adultSlot) + parseInt(numRemaining))) {
                    resolve({
                        code: 400,
                        errCode: 1,
                        Message: 'hết chỗ!'
                    });
                } else {
                    //tao book tour 
                    // update lai number a cua tour
                    await createNewBookTour(data);
                    Tour.tour.adultSlot = parseInt(Tour.tour.adultSlot) - (parseInt(data.adultSlot) + parseInt(numRemaining));
                    console.log(Tour.tour.adultSlot)
                    await tourService.updateTourData(Tour.tour);
                    // tao bill
                    resolve({
                        code: 201,
                        errCode: 0,
                        errMessage: '',
                        message: 'OK',

                    })

                }

            } else {
                resolve({
                    code: 400,
                    errCode: 1,
                    Message: 'Error parameters!'
                });
            }
        } catch (error) {
            reject(error);
        }

    })

}
module.exports = {
    createNewBookTour: createNewBookTour,
    updateBookTourData: updateBookTourData,
    getBookTour: getBookTour,
    deleteBookTour: deleteBookTour,
    bookTour: bookTour,
    bookTourBasic: bookTourBasic,
    getBookTourByCustomerId: getBookTourByCustomerId,
    cancellationBookTour: cancellationBookTour
}