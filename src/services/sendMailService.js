import mailer from '../utils/mailer';
import db from "../models/index";

let handleSendGmailBookTour = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let customerId = data.customerId;
            let bookTourId = data.bookTourId;
            if (customerId && bookTourId) {
                let dataCustomer = await db.User.findOne({
                    where: {
                        id: customerId
                    }
                })
                if (dataCustomer.email) {
                    let dataBill = await db.Bill.findOne({
                        where: {
                            customerId: customerId,
                            bookTourId: bookTourId
                        }
                    });
                    let dataBookTour = await db.BookTour.findOne({
                        where: {
                            id: bookTourId
                        }
                    })
                    let dataTour = await db.Tour.findOne({
                        where: {
                            id: dataBookTour.tourId
                        }
                    })

                    mailer.sendMail(dataCustomer.email, "LEVART-Travel to your favorite city with respectful of the environment",
                        `<div >
                <div style="display: inline-block; padding: 20px; border: 1px solid #ccc; border-radius: 10px; margin: 0 auto;">
                  <div style="text-align: center;">LEVART WORLD hân hạnh được phục vụ quý khách.</div>
                  <div style="text-align: center;">Quý khách đã đặt tour thành công.</div>
                  <div>Mã hóa đơn của quý khách: ${dataBill.id}</div>
                  <div >Mã tour: ${dataBookTour.tourId}</div>
                  <div>Hoá đơn của: ${dataCustomer.fullName}     Email: ${dataCustomer.email}</div>
                  <div >Số điện thoại: ${dataCustomer.phoneNumber}</div>
                  
                  <div >Ngày đi: ${dataTour.dateGo}     Ngày về: ${dataTour.dateBack}</div>
                  <div >Giá vé người lớn: ${dataTour.adultPrice}     Số chỗ người lớn: ${dataBookTour.adultSlot}</div>
                  <div >Giá vé trẻ em: ${dataTour.childPrice}     Số chỗ trẻ em: ${dataBookTour.childrenSlot ? dataBookTour.childrenSlot : 0}</div>
                  <div >Giá vé trẻ sơ sinh: ${dataTour.babyPrice}     Số chỗ trẻ sơ sinh: ${dataBookTour.babySlot ? dataBookTour.babySlot : 0}</div>
                  <div style="text-align: right;">Tổng tiền: ${dataBill.totalCost}</div>
                  <div></div>
                  <div style="text-align: center;">Cảm ơn quý khách đã đặt niềm tin đến dịch vụ của LEVART WORLD .</div>
                  <div style="text-align: center;">LEVART WORLD rất hân hạnh được phục vụ quý khách</div>
                </div>
              </div>`)
                }
                resolve({
                    code: 200,
                    errCode: 0,

                });
            }
            resolve({
                code: 400,
                errCode: 1,

            });
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    handleSendGmailBookTour: handleSendGmailBookTour

}