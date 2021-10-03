import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Fragment } from 'react/cjs/react.production.min';
import { getProfiles } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import Profileitem from './ProfileItem';

const Profiles = () => {
  const { profiles, loading } = useSelector(state => state.profile)
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "NibiruDev - Developers";

    dispatch(getProfiles())
  }, [dispatch]);

  return (
    <div className="container">
      <h1 className="large text-primary">
        Developers
      </h1>
      <p className="lead">
        <i className="fas fa-handshake angle"></i> Browse and Connect with Developers
      </p>
      <div className="profiles">
        {
          loading ? <Spinner /> : <Fragment>
            {
              profiles.length > 0 ? profiles.map(profile => <Profileitem profile={profile} key={profile._id} />) : <p>Nothing Developer Found</p>
            }
          </Fragment>
        }
      </div>
    </div>
  )
}

export default Profiles
