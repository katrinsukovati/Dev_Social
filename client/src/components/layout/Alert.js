import React from 'react';
import PropTypes from 'prop-types';
// Anytime you want to make a component interact with redux, you want to use connect
import { connect } from 'react-redux';

// Output the message of the alert
const Alert = ({ alerts }) =>
  // Make sure the array is not empty
  alerts !== null &&
  alerts.length > 0 &&
  // Map will loop through (like a for loop but it returns something) --> were returning a JSX (syntax extension) for each alert
  alerts.map((alert) => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};
// Mapping the redux state to a prop in this component so that we have access to it
const mapStateToProps = (state) => ({
  alerts: state.alert,
});
export default connect(mapStateToProps)(Alert);
