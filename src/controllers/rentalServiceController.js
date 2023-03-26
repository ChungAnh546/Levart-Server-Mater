import rentalService from '../services/rentalService.js';
let handleCreateRentalService = async (req, res) => {

    let message = await rentalService.createNewRentalService(req.body);
    if (message.errCode === 0) {
        return res.status(200).json(message);
    } else {
        return res.status(400).json(message);
    }


}
module.exports = {
    handleCreateRentalService: handleCreateRentalService
}