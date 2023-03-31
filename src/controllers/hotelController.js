import hotelService from "../services/hotelService"

let handleCreateHotel = async (req, res) => {

    let checkInput = checkValueInput(req.body);
    if (!checkInput) {
        return res.status(400).json({
            code: 400,
            errCode: 1,
            errMessage: 'Missing input parameter!'
        });
    }

    let message = await hotelService.createNewHotel(req.body);

    return res.status(message.code).json(message);



}
let checkValueInput = (data) => {
    let isValid = true;
    let arrInput = ['hotelName', 'address', 'phoneNumber']
    for (let i = 0; i < arrInput.length; i++) {
        if (!data[arrInput[i]]) {
            isValid = false;
            break;
        }

    } return isValid

}
let handleEditHotel = async (req, res) => {
    let data = req.body;
    let message = await hotelService.updateHotelData(data);

    return res.status(message.code).json(message);


}
let handleGetAllHotel = async (req, res) => {
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

    let hotel = await hotelService.getAllHotel(id);

    return res.status(hotel.code).json(
        {
            errCode: 0,
            errMessage: 'Ok',
            hotel: hotel.hotel
        }
    )

}
let handleDeleteHotel = async (req, res) => {
    if (!req.body.id) {
        return res.status(400).json({
            code: 400,
            errCode: 1,
            errMessage: 'Missing required parameters'

        })
    }
    let message = await hotelService.deleteHotel(req.body.id);

    return res.status(message.code).json(message);

}
module.exports = {
    handleCreateHotel: handleCreateHotel,
    handleEditHotel: handleEditHotel,
    handleGetAllHotel: handleGetAllHotel,
    handleDeleteHotel: handleDeleteHotel
}