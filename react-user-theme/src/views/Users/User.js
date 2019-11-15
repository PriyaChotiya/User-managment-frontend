/* eslint-disable no-unused-vars, no-dupe-keys, react/prop-types ,react/destructuring-assignment ,
import/no-extraneous-dependencies */

import React, { Component } from 'react';
import {
  Card, CardBody, CardHeader, Col, Row, Table,
} from 'reactstrap';
import axios from 'axios';


class User extends Component {
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
    }).then((res) => this.setState({ user: res.data.data }, () => console.log(res.data.data.name)))
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
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
    );
  }
}

export default User;
