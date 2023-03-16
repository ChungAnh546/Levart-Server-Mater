import billService from "../services/billService"

let handleCreateNewBill = async (req, res) => {

    let checkInput = checkValueInput(req.body);
    if (!checkInput) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Missing input parameter!'
        });
    }

    let message = await billService.createNewBill(req.body);
    return res.status(200).json(message);

}
let checkValueInput = (data) => {
    let isValid = true;
    let arrInput = ['bookTourId', 'customerId', 'creatorId', 'totalCost']
    for (let i = 0; i < arrInput.length; i++) {
        if (!data[arrInput[i]]) {
            isValid = false;
            break;
        }

    } return isValid

}
let handleGetAllBill = async (req, res) => {
    let id = req.query.id;
    if (!id) {
        return res.status(500).json(
            {
                errCode: 1,
                errMessage: 'Missing required parameters',

            }
        )
    }
    let bill = await billService.getBill(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        bill: bill
    })

}
module.exports = {
    handleCreateNewBill: handleCreateNewBill,
    handleGetAllBill: handleGetAllBill
}