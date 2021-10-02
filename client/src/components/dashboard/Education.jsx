import React from 'react'
import PropTypes from 'prop-types'
import Moment from "react-moment";
import { Fragment } from 'react/cjs/react.production.min';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { deleteEducation } from '../../actions/profile';

const Education = ({ education }) => {
  const dispatch = useDispatch()

  const onClickHandler = (id) => {
    Swal.fire({
      title: "Delete Education?",
      text: "You can't revert this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteEducation(id))
      }
    });
  }

  return (
    <Fragment>
      <h2 class="my-2">
        Education Credentials
      </h2>
      {
        education.length > 0 ? <table class="table">
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
        </table> : <p>You have no education, let's add some.</p>
      }
    </Fragment>
  )
}

Education.propTypes = {
  education: PropTypes.array.isRequired,
}

export default Education
