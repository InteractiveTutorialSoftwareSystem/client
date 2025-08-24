/*eslint-disable*/
import { useNavigate } from "react-router-dom";
import { logout, useAuth } from "../../auth";

// @mui/material components
import { makeStyles } from "@mui/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

// core components
import Button from "components/CustomButtons/Button.js";

import { sideHeaderLink } from "assets/jss/material-kit-react/components/headerLinksStyle.js";

// Create styles outside component to prevent re-generation
const useStyles = makeStyles(sideHeaderLink);

export default function HeaderLinks(props) {
  const navigate = useNavigate();
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
            // Clear any cached data
            localStorage.removeItem('REACT_TOKEN_AUTH_KEY');
            // Force a page refresh to clear all state
            window.location.href = '/login';
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
