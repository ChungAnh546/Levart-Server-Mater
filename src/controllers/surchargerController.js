import surchargerService from '../services/surchargerService';


let handleCreateSurcharger = async (req, res) => {

    let message = await surchargerService.createNewSurcharger(req.body);
    console.log(message);
    return res.status(200).json(message);


}

module.exports = {
    handleCreateSurcharger: handleCreateSurcharger
}