import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { forgot } from '../../../userService.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const initialState ={
  email: '',
  emailError:'',
}

class ForgotPassword extends Component {
  state =initialState

  constructor() {
    super()
    this.state = {
      email: '',
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
  componentDidMount(){

  }


validate = () =>{
  let emailError = '';
   
  if(!this.state.email){
    emailError = "Email is Required"
  }
  if(emailError ){
    this.setState({emailError })
    return false
  }

  return true
}

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit(e) 
  {
    e.preventDefault()
    const isValid = this.validate()
    if(isValid){
    const user = {
      email: this.state.email,
    }

    forgot(user).then(res => {
      
      // if (res.status == "200") {
      //   // this.props.history.push(`/profile`)
      //   toast.success(res.data.msg + 's');  
      // }else{
      //   toast(res.data.msg + 's');  

      // }
    })
      this.setState(initialState)

  }
  }

  render() {
    return (
      <div>
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <form noValidate onSubmit={this.onSubmit}>
                      <h1>Forgot Password</h1>
                      <p className="text-muted">Enter email to change password</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
                      {this.state.emailError?(<p className="text-danger">{this.state.emailError}</p>) : null }

                      </InputGroup>
                      <Row>
                        <Col xs="12">
                          <Button color="primary" className="px-4 w-100">Submit</Button>
                        </Col>
                      </Row>
                    </form>
                  </CardBody>
                </Card>
              
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
      <ToastContainer />
</div>
    );
  }
}

export default ForgotPassword;
