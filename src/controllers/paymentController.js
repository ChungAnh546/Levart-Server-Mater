import paymentService from '../services/paymentService';

let handleCreatePayment = async (req, res) => {
    let message = await paymentService.createNewPayment(req.body);
    console.log(message);
    return res.status(200).json(message);
}
let handleEditPayment = async (req, res) => {
    let data = req.body;
    let message = await paymentService.updatePaymentData(data);
    return res.status(200).json(message)
}
let handleGetAllPayment = async (req, res) => {
    let id = req.query.id;//all,id

    if (!id) {
        return res.status(200).json(
            {
                errCode: 1,
                errMessage: 'Missing required parameters',

            }
        )
    }

    let payment = await paymentService.getAllPayment(id);

    return res.status(200).json(
        {
            errCode: 0,
            errMessage: 'Ok',
            payment: payment
        }
    )

}
module.exports = {
    handleCreatePayment: handleCreatePayment,
    handleEditPayment: handleEditPayment,
    handleGetAllPayment: handleGetAllPayment
}