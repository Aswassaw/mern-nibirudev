import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Alert = ({ alert, timeout }) => {
  const [timeOut, setTimeOut] = useState(timeout);

  useEffect(() => {
    const timeOutInterval = setInterval(() => {
      setTimeOut((c) => c - 1);
    }, 1000);

    return () => {
      clearInterval(timeOutInterval);
    };
  }, []);

  return (
    <div className={`alert alert-${alert.type}`}>
      <div>{alert.msg}</div>
      <div>{timeOut}</div>
    </div>
  );
};

Alert.propTypes = {
  alert: PropTypes.object.isRequired,
  timeout: PropTypes.number.isRequired,
};

export default Alert;
