import React, { useState } from "react";
import { useAuth } from "../../auth";
import { Redirect } from "react-router-dom";
import { GoogleLogin } from 'react-google-login';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import InputAdornment from "@material-ui/core/InputAdornment";
import Snackbar from '@material-ui/core/Snackbar';
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
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

import styles from "assets/jss/material-kit-react/views/registerPage.js";

import image from "assets/img/bg7.jpg";

const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const classes = useStyles();
  const { ...rest } = props;

  const [role, setRole] = React.useState("learner");
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');

  const [errorOpen, setErrorOpen] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('Please try again');
  const [successOpen, setSuccessOpen] = React.useState(false);
  const [successMsg, setSuccessMsg] = React.useState('Please try again');

  const [lowerClass, setLowerClass] = React.useState(false);
  const [upperClass, setUpperClass] = React.useState(false);
  const [numberClass, setNumberClass] = React.useState(false);
  const [specialClass, setSpecialClass] = React.useState(false);
  const [lengthClass, setLengthClass] = React.useState(false);

  const handleNameChange = (e) => {
    // Handles name input field change
    setName(e.target.value);
  }

  const handleEmailChange = (e) => {
    // Handles email input field change
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    // Handles password input field change and conducts password check
    var newPassword = e.target.value;
    setPassword(newPassword);
    var flags = 0;
    if (newPassword.length < 8) {
      setLengthClass(false);
      flags += 1;
    } else {
      setLengthClass(true);
    }
    if (newPassword.match(/[a-z]/) ) {
      setLowerClass(true);
    } else {
      setLowerClass(false);
      flags += 1;
    }
    if (newPassword.match(/[A-Z]/) ) {
      setUpperClass(true);
    } else {
      setUpperClass(false);
      flags += 1;
    }
    if (newPassword.match(/\d/) ) {
      setNumberClass(true);
    } else {
      setNumberClass(false);
      flags += 1;
    }
    if (newPassword.match(/[#?!@$%^&*-]/) ) {
      setSpecialClass(true);
    } else {
      setSpecialClass(false);
      flags += 1;
    }

    if (flags > 0) {
      document.getElementById("passwordHints").style.display="block";
    } else {
      document.getElementById("passwordHints").style.display="none";
    }
    
  }

  const handleRepasswordChange = (e) => {
    // Handles retype password input field change
    setRepassword(e.target.value);
  }

  const handleClose = (event, reason) => {
    // Handles snackbar open state
    if (reason === 'clickaway') {
      return;
    }
    setErrorOpen(false);
    setSuccessOpen(false);
  };

  const [logged] = useAuth();

  const onSubmitClick = (e) => {
    // Handles form submission registration
    e.preventDefault();
    if (name && email && password && repassword && role) {
      if (password === repassword) {
        let opts = {
          'name': name,
          'email': email,
          'password': password,
          'repassword': repassword,
          'role': role,
        };
        fetch(process.env.REACT_APP_AUTH_URL + '/auth/register', {
          method: 'post',
          body: JSON.stringify(opts)
        }).then(r => {
          if (r.ok) {
            r.json().then(
              message => {
                setSuccessMsg(message.message);
                setSuccessOpen(true);
                setRole("learner");
                document.getElementById("name").value="";
                document.getElementById("email").value="";
                document.getElementById("pass").value="";
                document.getElementById("repass").value="";
                setEmail("");
                setName("");
                setPassword("");
                setRepassword("");
                setTimeout(window.location.href='/login', 3000);
              }
            );
          } else {
            r.json().then(
              message => {
                setErrorMsg(message.message);
                setErrorOpen(true);
              }
            );
          }
        })
          
        ;
      } else {
        setErrorMsg("Password Mismatch.");
        setErrorOpen(true);
      }
    } else {
      setErrorMsg("All fields are required.");
      setErrorOpen(true);
    }
  }

  const googleRegister = (googleData) => {
    // Handles Google registration when Google setup successful
    fetch(process.env.REACT_APP_AUTH_URL + '/oauth/register', {
      method: 'post',
      body: JSON.stringify({
        'token': googleData.tokenId,
        'role': role,
      })
    }).then(r => {
      if (r.ok) {
        r.json().then(
          message => {
            setSuccessMsg(message.message);
            setSuccessOpen(true);
            setRole("learner");
            document.getElementById("name").value="";
            document.getElementById("email").value="";
            document.getElementById("pass").value="";
            document.getElementById("repass").value="";
            setEmail("");
            setName("");
            setPassword("");
            setRepassword("");
            setTimeout(window.location.href='/login', 3000);
          }
        );
      } else {
        r.json().then(
          message => {
            setErrorMsg(message.message);
            setErrorOpen(true);
          }
        );
      }
    })
  };

  const onFailure = (error) => {
    // Handles Google setup fail
    if (error.details) {
      document.getElementById('googleButton').style.display = "none";
      setErrorMsg(error.details);
      setErrorOpen(true);
    }
  }

  return (
    logged?<Redirect to='/tutorial' />:
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
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card>
                <form className={classes.form}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h3>Register</h3>
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
                      <FormControlLabel
                        control={
                          <Radio
                            checked={role === "both"}
                            onChange={() => setRole("both")}
                            value="both"
                            name="radio button enabled"
                            aria-label="both"
                          />
                        }
                        classes={{
                          label: classes.label
                        }}
                        label="Both"
                      />
                    </div>
                    <CustomInput
                      labelText="Name..."
                      id="name"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: handleNameChange,
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <People className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />
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
                        onFocus: ()=>{document.getElementById("passwordHints").style.display="block"},
                        onBlur: ()=>{document.getElementById("passwordHints").style.display="none"},
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
                    <div id="passwordHints" className={classes.passwordHints} style={{display: "none"}}>
                        <h5>Password must meet the following requirements:</h5>
                        <ul>
                            <li className={lowerClass? classes.valid : classes.invalid}>At least <strong>one lowercase letter</strong></li>
                            <li className={upperClass? classes.valid : classes.invalid}>At least <strong>one uppercase letter</strong></li>
                            <li className={numberClass? classes.valid : classes.invalid}>At least <strong>one number</strong></li>
                            <li className={specialClass? classes.valid : classes.invalid}>At least <strong>one special character</strong> (#?!@$%^&*-)</li>
                            <li className={lengthClass? classes.valid : classes.invalid}>At least <strong>8 characters long</strong></li>
                        </ul>
                    </div>

                    <CustomInput
                      labelText="Retype Password"
                      id="repass"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: handleRepasswordChange,
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
                    <Button color="github" onClick={onSubmitClick} type="submit" fullWidth={true}>
                      Register with credentials
                    </Button>
                  </CardFooter>
                  <CardFooter className={classes.cardFooter}>
                    <GoogleLogin
                      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                      render={(renderProps) => (
                        <Button id="googleButton" color="github" onClick={renderProps.onClick} disabled={renderProps.disabled} fullWidth={true}>
                          <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                            <g fill="#000" fillRule="evenodd">
                              <path d="M9 3.48c1.69 0 2.83.73 3.48 1.34l2.54-2.48C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.96l2.91 2.26C4.6 5.05 6.62 3.48 9 3.48z" fill="#EA4335"></path>
                              <path d="M17.64 9.2c0-.74-.06-1.28-.19-1.84H9v3.34h4.96c-.1.83-.64 2.08-1.84 2.92l2.84 2.2c1.7-1.57 2.68-3.88 2.68-6.62z" fill="#4285F4"></path>
                              <path d="M3.88 10.78A5.54 5.54 0 0 1 3.58 9c0-.62.11-1.22.29-1.78L.96 4.96A9.008 9.008 0 0 0 0 9c0 1.45.35 2.82.96 4.04l2.92-2.26z" fill="#FBBC05"></path>
                              <path d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.84-2.2c-.76.53-1.78.9-3.12.9-2.38 0-4.4-1.57-5.12-3.74L.97 13.04C2.45 15.98 5.48 18 9 18z" fill="#34A853"></path>
                              <path fill="none" d="M0 0h18v18H0z"></path>
                            </g>
                          </svg> Register via Google
                        </Button>
                      )}
                      buttonText="Login via Google"
                      onSuccess={googleRegister}
                      onFailure={onFailure}
                    />
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
            open={errorOpen}
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
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            open={successOpen}
            autoHideDuration={3000}
            onClose={handleClose}
          >
            <SnackbarContent
              message={
                <span>
                  {successMsg}
                </span>
              }
              color="success"
            />
          </Snackbar>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}
