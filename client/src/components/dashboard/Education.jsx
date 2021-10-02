import React from 'react'
import PropTypes from 'prop-types'
import Moment from "react-moment";
import { Fragment } from 'react/cjs/react.production.min';

const Education = ({ education }) => {
  const onClickHandler = (id) => {
    alert(id)
  }

  return (
    <Fragment>
      <h2 class="my-2">
        Education Credentials
      </h2>
      <table class="table">
        <thead>
          <tr>
            <th>School</th>
            <th class="hide-sm">Degree</th>
            <th class="hide-sm">Years</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            education.map(edu => {
              return <tr key={edu._id}>
                <td>{edu.school.slice(0, 20)}</td>
                <td class="hide-sm">{edu.degree.slice(0, 20)}</td>
                <td class="hide-sm">
                  <Moment format="YYYY/MM/DD">{edu.from}</Moment> - {edu.current ? "Now" : <Fragment>
                    {
                      edu.to ? <Moment format="YYYY/MM/DD">{edu.to}</Moment> : "Unknown"
                    }</Fragment>}
                </td>
                <td>
                  <button class="btn btn-danger" onClick={() => onClickHandler(edu._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            })
          }
        </tbody>
      </table>
    </Fragment>
  )
}

Education.propTypes = {
  education: PropTypes.array.isRequired,
}

export default Education
