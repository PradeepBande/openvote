import Axios from 'axios';
import { Navigate } from 'react-router-dom';
const SERVER_API_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:4001/';

export function axiosGet(url, params = {}) {
  return new Promise(async (resolve, reject) => {
    let token = localStorage.getItem('token')
    const headers = {
      authorization: 'Bearer ' + token
    }
    var config = { headers };

    await Axios.get(SERVER_API_URL + url, config)
      .then((res) => {
        console.log("REs --", res?.data)
        resolve(res.data);
      })
      .catch((err) => {
        if (err?.response?.data?.code === 'auth_failed') {
          localStorage.clear()
          return <Navigate to='/' replace={true} />
        } else {
          reject(err);
        }
      });
  });
}
export function axiosPost(url, body = {}) {
  return new Promise(async (resolve, reject) => {
    let token = localStorage.getItem('token')
    const headers = {
      authorization: 'Bearer ' + token
    }
    var config = { headers };

    await Axios.post(SERVER_API_URL + url, body, config)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        if (err?.response?.data?.code === 'auth_failed') {
          localStorage.clear()
          return <Navigate to='/' replace={true} />
        } else {
          reject(err);
        }
      });
  });
}
export function axiosPut(url, body = {}) {
  return new Promise(async (resolve, reject) => {
    let token = localStorage.getItem('token')
    const headers = {
      authorization: 'Bearer ' + token
    }
    var config = { headers };

    await Axios.put(SERVER_API_URL + url, body, config)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        if (err?.response?.data?.code === 'auth_failed') {
          localStorage.clear()
          return <Navigate to='/' replace={true} />
        } else {
          reject(err);
        }
      });
  });
}
export function axiosPatch(url, body = {}) {
  return new Promise(async (resolve, reject) => {
    let token = localStorage.getItem('token')
    const headers = {
      authorization: 'Bearer ' + token
    }
    var config = { headers };

    await Axios.patch(SERVER_API_URL + url, body, config)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        if (err?.response?.data?.code === 'auth_failed') {
          localStorage.clear()
          return <Navigate to='/' replace={true} />
        } else {
          reject(err);
        }
      });
  });
}
export function axiosDelete(url) {
  return new Promise(async (resolve, reject) => {
    let token = localStorage.getItem('token')
    const headers = {
      authorization: 'Bearer ' + token
    }
    var config = { headers };

    await Axios.delete(SERVER_API_URL + url, config)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        if (err?.response?.data?.code === 'auth_failed') {
          localStorage.clear()
          return <Navigate to='/' replace={true} />
        } else {
          reject(err);
        }
      });
  });
}
