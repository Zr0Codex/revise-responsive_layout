import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLoggedIn } from '../middleware/authentication';

const PrivateRoute = ({ component: Component, ...rest }) => {
  <Route
    {...rest}
    render={(props) => (isLoggedIn() ? <Component {...props} /> : <Redirect to="/" />)}
  />;
};
export default PrivateRoute;
