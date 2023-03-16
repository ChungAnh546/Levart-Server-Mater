import db from "../models/index";
let createNewPayment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Payment.create({
                customerId: data.customerId,
                amount: data.amount,
                paymentMethod: data.paymentMethod,

                paymentDate: data.paymentDate,
                status: data.status,
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
let updatePaymentData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 1,
                    Message: 'Missing required parameters!'
                })
            }
            let payment = await db.Payment.findOne({
                where: { id: data.id }, raw: false
            })
            if (payment) {
                //
                payment.paymentMethod = data.paymentMethod;
                payment.status = data.status;
                payment.note = data.note;
                //
                await payment.save();
                resolve({
                    errCode: 0,
                    Message: 'Update the payment succeeds!'
                })


            } else {
                resolve({
                    errCode: 2,
                    Message: `payment's not found!`
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
let getAllPayment = (paymentId) => {

    return new Promise(async (resolve, reject) => {

        try {

            let payment = '';
            if (paymentId === 'ALL') {
                payment = await db.Payment.findAll();
            }
            if (paymentId && paymentId !== 'ALL') {
                payment = await db.Payment.findOne({
                    where: { id: paymentId }
                })
            }
            resolve(payment)
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    createNewPayment: createNewPayment,
    updatePaymentData: updatePaymentData,
    getAllPayment: getAllPayment
}