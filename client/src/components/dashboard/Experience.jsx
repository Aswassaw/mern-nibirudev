import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Moment from "react-moment";
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { deleteExperience } from '../../actions/profile';

const Experience = ({ experience }) => {
  const dispatch = useDispatch()

  const onClickHandler = (id) => {
    Swal.fire({
      title: "Delete Experience?",
      text: "You can't revert this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteExperience(id))
      }
    });
  }

  return (
    <Fragment>
      <h2 className="my-2">
        Experience Credentials
      </h2>
      {
        experience.length > 0 ? <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th className="hide-sm">Title</th>
              <th className="hide-sm">Years</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              experience.map(exp => {
                return <tr key={exp._id}>
                  <td>{exp.company.slice(0, 20)}</td>
                  <td className="hide-sm">{exp.title.slice(0, 20)}</td>
                  <td className="hide-sm">
                    <Moment format="YYYY/MM/DD">{exp.from}</Moment> - {exp.current ? "Now" : <Fragment>
                      {
                        exp.to ? <Moment format="YYYY/MM/DD">{exp.to}</Moment> : "Unknown"
                      }</Fragment>}
                  </td>
                  <td>
                    <button className="btn btn-danger" onClick={() => onClickHandler(exp._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              })
            }
          </tbody>
        </table> : <p>You have no experience, let's add some.</p>
      }
    </Fragment>
  )
}

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
}

export default Experience
