import './App.css';
import React, { useMemo, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home/Home'
import Navigation from './components/Navigation/Navigation'
import NoMatch from './components/NoMatch/NoMatch'
import Login from './components/Login/Login';
import Footer from './components/Footer/Footer';
import Register from './components/Register/Register';
import Job from './components/Job/Job';
import JobHistory from './components/Job/JobHistory/JobHistory'
import { UserContext } from './components/UserContext/UserContext';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import UpdateJob from './components/Job/UpdateJob/UpdateJob';
import ResetPassword from './components/ResetPassword/ResetPassword';
import SetSecurityQuestions from './components/SecurityQuestions/SetSecurityQuestions/SetSecurityQuestions';
import CheckSecurityQuestions from './components/SecurityQuestions/CheckSecurityAnswers/CheckSecurityQuestions';
import ResetSecurityQuestions from './components/SecurityQuestions/ResetSecurityQuestions/ResetSecurityQuestions';

function App() {
  // reference : for window orientation 
  // https://developer.mozilla.org/en-US/docs/Web/API/Window/orientation
  // https://stackoverflow.com/questions/5284878/how-do-i-correctly-detect-orientation-change-using-phonegap-on-ios/36087703#36087703

  // Event listener to determine change (horizontal/portrait)
  window.addEventListener("orientationchange", updateOrientation); 

  function updateOrientation() {
  switch (window.orientation)
  {   
      case 0:
          // Do your thing
          console.log("w 0 : ", window.orientation)
          break;

      case -90:
          // Do your thing
          console.log("w -90 : ", window.orientation)
          break;

      case 90:
          // Do your thing
          console.log("w 90 : ", window.orientation)
          break;

          case 180:
            // Do your thing
            console.log("w 180 : ", window.orientation)
            break;

      default:
          console.log("w  : ", window.orientation)
          break;
      }
  }


  const [user, setUser] = useState("Not Logged In");

  const value = useMemo( () => ([user, setUser]), [user, setUser]);

  return (
    <UserContext.Provider value={value}>
      <Router>
        <Navigation />
          <Switch>
            <Route path="/Home">
              <Home/>
            </Route>
            <Route path="/login">
              <Login/>
            </Route>
            <Route  path="/resetPassword">
              <ResetPassword/>
            </Route>
            <PrivateRoute  path="/setSecurityQuestions">
              <SetSecurityQuestions/>
            </PrivateRoute>
            <Route  path="/checkSecurityQuestions">
              <CheckSecurityQuestions/>
            </Route>
            <PrivateRoute  path="/resetSecurityQuestions">
              <ResetSecurityQuestions/>
            </PrivateRoute>
            <PrivateRoute path="/register">
              <Register/>
            </PrivateRoute>
            <PrivateRoute path="/allJobs">
              <Job/>
            </PrivateRoute>
            <PrivateRoute path="/jobHistory">
              <JobHistory/>
            </PrivateRoute>
            <PrivateRoute path="/updateJob/:job_id">
              <UpdateJob/>
            </PrivateRoute>
            <Route exact path="/">
              <Home/>
            </Route>
            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
          <Footer/>
      </Router>
    </UserContext.Provider>
  );
}

export default App;