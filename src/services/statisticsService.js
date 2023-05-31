import db from "../models/index";

let getStatistics = (data) => {
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
module.exports = {
    getStatistics: getStatistics


}