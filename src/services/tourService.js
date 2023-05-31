import { error } from "jquery";

import db from "../models/index";
import destinationService from "./destinationService";
const { Op } = require('sequelize');
let createNewTour = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Tour.create({
                nameTour: data.nameTour,
                placeDest: data.placeDest,
                placeGo: data.placeGo,
                transportation: data.transportation,
                dateGo: data.dateGo,
                dateBack: data.dateBack,
                state: data.state,
                note: data.note,
                image: data.image,
                adultSlot: data.adultSlot,
                childrenSlot: data.childrenSlot,
                adultPrice: data.adultPrice,
                childPrice: data.childPrice,
                babySlot: data.babySlot,
                babyPrice: data.babyPrice,
                dayDetail: data.dayDetail,
                destinationId: data.destinationId,
                unit: data.unit,


            }).then((tour) => {
                resolve({
                    code: 201,
                    errCode: 0,
                    errMessage: '',
                    message: 'OK',
                    tourId: tour.id

                })
            }
            )



        } catch (error) {
            reject(error)
        }
    })

}
let updateTourData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    code: 400,
                    errCode: 1,
                    Message: 'Missing required parameters!'
                })
            }
            let tour = await db.Tour.findOne({
                where: { id: data.id }, raw: false
            })
            if (tour) {
                //
                tour.nameTour = data.nameTour;
                tour.placeDest = data.placeDest;
                tour.placeGo = data.placeGo;
                tour.dateGo = data.dateGo;
                tour.dateBack = data.dateBack;
                tour.state = data.state;
                tour.note = data.note;
                tour.transportation = data.transportation;
                tour.image = data.image;
                tour.adultSlot = data.adultSlot;
                tour.childrenSlot = data.childrenSlot;
                tour.adultPrice = data.adultPrice;
                tour.childPrice = data.childPrice;
                tour.babySlot = data.babySlot;
                tour.babyPrice = data.babyPrice;
                tour.dayDetail = data.dayDetail;
                tour.type = data.type;
                tour.destinationId = data.destinationId;
                tour.unit = data.unit;
                tour.dayDetail = data.dayDetail;
                //
                await tour.save();
                resolve({
                    code: 202,
                    errCode: 0,
                    Message: 'Update the tour succeeds!'
                })


            } else {
                resolve({
                    code: 404,
                    errCode: 2,
                    Message: `tour's not found!`
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
let getAllTour = (tourId) => {

    return new Promise(async (resolve, reject) => {

        try {

            let tour = '';
            if (tourId === 'ALL') {
                tour = await db.Tour.findAll(
                    {
                        include: [
                            { model: db.Destination, as: 'destinationData' },
                            // { model: db.TourDetails, as: 'tourDetailData' },
                            { model: db.ArrayImage, as: 'imageData' }
                        ],
                        raw: true,
                        nest: true
                    }
                );
                for (let index = 0; index < tour.length; index++) {
                    const element = tour[index];
                    tour[index].tourDetailData = await db.TourDetails.findAll({
                        where: {
                            tourId: element.id
                        }
                    });
                    tour[index].imageData = await db.ArrayImage.findAll({
                        where: {
                            tableId: element.id
                        }, attributes: ['tableId', 'image']
                    });
                }
            }
            if (tourId && tourId !== 'ALL') {
                tour = await db.Tour.findOne({
                    where: { id: tourId },

                    include: [
                        { model: db.Destination, as: 'destinationData' },
                        // { model: db.TourDetails, attributes: ['title', 'schedule', 'tourId'], as: 'tourDetailData' },
                        { model: db.ArrayImage, as: 'imageData' }
                    ],
                    raw: true,
                    nest: true
                });
                tour.tourDetailData = await db.TourDetails.findAll({
                    where: {
                        tourId: tourId
                    }
                });
                tour.imageData = await db.ArrayImage.findAll({
                    where: {
                        tableId: tourId
                    }, attributes: ['tableId', 'image']
                });
            }
            // console.log("continent", await getTourByContinent("Chau A"));
            // console.log("country", await getTourByCountry("Viet Nam"));
            // console.log("region", await getTourByRegion("Mien Nam"));
            // console.log("address", await getTourByAddress("Ca Mau"));

            resolve({
                code: 200,
                errCode: 0,
                Message: '',
                tour: tour
            })
        } catch (error) {
            reject(error)
        }
    })
}
let getTourByNameAndPrice = (name, price) => {

    return new Promise(async (resolve, reject) => {

        try {

            let tour = '';

            if (name || price) {
                if (name && price) {
                    tour = await db.Tour.findAll({
                        where: {
                            placeDest: {
                                [Op.like]: '%' + name + '%'
                            },
                            adultPrice: {
                                [Op.lt]: price
                            }

                        }, attributes: {
                            exclude: ['image']
                        }
                    })
                } else {


                    if (name) {
                        tour = await db.Tour.findAll({
                            where: {
                                placeDest: {
                                    [Op.like]: '%' + name + '%'
                                }

                            }, attributes: {
                                exclude: ['image']
                            }
                        })
                    } else {
                        if (price) {
                            tour = await db.Tour.findAll({
                                where: {
                                    adultPrice: {
                                        [Op.lt]: price
                                    }

                                }, attributes: {
                                    exclude: ['image']
                                }
                            })
                        }
                    }
                }

            } else {
                tour = await db.Tour.findAll({
                    attributes: {
                        exclude: ['image']
                    }
                })
            }

            resolve({
                code: 200,
                errCode: 0,
                Message: '',
                tour: tour
            })
        } catch (error) {
            reject(error)
        }
    })
}
let getTourByContinent = (Continent) => {

    return new Promise(async (resolve, reject) => {

        try {

            let tour = '';

            if (Continent) {
                let IdTour = await destinationService.getDestinationByContinent(Continent);
                if (IdTour.destination) {

                    tour = [];
                    for (let index = 0; index < IdTour.destination.length; index++) {
                        const element = IdTour.destination[index];
                        tour.push(await db.Tour.findAll({
                            where: { destinationId: element.id },
                            include: [
                                { model: db.Destination, as: 'destinationData' }
                            ],
                            raw: true,
                            nest: true
                        }))
                    }



                    // .then(async (tour) => {
                    //     for (let index = 0; index < tour.length; index++) {
                    //         const element = tour[index];
                    //         tour[index].tourDetailData = await db.TourDetails.findAll({
                    //             where: {
                    //                 tourId: element.id
                    //             }, attributes: ['title', 'schedule', 'tourId']
                    //         });
                    //         tour[index].imageData = await db.ArrayImage.findAll({
                    //             where: {
                    //                 tableId: element.id
                    //             }, attributes: ['tableId', 'image']
                    //         });
                    //     }


                    // });
                    resolve({
                        code: 200,
                        errCode: 0,
                        Message: '',
                        tour: tour
                    });
                }

            }

        } catch (error) {
            reject(error)
        }
    })
}
let getTourByCountry = (Country) => {

    return new Promise(async (resolve, reject) => {

        try {

            let tour = '';

            if (Country) {
                let IdTour = await destinationService.getDestinationByCountry(Country);
                if (IdTour.destination) {
                    let tour = await db.Tour.findAll({
                        where: { destinationId: IdTour.destination.id },
                        include: [
                            { model: db.Destination, as: 'destinationData' }
                        ],
                        raw: true,
                        nest: true
                    }).then(async (tour) => {
                        for (let index = 0; index < tour.length; index++) {
                            const element = tour[index];
                            tour[index].tourDetailData = await db.TourDetails.findAll({
                                where: {
                                    tourId: element.id
                                }
                            });
                            tour[index].imageData = await db.ArrayImage.findAll({
                                where: {
                                    tableId: element.id
                                }, attributes: ['tableId', 'image']
                            });
                        }

                        resolve({
                            code: 200,
                            errCode: 0,
                            Message: '',
                            tour: tour
                        });
                    });

                }
            }

        } catch (error) {
            reject(error)
        }
    })
}
let getTourByRegion = (Region) => {

    return new Promise(async (resolve, reject) => {

        try {

            let tour = '';

            if (Region) {
                let IdTour = await destinationService.getDestinationByRegion(Region);
                if (IdTour.destination) {
                    tour = await db.Tour.findAll({
                        where: { destinationId: IdTour.destination.id },
                        include: [
                            { model: db.Destination, as: 'destinationData' }
                        ],
                        raw: true,
                        nest: true
                    }).then(async (tour) => {
                        for (let index = 0; index < tour.length; index++) {
                            const element = tour[index];
                            tour[index].tourDetailData = await db.TourDetails.findAll({
                                where: {
                                    tourId: element.id
                                }
                            });
                            tour[index].imageData = await db.ArrayImage.findAll({
                                where: {
                                    tableId: element.id
                                }, attributes: ['tableId', 'image']
                            });
                        }

                        resolve({
                            code: 200,
                            errCode: 0,
                            Message: '',
                            tour: tour
                        });
                    });

                }
            }

        } catch (error) {
            reject(error)
        }
    })
}
let getTourByAddress = (Address) => {

    return new Promise(async (resolve, reject) => {

        try {

            let tour = '';

            if (Address) {
                let IdTour = await destinationService.getDestinationByAddress(Address);
                if (IdTour.destination) {
                    tour = await db.Tour.findAll({
                        where: { destinationId: IdTour.destination.id },
                        include: [
                            { model: db.Destination, as: 'destinationData' }
                        ],
                        raw: true,
                        nest: true
                    }).then(async (tour) => {
                        for (let index = 0; index < tour.length; index++) {
                            const element = tour[index];
                            tour[index].tourDetailData = await db.TourDetails.findAll({
                                where: {
                                    tourId: element.id
                                }
                            });
                            tour[index].imageData = await db.ArrayImage.findAll({
                                where: {
                                    tableId: element.id
                                }, attributes: ['tableId', 'image']
                            });
                        }
                        console.log(tour);
                        resolve({
                            code: 200,
                            errCode: 0,
                            Message: '',
                            tour: tour
                        });
                    });

                }
            }

        } catch (error) {
            reject(error)
        }
    })
}
let deleteTour = (tourId) => {
    return new Promise(async (resolve, reject) => {
        let tour = await db.Tour.findOne({
            where: { id: tourId }
        })
        if (!tour) {
            resolve({
                code: 404,
                errCode: 2,
                errMessage: `The tour isn't exist`
            })

        }
        await db.Tour.destroy({
            where: { id: tourId },

        })
        resolve({
            code: 200,
            errCode: 0,
            message: `The tour is deleted`
        })

    })
}
module.exports = {
    createNewTour: createNewTour,
    updateTourData: updateTourData,
    getAllTour: getAllTour,
    deleteTour: deleteTour,
    getTourByContinent: getTourByContinent,
    getTourByCountry: getTourByCountry,
    getTourByAddress: getTourByAddress,
    getTourByRegion: getTourByRegion,
    getTourByNameAndPrice: getTourByNameAndPrice

}