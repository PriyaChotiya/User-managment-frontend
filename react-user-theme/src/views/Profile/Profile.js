/* eslint-disable no-unused-vars, no-dupe-keys, react/prop-types ,react/destructuring-assignment ,
import/no-extraneous-dependencies */
import { ToastContainer, toast } from 'react-toastify';

import React, { Component } from 'react';
import {
  Card, CardBody, CardHeader, Col, Row, Table,
} from 'reactstrap';
import axios from 'axios';


class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('userToken');
    if (!token) {
      this.props.history.push('/login');
    } else {
      this.getProfile();
    }
  }

  getProfile() {
    const headers = {
      'x-access-token': localStorage.getItem('userToken'),
    };
    axios({
      method: 'GET',
      url: `http://localhost:5000/user/profile/${localStorage.getItem('userId')}`,
      headers,
    }).then((res) => {
      if (res.status == 200) {
        this.setState({ user: res.data.obj });
      } else {
        toast.error(res.data.error.message);
      }
    })
      .catch((error) => {
        toast.error('can not get profile');
      });
  }

  render() {
    return (
      <div>
      <div className="animated fadeIn">
        <Row>
          <Col lg={6}>
            <Card>
              <CardHeader>
                <strong>
                  <i className="icon-info pr-1" />
User Profile
                </strong>
              </CardHeader>
              <CardBody>
                <div>
                  <label htmlFor="name">Name</label>
                  {' '}
:
                  {this.state.user.name}
                </div>

                <div>
                  <label htmlFor="email">Email address</label>
                  {' '}
:
                  {this.state.user.email}
                </div>

                <div>
                  <label htmlFor="date">Date</label>
                  {' '}
:
                  {this.state.user.date}
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
      <ToastContainer />
</div>
    );
  }
}

export default Profile;
