import React from 'react'

const ProfileTop = ({ profile: { website, social, user, status, company, location } }) => {
  return (
    <div className="profile-top bg-primary p-2">
      <img className="round-img shadow-img my-1" src="img/profile.jpg" alt="Profile" />
      <h1 className="large">{user && user.name}</h1>
      <p className="lead">{status} at {company}</p>
      <p>{location}</p>
      <div className="icons my-1">
        {
          website && <a href={website} target="_blank" rel="noreferrer">
            <i className="fas fa-globe fa-2x"></i>
          </a>
        }
        {social && social.twitter && <a href={social.twitter} target="_blank" rel="noreferrer">
          <i className="fab fa-twitter fa-2x"></i>
        </a>}
        {social && social.linkedin && <a href={social.linkedin} target="_blank" rel="noreferrer">
          <i className="fab fa-linkedin fa-2x"></i>
        </a>}
        {social && social.facebook && <a href={social.facebook} target="_blank" rel="noreferrer">
          <i className="fab fa-facebook fa-2x"></i>
        </a>}
        {social && social.instagram && <a href={social.instagram} target="_blank" rel="noreferrer">
          <i className="fab fa-instagram fa-2x"></i>
        </a>}
      </div>
    </div>
  )
}

export default ProfileTop
