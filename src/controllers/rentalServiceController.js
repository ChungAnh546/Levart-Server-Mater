import rentalService from '../services/rentalService.js';
let handleCreateRentalService = async (req, res) => {

    let message = await rentalService.createNewRentalService(req.body);
    console.log(message);
    return res.status(200).json(message);


}
module.exports = {
    handleCreateRentalService: handleCreateRentalService
}