import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
// @mui/material components
import { makeStyles } from "@mui/styles";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";

import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from "components/Snackbar/SnackbarContent.js";

import styles from "assets/jss/material-kit-react/views/createTutorialPage.js";
import image from "assets/img/bg7.jpg";

const useStyles = makeStyles(styles);

export default function CreateTutorialPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(() => {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const navigate = useNavigate();
  const languageList = ["python", "java", "javascript"]
  const { ...rest } = props;
  
  const [tutorialTitle, setTutorialTitle] = useState("")
  const [languageChosen, setLanguageChosen] = useState(null)

  const [open, setOpen] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('Please try again');

  const handleLanguageChange = (e) => {
    setLanguageChosen(e)
  }

  const handleCreateButton = async () => {
    if (tutorialTitle == "") {
      setOpen(true)
      setErrorMsg("Enter tutorial name")
    } else if (languageChosen == null) {
      setOpen(true)
      setErrorMsg("Choose language")
    } else {
      const requestOptions = {
        method: 'POST',
        body: JSON.stringify({ 
          name: tutorialTitle,
          language: languageChosen,
          userid: props.userId
        })
      };
  
      fetch(process.env.REACT_APP_TUTORIAL_URL + '/tutorial/create', requestOptions)
        .then(response => response.json())
        .then(data => navigate("/tutorial/overview/" + data.id))
    }
    
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
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
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardBody className={classes.cardBody}>
                    <h4>Create Tutorial</h4>
                    <CustomInput
                      labelText="Tutorial Name"
                      id="float"
                      formControlProps={{
                          fullWidth: true
                      }}
                      inputProps={{
                        defaultValue: tutorialTitle,
                        onChange: (e) => {
                          setTutorialTitle(e.target.value)
                        }
                      }}
                    />
                    <CustomDropdown
                      buttonText={languageChosen ? languageChosen : "Choose Language"}
                      buttonProps={{
                        fullWidth: true
                      }}
                      dropdownList={languageList}
                      onClick={(e) => {handleLanguageChange(e)}}
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button color="primary" onClick={handleCreateButton}>
                      Create
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
      </div>
    </div>
  );
}

CreateTutorialPage.propTypes = {
  userId: PropTypes.string.isRequired
};
