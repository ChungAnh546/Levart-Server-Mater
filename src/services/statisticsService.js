
import db from "../models/index";
import moment from "moment";

let totalBillOfDate = async (date) => {
    let dataBill = await db.Bill.findAll();
    let totalBill = 0;
    for (let index = 0; index < dataBill.length; index++) {
        const element = dataBill[index];
        const dateStatistics = moment(date, "DD/MM/YYYY");
        const dateBill = moment(moment(element.createdAt).format('DD/MM/YYYY'), "DD/MM/YYYY");
        //console.log(dateStatistics + '_' + dateBill);
        if (dateBill.isSame(dateStatistics)) {
            // console.log(1);
            totalBill = totalBill + element.totalCost;
        }
    }
    return totalBill;
}
let getStatistics = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let date = data.dateArray;
            let arrData = [];
            if (date) {
                for (let index = 0; index < date.length; index++) {
                    const element = date[index];
                    arrData.push(await totalBillOfDate(element))
                }
            }
            resolve({
                code: 200,
                errCode: 0,
                errMessage: '',
                arrData: arrData
            })

        } catch (error) {
            reject(error);
        }
    })

}
module.exports = {
    getStatistics: getStatistics


}