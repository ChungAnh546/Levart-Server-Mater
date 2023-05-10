import arrayImageService from "../services/arrayImageService.js";

let handleCreateArrayImage = async (req, res) => {

    let message = await arrayImageService.createNewArrayImage(req.body);
    console.log(message);

    return res.status(message.code).json(message);




}
let handleEditArrayImage = async (req, res) => {
    let data = req.body;
    let message = await arrayImageService.updateArrayImageData(data);

    return res.status(message.code).json(message);


}
let handleGetArrayImage = async (req, res) => {
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

    let arrayImage = await arrayImageService.getArrayImage(id);

    return res.status(arrayImage.code).json(
        {
            errCode: 0,
            errMessage: 'Ok',
            arrayImage: arrayImage.arrayImage
        }
    )

}
let handleDeleteArrayImage = async (req, res) => {
    if (!req.body.id) {
        return res.status(400).json({
            code: 400,
            errCode: 1,
            errMessage: 'Missing required parameters'

        })
    }
    let message = await arrayImageService.deleteArrayImage(req.body.id);

    return res.status(message.code).json(message);

}

module.exports = {
    handleCreateArrayImage: handleCreateArrayImage,
    handleEditArrayImage: handleEditArrayImage,
    handleGetArrayImage: handleGetArrayImage,
    handleDeleteArrayImage: handleDeleteArrayImage

}