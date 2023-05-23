import bookTourService from '../services/bookTourService';
const { addDelayEventOrder, evenListenerBookTourExprination, configRedisDelayOrder } = require('../config/config.redis');
let handleCreateBookTour = async (req, res) => {
    let checkInput = checkValueInput(req.body);
    if (!checkInput) {
        return res.status(400).json({
            code: 400,
            errCode: 1,
            errMessage: 'Missing input parameter!'
        });
    }

    let message = await bookTourService.createNewBookTour(req.body);

    return res.status(message.code).json(message);


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

    let message = await bookTourService.updateBookTourData(data);

    return res.status(message.code).json(message);


}
let handleCancellationBookTour = async (req, res) => {
    let data = req.body;

    let message = await bookTourService.cancellationBookTour(data);

    return res.status(message.code).json(message);


}

let handleGetAllBookTour = async (req, res) => {
    let id = req.query.id;
    if (!id) {
        return res.status(400).json(
            {
                code: 400,
                errCode: 1,
                errMessage: 'Missing required parameters',

            }
        )
    }
    let bookTour = await bookTourService.getBookTour(id);
    if (bookTour.code === 400) {
        return res.status(bookTour.code).json({
            errCode: 1,
            errMessage: 'fail',
            bookTour: bookTour.bookTour
        })
    } else {
        return res.status(bookTour.code).json({
            errCode: 0,
            errMessage: '',
            bookTour: bookTour.bookTour
        })
    }


}
let handleGetBookTourByCustomerId = async (req, res) => {
    let id = req.query.customerId;
    if (!id) {
        return res.status(400).json(
            {
                code: 400,
                errCode: 1,
                errMessage: 'Missing required parameters',

            }
        )
    }
    let bookTour = await bookTourService.getBookTourByCustomerId(id);
    if (bookTour.code === 400) {
        return res.status(bookTour.code).json({
            errCode: 1,
            errMessage: 'fail',
            bookTour: bookTour.bookTour
        })
    } else {
        return res.status(bookTour.code).json({
            errCode: 0,
            errMessage: '',
            bookTour: bookTour.bookTour
        })
    }


}
let delayBookTour = async (id) => {
    await addDelayEventOrder(id, 15);
}
let handleBookTour = async (req, res) => {
    // let checkInput = checkValueInput(req.body);
    const time = new Date().getTime();

    // if (!checkInput) {
    //     return res.status(400).json({
    //         code: 400,
    //         errCode: 1,
    //         errMessage: 'Missing input parameter!',
    //         time: time
    //     });
    // }

    let message = await bookTourService.bookTourBasic(req.body);

    return res.status(message.code).json(message);
}
let handleDeleteBookTour = async (req, res) => {
    if (!req.body.id) {
        return res.status(400).json({
            code: 400,
            errCode: 1,
            errMessage: 'Missing required parameters'

        })
    }
    let message = await bookTourService.deleteBookTour(req.body.id);

    return res.status(message.code).json(message);


}


module.exports = {
    handleCreateBookTour: handleCreateBookTour,
    handleEditBookTour: handleEditBookTour,
    handleGetAllBookTour: handleGetAllBookTour,
    handleDeleteBookTour: handleDeleteBookTour,
    handleBookTour: handleBookTour,
    handleGetBookTourByCustomerId: handleGetBookTourByCustomerId,
    handleCancellationBookTour: handleCancellationBookTour

}