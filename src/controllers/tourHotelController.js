import tourHotelService from '../services/tourHotelService';
let handleCreateTourHotel = async (req, res) => {

    let message = await tourHotelService.createNewTourHotel(req.body);
    console.log(message);
    return res.status(200).json(message);


}
let handleEditTourHotel = async (req, res) => {
    let data = req.body;
    let message = await tourHotelService.updateTourHotelData(data);
    return res.status(200).json(message)
}
let handleDeleteTourHotel = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters'

        })
    }
    let message = await tourHotelService.deleteTourHotel(req.body.id);
    console.log(message);
    return res.status(200).json(message);
}
module.exports = {
    handleCreateTourHotel: handleCreateTourHotel,
    handleEditTourHotel: handleEditTourHotel,
    handleDeleteTourHotel: handleDeleteTourHotel
}