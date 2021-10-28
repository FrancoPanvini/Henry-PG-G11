import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, linkRedirect, ...rest }) => {
  const isLogin = useSelector(state => state.isLogged);

  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route {...rest} render={props => (isLogin ? <Component /> : <Redirect to={linkRedirect} />)} />
  );
};

export default PrivateRoute;
