import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { reset } from '../../../userService.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const initialState ={
  password: '',
  confirm: '',
  confirmError:'',
  passwordError:''
}

class ResetPassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      password: '',
      confirm: '',
      confirmError:'',
      passwordError:''
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)    
  }


validate = () =>{
  let confirmError = '';
  let passwordError = '';
  
  if(!this.state.password){
    passwordError = "Password is Required"
  }
  if(!this.state.confirm){
    confirmError = "Confirm password is Required"
  }

  if(confirmError || passwordError){
    this.setState({confirmError , passwordError })
    return false
  }

  return true
}
  
  componentDidMount () {
    this.token=this.props.match.params.token;
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit(e) {
    e.preventDefault()

    const isValid = this.validate()
    if(isValid){
    const user = {
      password: this.state.password,
      confirm: this.state.confirm,
      resetPasswordToken: this.token,
    }

    reset(user).then(res => {
      if (res.status == "200") {
        // this.props.history.push(`/profile`)
        console.log(res);
        toast.success(res.data.message + 's'); 
        
      }else{
        toast.error(res.data.message + 's'); 

      }
      setTimeout(() => {
        this.props.history.push('/login')        
      }, 1000);
      console.log(res);
      
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
                      <h1>Change Password</h1>
                      <p className="text-muted">Enter confirm password</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
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

                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <input
                  type="password"
                  className="form-control"
                  name="confirm"
                  placeholder="Confirm password"
                  value={this.state.confirm}
                  onChange={this.onChange}
                />
                      {this.state.confirmError?(<p className="text-danger">{this.state.confirmError}</p>) : null }

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

export default ResetPassword;
