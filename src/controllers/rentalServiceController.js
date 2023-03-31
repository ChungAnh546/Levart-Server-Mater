import rentalService from '../services/rentalService.js';
let handleCreateRentalService = async (req, res) => {

    let message = await rentalService.createNewRentalService(req.body);

    return res.status(message.code).json(message);



}
module.exports = {
    handleCreateRentalService: handleCreateRentalService
}