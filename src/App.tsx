import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Profile from './components/Profile/Profile';
import Home from './components/Home/Home';
import LogIn from './components/LogIn/LogIn';
import SignUp from './components/LogIn/SignUp';
import PrivateRoute from './PrivateRoute';
import './App.scss';
import Investment from './components/Investment/Investment';
import ChatRoom from './components/ChatRoom/ChatRoom';
import CompanyProfile from './components/Investment/Company/CompanyProfile';
import UserProfile from './components/Profile/UsersProfiles/UserProfile';
import NotFound from './components/NotFound';

function App() {
  document.title = 'Community';

  return (
    <Router>
      <div className='App'>
        <Switch>
          <PrivateRoute exact path='/' component={Home} />
          <PrivateRoute exact path='/profile' component={Profile} />
          <PrivateRoute exact path='/investment' component={Investment} />
          <PrivateRoute path='/chatRoom' component={ChatRoom} />
          <PrivateRoute exact path='/company/:id' component={CompanyProfile} />
          <PrivateRoute exact path='/profile/:id' component={UserProfile} />
          <Route path='/login' component={LogIn} />
          <Route path='/signup' component={SignUp} />
          <Route path='*' component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
