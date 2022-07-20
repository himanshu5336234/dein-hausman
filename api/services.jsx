import { put } from 'redux-saga/effects';
import { io } from "socket.io-client";
import { get } from "lodash"
import * as Users from "./users"
const { NEXT_PUBLIC_API_HOST } = process.env
const HOST = "http://localhost:1337"
const NEW_HOST = "http://localhost:1337"
const WEB_SOCKET = 'http://localhost:1337'
export function* search({ payload }) {
  const data = yield fetch(`${NEW_HOST}/search?search=${payload}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      data.mobile = payload.mobile
      return data;
    })
    .catch((error) => {
      throw error;
    });
  yield put({ type: 'SEARCH_RESULT', data });
}

export function* getAllService({ payload }) {
  console.log("APAI calledddddd")
  const data = yield fetch(`${NEW_HOST}/serivces`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      // data.mobile = payload.mobile
      return data;
    })
    .catch((error) => {
      throw error;
    });
  yield put({ type: 'GOT_SERVICE', data });
}

export function* MovingOutServices({ payload }) {
  const data = yield fetch(`${NEW_HOST}/serivces/${payload}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      data.mobile = payload.mobile
      return data;
    })
    .catch((error) => {
      throw error;
    });
  yield put({ type: 'GOT_MOVING_OUT', data });
}

export function* getServiceDetails({ payload }) {
  const data = yield fetch(`${NEW_HOST}/gigs/${payload}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      data.mobile = payload.mobile
      return data;
    })
    .catch((error) => {
      throw error;
    });
  yield put({ type: 'GOT_SERVICE_DETAILS', data });
}

export function* getMoreService({ payload }) {
  const data = yield fetch(`${HOST}/v1/gigs/getByHandyman`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      throw error;
    });
  yield put({ type: 'GOT_MORE_SERVICE', data });
}


export function* postServiceForm({payload}){




  yield put({ type: 'POST_INQUERY', data });
}

export function*  gigSubmit({ payload }) {


  console.log(payload, "form service payload")
  const token = JSON.parse(localStorage.getItem('token'))
  const user = JSON.parse(localStorage.getItem('user'))
  payload = { ...payload, ["buyer"]: user.id }
  // const data = yield fetch(`${NEW_HOST}/chat-rooms`, {
  // const data = yield fetch(`${NEW_HOST}/orders`, {

  //   method: 'POST',
  //   body: JSON.stringify(payload),
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Bearer'+" "+ token
  //   },
  // })
  //   .then((res) => {
  //     return res.json();
  //   })
  //   .then((data) => {
  //     return data;
  //   })
  //   .catch((error) => {
  //     throw error;
  //   });

  const socket = io(WEB_SOCKET, {
    transportOptions: {
      polling: {
        extraHeaders: {
          Authorization: 'Bearer' + " " + token
        },
      },
    },
  })

  socket.emit("order", payload, (error) => {
    // console.log(error)
    // console.log("chlgya")
  })

  //
}

export function* addWishList({ payload }) {
  const token = JSON.parse(localStorage.getItem('token'))
  const data = yield fetch(`${HOST}/v1/users/addWishlist`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + get(token, 'accessToken', '')
    },
  })
    .then((res) => {
      Users.getUser()
      return res.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      Users.getUser()
      throw error;
    });
  yield put({ type: 'SET_WISHLIST', data });
}

export function* removeWishList({ payload }) {
  const token = JSON.parse(localStorage.getItem('token'))
  const data = yield fetch(`${HOST}/v1/users/removeWishlist`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + get(token, 'accessToken', '')
    },
  })
    .then((res) => {
      Users.getUser()
      return res.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      Users.getUser()
      throw error;
    });
  yield put({ type: 'SET_WISHLIST', data });
}

export function* getNotification({ payload }) {
  // const token = JSON.parse(localStorage.getItem('token'))
  // const data = yield fetch(`${HOST}/v1/users/getNotifications`, {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     // 'Authorization': 'Bearer ' + get(token, 'accessToken', '')
  //   },
  // })
  //   .then((res) => {
  //     return res.json();
  //   })
  //   .then((data) => {
  //     return data;
  //   })
  //   .catch((error) => {
  //     throw error;
  //   });
  // yield put({ type: 'GOT_NOTIFICATION', data });
}



export function* getEarnings({ payload }) {
  const token = JSON.parse(localStorage.getItem('token'))
  const data = yield fetch(`${HOST}/v1/users/getEarnings`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + get(token, 'accessToken', '')
    },
  })
    .then((res) => {
      Users.getUser()
      return res.json();
    })
    .then((data) => {

      return data;
    })
    .catch((error) => {
      Users.getUser()
      throw error;
    });
  yield put({ type: 'GOT_EARNING', data });
}

export function* getProposals(data) {
  // const token = JSON.parse(localStorage.getItem('token'))
  // const user = JSON.parse(localStorage.getItem("user"))
  // const data = yield fetch(`${HOST}/v1/users/getEarnings`, {
  //   method: 'POST',
  //   body: JSON.stringify(payload),
  //   headers: { 
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Bearer ' + get(token, 'accessToken', '')
  // },
  // })
  //   .then((res) => {
  //     Users.getUser()
  //     return res.json();
  //   })
  //   .then((data) => {

  //     return data;
  //   })
  //   .catch((error) => {
  //     Users.getUser()
  //     throw error;
  //   });
  // console.log("chlgyavdkmvdkvdkmvdkmvk")
  // const socket = io(WEB_SOCKET, {
  //   transportOptions: {
  //     polling: {
  //       extraHeaders: {
  //         Authorization: 'Bearer' + " " + token
  //       },  
  //     },
  //   },
  // })


  
  // socket.emit("getproposals")
  // socket.on("getproposals", (data) => {
  //   console.log(data,"faizan")
   
  // })

yield put({ type: 'GOT_PROPOSAL', data} );
}

export function* getConnectionWs(data) {


yield put({ type: 'CONNECTED_WS', data} );
}


export function* stripePayment(payload) {
  console.log(payload);
  const token = JSON.parse(localStorage.getItem('token'))
  const data = yield fetch(`${HOST}/orders/payment`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer' +" "+token
    },
  })
    .then((res) => {
      console.log(res,"response for payment");
      return res.json();
    })
    .then((data) => {

      return data;
    })
    .catch((error) => {
     
      throw error;
    });


  // yield put({ type: 'GET_STRIPE_CHARGES', data} );
  }