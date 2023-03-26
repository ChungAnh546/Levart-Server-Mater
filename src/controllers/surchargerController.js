import surchargerService from '../services/surchargerService';


let handleCreateSurcharger = async (req, res) => {
    let checkInput = checkValueInput(req.body);
    if (!checkInput) {
        return res.status(400).json({
            errCode: 1,
            errMessage: 'Missing input parameter!'
        });
    }
    let message = await surchargerService.createNewSurcharger(req.body);
    if (message.errCode === 0) {
        return res.status(200).json(message);
    } else {
        return res.status(400).json(message);
    }


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