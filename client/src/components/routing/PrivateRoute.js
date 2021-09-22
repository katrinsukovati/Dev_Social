// Any route that we want to protect & ensure that the user is logged into, we can use this (PrivateRoute instead of Route)
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// ... rest is any other custom props
// ? then
// : else
// If we are not authenticated and its not loading, redirect to login page else
const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      !isAuthenticated && !loading ? (
        <Redirect to='/login' />
      ) : (
        <Component {...props} />
      )
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  // pull in all the state thats in the state reducer
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
