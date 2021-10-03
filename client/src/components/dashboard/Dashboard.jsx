import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import { removeAlert } from "../../actions/alert";
import { deleteAccount, getCurrentProfile } from "../../actions/profile";
import setAuthToken from "../../utils/setAuthToken";
import Alert from "../layout/Alert";
import Spinner from "../layout/Spinner";
import DashboardActions from "./DashboardActions";
import Education from "./Education";
import Experience from "./Experience";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { page, alerts } = useSelector((state) => state.alert);
  const { profile, loading } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "NibiruDev - Dashboard";

    if (page !== "dashboard") {
      dispatch(removeAlert());
    }

    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.getItem("token"));
    }
    dispatch(getCurrentProfile());
  }, [dispatch, page]);

  const onClickHandler = () => {
    Swal.fire({
      title: "Delete Account?",
      text: "You can't revert this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteAccount())
      }
    });
  }

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
            <Fragment>
              <DashboardActions />
              <Experience experience={profile.experience} />
              <Education education={profile.education} />

              <div className="my-2">
                <button className="btn btn-danger" onClick={onClickHandler}>
                  <i className="fas fa-user-minus"></i> Delete Account
                </button>
              </div>
            </Fragment>
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
