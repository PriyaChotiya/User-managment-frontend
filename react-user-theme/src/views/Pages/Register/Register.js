import React, { Component } from 'react';
import {  Card, CardBody,Button, Col, Container, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { register } from '../../../userService.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';


const initialState ={
  name: '',
  email: '',
  password: '',
  password2: '',
  errors: {},
  nameError:'',
  emailError:'',
  passwordError:'',
  password2Error:'' 
}

class Register extends Component {

  // state = initialState
  constructor() {
    super()
    this.state = {
     name: '',
      email: '',
      password: '',
      password2: '',
      errors: {},
      nameError:'',
      emailError:'',
      passwordError:'',
      password2Error:'' 
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  
  componentDidMount(){
    localStorage.clear();
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  validate = () =>{
    let nameError = '';
    let emailError = '';
    let passwordError = '';
    let password2Error = '';
    
    if(!this.state.name){
      nameError = "Name is Required"
    }

    if(!this.state.email){
      emailError = "Email is Required"
    }

    if(!this.state.password){
      passwordError = "Password is Required"
    }

    if(!this.state.password2){
      password2Error = "Confirm Password is Required"
    }

    if(emailError || nameError || passwordError || password2Error){
      this.setState({emailError , nameError , passwordError , password2Error})
      return false
    }

    return true
  }

  onSubmit(e) {
    e.preventDefault()
    
    const isValid = this.validate()
    if(isValid){
      //clear form
      this.setState(initialState)

    const newUser = {
     name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    }

    register(newUser).then(res => {
      
      if(res.status == 200){
             toast.success(res.data.message + 'Please check email to verify');
      }else{
        toast.error(res.data.error.message );
     }
    }).catch(error =>{
      toast.error('Please register again');
    })
  }
  }
  render() {
    return (
      <div>
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                <form  noValidate onSubmit={this.onSubmit}>

                    <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      {/* <Input type="text" placeholder="Username" autoComplete="username" /> */}
                      <input type="text" className="form-control" name="name" placeholder="Enter your first name" value={this.state.name} onChange={this.onChange} />
                      {this.state.nameError?(<p className="text-danger">{this.state.nameError}</p>) : null }
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
                      {this.state.emailError?(<p className="text-danger">{this.state.emailError}</p>) : null }

                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
                      {this.state.passwordError?(<p className="text-danger">{this.state.passwordError}</p>) : null }
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <input
                  type="password"
                  className="form-control"
                  name="password2"
                  placeholder="Repeat password"
                  value={this.state.password2}
                  onChange={this.onChange}
                />
                      {this.state.password2Error?(<p className="text-danger">{this.state.password2Error}</p>) : null }

                    </InputGroup>
                    <Row className="align-items-center">
                        <Col xs="6">
                          <Button color="primary" className="px-4">Submit</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                           <Link to="/login">Already registered? Login</Link> 
                        </Col>
                      </Row>
                  </form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>

      </div>
        <ToastContainer />
      </div>
    );
  }
}

export default Register;
