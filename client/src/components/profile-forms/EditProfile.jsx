import React, { useState, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { removeAlert } from "../../actions/alert";
import { createOrUpdateProfile } from "../../actions/profile";
import Alert from "../layout/Alert";

const EditProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const { page, alerts } = useSelector((state) => state.alert);
  const { profile } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const history = useHistory();

  const [formData, setFormData] = useState({
    company: profile ? profile.company : "",
    website: profile ? profile.website : "",
    location: profile ? profile.location : "",
    status: profile ? profile.status : "",
    skills: profile ? profile.skills.join() : "",
    githubUsername: profile ? profile.githubUsername : "",
    bio: profile ? profile.bio : "",
    twitter: profile ? profile.twitter : "",
    facebook: profile ? profile.facebook : "",
    linkedin: profile ? profile.linkedin : "",
    youtube: profile ? profile.youtube : "",
    instagram: profile ? profile.instagram : "",
  });
  const [socialToggle, setSocialToggle] = useState(false);

  const {
    company,
    website,
    location,
    status,
    skills,
    githubUsername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData;

  useEffect(() => {
    document.title = `NibiruDev - Edit Profile ${user ? user.name : ""}`;

    if (page !== "edit-profile") {
      dispatch(removeAlert(true));
    }

    if (!profile) {
      history.push("/dashboard");
    }
  }, [dispatch, history, page, profile, user]);

  const onChangeHandler = (e) =>
    setFormData((c) => ({
      ...c,
      [e.target.name]: e.target.value,
    }));

  const onSubmithandler = (e) => {
    e.preventDefault();

    dispatch(createOrUpdateProfile(formData, history));
  };

  return (
    <div className="container">
      <h1 className="large text-primary">Edit Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required fields</small>
      {alerts !== null &&
        alerts.length > 0 &&
        alerts.map((alert) => (
          <Alert key={alert.id} alert={alert} timeout={10} />
        ))}
      <form className="form" onSubmit={onSubmithandler}>
        <div className="form-group">
          <select name="status" value={status} onChange={onChangeHandler}>
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learner</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            name="company"
            value={company}
            onChange={onChangeHandler}
            placeholder="Company"
          />
          <small className="form-text">
            Could be your own company or one you work for
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            name="website"
            value={website}
            onChange={onChangeHandler}
            placeholder="Website"
          />
          <small className="form-text">
            Could be your own or a company website
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            name="location"
            value={location}
            onChange={onChangeHandler}
            placeholder="Location"
          />
          <small className="form-text">
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            name="skills"
            value={skills}
            onChange={onChangeHandler}
            placeholder="* Skills"
          />
          <small className="form-text">
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            name="githubUsername"
            value={githubUsername}
            onChange={onChangeHandler}
            placeholder="Github Username"
          />
          <small className="form-text">
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className="form-group">
          <textarea
            name="bio"
            value={bio}
            onChange={onChangeHandler}
            placeholder="A short bio of yourself"
          ></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button
            onClick={() => setSocialToggle((c) => !c)}
            type="button"
            className="btn btn-light"
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {socialToggle && (
          <Fragment>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x"></i>
              <input
                type="text"
                placeholder="Twitter URL"
                value={twitter}
                onChange={onChangeHandler}
                name="twitter"
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x"></i>
              <input
                type="text"
                placeholder="Facebook URL"
                value={facebook}
                onChange={onChangeHandler}
                name="facebook"
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x"></i>
              <input
                type="text"
                placeholder="YouTube URL"
                value={youtube}
                onChange={onChangeHandler}
                name="youtube"
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x"></i>
              <input
                type="text"
                placeholder="Linkedin URL"
                value={linkedin}
                onChange={onChangeHandler}
                name="linkedin"
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x"></i>
              <input
                type="text"
                placeholder="Instagram URL"
                value={instagram}
                onChange={onChangeHandler}
                name="instagram"
              />
            </div>
          </Fragment>
        )}
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Back to Dashboard
        </Link>
      </form>
    </div>
  );
};

export default EditProfile;
