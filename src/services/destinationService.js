import db from "../models/index";
let createNewDestination = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Destination.create({
                continent: data.continent,
                country: data.country,
                region: data.region,
                address: data.address,


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
let updateDestinationData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    code: 400,
                    errCode: 1,
                    Message: 'Missing required parameters!'
                })
            }
            let destination = await db.Destination.findOne({
                where: { id: data.id }, raw: false
            })
            if (destination) {
                //
                destination.continent = data.continent;
                destination.country = data.country;
                destination.region = data.region;
                destination.address = data.address;
                //
                await destination.save();
                resolve({
                    code: 202,
                    errCode: 0,
                    Message: 'Update the destination succeeds!'
                })


            } else {
                resolve({
                    code: 404,
                    errCode: 2,
                    Message: `destination's not found!`
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
let getAllDestination = (destinationId) => {

    return new Promise(async (resolve, reject) => {

        try {

            let destination = '';
            if (destinationId === 'ALL') {
                destination = await db.Destination.findAll();
            }
            if (destinationId && destinationId !== 'ALL') {
                destination = await db.Destination.findOne({
                    where: { id: destinationId }
                })
            }
            // let continent = await getDestinationByContinent("Chau a");
            // let country = await getDestinationByCountry("Viet Nam");
            // let region = await getDestinationByRegion("Mien Nam");
            // let address = await getDestinationByAddress("Ca Mau");
            resolve({
                code: 200,
                errCode: 0,
                Message: '',
                destination: destination
                // continent: continent,
                // country: country,
                // region: region,
                // address: address
            })
        } catch (error) {
            reject(error)
        }
    })
}
let getDestinationByContinent = (destinationContinent) => {

    return new Promise(async (resolve, reject) => {

        try {

            let destination = '';

            if (destinationContinent) {
                destination = await db.Destination.findAll({
                    where: { continent: destinationContinent }
                })
            }
            resolve({
                code: 200,
                errCode: 0,
                Message: '',
                destination: destination
            })
        } catch (error) {
            reject(error)
        }
    })
}
let getDestinationByCountry = (destinationCountry) => {

    return new Promise(async (resolve, reject) => {

        try {

            let destination = '';

            if (destinationCountry) {
                destination = await db.Destination.findOne({
                    where: { country: destinationCountry }
                })
            }
            resolve({
                code: 200,
                errCode: 0,
                Message: '',
                destination: destination
            })
        } catch (error) {
            reject(error)
        }
    })
}
let getDestinationByAddress = (destinationAddress) => {

    return new Promise(async (resolve, reject) => {

        try {

            let destination = '';

            if (destinationAddress) {
                destination = await db.Destination.findOne({
                    where: { address: destinationAddress }
                })
            }
            resolve({
                code: 200,
                errCode: 0,
                Message: '',
                destination: destination
            })
        } catch (error) {
            reject(error)
        }
    })
}
let getDestinationByRegion = (destinationRegion) => {

    return new Promise(async (resolve, reject) => {

        try {

            let destination = '';

            if (destinationRegion) {
                destination = await db.Destination.findOne({
                    where: { region: destinationRegion }
                })
            }
            resolve({
                code: 200,
                errCode: 0,
                Message: '',
                destination: destination
            })
        } catch (error) {
            reject(error)
        }
    })
}
let deleteDestination = (destinationId) => {
    return new Promise(async (resolve, reject) => {
        let destination = await db.Destination.findOne({
            where: { id: destinationId }
        })
        if (!destination) {
            resolve({
                code: 404,
                errCode: 2,
                errMessage: `The destination isn't exist`
            })

        }
        await db.Destination.destroy({
            where: { id: destinationId }
        })
        resolve({
            code: 200,
            errCode: 0,
            message: `The destination is deleted`
        })

    })
}
let deleteDestinationByAddress = (destinationAddress) => {
    return new Promise(async (resolve, reject) => {
        let destination = await db.Destination.findOne({
            where: { address: destinationAddress }
        })
        if (!destination) {
            resolve({
                code: 404,
                errCode: 2,
                errMessage: `The destination isn't exist`
            })

        }
        await db.Destination.destroy({
            where: { address: destinationAddress }
        })
        resolve({
            code: 200,
            errCode: 0,
            message: `The destination is deleted`
        })

    })
}
module.exports = {
    createNewDestination: createNewDestination,
    updateDestinationData: updateDestinationData,
    getAllDestination: getAllDestination,
    deleteDestination: deleteDestination,
    getDestinationByContinent: getDestinationByContinent,
    getDestinationByCountry: getDestinationByCountry,
    getDestinationByAddress: getDestinationByAddress,
    getDestinationByRegion: getDestinationByRegion,
    deleteDestinationByAddress: deleteDestinationByAddress
}
