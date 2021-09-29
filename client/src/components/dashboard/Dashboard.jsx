import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentProfile } from "../../actions/profile";
import Spinner from "../layout/Spinner";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { profile, loading } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "NibiruDev - Dashboard";

    dispatch(getCurrentProfile());
  }, [dispatch]);

  return (
    <div className="container">
      <h1 className="large text-primary">Dashboard</h1>
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
              <p>You have not yet setup a profile, please add some info</p>
              <Link to="create-profile" className="btn btn-primary my-1">Create Profile</Link>
            </Fragment>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default Dashboard;
