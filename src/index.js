import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import {Helmet} from "react-helmet";

import "assets/scss/material-kit-react.scss?v=1.10.0";

// pages for this product
import Components from "views/Components/Components.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import ResearchStudyLoginPage from "views/LoginPage/ResearchStudyLoginPage.js";
import CreateTutorialPage from "views/CreateTutorialPage/CreateTutorialPage.js";
import TutorialOverviewPage from "views/TutorialOverviewPage/TutorialOverviewPage.js";
import TutorialSectionPage from "views/TutorialSectionPage/TutorialSectionPage.js"
import RegisterPage from "views/RegisterPage/RegisterPage.js";
import AllTutorialsPage from "views/AllTutorialsPage/AllTutorialsPage.js";
import TutorialPage from "views/TutorialPage/TutorialPage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";

var hist = createBrowserHistory();

ReactDOM.render(
  <div>
    <Helmet>
      <script src="//cdn.loop11.com/embed.js" type="text/javascript" async="async" />
    </Helmet>
    <Router history={hist}>
      <Switch>
        <Redirect exact from='/' to='/login'/>
        <Route path="/register" component={RegisterPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/researchstudylogin" component={ResearchStudyLoginPage} />

        {/* Author */}
        <PrivateRoute exact path="/tutorial/create" roles={["author"]} component={CreateTutorialPage} />
        <PrivateRoute exact path="/tutorial/overview/:id" roles={["author"]} component={TutorialOverviewPage} />
        <PrivateRoute exact path="/tutorial/section/edit/:id" roles={["author"]} component={TutorialSectionPage} />

        {/* Both */}
        <PrivateRoute path="/tutorial/:id/:pid" roles={["learner", "author"]} component={TutorialPage}/>
        <PrivateRoute exact path="/tutorial" roles={["learner", "author"]} component={AllTutorialsPage}/>
        <PrivateRoute exact path="/profile" roles={["learner", "author"]} component={ProfilePage}/>
        
        {/* Components is for reference */}
        <Route path="/components" component={Components} />

        <Redirect from="*" to='/' />
      </Switch>
    </Router>
  </div>,
  document.getElementById("root")
);
