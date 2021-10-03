import React, { Fragment } from 'react'
import Moment from 'react-moment'

const ProfileExperience = ({ profile: { experience } }) => {
  return (
    <div className="profile-exp bg-white p-2">
      <h1 className="text-primary">Experiences</h1>
      {
        experience.length > 0 ? experience.map(exp => <div key={exp._id} className="bg-white">
          <h3>{exp.company}</h3>
          <p>
            <Moment format="YYYY/MM/DD">{exp.from}</Moment> - {exp.current ? "Now" : <Fragment>
              {
                exp.to ? <Moment format="YYYY/MM/DD">{exp.to}</Moment> : "Unknown"
              }</Fragment>}
          </p>
          <p><strong>Position:</strong> {exp.title}</p>
          <p><strong>Description:</strong> {exp.description}</p>
        </div>) : <h4>No Experience</h4>
      }
    </div>
  )
}

export default ProfileExperience
