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
import otpController from "../controllers/otpController.js";
import dayDetailController from "../controllers/dayDetailController.js";
import arrayImageController from "../controllers/arrayImageController.js";
import favoriteTourController from "../controllers/favoriteTourController.js";
import vnPayController from "../controllers/vnPayController.js"
import stripeController from "../controllers/stripeController.js"
//import { verifyToken } from "../middleware/auth";

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
    // api user
    router.post('/api/login', userController.handleLogin);
    router.post('/api/login/phone', userController.handleLoginByPhone);
    router.get('/api/get-all-users', userController.handleGetAllUsers);
    router.get('/api/user/search/phone', userController.handleGetUserByPhone);
    router.get('/api/user/search/email', userController.handleGetUserByEmail);
    router.post('/api/create-new-user', userController.handleCreateNewUser);
    router.put('/api/edit-user', userController.handleEditUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);
    router.post('/api/user/create/phone', userController.handleCreateNewUserWhenBookTourByPhone);
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
    router.post('/api/bookTour/book', bookTourController.handleBookTour);
    router.get('/api/bookTour/get-by-customerId', bookTourController.handleGetBookTourByCustomerId);
    router.put('/api/bookTour/cancellation', bookTourController.handleCancellationBookTour);
    router.put('/api/bookTour/editState', bookTourController.handleEditStateBookTour);
    router.get('/api/bookTour/get-by-tourId', bookTourController.handleGetBookTourByTourId);
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
    router.get('/api/get-tour-region', tourController.handelGetTourByRegion);
    router.get('/api/get-tour-continent', tourController.handelGetTourByContinent);
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
    router.get('/api/get-region-destination', destinationController.handleGetRegionDestination);
    //Api verify
    router.get('/api/verify', userController.verify);
    //Api Otp
    router.post('/api/create-otp', userController.createOtp);
    router.post('/api/regisUserOtp', userController.regisUserOtp);
    router.post('/api/create-new-Otp', otpController.handleCreateOtp);
    router.post('/api/verifyOtp', userController.verifyOtp);
    router.post('/api/send-otp-phone', otpController.handleSendOTPWithSMS);
    router.post('/api/verify-otp-phone', otpController.handelVerifyOTPWithPhone);
    //Api dayDetails
    router.post('/api/day-detail/create', dayDetailController.handleCreateDayDetail);
    router.put('/api/day-detail/edit', dayDetailController.handleEditDayDetail);
    router.get('/api/day-detail/get', dayDetailController.handleGetDayDetail);
    router.delete('/api/day-detail/delete', dayDetailController.handleDeleteDayDetail);
    // router.delete('/api/day-detail/delete/tour-id', dayDetailController.handleDeleteDayDetail);
    //Api image array tour
    router.post('/api/array-image/create', arrayImageController.handleCreateArrayImage);
    router.put('/api/array-image/edit', arrayImageController.handleEditArrayImage);
    router.get('/api/array-image/get', arrayImageController.handleGetArrayImage);
    router.delete('/api/array-image/delete', arrayImageController.handleDeleteArrayImage);
    //Api favoriteTour
    router.post('/api/favorite-tour/create', favoriteTourController.handleCreateFavoriteTour);
    router.put('/api/favorite-tour/edit-by-customerId', favoriteTourController.handleEditFavoriteTour);
    router.get('/api/favorite-tour/get-by-customerId', favoriteTourController.handleGetFavoriteTour);
    // chuyeen tourId customerId 
    router.delete('/api/favorite-tour/delete', favoriteTourController.handleDeleteFavoriteTour);

    //Api payment vnpay
    router.post('/create_payment_url', vnPayController.vnPay_Payment);
    //APi payment stripe visa
    router.post('/create_payment_stripe', stripeController.stripe_Payment);
    return app.use("/", router);
}

module.exports = initWebRoutes;