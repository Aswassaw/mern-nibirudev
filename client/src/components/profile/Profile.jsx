import React, { useEffect, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeAlert } from '../../actions/alert'
import { getProfileById } from '../../actions/profile'
import Spinner from '../layout/Spinner'
import ProfileAbout from './ProfileAbout'
import ProfileEducation from './ProfileEducation'
import ProfileExperience from './ProfileExperience'
import ProfileRepos from './ProfileRepos'
import ProfileTop from './ProfileTop'

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
              <ProfileTop profile={profile} />
              <ProfileAbout profile={profile} />
              <ProfileExperience profile={profile} />
              <ProfileEducation profile={profile} />
              <ProfileRepos profile={profile} />

              {
                profile.githubUsername && (
                  <ProfileRepos username={profile.githubUsername} />
                )
              }
            </div>
          </Fragment>
      }
    </div>
  )
}

export default Profile
