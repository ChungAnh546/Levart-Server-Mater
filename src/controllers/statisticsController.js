import statisticsService from "../services/statisticsService.js"
let handleStatistics = async (req, res) => {

    let message = await statisticsService.getStatistics(req.body);
    return res.status(message.code).json(message);
}
module.exports = {
    handleStatistics: handleStatistics,


}