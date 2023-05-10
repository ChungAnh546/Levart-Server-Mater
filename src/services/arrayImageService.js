import db from "../models/index";
let createNewArrayImage = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.ArrayImage.create({
                tableId: data.tableId,
                image: data.image,




            })
            resolve({
                code: 201,
                errCode: 0,
                errMessage: '',
                message: 'OK',

            })


        } catch (error) {
            reject(error)
        }
    })
}
let getArrayImage = (id) => {

    return new Promise(async (resolve, reject) => {

        try {

            let arrayImage = '';
            if (id === 'ALL') {
                arrayImage = await db.ArrayImage.findAll({

                });
            }
            if (id && id !== 'ALL') {
                arrayImage = await db.ArrayImage.findOne({
                    where: { id: id }

                })
            }
            resolve({
                code: 200,
                errCode: 0,
                errMessage: '',
                message: 'OK',
                arrayImage: arrayImage

            })
        } catch (error) {
            reject(error)
        }
    })
}
let deleteArrayImage = (arrayImageId) => {
    return new Promise(async (resolve, reject) => {
        let arrayImage = await db.ArrayImage.findOne({
            where: { id: arrayImageId }
        })
        if (!arrayImage) {
            resolve({
                code: 404,
                errCode: 2,
                errMessage: `The arrayImage isn't exist`
            })

        }
        await db.ArrayImage.destroy({
            where: { id: arrayImageId }
        })
        resolve({
            code: 200,
            errCode: 0,
            message: `The arrayImage is deleted`
        })

    })
}
let updateArrayImageData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    code: 400,
                    errCode: 1,
                    Message: 'Missing required parameters!'
                })
            }
            let arrayImage = await db.ArrayImage.findOne({
                where: { id: data.id }, raw: false
            })
            if (arrayImage) {
                arrayImage.tableId = data.tableId;
                arrayImage.image = data.image;

                await arrayImage.save();
                resolve({
                    code: 202,
                    errCode: 0,
                    Message: 'Update the arrayImage succeeds!'
                })


            } else {
                resolve({
                    code: 204,
                    errCode: 2,
                    Message: `arrayImage's not found!`
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    getArrayImage: getArrayImage,
    createNewArrayImage: createNewArrayImage,
    deleteArrayImage: deleteArrayImage,
    updateArrayImageData: updateArrayImageData
}