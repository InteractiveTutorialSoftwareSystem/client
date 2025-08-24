import React, { useState } from "react";
import { login, useAuth } from "../../auth";
import { useNavigate, Navigate } from "react-router-dom";
import { GoogleLogin, useGoogleOneTapLogin } from '@react-oauth/google';
// @mui/material components
import { makeStyles } from "@mui/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import InputAdornment from "@mui/material/InputAdornment";
import Icon from "@mui/material/Icon";
import ErrorHandler from "components/ErrorHandler/ErrorHandler.js";
// @mui/icons-material
import Email from "@mui/icons-material/Email";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/bg7.jpg";

const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const classes = useStyles();
  const { ...rest } = props;

  const navigate = useNavigate();

  const [role, setRole] = React.useState("learner");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorOpen, setErrorOpen] = React.useState(false);
  const [currentError, setCurrentError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const [logged] = useAuth();

  const handleEmailChange = (e) => {
    // Handles email input field change
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    // Handles password input field change
    setPassword(e.target.value);
  }

  const handleClose = (event, reason) => {
    // Handles snackbar open state
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const onSubmitClick = (e) => {
    // Handles form submission login
    e.preventDefault();
    if (email && password && role) {
      setLoading(true);
      const opts = {
        email,
        password,
        role,
      };
      fetch(process.env.REACT_APP_AUTH_URL + '/auth/login', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(opts)
      }).then(r => {
        if (!r.ok) {
          throw new Error(`HTTP error! status: ${r.status}`);
        }
        return r.json();
      })
        .then(token => {
          setLoading(false);
          if (token.access_token){
            login(token);
            if (token.role == "author") {
              navigate("/tutorial")
            } else if (token.role == "learner") {
              navigate("/tutorial")
            }
          }
          else {
            setErrorMsg("Login failed, please try again");
            setOpen(true);
          }
      })
      .catch((error) => {
        setLoading(false);
        setCurrentError(error);
        setErrorOpen(true);
      });
    } else {
      setCurrentError(new Error("Please input all credentials"));
      setErrorOpen(true);
    }
  }

  const googleLogin = (credentialResponse) => {
    // Handles Google login when Google setup successful
    setLoading(true);
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    
    fetch(process.env.REACT_APP_AUTH_URL + '/oauth/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'token': credentialResponse.credential,
        role,
      }),
      signal: controller.signal
    }).then(r => {
      clearTimeout(timeoutId);
      setLoading(false);
      if (!r.ok) {
        throw new Error(`HTTP error! status: ${r.status}`);
      }
      return r.json();
    })
      .then(token => {
        if (token.access_token){
          login(token);
          if (token.role == "author") {
            navigate("/tutorial")
          } else if (token.role == "learner") {
            navigate("/tutorial")
          }
        }
        else {
          setCurrentError(new Error("Login failed. Please check your credentials."));
          setErrorOpen(true);
        }
    })
    .catch((error) => {
      clearTimeout(timeoutId);
      setLoading(false);
      if (error.name === 'AbortError') {
        setCurrentError(new Error("Google login timeout. Please try again."));
      } else {
        setCurrentError(new Error("Google login failed. Please try again or use credentials."));
      }
      setErrorOpen(true);
    })
  };

  // Check if Google OAuth is available
  const isGoogleOAuthAvailable = process.env.REACT_APP_GOOGLE_CLIENT_ID && 
                                process.env.REACT_APP_GOOGLE_CLIENT_ID !== 'undefined';

  // Note: onFailure function removed as it's not used with the current Google Login setup

  const onGuestClick = (e) => {
    // Handles guest login
    e.preventDefault();
    setLoading(true);
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);
    
    fetch(process.env.REACT_APP_AUTH_URL + '/guest/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({'role': e.currentTarget.getAttribute('data-role')}),
      signal: controller.signal
    }).then(r => {
      clearTimeout(timeoutId);
      setLoading(false);
      if (!r.ok) {
        throw new Error(`HTTP error! status: ${r.status}`);
      }
      return r.json();
    })
      .then(token => {
        if (token.access_token){
          login(token);
          if (token.role == "author") {
            navigate("/tutorial")
          } else if (token.role == "learner") {
            navigate("/tutorial")
          }
        }
        else {
          setCurrentError(new Error(token.message || "Guest login failed"));
          setErrorOpen(true);
        }
    })
    .catch((error) => {
      clearTimeout(timeoutId);
      setLoading(false);
      if (error.name === 'AbortError') {
        setCurrentError(new Error("Guest login timeout. Please check your connection."));
      } else {
        setCurrentError(new Error("Guest login failed. Please try again."));
      }
      setErrorOpen(true);
    });
  }

  // Add a small delay to ensure logout has fully completed
  const [shouldRedirect, setShouldRedirect] = React.useState(false);
  
  React.useEffect(() => {
    if (logged) {
      // Small delay to ensure state is stable
      const timer = setTimeout(() => {
        setShouldRedirect(true);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setShouldRedirect(false);
    }
  }, [logged]);
  
  return (
    shouldRedirect ? <Navigate to='/tutorial' /> :
    <div>
      <Header
        absolute
        color="transparent"
        brand="Interactive Tutorial System"
        rightLinks={<HeaderLinks />}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center" className={classes.gridContainer}>
            <GridItem xs={12} sm={12} md={4}>
              <Card>
                <form className={classes.form}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h3>Login</h3>
                  </CardHeader>
                  <CardBody>
                    <div
                      className={
                        classes.checkboxAndRadio
                      }
                      style={{
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        gap: '20px',
                        marginBottom: '20px'
                      }}
                    >
                      <FormControlLabel
                        control={
                          <Radio
                            checked={role === "learner"}
                            onChange={() => setRole("learner")}
                            value="learner"
                            name="radio button enabled"
                            aria-label="learner"
                          />
                        }
                        classes={{
                          label: classes.label
                        }}
                        label="Learner"
                      />
                      <FormControlLabel
                        control={
                          <Radio
                            checked={role === "author"}
                            onChange={() => setRole("author")}
                            value="author"
                            name="radio button enabled"
                            aria-label="author"
                          />
                        }
                        classes={{
                          label: classes.label
                        }}
                        label="Author"
                      />
                    </div>
                    <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                      <label htmlFor="email" className={classes.inputLabel}>
                        Email
                      </label>
                      <CustomInput
                        id="email"
                        formControlProps={{
                          fullWidth: true,
                          style: { paddingTop: '0px' }
                        }}
                        inputProps={{
                          onChange: handleEmailChange,
                          type: "email",
                          endAdornment: (
                            <InputAdornment position="end">
                              <Email className={classes.inputIconsColor} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </div>
                    <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                      <label htmlFor="pass" className={classes.inputLabel}>
                        Password
                      </label>
                      <CustomInput
                        id="pass"
                        formControlProps={{
                          fullWidth: true,
                          style: { paddingTop: '0px' }
                        }}
                        inputProps={{
                          onChange: handlePasswordChange,
                          type: "password",
                          endAdornment: (
                            <InputAdornment position="end">
                              <Icon className={classes.inputIconsColor}>
                                lock_outline
                              </Icon>
                            </InputAdornment>
                          ),
                          autoComplete: "off",
                        }}
                      />
                    </div>
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button color="github" onClick={onSubmitClick} type="submit" fullWidth={true} disabled={loading}>
                      {loading ? 'Logging in...' : 'Login with credentials'}
                    </Button>
                  </CardFooter>
                  {isGoogleOAuthAvailable && (
                    <CardFooter className={classes.cardFooter}>
                      <GoogleLogin
                        onSuccess={googleLogin}
                        onError={() => {
                          setCurrentError(new Error("Google Login failed"));
                          setErrorOpen(true);
                        }}
                        useOneTap={false}
                        theme="outline"
                        size="large"
                        text="signin_with"
                        shape="rectangular"
                      />
                    </CardFooter>
                  )}
                  <CardFooter className={classes.cardFooter}>
                    <Button color="github" onClick={onGuestClick} data-role="learner" type="submit" fullWidth={true}>
                      Guest Login
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
          <ErrorHandler
            open={errorOpen}
            onClose={() => setErrorOpen(false)}
            error={currentError}
            showRecoveryAction={true}
          />
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}
