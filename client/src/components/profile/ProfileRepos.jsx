import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getGithubRepos } from '../../actions/profile'
import Spinner from '../layout/Spinner'

const ProfileRepos = ({ username }) => {
  const { repos } = useSelector(state => state.profile)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getGithubRepos(username))
  }, [dispatch, username])

  return (
    <div className="profile-github">
      <h2 className="text-primary my-1">
        <i className="fab fa-github"></i> Github Repository
      </h2>
      {
        repos === null ? <Spinner /> : (
          repos.map((repo, index) => (
            <div key={index} className="repo bg-white my-1 p-1">
              <div>
                <h4><a href={repo.html_url} target="_blank" rel="noreferrer">{repo.name}</a></h4>
                <p>{repo.description}</p>
              </div>
              <div>
                <ul>
                  <li className="badge badge-primary">Stars: {repo.stargazers_count}</li>
                  <li className="badge badge-dark">Watchers: {repo.watchers_count}</li>
                  <li className="badge badge-light">Forks: {repo.forks_count}</li>
                </ul>
              </div>
            </div>
          ))
        )
      }
    </div>
  )
}

export default ProfileRepos
