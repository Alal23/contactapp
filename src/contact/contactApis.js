import axios from 'axios';
import {BASE_URL} from '../utils/contants';

const api = axios.create({
  timeout: 10000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  baseURL: BASE_URL,
});

if (__DEV__) {
  api.interceptors.request.use(request => {
    console.log('>>> Request', request);
    return request;
  });

  api.interceptors.response.use(
    response => {
      console.log('<<< Response:', response);
      return response;
    },
    error => {
      console.log('*** ', error);
      return Promise.reject(error);
    },
  );
}

export const getContactApi = () => {
  return api.get('/contact');
};

export const addContactApi = payload => {
  return api.post('/contact', payload);
};

export const delContactApi = payload => {
  const {id} = payload;
  return api.delete(`/contact/${id}`);
};

export const getContactDetailApi = payload => {
  const {id} = payload;
  return api.get(`/contact/${id}`);
};

export const updateContactApi = payload => {
  const {id, ...sendData} = payload;
  return api.put(`/contact/${id}`, sendData);
};
