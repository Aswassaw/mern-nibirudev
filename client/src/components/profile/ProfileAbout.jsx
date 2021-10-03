import React from 'react'

const ProfileAbout = ({ profile }) => {
  return (
    <div className="profile-about bg-light p-2">
      <h2 className="text-primary">{profile.user.name} Bio</h2>
      <p>
        {profile.bio}
      </p>
      <div className="line"></div>
      <h2 className="text-primary">Skill Set</h2>
      <div className="skills">
        {
          profile.skills.map((skill, index) => <div key={index} className="px-1">
            <i className="fas fa-check"></i> {skill}
          </div>)
        }
      </div>
    </div>
  )
}

export default ProfileAbout
