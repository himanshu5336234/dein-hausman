import { put } from 'redux-saga/effects';
import { get } from "lodash"
import axios from "axios"
import { io } from 'socket.io-client';

const { NEXT_PUBLIC_API_HOST } = process.env
const HOST = "http://localhost:1337"
const NEW_HOST = "http://localhost:1337"
const WEB_SOCKET = 'http://localhost:1337'
export function* registerHandyman({ payload }) {
  const token = JSON.parse(localStorage.getItem('token'))
  const data = yield fetch(`${NEW_HOST}/handyman-applications`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer' + " " + token
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
  yield put({ type: 'HYNDYMAN', data });
}

export function* uploadDocument({ payload }) {
  const token = JSON.parse(localStorage.getItem('token'))
  const data = yield axios.post(`${HOST}/v1/users/addDocument`, payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': 'Bearer' + " " + token
    }
  })
    .then((res) => {
      return res
    })
    .catch((error) => {
      throw error;
    });
  yield put({ type: 'UPLOADED', data });
}

export function* getGig({ payload }) {
  const data = yield fetch(`${NEW_HOST}/gigs/${payload}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
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
  yield put({ type: 'GOT_GIG', data });
}

export function* addGig({ payload }) {

  const token = JSON.parse(localStorage.getItem('token'))
  const user = JSON.parse(localStorage.getItem('user'))
  const userId = user.id
  payload = { ...payload, ["user"]: userId }
  const data = yield axios.post(`${HOST}/gigs`, payload, {
    headers: {
      'Content-Type': "application/json",
      'Authorization': "Bearer" + " " + token
    },
  })
    .then((data) => {
      console.log(data, "response")
      return data;
    })
    .catch((error) => {

    });
  yield put({ type: 'ADDED_GIG', data });
}
// GET SERVICES
export function* getServices() {
  const token = JSON.parse(localStorage.getItem('token'))
  const data = yield fetch(`${HOST}/v1/gigs`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer' + " " + token
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
  yield put({ type: 'GOT_SERVICES', data });
}

export function* getDelete({ payload }) {
  const token = JSON.parse(localStorage.getItem('token'))
  const data = yield fetch(`${HOST}/v1/gigs/delete`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer' + " " + token
    }
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      getServices()
      return data;
    })
    .catch((error) => {
      throw error;
    });
  yield put({ type: 'DELETED_REQUEST', data });
}

export function* getUpdate({ payload }) {
  const token = JSON.parse(localStorage.getItem('token'))
  const data = yield axios.post(`${HOST}/v1/gigs/update`, payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': 'Bearer' + " " + token
    }
  })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      throw error;
    });
  yield put({ type: 'UPLOADED_REQUEST', data });
}

export function* fileUpload({ payload }) {
  const token = JSON.parse(localStorage.getItem('token'))
  const files = payload.files
  const data = yield axios.post(`${NEW_HOST}/upload`, files, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': 'Bearer' + " " + token
    }
  })
    .then((data) => {
      const sdata = data
      if (get(payload, 'key', false)) {
        sdata.data[0].key = payload.key
      }
      return sdata;
    })
    .catch((error) => {
      throw error;
    });
  yield put({ type: 'FILE_UPLOADED', data });
}

export function* getPause({ payload }) {
  const token = JSON.parse(localStorage.getItem('token'))
  const data = yield fetch(`${HOST}/v1/gigs/pause`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer' + " " + token
    }
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      getServices()
      return data;
    })
    .catch((error) => {
      throw error;
    });
  yield put({ type: 'PAUSED_REQUEST', data });
}

export function* getContinue() {
  const token = JSON.parse(localStorage.getItem('token'))
  const data = yield fetch(`$POST/v1/gigs/continue`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer' + " " + token
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
  yield put({ type: 'CONTIUED_REQUEST', data });
}


export function* postProposals({inboxData}) {
  const token = JSON.parse(localStorage.getItem('token'))
  // const data = yield fetch(`$POST/v1/gigs/continue`, {
  //   method: 'POST',
  //   headers: { 
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Bearer'+" "+ token
  //    }
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
  // const socket = io(WEB_SOCKET, {
  //   transportOptions: {
  //     polling: {
  //       extraHeaders: {
  //         Authorization: 'Bearer' + " " + token
  //       },
  //     },
  //   },
  // })
 


}


