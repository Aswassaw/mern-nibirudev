import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeAlert } from "../../actions/alert";
import { getCurrentProfile } from "../../actions/profile";
import Alert from "../layout/Alert";
import Spinner from "../layout/Spinner";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { page, alerts } = useSelector((state) => state.alert);
  const { profile, error, loading } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "NibiruDev - Dashboard";

    if (page !== "dashboard") {
      dispatch(removeAlert());
    }

    dispatch(getCurrentProfile());
  }, [dispatch, page]);

  return (
    <div className="container">
      <h1 className="large text-primary">Dashboard</h1>
      {alerts !== null &&
        alerts.length > 0 &&
        alerts.map((alert) => (
          <Alert key={alert.id} alert={alert} timeout={10} />
        ))}
      {loading && profile === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <p className="lead">
            <i className="fas fa-user"></i> Welcome {user && user.name}
          </p>

          {profile !== null ? (
            <Fragment>has</Fragment>
          ) : (
            <Fragment>
              <p>You have no profile yet</p>
              <Link to="create-profile" className="btn btn-primary my-1">
                Create Profile
              </Link>
            </Fragment>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default Dashboard;
