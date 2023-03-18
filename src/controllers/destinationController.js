import destinationService from '../services/destinationService.js';
let handleCreateDestination = async (req, res) => {

    let message = await destinationService.createNewDestination(req.body);
    console.log(message);
    return res.status(200).json(message);


}
let handleEditDestination = async (req, res) => {
    let data = req.body;
    let message = await destinationService.updateDestinationData(data);
    return res.status(200).json(message)
}
let handleGetAllDestination = async (req, res) => {
    let id = req.query.id;//all,id

    if (!id) {
        return res.status(200).json(
            {
                errCode: 1,
                errMessage: 'Missing required parameters',

            }
        )
    }

    let destination = await destinationService.getAllDestination(id);

    return res.status(200).json(
        {
            errCode: 0,
            errMessage: 'Ok',
            destination: destination
        }
    )

}
let handleDeleteDestination = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters'

        })
    }
    let message = await destinationService.deleteDestination(req.body.id);
    console.log(message);
    return res.status(200).json(message);
}

module.exports = {

    handleCreateDestination: handleCreateDestination,
    handleEditDestination: handleEditDestination,
    handleGetAllDestination: handleGetAllDestination,
    handleDeleteDestination: handleDeleteDestination

}