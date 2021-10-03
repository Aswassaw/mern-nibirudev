import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Profileitem = ({ profile }) => {
  return (
    <div className="profile bg-light">
      <img className="round-img shadow-img" src={profile.user.avatar} alt="Profile" />
      <div>
        <h2>{profile.user.name}</h2>
        <p>{profile.status} at {profile.company}</p>
        <p>{profile.location}</p>
        <hr />
        <Link to={`/profile/${profile.user._id}`} className="btn btn-primary">
          View Profile
        </Link>
      </div>

      <ul>
        {
          profile.skills.slice(0, 4).map((skill, index) => <li className="text-primary" key={index}>
            <i className="fas-fa-check"></i> {skill}
          </li>)
        }
      </ul>
    </div>
  );
};

Profileitem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default Profileitem;
