import React, { useState } from "react";
import { login, useAuth } from "../../auth";
import { useHistory, Redirect } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from '@material-ui/core/Snackbar';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import LockOpenIcon from '@material-ui/icons/LockOpen';
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/bg7.jpg";

const useStyles = makeStyles(styles);

export default function ResearchStudyLoginPage(props) {
  const classes = useStyles();
  const { ...rest } = props;

  const history = useHistory();

  const [open, setOpen] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('Please try again');

  const [backdropOpen, setBackdropOpen] = useState(false);

  const [logged] = useAuth();

  const handleClose = (event, reason) => {
    // Handles snackbar open state
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const onGuestClick = (e) => {
    // Handles guest login
    e.preventDefault();
    setBackdropOpen(true);
    fetch(process.env.REACT_APP_AUTH_URL + '/guest/login', {
      method: 'post',
      body: JSON.stringify({'role': e.currentTarget.getAttribute('data-role')})
    }).then(r => r.json())
      .then(token => {
        if (token.access_token){
          login(token);
          if (token.role == "author") {
            history.push({pathname: "/tutorial"})
          } else if (token.role == "learner") {
            history.push({pathname: "/tutorial",})
          }
        }
        else {
          setErrorMsg(token.message);
          setOpen(true);
        }
    });
  }

  return (
    logged?<Redirect to='/tutorial' />:
    <div>
      <Header
        absolute
        color="transparent"
        brand="Interactive Tutorial System"
        // rightLinks={<HeaderLinks />}
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
                    <h3>Research Study</h3>
                  </CardHeader>
                  <CardBody>
                    Click the button below to login to a research study account.
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button round color="info" onClick={onGuestClick} data-role="author" type="submit" fullWidth={true}>
                      <LockOpenIcon/> Click here to login
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
      <Backdrop className={classes.backdrop} open={backdropOpen}>
        <div>
          <div style={{display: 'flex', justifyContent: 'center'}}><CircularProgress /></div>
          <h4>Creating Sample Tutorial</h4>
        </div>
      </Backdrop>
    </div>
  );
}
