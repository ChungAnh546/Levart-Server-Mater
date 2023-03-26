import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import billController from "../controllers/billController";
import bookTourController from "../controllers/bookTourController";
import hotelController from "../controllers/hotelController";
import newsController from "../controllers/newsController";
import paymentController from "../controllers/paymentController";
import surchargerController from "../controllers/surchargerController";
import rentalServiceController from "../controllers/rentalServiceController.js";
import tourController from "../controllers/tourController";
import tourHotelController from "../controllers/tourHotelController";
import allCodeController from "../controllers/allCodeController.js";
import destinationController from "../controllers/destinationController.js";


let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);
    router.get('/crud', homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.displayGetCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);
    router.post('/put-crud', homeController.putCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);
    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-users', userController.handleGetAllUsers);
    router.post('/api/create-new-user', userController.handleCreateNewUser);
    router.put('/api/edit-user', userController.handleEditUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);
    router.get('/api/get-all-users', userController.handleGetAllUsers);
    //Api Bills
    router.post('/api/create-new-bill', billController.handleCreateNewBill);
    router.get('/api/get-all-bill', billController.handleGetAllBill);
    //http://localhost:8080/api/get-all-bill?id=All
    //Api bookTour
    router.post('/api/create-new-bookTour', bookTourController.handleCreateBookTour);
    router.put('/api/edit-bookTour', bookTourController.handleEditBookTour);
    router.get('/api/get-all-bookTour', bookTourController.handleGetAllBookTour);
    router.delete('/api/delete-bookTour', bookTourController.handleDeleteBookTour);
    //Api hotel 
    router.post('/api/create-new-hotel', hotelController.handleCreateHotel);
    router.put('/api/edit-hotel', hotelController.handleEditHotel);
    router.get('/api/get-all-hotel', hotelController.handleGetAllHotel);
    router.delete('/api/delete-hotel', hotelController.handleDeleteHotel);

    ///Api news
    router.post('/api/create-new-news', newsController.handleCreateNews);
    router.put('/api/edit-news', newsController.handleEditNews);
    router.get('/api/get-all-news', newsController.handleGetAllNews);
    router.delete('/api/delete-news', newsController.handleDeleteNews);
    //Api payment
    router.post('/api/create-new-payment', paymentController.handleCreatePayment);
    router.put('/api/edit-payment', paymentController.handleEditPayment);
    router.get('/api/get-all-payment', paymentController.handleGetAllPayment);
    //Api Surcharger
    router.post('/api/create-new-surcharger', surchargerController.handleCreateSurcharger);

    //Api tour
    router.post('/api/create-new-tour', tourController.handleCreateTour);
    router.put('/api/edit-tour', tourController.handleEditTour);
    router.get('/api/get-all-tour', tourController.handleGetAllTour);
    router.delete('/api/delete-tour', tourController.handleDeleteTour);
    //Api tourHotel
    router.post('/api/create-new-tourHotel', tourHotelController.handleCreateTourHotel);
    router.put('/api/edit-tourHotel', tourHotelController.handleEditTourHotel);
    router.delete('/api/delete-tourHotel', tourHotelController.handleDeleteTourHotel);
    //Api rentalService
    router.post('/api/create-new-rentalService', rentalServiceController.handleCreateRentalService);
    //Api allCode
    router.post('/api/create-new-allCode', allCodeController.handleCreateAllCode);
    router.get('/api/get-all-allCode', allCodeController.handleGetAllCode);
    //Api destination
    router.post('/api/create-new-destination', destinationController.handleCreateDestination);
    router.put('/api/edit-destination', destinationController.handleEditDestination);
    router.get('/api/get-all-destination', destinationController.handleGetAllDestination);
    router.delete('/api/delete-destination', destinationController.handleDeleteDestination);
    //Api verify
    router.get('/verify', userController.verify);
    return app.use("/", router);
}

module.exports = initWebRoutes;