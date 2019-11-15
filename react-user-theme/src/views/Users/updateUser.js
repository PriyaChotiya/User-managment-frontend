/* eslint-disable no-unused-vars, no-dupe-keys, react/prop-types ,react/destructuring-assignment ,
import/no-extraneous-dependencies */

import React, { Component } from 'react';
import axios from 'axios';
import {
  CardHeader, Card, CardBody, Col, InputGroup, InputGroupAddon, InputGroupText, Row,
} from 'reactstrap';
import { update } from '../../userService';

class UpdateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.id = this.props.match.params.id;

    if (this.props.match.params.id != null) {
      const headers = {
        'x-access-token': localStorage.getItem('userToken'),
      };
      axios({
        method: 'GET',
        url: `http://localhost:5000/user/profile/${this.id}`,
        headers,
      }).then((res) => this.setState({
        name: res.data.data.name,
        email: res.data.data.email,
        name: res.data.data.name,
      },
      () => console.log(res.data.data.name)))
        .catch((error) => {
          console.log(error);
        });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      id: this.id,
      name: this.state.name,
      email: this.state.email,
    };
    update(newUser).then((res) => {
      console.log(res);
    });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={12}>
            <Card>
              <CardHeader>
                <strong>
                  <i className="icon-info pr-1" />
Update User
                </strong>
              </CardHeader>
              <CardBody>

                <form noValidate onSubmit={this.onSubmit}>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-user" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <input type="text" className="form-control" name="name" placeholder="Enter your first name" value={this.state.name} onChange={this.onChange} />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>@</InputGroupText>
                    </InputGroupAddon>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="Enter your email"
                      value={this.state.email}
                      onChange={this.onChange}
                    />

                  </InputGroup>
                  <button type="submit" className="btn btn-success w-100">Submit</button>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default UpdateUser;
