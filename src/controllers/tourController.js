import tourService from '../services/tourService';
let handleCreateTour = async (req, res) => {

    let message = await tourService.createNewTour(req.body);
    console.log(message);
    return res.status(200).json(message);


}
let handleEditTour = async (req, res) => {
    let data = req.body;
    let message = await tourService.updateTourData(data);
    return res.status(200).json(message)
}
let handleGetAllTour = async (req, res) => {
    let id = req.query.id;//all,id

    if (!id) {
        return res.status(200).json(
            {
                errCode: 1,
                errMessage: 'Missing required parameters',

            }
        )
    }

    let tour = await tourService.getAllTour(id);

    return res.status(200).json(
        {
            errCode: 0,
            errMessage: 'Ok',
            tour: tour
        }
    )

}
let handleDeleteTour = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters'

        })
    }
    let message = await tourService.deleteTour(req.body.id);
    console.log(message);
    return res.status(200).json(message);
}
module.exports = {
    handleCreateTour: handleCreateTour,
    handleEditTour: handleEditTour,
    handleGetAllTour: handleGetAllTour,
    handleDeleteTour: handleDeleteTour
}