import db from "../models/index";

let createNewBill = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let billOld = await db.Bill.findOne({
                where: {
                    bookTourId: data.bookTourId,
                    customerId: data.customerId,
                }
            })
            if (!billOld) {
                await db.Bill.create({
                    bookTourId: data.bookTourId,
                    customerId: data.customerId,
                    creatorId: data.creatorId,
                    totalCost: data.totalCost,
                    bookTourDate: data.bookTourDate,
                    promotionCode: data.promotionCode,
                    status: data.status,
                }).then((dataBill) => {
                    resolve({
                        code: 201,
                        errCode: 0,
                        errMessage: '',
                        message: 'OK',
                        bill: dataBill
                    })
                })

            }
            resolve({
                code: 401,
                errCode: 0,
                errMessage: '',
                message: 'fail',
            })

        } catch (error) {
            reject(error);
        }
    })

}
let getBill = (billId) => {

    return new Promise(async (resolve, reject) => {
        try {
            let bill = '';
            if (billId === 'ALL') {
                bill = await db.Bill.findAll();
            }
            if (billId && billId !== 'ALL') {
                bill = await db.Bill.findOne({
                    where: { id: billId }
                })
            }
            resolve({
                code: 200,
                errCode: 0,
                errMessage: '',
                message: 'OK',
                bill: bill
            })

        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    createNewBill: createNewBill,
    getBill: getBill
}