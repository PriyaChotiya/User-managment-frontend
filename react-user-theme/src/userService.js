/* eslint-disable no-sequences */
/* eslint-disable block-spacing */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
import axios from 'axios';

export const register = (newUser) => axios
  .post('http://localhost:5000/user/register', {
    name: newUser.name,
    email: newUser.email,
    password: newUser.password,
    password2: newUser.password2,
  })
  .then((response) => {
    localStorage.setItem('userToken', response.data.token);
    return response;
  }).catch((error) => {
    return error.response;
  });

export const login = (newUser) => axios
  .post('http://localhost:5000/user/login', {
    email: newUser.email,
    password: newUser.password,
  }, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  .then((response) => {
    console.log(response);
    
    localStorage.setItem('userToken', response.data.obj.token);
    localStorage.setItem('userId', response.data.obj._id);

    return response;
  })
  .catch((error) => {
    return error.response;
  });

export const forgot = (newUser) => axios
  .post('http://localhost:5000/user/forgot', {
    email: newUser.email,

  }, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  .then((res) =>{  
    localStorage.setItem('userId', res.data.obj._id)  
  })
  .catch((err) => {
    console.log(err);
  });
const userId = localStorage.getItem('userId');
export const reset = (newUser) => axios
  .post(`http://localhost:5000/user/reset/${userId}`, {
    password: newUser.password,
    confirm: newUser.confirm,
  }, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  .then((res) => {
    return res;
  })
  .catch((err) => {
    console.log(err);
    return err.response;
  });

export const update = (newUser) => axios
  .post('http://localhost:5000/user/update', {
    _id: newUser.id,
    name: newUser.name,
    email: newUser.email,

  }, {
    headers: {
      'x-access-token': localStorage.getItem('userToken'),
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  .then((res) => res.data)
  .catch((err) => {
    console.log(err);
  });

export const profile = function () {
  const headers = {
    'x-access-token': localStorage.getItem('userToken'),
  };
  axios({
    method: 'GET',
    url: `http://localhost:5000/user/profile/${localStorage.getItem('userId')}`,
    headers,
  }).then((res) => res.obj)
    .catch((error) => {
      console.log(error);
    });
};
