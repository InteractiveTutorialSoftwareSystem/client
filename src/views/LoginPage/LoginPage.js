import React, { useState } from "react";
import { login, useAuth } from "../../auth";
import { useNavigate, Navigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
// @mui/material components
import { makeStyles } from "@mui/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import InputAdornment from "@mui/material/InputAdornment";
import Snackbar from '@mui/material/Snackbar';
import Icon from "@mui/material/Icon";
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
import SnackbarContent from "components/Snackbar/SnackbarContent.js";

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
  const [open, setOpen] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('Please try again');
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
            setErrorMsg(token.message || "Login failed");
            setOpen(true);
          }
      })
      .catch(() => {
        setLoading(false);
        // Handle login error silently
        setErrorMsg("Network error. Please check your connection and try again.");
        setOpen(true);
      });
    } else {
      setErrorMsg("Please input all credentials");
      setOpen(true);
    }
  }

  const googleLogin = (credentialResponse) => {
    // Handles Google login when Google setup successful
    fetch(process.env.REACT_APP_AUTH_URL + '/oauth/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'token': credentialResponse.credential,
        role,
      })
    }).then(r => {
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
          setErrorMsg(token.message || "Google Login failed");
          setOpen(true);
        }
    })
    .catch(() => {
      // Handle Google login error silently
      setErrorMsg("Google login failed. Please try again.");
      setOpen(true);
    })
  };

  // Note: onFailure function removed as it's not used with the current Google Login setup

  const onGuestClick = (e) => {
    // Handles guest login
    e.preventDefault();
    fetch(process.env.REACT_APP_AUTH_URL + '/guest/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({'role': e.currentTarget.getAttribute('data-role')})
    }).then(r => {
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
          setErrorMsg(token.message || "Guest login failed");
          setOpen(true);
        }
    })
    .catch(() => {
      // Handle guest login error silently
      setErrorMsg("Guest login failed. Please try again.");
      setOpen(true);
    });
  }

  return (
    logged?<Navigate to='/tutorial' />:
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
                      style={{textAlign: "center"}}
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
                    <CustomInput
                      labelText="Email..."
                      id="email"
                      formControlProps={{
                        fullWidth: true,
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
                    <CustomInput
                      labelText="Password"
                      id="pass"
                      formControlProps={{
                        fullWidth: true,
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
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button color="github" onClick={onSubmitClick} type="submit" fullWidth={true} disabled={loading}>
                      {loading ? 'Logging in...' : 'Login with credentials'}
                    </Button>
                  </CardFooter>
                  <CardFooter className={classes.cardFooter}>
                    <GoogleLogin
                      onSuccess={googleLogin}
                      onError={() => {
                        setErrorMsg("Google Login failed");
                        setOpen(true);
                      }}
                      useOneTap
                      theme="outline"
                      size="large"
                      text="signin_with"
                      shape="rectangular"
                    />
                  </CardFooter>
                  <CardFooter className={classes.cardFooter}>
                    <Button color="github" onClick={onGuestClick} data-role="learner" type="submit" fullWidth={true}>
                      Guest Login
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
          >
            <SnackbarContent
              message={
                <span>
                  {errorMsg}
                </span>
              }
              color="danger"
            />
          </Snackbar>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}
