import { useEffect, useState } from "react"
import "@fortawesome/fontawesome-free/js/all.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/index.scss";
import { createStore, applyMiddleware } from 'redux';
import { Provider as StoreProvider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import appReducer from '../store';
import rootSaga from '../store/sagas';
import { appWithTranslation } from '../constent/i18n/i18n'
import { get } from "lodash"
import { io } from "socket.io-client";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import firebase from 'firebase/app';
import 'firebase/messaging';
import 'react-notifications/lib/notifications.css';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_51KyKExSGgexb5Zed8GoboejOalyxeESSoWsWTOLHPJ6N0QEuspgA84dZ8gkihdRDz8N4l3jZ61KG04VN7mqG8o9C00NYX2OUwT');


// import { useDispatch, useSelector } from 'react-redux'

const WEB_SOCKET = 'http://localhost:1337'//process.env.NEXT_PUBLIC_WEB_SOCKET
const API_KEY = process.env.NEXT_PUBLIC_API_KEY
const AUTH_DOMAIN = process.env.NEXT_PUBLIC_AUTH_DOMAIN
const PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID
const STORAGE_BUCKET = process.env.NEXT_PUBLIC_STORAGE_BUCKET
const MESSAGINGSSENDER_ID = process.env.NEXT_PUBLIC_MESSAGINGS_SENDER_ID
const AAP_ID = process.env.NEXT_PUBLIC_AAP_ID
const VAPID_KEY = process.env.NEXT_PUBLIC_VAPID_KEY

const sagaMiddleware = createSagaMiddleware();
const store = createStore(appReducer, applyMiddleware(sagaMiddleware, logger));
sagaMiddleware.run(rootSaga);

function MyApp({ Component, pageProps }) {
  // const dispatch = useDispatch()
  // const socket = io();
  const [ws, setWs] = useState({})

  // get(ws, 'on', false) && ws.on("getproposals", (data) => {
  
  //   console.log("message=======>", data)
    
  // });

  useEffect(() => {
    initFirebase()
    // setWebSoket()
  
  }, [])

  async function initFirebase() {
    var firebaseConfig = {
      apiKey: API_KEY,
      authDomain: AUTH_DOMAIN,
      projectId: PROJECT_ID,
      storageBucket: STORAGE_BUCKET,
      messagingSenderId: MESSAGINGSSENDER_ID,
      appId: AAP_ID
    };
    const FB = firebase.initializeApp(firebaseConfig)
    const messaging = firebase.messaging();
    messageHandler(messaging)
  }

  async function messageHandler(messaging) {
    messaging.requestPermission()
      .then(async function () {
        const token = await messaging.getToken();
    
        messaging.onMessage((payload) => {

          NotificationManager.success(get(payload, 'notification.body', ''), get(payload, 'notification.title', ''))

        });
      })
      .catch(function (err) {
        console.log("Unable to get permission to notify.", err);
      });
    // const token = await messaging.getToken({ vapidKey: VAPID_KEY })
    // console.log("token", token)
    // messaging.onMessage((payload) => {
    //   console.log('Message received. ', payload);
    //   // ...
    // });
  }

  function setWebSoket() {
    // const token = JSON.parse(localStorage.getItem('token'))
    
    // if (token !== null && token) {
    //   const sData = io(WEB_SOCKET, {
    //     transportOptions: {
    //       polling: {
    //         extraHeaders: {
    //           Authorization: 'Bearer'+" "+ token
    //         },
    //       },
    //     },
    //   })
     
    //   // const sData = io(WEB_SOCKET, {
    //   //   auth: {
    //   //     token: token
    //   //   }
    //   // })
    //   // const webS = new WebSocket(WEB_SOCKET, token)
    //   console.log("testing socket", sData)
    //   // sData.on("new message", (data) => {
    //   //   const rooms = data;
    //   //       console.log("rooms========>", data);
    //   // })
    //   // sData.emit("getConnectedUsers", {}, (res) => {
    //   //    const rooms = res;
    //   //     console.log("rooms========>", res);
    //   //     // joinRoom(rooms[0]);
    //   //   });
    //   setWs(sData)
    //   // dispatch({type:"CONNECT_WS",sData})
    // }

  }

  return (
    <StoreProvider store={store}>
        <Elements stripe={stripePromise}>
      <Component ws={ws} setWebSoket={setWebSoket} {...pageProps} />
      <NotificationContainer />
      </Elements>
    </StoreProvider>
  )
}

export default appWithTranslation(MyApp);
