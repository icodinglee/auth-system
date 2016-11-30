import axios from 'axios';
import { browserHistory } from 'react-router';
import cookie from 'react-cookie';

const API_URL = 'http://localhost:3000';

export const RECEIVE_UPLOADIMAGE = 'RECEIVE_UPLOADIMAGE';
export const LOADING_UPLOADIMAGE = 'LOADING_UPLOADIMAGE';
export const INVALIDATE_UPLOADIMAGE = 'INVALIDATE_UPLOADIMAGE';
export const CLEAR_INFO = 'CLEAR_INFO';

export function invalidateUploadImage(err) {
  return {
    type: INVALIDATE_UPLOADIMAGE,
    data: err
  }
}

export function loadingUploadImage() {
  return {
    type: LOADING_UPLOADIMAGE
  }
}

export function receiveUploadImage(payload) {
  return {
    type: RECEIVE_UPLOADIMAGE,
    data: payload
  }
}

export function clearInfo() {
  return {
    type: CLEAR_INFO
  }
}

export const uploadImage = (file, name) => {
  return (dispatch) => {
    const uid = cookie.load('user').id
    let obj = {
      'file': file,
      'filename': name,
      'uid': uid
    }

    axios.put(`${API_URL}/files`, obj, {
      headers: { 'Authorization': cookie.load('token') }
    })
    .then(response => {
      dispatch(receiveUploadImage(response.data))
    })
    .catch(response => {
      // dispatch(invalidateUploadImage(response.data))
    })
  }
}


