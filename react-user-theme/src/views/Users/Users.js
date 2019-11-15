/* eslint-disable no-empty-pattern */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars, no-dupe-keys, react/prop-types ,react/destructuring-assignment ,
import/no-extraneous-dependencies */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Badge, Card, CardBody, CardHeader, Col, Row, Table,
} from 'reactstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';


class Users extends Component {
  constructor() {
    super();
    this.state = {
      users: [] = [],
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('userToken');
    if (!token) {
      this.props.history.push('/login');
    } else {
      this.getUsers();
    }
  }

  getUsers() {
    const headers = {
      'x-access-token': localStorage.getItem('userToken'),
    };
    axios({
      method: 'GET',
      url: 'http://localhost:5000/user/users',
      headers,
    }).then((res) => {
      if (res.status == 200) {
        this.setState({ users: res.data.obj });
      } else {
        toast.error(res.data.error.message);
      }
    })
      .catch((error) => {
        toast.error('can not get users');
      });
  }

  deleteUser(user) {
    console.log(user);


    const headers = {
      'x-access-token': localStorage.getItem('userToken'),
    };
    axios({
      method: 'GET',
      url: `http://localhost:5000/user/delete/${user._id}`,
      headers,
    }).then((res) => {
      this.props.history.push('/users');
    })
      .catch((error) => {
        console.log(error);
      });
    // this.setState({users:res.data.data})
  }

  render() {
    return (
      <div>
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify" />
                {' '}
Users
                {' '}
                <small className="text-muted">example</small>
              </CardHeader>
              <CardBody>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Date</th>
                      <th>Action</th>

                    </tr>
                  </thead>

                  <tbody>
                    {this.state.users.map((user, index) => (
                      <tr key={index}>
                        <td>
                          <Link to={`users/${user._id}`}>{user.name}</Link>
                        </td>
                        <td>{user.email}</td>
                        <td>{user.date}</td>
                        <td>
                          <Link to={`users/update/${user._id}`}>Edit</Link>
                          {' '}
&nbsp;

                          <a
                            href="#"
                            onClick={(e) => window.confirm('Are you sure you wish to clear the page?')
                    && this.deleteUser(user)}
                          >
                Delete
                          </a>
                        </td>
                      </tr>
                    ))}

                  </tbody>
                </table>
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

export default Users;
