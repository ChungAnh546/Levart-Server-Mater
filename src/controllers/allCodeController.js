import allCodeService from '../services/allCodeService.js';
let handleCreateAllCode = async (req, res) => {

    let message = await allCodeService.createNewAllCode(req.body);
    console.log(message);
    return res.status(200).json(message);


}
let handleGetAllCode = async (req, res) => {
    let type = req.query.type;

    if (!type) {
        return res.status(200).json(
            {
                errCode: 1,
                errMessage: 'Missing required parameters',

            }
        )
    }
    let allCodes = await allCodeService.getAllCode(type);

    return res.status(200).json(
        {
            errCode: 0,
            errMessage: 'Ok',
            allCodes: allCodes
        }
    )
}

module.exports = {
    handleCreateAllCode: handleCreateAllCode,
    handleGetAllCode: handleGetAllCode
}