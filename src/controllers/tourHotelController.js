import tourHotelService from '../services/tourHotelService';
let handleCreateTourHotel = async (req, res) => {

    let message = await tourHotelService.createNewTourHotel(req.body);
    if (message.errCode === 0) {
        return res.status(200).json(message);
    } else {
        return res.status(400).json(message);
    }


}
let handleEditTourHotel = async (req, res) => {
    let data = req.body;
    let message = await tourHotelService.updateTourHotelData(data);
    if (message.errCode === 0) {
        return res.status(200).json(message);
    } else {
        return res.status(400).json(message);
    }
}
let handleDeleteTourHotel = async (req, res) => {
    if (!req.body.id) {
        return res.status(400).json({
            errCode: 1,
            errMessage: 'Missing required parameters'

        })
    }
    let message = await tourHotelService.deleteTourHotel(req.body.id);
    if (message.errCode === 0) {
        return res.status(200).json(message);
    } else {
        return res.status(400).json(message);
    }
}
module.exports = {
    handleCreateTourHotel: handleCreateTourHotel,
    handleEditTourHotel: handleEditTourHotel,
    handleDeleteTourHotel: handleDeleteTourHotel
}