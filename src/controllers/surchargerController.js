import surchargerService from '../services/surchargerService';


let handleCreateSurcharger = async (req, res) => {
    let checkInput = checkValueInput(req.body);
    if (!checkInput) {
        return res.status(400).json({
            code: 400,
            errCode: 1,
            errMessage: 'Missing input parameter!'
        });
    }
    let message = await surchargerService.createNewSurcharger(req.body);

    return res.status(message.code).json(message);



}
let checkValueInput = (data) => {
    let isValid = true;
    let arrInput = ['tourId', 'personVi', 'foreigner']
    for (let i = 0; i < arrInput.length; i++) {
        if (!data[arrInput[i]]) {
            isValid = false;
            break;
        }

    } return isValid

}
module.exports = {
    handleCreateSurcharger: handleCreateSurcharger
}