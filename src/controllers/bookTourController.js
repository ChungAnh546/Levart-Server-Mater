import bookTourService from '../services/bookTourService';

let handleCreateBookTour = async (req, res) => {
    let checkInput = checkValueInput(req.body);
    if (!checkInput) {
        return res.status(400).json({
            errCode: 1,
            errMessage: 'Missing input parameter!'
        });
    }

    let message = await bookTourService.createNewBookTour(req.body);
    if (message.errCode === 0) {
        return res.status(200).json(message);
    } else {
        return res.status(400).json(message);
    }

}
let checkValueInput = (data) => {
    let isValid = true;
    let arrInput = ['tourId', 'customerId', 'paymentId']
    for (let i = 0; i < arrInput.length; i++) {
        if (!data[arrInput[i]]) {
            isValid = false;
            break;
        }

    } return isValid

}
let handleEditBookTour = async (req, res) => {
    let data = req.body;
    console.log(data);
    let message = await bookTourService.updateBookTourData(data);
    if (message.errCode === 0) {
        return res.status(200).json(message);
    } else {
        return res.status(400).json(message);
    }


}
let handleGetAllBookTour = async (req, res) => {
    let id = req.query.id;
    if (!id) {
        return res.status(400).json(
            {
                errCode: 1,
                errMessage: 'Missing required parameters',

            }
        )
    }
    let bookTour = await bookTourService.getBookTour(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        bookTour: bookTour
    })

}
let handleDeleteBookTour = async (req, res) => {
    if (!req.body.id) {
        return res.status(400).json({
            errCode: 1,
            errMessage: 'Missing required parameters'

        })
    }
    let message = await bookTourService.deleteBookTour(req.body.id);
    if (message.errCode === 0) {
        return res.status(200).json(message);
    } else {
        return res.status(400).json(message);
    }

}
module.exports = {
    handleCreateBookTour: handleCreateBookTour,
    handleEditBookTour: handleEditBookTour,
    handleGetAllBookTour: handleGetAllBookTour,
    handleDeleteBookTour: handleDeleteBookTour

}