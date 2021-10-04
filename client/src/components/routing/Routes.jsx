import React from 'react'
import { Route, Switch } from 'react-router-dom'
import PageNotFound from '../404/PageNotFound'
import Login from '../auth/Login'
import Register from '../auth/Register'
import Dashboard from '../dashboard/Dashboard'
import AddEducation from '../profile-forms/AddEducation'
import AddExperience from '../profile-forms/AddExperience'
import CreateProfile from '../profile-forms/CreateProfile'
import EditProfile from '../profile-forms/EditProfile'
import Profile from '../profile/Profile'
import Profiles from '../profiles/Profiles'
import PrivateRoute from './PrivateRoute'
// import Posts from "./components/posts/Posts";

const Routes = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/developers" component={Profiles} />
        <Route exact path="/profile/:id" component={Profile} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        {/* <PrivateRoute exact path="/posts" component={Posts} /> */}
        <PrivateRoute
          exact
          path="/create-profile"
          component={CreateProfile}
        />
        <PrivateRoute exact path="/edit-profile" component={EditProfile} />
        <PrivateRoute
          exact
          path="/add-experience"
          component={AddExperience}
        />
        <PrivateRoute exact path="/add-education" component={AddEducation} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  )
}

export default Routes
