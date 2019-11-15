/* eslint-disable max-len , class-methods-use-this , no-unused-vars, import/no-extraneous-dependencies */

import React, { Component } from 'react';
import {
  Card,
  CardBody,
  Col,
  Row,
} from 'reactstrap';

class Dashboard extends Component {
  componentDidMount() {
    const token = localStorage.getItem('userToken');
    if (!token) {
      this.props.history.push('/register');
    }
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <p>Welcome</p>
              </CardBody>

            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
