import * as Users from '../api/users';
import * as Services from '../api/services';
import * as Hyndyman from '../api/hyndyman';
import {takeLatest, takeEvery, all} from 'redux-saga/effects';

function* userActionWatcher() {
  yield takeLatest('SIGNUP_REQUEST', Users.registerByMobile);
  yield takeLatest('SIGNUP_EMAIL_REQUEST', Users.registerByEmail);
  yield takeLatest('LOGIN_REQUEST', Users.loginByMobile);
  yield takeLatest('LOGIN_EMAIL_REQUEST', Users.loginByEmail);
  yield takeLatest('VERIFY_OTP', Users.verifyOtp);
  yield takeLatest('RESEND_OTP', Users.resendOtp);
  yield takeLatest('GET_USER', Users.getUser);
  yield takeLatest('GET_ORDER', Users.getOrders);
  yield takeLatest('GET_ORDER_BY_ID', Users.getOrderById);
  yield takeLatest('GET_INBOX', Users.getInbox);
  yield takeLatest('GET_CHAT', Users.getChat);
  yield takeLatest('GET_MESSAGES', Users.getChatMessage);
  yield takeLatest('SEND_MESSAGE', Users.sendMessage);
  yield takeLatest('GET_USER_INFO', Users.getUserInfo);
  yield takeLatest('UPDATE_USER', Users.updateUser);
  yield takeLatest('DO_PAYMENT', Users.payment);
  yield takeLatest('GET_CARD', Users.getCard);
  yield takeLatest('CHECKOUT', Users.checkout);
  yield takeLatest('ADD_PAYMENT',Users.addPayment);
  yield takeLatest('GOOGLE_REQUEST', Users.registerByGoogle);
  yield takeLatest('FACEBOOK_REQUEST',Users.registerByFacebook);
  yield takeLatest('FORGET_PASSWORD',Users.forgetPassword);
  yield takeLatest('RESET_PASSWORD',Users.resetPassword);
  yield takeLatest('GET_QUOTATIONS', Users.getQuotations)
  yield takeLatest('ASK_REVISION', Users.askRevision)
  // yield takeLatest('REGISTER',Users.mobileSignData);
 }

 function* servicesActionWatcher() {
  yield takeLatest('SEARCH_REQUEST', Services.search);
  yield takeLatest('SEARCH_BY_ID', Services.getAllService);
  yield takeLatest('SEARCH_BY_ID', Services.MovingOutServices);
  yield takeLatest('SERVICE_DETAILS', Services.getServiceDetails);
  yield takeLatest('MORE_SERVICE', Services.getMoreService);
  yield takeLatest('RESET_FORM', Services.postServiceForm);
  yield takeLatest('FORM_REQUEST', Services.gigSubmit);
  yield takeLatest('ADD_WISH', Services.addWishList);
  yield takeLatest('REMOVE_WISH', Services.removeWishList);
  yield takeLatest('GET_SERVICE', Services.getAllService);
  yield takeLatest('GET_NOTIFICATION', Services.getNotification);
  yield takeLatest('GET_EARNING', Services.getEarnings)
  yield takeLatest('GET_Proposals',Services.getProposals)
  yield takeLatest('CONNECT_WS',Services.getConnectionWs)
  yield takeLatest('stripe_payment',Services.stripePayment)
 }

 function* handymanActionWatcher() {
  yield takeLatest('UPLOAD', Hyndyman.uploadDocument);
  yield takeLatest('BECOME_HYNDYMAN', Hyndyman.registerHandyman);
  yield takeLatest('GET_GIG', Hyndyman.getGig);
  yield takeLatest('ADD_GIG', Hyndyman.addGig);
  yield takeLatest('GET_SERVICES',Hyndyman.getServices);
  yield takeLatest('DELETE_REQUEST',Hyndyman.getDelete);
  yield takeLatest('PAUSE_REQUEST',Hyndyman.getPause);
  yield takeLatest('UPDATE_REQUEST',Hyndyman.getUpdate);
  yield takeLatest('CONTINUE_REQUEST',Hyndyman.getContinue)
  yield takeLatest('UPLOAD_REQUEST',Hyndyman.fileUpload)
  yield takeLatest('UPLOAD_PROPOSALS',Hyndyman.postProposals)
 }



export default function* rootSaga() {
  yield all([
 
    userActionWatcher(),
    servicesActionWatcher(),
    handymanActionWatcher()
  ]);
}
