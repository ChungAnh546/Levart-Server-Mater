import dayDetailService from "../services/dayDetailService.js";

let handleCreateDayDetail = async (req, res) => {

    let message = await dayDetailService.createNewDayDetail(req.body);
    console.log(message);

    return res.status(message.code).json(message);




}
let handleEditDayDetail = async (req, res) => {
    let data = req.body;
    let message = await dayDetailService.updateDayDetailData(data);

    return res.status(message.code).json(message);


}
let handleGetDayDetail = async (req, res) => {
    let id = req.query.id;//all,id

    if (!id) {
        return res.status(400).json(
            {
                code: 400,
                errCode: 1,
                errMessage: 'Missing required parameters',

            }
        )
    }

    let dayDetail = await dayDetailService.getDayDetail(id);

    return res.status(dayDetail.code).json(
        {
            errCode: 0,
            errMessage: 'Ok',
            dayDetail: dayDetail.dayDetail
        }
    )

}
let handleDeleteDayDetail = async (req, res) => {
    if (!req.body.id) {
        return res.status(400).json({
            code: 400,
            errCode: 1,
            errMessage: 'Missing required parameters'

        })
    }
    let message = await dayDetailService.deleteDayDetail(req.body.id);

    return res.status(message.code).json(message);

}
module.exports = {
    handleCreateDayDetail: handleCreateDayDetail,
    handleEditDayDetail: handleEditDayDetail,
    handleGetDayDetail: handleGetDayDetail,
    handleDeleteDayDetail: handleDeleteDayDetail

}