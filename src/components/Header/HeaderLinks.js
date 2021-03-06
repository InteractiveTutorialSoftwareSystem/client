/*eslint-disable*/
import React from "react";
import { logout, useAuth } from "../../auth";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// core components
import Button from "components/CustomButtons/Button.js";

import styles, { sideHeaderLink } from "assets/jss/material-kit-react/components/headerLinksStyle.js";


export default function HeaderLinks(props) {
  var useStyles = makeStyles(styles)
  if (props.side == true) {
    useStyles = makeStyles(sideHeaderLink);
  }
  const classes = useStyles();
  const [logged] = useAuth();
  return (logged?
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Button
          href="/tutorial"
          color="transparent"
          className={classes.navLink}
        >
          Home
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="/profile"
          color="transparent"
          className={classes.navLink}
        >
          Profile
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          color="transparent"
          className={classes.navLink}
          onClick={() => {
            logout();
            window.location.href='/login';
          }}
        >
          Logout
        </Button>
      </ListItem>
    </List>:
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Button
          href="/register"
          color="transparent"
          className={classes.navLink}
        >
          Register
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="/login"
          color="transparent"
          className={classes.navLink}
        >
          Login
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="/researchstudylogin"
          color="transparent"
          className={classes.navLink}
        >
          Research Study
        </Button>
      </ListItem>
    </List>
  );
}
