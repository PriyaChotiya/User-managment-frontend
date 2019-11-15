import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import './App.scss';
import Verify from './views/Pages/Verify/verify';
import UpdateUser from './views/Users/updateUser'; 
import ForgotPassword from './views/Pages/forgotPassword/forgotPassword';
import ResetPassword from './views/Pages/resetPassword/resetPassword';


const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/Pages/Login'));
const Register = React.lazy(() => import('./views/Pages/Register/Register.js'));

class App extends Component {

  render() {
    return (
      <Router>
          <React.Suspense fallback={loading()}>
            <Switch>
              <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
              <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
              <Route exact path="/forgot" name="Forgot Page" render={props => <ForgotPassword {...props}/>} />
              <Route exact path="/user/reset" name="Reset Page" render={props => <ResetPassword {...props}/>} />

              <Route exact path="/user/verify/:token" name="Verify Page" render={props => <Verify {...props}/>} />
              <Route exact path="/user/update/:id" name="Update Page" render={props => <UpdateUser {...props}/>} />

              <Route path="/" name="Home" render={props => <DefaultLayout {...props}/>} />
            </Switch>
          </React.Suspense>
      </Router>
    );
  }
}

export default App;
