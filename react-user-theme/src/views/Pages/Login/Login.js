import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { login } from '../../../userService.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialState ={
  email: '',
  password: '',
  errors: {},
  emailError:'',
      passwordError:''
}

class Login extends Component {
  state = initialState

  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      errors: {},
      isVerify : localStorage.getItem('isVerified'),
      emailError:'',
      passwordError:''
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

componentDidMount(){
}


validate = () =>{
  let emailError = '';
  let passwordError = '';
  
 
  if(!this.state.email){
    emailError = "Email is Required"
  }

  if(!this.state.password){
    passwordError = "Password is Required"
  }

  if(emailError || passwordError){
    this.setState({emailError , passwordError })
    return false
  }

  return true
}
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit(e) {

      e.preventDefault()
    // if(!this.state.isVerify){

    //   toast.error("Please verify email address"); 
    // }else{
    //   e.preventDefault()

    // }


    const isValid = this.validate()
    if(isValid){
      //clear form
      this.setState(initialState)
  
      const user = {
        email: this.state.email,
        password: this.state.password
      }
  
      login(user).then(res => {
        
        
        // if(res.data.status == '200'){
        //   toast.success(res.msg); 
  
        //   setTimeout(() => {
        //     this.props.history.push('/users')
        //   }, 1000);
        //   }else{
        //     toast.error(res.data.msg + ' Please verify your account'); 

        //   }
        
        if(res.status == 200){
          toast.success(res.data.message);
          setTimeout(() => {
            this.props.history.push('/users')
          }, 1000);
   }else{
     toast.error(res.data.error.message );
  }
      })

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
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
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
                      <InputGroup className="mb-4">
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
                      <Row className="align-items-center">
                        <Col xs="6">
                          <Button color="primary" className="px-4">Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                           <Link to="/forgot">Forgot password?</Link> &nbsp;&nbsp;
                           <Link to="/resiger">Not resitered?Sign in</Link> 
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

export default Login;
