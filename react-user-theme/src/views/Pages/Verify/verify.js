/* eslint-disable max-len , class-methods-use-this , no-unused-vars, import/no-extraneous-dependencies */

import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';


class Verify extends Component {
  componentDidMount() {
    this.verifyUser();
  }

  verifyUser() {
    axios({
      method: 'GET',
      url: `http://localhost:5000/user/verify/${this.props.match.params.token}`,
    }).then((res) => {
      if (res.data.status === '400') {
        console.log(res);

        toast.error(`${res.data.msg} Please register again `);
      } else {
        localStorage.setItem('userToken', this.props.match.params.token);
        localStorage.setItem('isVerified', true);


        this.props.history.push('/login');
      }
    })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <div>
       Verifying..

        </div>
        <ToastContainer />
      </div>
    );
  }
}


export default Verify;
