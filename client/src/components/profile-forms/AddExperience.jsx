import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom';
import { removeAlert } from '../../actions/alert';
import { addExperience } from '../../actions/profile';
import Alert from '../layout/Alert';

const AddExperience = () => {
  const { page, alerts } = useSelector((state) => state.alert);
  const { profile } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const history = useHistory();

  const [formData, setFormData] = useState({
    company: "",
    title: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
  })

  const [toggleToDateDisabled, setToggleToDateDisabled] = useState(false);

  const { company, title, location, from, to, current, description } = formData;

  useEffect(() => {
    document.title = "NibiruDev - Add Experience";

    if (page !== "add-experience") {
      dispatch(removeAlert());
    }

    if (!profile) {
      history.push("/dashboard");
    }
  }, [dispatch, history, page, profile]);

  const onChangeHandler = (e) =>
    setFormData((c) => ({
      ...c,
      [e.target.name]: e.target.value,
    }));

  const onSubmithandler = (e) => {
    e.preventDefault();

    dispatch(addExperience(formData, history))
  };

  return (
    <div className="container">
      <h1 className="large text-primary">
        Add An Experience
      </h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      {alerts !== null &&
        alerts.length > 0 &&
        alerts.map((alert) => (
          <Alert key={alert.id} alert={alert} timeout={10} />
        ))}
      <form className="form" onSubmit={onSubmithandler}>
        <div className="form-group">
          <input type="text" placeholder="* Job Title" onChange={onChangeHandler} value={title} name="title" required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Company" onChange={onChangeHandler} value={company} name="company" required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Location" onChange={onChangeHandler} value={location} name="location" />
        </div>
        <div className="form-group">
          <h4>* From Date</h4>
          <input type="date" onChange={onChangeHandler} value={from} name="from" />
        </div>
        <div className="form-group">
          <p><input type="checkbox" checked={current} name="current" onChange={() => {
            setFormData({ ...formData, current: !current, to: "" })
            setToggleToDateDisabled(!toggleToDateDisabled)
          }} /> Current Job</p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input type="date" onChange={onChangeHandler} value={to} name="to" disabled={toggleToDateDisabled ? true : false} />
        </div>
        <div className="form-group">
          <textarea onChange={onChangeHandler} value={description} name="description" cols="30" rows="5" placeholder="Job Description"></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Back To Dashboard</Link>
      </form>
    </div>
  )
}

export default AddExperience
