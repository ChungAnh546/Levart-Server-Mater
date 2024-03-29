import tourService from '../services/tourService';
let handleCreateTour = async (req, res) => {
    // let checkInput = checkValueInput(req.body);
    // if (!checkInput) {
    //     return res.status(500).json({
    //         errCode: 1,
    //         errMessage: 'Missing input parameter!'
    //     });
    // }
    let message = await tourService.createNewTour(req.body);

    return res.status(message.code).json(message);



}//, 'dateGo', 'dateBack'
let checkValueInput = (data) => {
    let isValid = true;
    let arrInput = ['placeDest', 'placeGo', 'adultSlot', 'childrenSlot', 'adultPrice', 'childPrice', 'destinationId']
    for (let i = 0; i < arrInput.length; i++) {
        if (!data[arrInput[i]]) {
            isValid = false;
            break;
        }

    } return isValid

}
let handleEditTour = async (req, res) => {
    let data = req.body;
    let message = await tourService.updateTourData(data);

    return res.status(message.code).json(message);

}
let handleGetAllTour = async (req, res) => {
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

    let tour = await tourService.getAllTour(id);

    return res.status(tour.code).json(
        {
            errCode: 0,
            errMessage: 'Ok',
            tour: tour.tour
        }
    )

}
let handleSearchTourByPlaceDestAndPrice = async (req, res) => {
    let placeDest = req.query.placeDest;//all,id
    let price = req.query.price;
    // if (!placeDest && !price) {
    //     return res.status(400).json(
    //         {
    //             code: 400,
    //             errCode: 1,
    //             errMessage: 'Missing required parameters',

    //         }
    //     )
    // }

    let tour = await tourService.getTourByNameAndPrice(placeDest, price);

    return res.status(tour.code).json(
        {
            errCode: 0,
            errMessage: 'Ok',
            tour: tour.tour
        }
    )

}
let handleDeleteTour = async (req, res) => {
    if (!req.body.id) {
        return res.status(400).json({
            code: 400,
            errCode: 1,
            errMessage: 'Missing required parameters'

        })
    }
    let message = await tourService.deleteTour(req.body.id);

    return res.status(message.code).json(message);

}
let handelGetTourByRegion = async (req, res) => {
    let region = req.query.region;//

    if (!region) {
        return res.status(400).json(
            {
                code: 400,
                errCode: 1,
                errMessage: 'Missing required parameters',

            }
        )
    }

    let tour = await tourService.getTourByRegion(region);

    return res.status(tour.code).json(
        {
            errCode: 0,
            errMessage: 'Ok',
            tour: tour.tour
        }
    )
}
let handelGetTourByContinent = async (req, res) => {
    let continent = req.query.continent;//

    if (!continent) {
        return res.status(400).json(
            {
                code: 400,
                errCode: 1,
                errMessage: 'Missing required parameters',

            }
        )
    }

    let tour = await tourService.getTourByContinent(continent);

    return res.status(tour.code).json(
        {
            errCode: 0,
            errMessage: 'Ok',
            tour: tour.tour
        }
    )
}
module.exports = {
    handleCreateTour: handleCreateTour,
    handleEditTour: handleEditTour,
    handleGetAllTour: handleGetAllTour,
    handleDeleteTour: handleDeleteTour,
    handelGetTourByRegion: handelGetTourByRegion,
    handelGetTourByContinent: handelGetTourByContinent,
    handleSearchTourByPlaceDestAndPrice: handleSearchTourByPlaceDestAndPrice
}