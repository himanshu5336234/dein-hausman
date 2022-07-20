import { put } from 'redux-saga/effects';
import { get } from "lodash"
import axios from "axios"
const { NEXT_PUBLIC_API_HOST } = process.env
const HOST ="http://localhost:1337"
const NEW_HOST = "http://localhost:1337"

export function* registerByMobile({ payload }) {
  const data = yield fetch(`${NEW_HOST}/register-with-phone`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
    .then((res) => {
      // getUser()
      return res.json();
    })
    .then((data) => {
      data.mobile = payload.mobile
      return data;
    })
    .catch((error) => {
      throw error;
    });
  yield put({ type: 'REGISTER', data });
}


export function* registerByEmail({ payload }) {
  const data = yield fetch(`${NEW_HOST}/auth/local/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
    .then((res) => {
      getUser()
      return res.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      throw error;
    });
  yield put({ type: 'REGISTERWITHEMAIL', data });
}

export function* registerByFacebook({ payload }) {
  const data = yield fetch(`${HOST}/v1/auth/facebook`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
    .then((res) => {
      getUser()
      return res.json();
    })
    .then((data) => {
      data.socialLogin = true
      return data;
    })
    .catch((error) => {
      throw error;
    });
  yield put({ type: 'REGISTERWITHEMAIL', data });
}

export function* registerByGoogle({ payload }) {
  const data = yield fetch(`${HOST}/v1/auth/google`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
    .then((res) => {
      getUser()
      return res.json();
    })
    .then((data) => {
      data.socialLogin = true
      return data;
    })
    .catch((error) => {
      throw error;
    });
  yield put({ type: 'REGISTERWITHEMAIL', data });
}

export function* loginByMobile({ payload }) {
  const data = yield fetch(`${HOST}/v1/auth/loginWithMobile`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
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
  yield put({ type: 'LOGIN', data });
}

export function* loginByEmail({ payload }) {
  const data = yield fetch(`${NEW_HOST}/auth/local`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
    .then((res) => {
      getUser()
      return res.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      throw error;
    });
  yield put({ type: 'LOGINWITHEMAIL', data });
}

export function* verifyOtp({ payload }) {
  const data = yield fetch(`${NEW_HOST}/verify-user`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
    .then((res) => {
      getUser()
      return res.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      throw error;
    });
  yield put({ type: 'VERIFYED_OTP', data });
}

export function* resendOtp({ payload }) {
  const data = yield fetch(`${NEW_HOST}/resend-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
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
  yield put({ type: 'RESENT_OTP', data });
}

export function* getUser({ payload }) {
  const token = JSON.parse(localStorage.getItem('token'))
  const data = yield fetch(`${NEW_HOST}/users/me`, {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json', 
    'Authorization': 'Bearer'+" "+ token
    },
    body: JSON.stringify(payload)
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
  yield put({ type: 'GOT_USER', data });
}

export function* getUserInfo({ payload }) {
  const token = JSON.parse(localStorage.getItem('token'))
  const data = yield fetch(`${HOST}/v1/users/`, {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': 'Bearer ' + get(token, 'accessToken', '') 
    }
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
  yield put({ type: 'GOT_USER_INFO', data });
}

export function* updateUser({ payload }) {
  const token = JSON.parse(localStorage.getItem('token'))
  const id = payload.id
  delete payload.id
  const data = yield yield fetch(`${NEW_HOST}/users/${id}`, 
  {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    'Authorization': 'Bearer'+" "+ token
    },
    body: JSON.stringify(payload)
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
  yield put({ type: 'UPDATED_USER', data });
}

export function* getOrderById({id}) {
  const token = JSON.parse(localStorage.getItem('token'))
  const data = yield fetch(`${NEW_HOST}/orders/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    'Authorization': 'Bearer'+" "+ token
    },
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
  yield put({ type: 'GOT_ORDER_BY_ID', data });
}

export function* getOrders({ payload }) {
  console.log("NEW ORDER RECIEVED GETTING LATEST ORDERS")
  const token = JSON.parse(localStorage.getItem('token'))
  const data = yield fetch(`${NEW_HOST}/orders`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    'Authorization': 'Bearer'+" "+ token
    },
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
  yield put({ type: 'GOT_ORDER', data });
 
}

export function* getInbox() {
  const token = JSON.parse(localStorage.getItem('token'))
  const payload = JSON.parse(localStorage.getItem("user"));
  console.log(paylaod)
  const userId = payload.id;
  const data = yield fetch(`${NEW_HOST}/chat-rooms/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    'Authorization': 'Bearer'+" "+ token
    },
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
  yield put({ type: 'GOT_INBOX', data });
}
export function* addPayment({ payload }) {
  const token = JSON.parse(localStorage.getItem('token'))
  const data = yield fetch(`${HOST}/v1/users/addPaymentMethod`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': 'Bearer ' + get(token, 'accessToken', '')
    },
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
  yield put({ type: 'ADDED_PAYMENT', data });
}

export function* sendMessage({payload}){
  const token = JSON.parse(localStorage.getItem('token'))
  const roomId = get(payload, 'roomId', '')
  const data = yield fetch(`${NEW_HOST}/chat-messages/room/${roomId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    'Authorization': 'Bearer'+" "+ token
    },
    body: JSON.stringify({
      "messageText": payload.messageText
    })
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
    yield put({ type: 'SENT_MESSAGE', data });
}

export function* getChatMessage({payload}) {
  const token = JSON.parse(localStorage.getItem('token'))
  const data = yield fetch(`${NEW_HOST}/chat-rooms/${payload}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    'Authorization': 'Bearer'+" "+ token
    },
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
    yield put({ type: 'GOT_MESSAGE', data });
}

export function* getChat({payload}) {
 
  console.log(payload,"pa")
  const token = JSON.parse(localStorage.getItem('token'))
  const data = yield fetch(`${NEW_HOST}/chat-rooms/${payload}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    'Authorization': 'Bearer'+" "+ token
    },
    // body: JSON.stringify(payload)
  })
    .then((res) => {

      return res.json();

    })
    .then((data) => {
      data.roomID = payload
      return data;
    })
    .catch((error) => {
      throw error;
    });
   console.log(payload,"paaaaaaaaaaaaaaaaa")
  yield put({ type: 'GOT_CHAT', data:data });
}

export function* getQuotations({ payload }) {
  console.log(payload,"dfdefv")
  // const token = JSON.parse(localStorage.getItem('token'))
 const data = payload
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   'Authorization': 'Bearer'+" "+ token
  //   },
  //   // body: JSON.stringify(payload)
  // })
  //   .then((res) => {
  //     return res.json();
  //   })
  //   .then((data) => {
  //     data.roomID = payload
  //     return data;
  //   })
  //   .catch((error) => {
  //     throw error;
  //   });
  console.log(data,"data-qu")
  yield put({ type: 'GOT_QUOTATIONS', data });
}

export function* askRevision({ payload }) {
  const token = JSON.parse(localStorage.getItem('token'))
  const roomID = payload.roomID
  delete payload.roomID
  const data = yield fetch(`${NEW_HOST}/proposals/room/${roomID}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    'Authorization': 'Bearer'+" "+ token
    },
    body: JSON.stringify(payload)
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      data.roomID = payload
      return data;
    })
    .catch((error) => {
      throw error;
    });
  yield put({ type: 'ASKED_REVISION', data });
}

export function* payment({ payload }) {
  const token = JSON.parse(localStorage.getItem('token'))
  const data = yield fetch(`${HOST}/v1/payments/addCards `, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer'+" "+ token
    },
    body: JSON.stringify(payload)
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
  yield put({ type: 'DID_PAYMENT', data });
}


export function* getCard({ payload }) {
  const token = JSON.parse(localStorage.getItem('token'))
  const data = yield fetch(`${HOST}/v1/payments/getCards`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer'+" "+ token
    },
    body: JSON.stringify(payload)
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
  yield put({ type: 'GOT_CARD', data });
}

export function* checkout({ payload }) {
  const token = JSON.parse(localStorage.getItem('token'))
  const data = yield fetch(`${HOST}/v1/orders/payment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer'+" "+ token
    },
    body: JSON.stringify(payload)
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
  yield put({ type: 'PAYMENT', data });
}
export function* forgetPassword({ payload }) {
  const token = JSON.parse(localStorage.getItem('token'))
  const data = yield fetch(`${NEW_HOST}/auth/forgot-Password
  `, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'multipart/form-data',
      // 'Authorization': 'Bearer ' + get(token, 'accessToken', '')
    },
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
  yield put({ type: 'FORGOT_PASSWORD', data });
}
export function* resetPassword({ payload }) {
  const token = JSON.parse(localStorage.getItem('token'))
  const data = yield fetch(`${NEW_HOST}/reset-password`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': 'Bearer ' + get(token, 'accessToken', '')
    },
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
  yield put({ type: 'RESETED_PASSWORD', data });
}
export function* mobileSignData({ payload }) {
  const data = yield fetch(`${HOST}/v1/auth/registerByMobile`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
    .then((res) => {
      // getUser()
      return res.json();
    })
    .then((data) => {
      data.mobile = payload.mobile
      return data;
    })
    .catch((error) => {
      throw error;
    });
  yield put({ type: 'REGISTER', data });
}
