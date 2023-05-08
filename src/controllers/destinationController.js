import destinationService from '../services/destinationService.js';
let handleCreateDestination = async (req, res) => {

    let message = await destinationService.createNewDestination(req.body);
    console.log(message);

    return res.status(message.code).json(message);




}
let handleEditDestination = async (req, res) => {
    let data = req.body;
    let message = await destinationService.updateDestinationData(data);

    return res.status(message.code).json(message);


}
let handleGetAllDestination = async (req, res) => {
    let id = req.query.id;//all,id

    if (!id) {
        return res.status(400).json(
            {
                code: 400,
                errCode: 1,
                errMessage: 'Missing required parameters',

            }
        )
    }

    let destination = await destinationService.getAllDestination(id);

    return res.status(destination.code).json(
        {
            errCode: 0,
            errMessage: 'Ok',
            destination: destination.destination,

        }
    )

}
let handleDeleteDestination = async (req, res) => {
    if (!req.body.id) {
        return res.status(400).json({
            code: 400,
            errCode: 1,
            errMessage: 'Missing required parameters'

        })
    }
    let message = await destinationService.deleteDestination(req.body.id);

    return res.status(message.code).json(message);


}
let handleGetRegionDestination = async (req, res) => {
    let region = req.query.region;//all,region

    if (!region) {
        return res.status(400).json(
            {
                code: 400,
                errCode: 1,
                errMessage: 'Missing required parameters',

            }
        )
    }

    let destination = await destinationService.getDestinationByRegion(region);

    return res.status(destination.code).json(
        {
            errCode: 0,
            errMessage: 'Ok',
            destination: destination.destination,

        }
    )

}

module.exports = {

    handleCreateDestination: handleCreateDestination,
    handleEditDestination: handleEditDestination,
    handleGetAllDestination: handleGetAllDestination,
    handleDeleteDestination: handleDeleteDestination,
    handleGetRegionDestination: handleGetRegionDestination

}