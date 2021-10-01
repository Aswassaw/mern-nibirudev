import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { useState } from 'react/cjs/react.development';
import { removeAlert } from '../../actions/alert';
import { addEducation } from '../../actions/profile';
import Alert from '../layout/Alert';

const AddEducation = () => {
  const { page, alerts } = useSelector((state) => state.alert);
  const { profile } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const history = useHistory();

  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldOfStudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
  })

  const [toggleToDateDisabled, setToggleToDateDisabled] = useState(false);

  const { school, degree, fieldOfStudy, from, to, current, description } = formData;

  useEffect(() => {
    document.title = "NibiruDev - Add Education";

    if (page !== "add-education") {
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

    dispatch(addEducation(formData, history))
  };

  return (
    <div className="container">
      <h1 className="large text-primary">
        Add Your Education
      </h1>
      <p className="lead">
        <i className="fas fa-graduation-cap"></i> Add any school, bootcamp, etc that
        you have attended
      </p>
      <small>* = required field</small>
      {alerts !== null &&
        alerts.length > 0 &&
        alerts.map((alert) => (
          <Alert key={alert.id} alert={alert} timeout={10} />
        ))}
      <form className="form" onSubmit={onSubmithandler}>
        <div className="form-group">
          <input type="text" placeholder="* School or Bootcamp" name="school" onChange={onChangeHandler} value={school} required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Degree or Certificate" name="degree" onChange={onChangeHandler} value={degree} required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Field Of Study" name="fieldOfStudy" onChange={onChangeHandler} value={fieldOfStudy} />
        </div>
        <div className="form-group">
          <h4>* From Date</h4>
          <input type="date" name="from" value={from} onChange={onChangeHandler} />
        </div>
        <div className="form-group">
          <p><input type="checkbox" checked={current} name="current" onChange={() => {
            setFormData({ ...formData, current: !current, to: "" })
            setToggleToDateDisabled(!toggleToDateDisabled)
          }} /> Current School or Bootcamp</p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input type="date" onChange={onChangeHandler} value={to} name="to" disabled={toggleToDateDisabled ? true : false} />
        </div>
        <div className="form-group">
          <textarea name="description" cols="30" rows="5" placeholder="Program Description" onChange={onChangeHandler} value={description} ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Back To Dashboard</Link>
      </form>
    </div>
  )
}

export default AddEducation
