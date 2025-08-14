import React, { useState, useEffect } from "react";
import classNames from "classnames";

// @mui/material components
import { makeStyles } from "@mui/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
// @mui/icons-material
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/views/profilePage.js";

import image from "assets/img/landing-bg.jpg";

const useStyles = makeStyles(styles);

export default function ProfilePage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );

  const [loginType, setLoginType] = useState('');
  const [picture, setPicture] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  const [editButton, setEditButton] = useState(false);

  useEffect(() => {
    fetch(process.env.REACT_APP_AUTH_URL + '/getUserDetails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({'id': props.userId})
    }).then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    }).then(response => {
      setLoginType(response.loginType);
      setName(response.name);
      setEmail(response.email);
      // setRole(response.roles.split(",").length == 2?"both":response.roles);
      setRole(response.roles)
      response.picture?setPicture(response.picture):setPicture("https://ui-avatars.com/api/?name="+response.name[0]);
    })
    .catch(error => {
      console.error('Profile fetch error:', error);
      // Could add error state here if needed
    });
  }, []);
    

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
          <Card>
          <GridContainer className={classes.mainContainer} spacing={3}>

            {/* Left Panel */}
            <GridItem xs={12} sm={3} style={{display:'flex', alignItems: "center", justifyContent: 'center'}}>
            <div className={classes.profileDiv}>
              <img src={picture} alt="..." className={imageClasses} style={{width:"160px"}} onError={()=>setPicture("https://ui-avatars.com/api/?name="+name[0])}/>
              {/* <Button justIcon round style={{position: "absolute", "bottom":0, "right":0 }}><EditIcon/></Button> */}
            </div>
            </GridItem>

            {/* Right Panel */}
            <GridItem xs={12} sm={9} style={{display:'flex', alignItems: "center"}}>
              <div>
                <h4><b>Name: </b>{name}</h4>
                {email &&
                <h4><b>Email: </b>{email}</h4>
                }
                <h4><b>Role: </b>{role}</h4>
              </div>
            </GridItem>

          </GridContainer>
          </Card>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}
