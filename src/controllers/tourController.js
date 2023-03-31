import tourService from '../services/tourService';
let handleCreateTour = async (req, res) => {
    let checkInput = checkValueInput(req.body);
    if (!checkInput) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Missing input parameter!'
        });
    }
    let message = await tourService.createNewTour(req.body);

    return res.status(message.code).json(message);



}
let checkValueInput = (data) => {
    let isValid = true;
    let arrInput = ['placeDest', 'placeGo', 'dateGo', 'dateBack', 'numPersonA', 'numPersonB', 'pricePersonA', 'pricePersonB', 'destinationId']
    for (let i = 0; i < arrInput.length; i++) {
        if (!data[arrInput[i]]) {
            isValid = false;
            break;
        }

    } return isValid

}
let handleEditTour = async (req, res) => {
    let data = req.body;
    let message = await tourService.updateTourData(data);

    return res.status(message.code).json(message);

}
let handleGetAllTour = async (req, res) => {
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

    let tour = await tourService.getAllTour(id);

    return res.status(tour.code).json(
        {
            errCode: 0,
            errMessage: 'Ok',
            tour: tour.tour
        }
    )

}
let handleDeleteTour = async (req, res) => {
    if (!req.body.id) {
        return res.status(400).json({
            code: 400,
            errCode: 1,
            errMessage: 'Missing required parameters'

        })
    }
    let message = await tourService.deleteTour(req.body.id);

    return res.status(message.code).json(message);

}
module.exports = {
    handleCreateTour: handleCreateTour,
    handleEditTour: handleEditTour,
    handleGetAllTour: handleGetAllTour,
    handleDeleteTour: handleDeleteTour
}