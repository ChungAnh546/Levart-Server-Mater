import favoriteTourService from "../services/favoriteTourService.js";

let handleCreateFavoriteTour = async (req, res) => {

    let message = await favoriteTourService.createNewFavoriteTour(req.body);


    return res.status(message.code).json(message);




}
let handleEditFavoriteTour = async (req, res) => {
    let data = req.body;
    let message = await favoriteTourService.updateFavoriteTourData(data);

    return res.status(message.code).json(message);


}
let handleGetFavoriteTour = async (req, res) => {
    let id = req.query.customerId;//all,id

    if (!id) {
        return res.status(400).json(
            {
                code: 400,
                errCode: 1,
                errMessage: 'Missing required parameters',

            }
        )
    }

    let favoriteTour = await favoriteTourService.getFavoriteTour(id);

    return res.status(favoriteTour.code).json(
        {
            errCode: 0,
            errMessage: 'Ok',
            favoriteTour: favoriteTour.favoriteTour
        }
    )

}
let handleDeleteFavoriteTour = async (req, res) => {
    if (!req.body.tourId || !req.body.customerId) {
        return res.status(400).json({
            code: 400,
            errCode: 1,
            errMessage: 'Missing required parameters'

        })
    }
    let message = await favoriteTourService.deleteFavoriteTour(req.body.tourId, req.body.customerId);

    return res.status(message.code).json(message);

}

module.exports = {
    handleCreateFavoriteTour: handleCreateFavoriteTour,
    handleEditFavoriteTour: handleEditFavoriteTour,
    handleGetFavoriteTour: handleGetFavoriteTour,
    handleDeleteFavoriteTour: handleDeleteFavoriteTour

}