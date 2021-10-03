import React, { useEffect, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeAlert } from '../../actions/alert'
import { getProfileById } from '../../actions/profile'
import Spinner from '../layout/Spinner'

const Profile = ({ match }) => {
  const { page } = useSelector((state) => state.alert);
  const { profile, loading } = useSelector(state => state.profile)
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch()

  useEffect(() => {
    document.title = "NibiruDev - Profile";

    if (page !== "profile") {
      dispatch(removeAlert());
    }

    dispatch(getProfileById(match.params.id))
  }, [dispatch, match.params.id, page]);

  return (
    <div className="container">
      <Link to="/developers" className="btn"><i className="fas fa-arrow-left"></i> Back To Developers</Link>
      {
        profile === null || loading ? <Spinner /> :
          <Fragment>
            {
              auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id && (<Link to="/edit-profile" className="btn btn-primary">Edit Profile</Link>)
            }
            <div className="profile-grid my-1">
              <div className="profile-top bg-primary p-2">
                <img className="round-img shadow-img my-1" src="img/profile.jpg" alt="Profile" />
                <h1 className="large">Andry Pebrianto</h1>
                <p className="lead">Founder at Nibiru Developers</p>
                <p>Trenggalek</p>
                <div className="icons my-1">
                  <a href="#">
                    <i className="fas fa-globe fa-2x"></i>
                  </a>
                  <a href="#">
                    <i className="fab fa-twitter fa-2x"></i>
                  </a>
                  <a href="#">
                    <i className="fab fa-linkedin fa-2x"></i>
                  </a>
                  <a href="#">
                    <i className="fab fa-facebook fa-2x"></i>
                  </a>
                  <a href="#">
                    <i className="fab fa-instagram fa-2x"></i>
                  </a>
                </div>
              </div>

              <div className="profile-about bg-light p-2">
                <h2 className="text-primary">Andry Bio</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint perspiciatis dolores blanditiis animi sit
                  eveniet hic, non quaerat explicabo odio.
                </p>
                <div className="line"></div>
                <h2 className="text-primary">Skill Set</h2>
                <div className="skills">
                  <div className="px-1">
                    <i className="fas fa-check"></i> HTML
                  </div>
                  <div className="px-1">
                    <i className="fas fa-check"></i> CSS
                  </div>
                  <div className="px-1">
                    <i className="fas fa-check"></i> Javascript
                  </div>
                  <div className="px-1">
                    <i className="fas fa-check"></i> PHP
                  </div>
                </div>
              </div>

              <div className="profile-exp bg-white p-2">
                <h1 className="text-primary">Experiences</h1>
                <div className="bg-white">
                  <h3>Microsoft</h3>
                  <p>18 October 2010 - Current</p>
                  <p><strong>Position:</strong> Founder</p>
                  <p><strong>Description:</strong> Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo porro earum
                    obcaecati rem pariatur consequatur.</p>
                </div>
                <div className="bg-white">
                  <h3>Google</h3>
                  <p>18 October 2015 - 2010</p>
                  <p><strong>Position:</strong> Web Dev</p>
                  <p><strong>Description:</strong> Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo porro earum
                    obcaecati rem pariatur consequatur.</p>
                </div>
              </div>

              <div className="profile-edu bg-white p-2">
                <h1 className="text-primary">Education</h1>
                <div className="bg-white">
                  <h3>SMKN 2 Trenggalek</h3>
                  <p>18 October 2010 - Current</p>
                  <p><strong>Degree:</strong> Masters</p>
                  <p><strong>Field Of Study:</strong> Software Enginers</p>
                  <p><strong>Description:</strong> Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo porro earum
                    obcaecati rem pariatur consequatur.</p>
                </div>
              </div>

              <div className="profile-github">
                <h2 className="text-primary my-1">
                  <i className="fab fa-github"></i> Github Repository
                </h2>
                <div className="repo bg-white my-1 p-1">
                  <div>
                    <h4><a href="#">Repo One</a></h4>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis, quod.</p>
                  </div>
                  <div>
                    <ul>
                      <li className="badge badge-primary">Stars: 33</li>
                      <li className="badge badge-dark">Watchers: 88</li>
                      <li className="badge badge-light">Forks: 4</li>
                    </ul>
                  </div>
                </div>
                <div className="repo bg-white my-1 p-1">
                  <div>
                    <h4><a href="#">Repo Two</a></h4>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis, quod.</p>
                  </div>
                  <div>
                    <ul>
                      <li className="badge badge-primary">Stars: 33</li>
                      <li className="badge badge-dark">Watchers: 88</li>
                      <li className="badge badge-light">Forks: 4</li>
                    </ul>
                  </div>
                </div>
                <div className="repo bg-white my-1 p-1">
                  <div>
                    <h4><a href="#">Repo Three</a></h4>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis, quod.</p>
                  </div>
                  <div>
                    <ul>
                      <li className="badge badge-primary">Stars: 33</li>
                      <li className="badge badge-dark">Watchers: 88</li>
                      <li className="badge badge-light">Forks: 4</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Fragment>
      }
    </div>
  )
}

export default Profile
