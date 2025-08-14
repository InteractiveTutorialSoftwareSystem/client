// React import not needed in React 17+
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { ThemeProvider as StylesThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
import { GoogleOAuthProvider } from "@react-oauth/google";
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

const theme = createTheme();

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
    <ThemeProvider theme={theme}>
      <StylesThemeProvider theme={theme}>
        <div>
    <Helmet>
      <script src="//cdn.loop11.com/embed.js" type="text/javascript" async="async" />
    </Helmet>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/researchstudylogin" element={<ResearchStudyLoginPage />} />

        {/* Author */}
        <Route path="/tutorial/create" element={<PrivateRoute roles={["author"]} component={CreateTutorialPage} />} />
        <Route path="/tutorial/overview/:id" element={<PrivateRoute roles={["author"]} component={TutorialOverviewPage} />} />
        <Route path="/tutorial/section/edit/:id" element={<PrivateRoute roles={["author"]} component={TutorialSectionPage} />} />

        {/* Both */}
        <Route path="/tutorial/:id/:pid" element={<PrivateRoute roles={["learner", "author"]} component={TutorialPage} />} />
        <Route path="/tutorial" element={<PrivateRoute roles={["learner", "author"]} component={AllTutorialsPage} />} />
        <Route path="/profile" element={<PrivateRoute roles={["learner", "author"]} component={ProfilePage} />} />
        
        {/* Components is for reference */}
        <Route path="/components" element={<Components />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
        </div>
      </StylesThemeProvider>
    </ThemeProvider>
  </GoogleOAuthProvider>
);
