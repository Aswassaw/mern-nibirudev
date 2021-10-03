import React, { Fragment } from 'react'
import Moment from 'react-moment'

const ProfileEducation = ({ profile: { education } }) => {
  return (
    <div className="profile-edu bg-white p-2">
      <h1 className="text-primary">Education</h1>
      {
        education.length > 0 ? education.map(edu => <div key={edu._id} className="bg-white">
          <h3>{edu.school}</h3>
          <p>
            <Moment format="YYYY/MM/DD">{edu.from}</Moment> - {edu.current ? "Now" : <Fragment>
              {
                edu.to ? <Moment format="YYYY/MM/DD">{edu.to}</Moment> : "Unknown"
              }</Fragment>}
          </p>
          <p><strong>Degree:</strong> {edu.degree}</p>
          <p><strong>Field Of Study:</strong> {edu.fieldOfStudy}</p>
          <p><strong>Description:</strong> {edu.description}</p>
        </div>) : <h4>No Education</h4>
      }
    </div>
  )
}

export default ProfileEducation
