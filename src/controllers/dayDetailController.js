import dayDetailService from "../services/dayDetailService.js";

let handleCreateDayDetail = async (req, res) => {

    let message = await dayDetailService.createNewDayDetail(req.body);
    console.log(message);

    return res.status(message.code).json(message);




}

module.exports = {
    handleCreateDayDetail: handleCreateDayDetail,
}