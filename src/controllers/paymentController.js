import paymentService from '../services/paymentService';

let handleCreatePayment = async (req, res) => {
    let checkInput = checkValueInput(req.body);
    if (!checkInput) {
        return res.status(400).json({
            code: 400,
            errCode: 1,
            errMessage: 'Missing input parameter!'
        });
    }
    let message = await paymentService.createNewPayment(req.body);

    return res.status(message.code).json(message);

}
let checkValueInput = (data) => {
    let isValid = true;
    let arrInput = ['customerId', 'amount', 'paymentMethod']
    for (let i = 0; i < arrInput.length; i++) {
        if (!data[arrInput[i]]) {
            isValid = false;
            break;
        }

    } return isValid

}
let handleEditPayment = async (req, res) => {
    let data = req.body;
    let message = await paymentService.updatePaymentData(data);

    return res.status(message.code).json(message);

}
let handleGetAllPayment = async (req, res) => {
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

    let payment = await paymentService.getAllPayment(id);

    return res.status(payment.code).json(
        {
            errCode: 0,
            errMessage: 'Ok',
            payment: payment.payment
        }
    )

}
module.exports = {
    handleCreatePayment: handleCreatePayment,
    handleEditPayment: handleEditPayment,
    handleGetAllPayment: handleGetAllPayment
}