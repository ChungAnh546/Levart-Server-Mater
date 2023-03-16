import hotelService from "../services/hotelService"

let handleCreateHotel = async (req, res) => {

    let checkInput = checkValueInput(req.body);
    if (!checkInput) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Missing input parameter!'
        });
    }

    let message = await hotelService.createNewHotel(req.body);
    return res.status(200).json(message);

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
    return res.status(200).json(message)
}
let handleGetAllHotel = async (req, res) => {
    let id = req.query.id;//all,id

    if (!id) {
        return res.status(200).json(
            {
                errCode: 1,
                errMessage: 'Missing required parameters',

            }
        )
    }

    let hotel = await hotelService.getAllHotel(id);

    return res.status(200).json(
        {
            errCode: 0,
            errMessage: 'Ok',
            hotel: hotel
        }
    )

}
let handleDeleteHotel = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters'

        })
    }
    let message = await hotelService.deleteHotel(req.body.id);
    console.log(message);
    return res.status(200).json(message);
}
module.exports = {
    handleCreateHotel: handleCreateHotel,
    handleEditHotel: handleEditHotel,
    handleGetAllHotel: handleGetAllHotel,
    handleDeleteHotel: handleDeleteHotel
}