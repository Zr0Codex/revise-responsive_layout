import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLoggedIn } from '../middleware/authentication';

const PublicRoute = ({ component: Component, restritced, ...rest }) => {
  <Route
    {...rest}
    render={(props) =>
      isLoggedIn() && restritced ? <Redirect to="/home" /> : <Component {...props} />
    }
  />;
};

export default PublicRoute;
