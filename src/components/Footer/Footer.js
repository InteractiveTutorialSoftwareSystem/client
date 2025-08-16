/*eslint-disable*/
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// material-ui core components
import { List, ListItem } from "@mui/material";
import { makeStyles } from "@mui/styles";

// @mui/icons-material
import Favorite from "@mui/icons-material/Favorite";

import styles from "assets/jss/material-kit-react/components/footerStyle.js";

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  const { whiteFont } = props;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont,
  });
  const aClasses = classNames({
    [classes.a]: true,
    [classes.footerWhiteFont]: whiteFont,
  });
  return (
    <footer className={footerClasses}>
      <div className={classes.containerFluid}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a
                href="/"
                className={classes.block}
                // target="_blank"
              >
                Interactive Tutorial System
              </a>
            </ListItem>
            {/* <ListItem className={classes.inlineBlock}>
              <a
                href="#"
                className={classes.block}
                // target="_blank"
              >
                About us
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a
                href="#"
                className={classes.block}
                // target="_blank"
              >
                Blog
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a
                href="#"
                className={classes.block}
                // target="_blank"
              >
                Licenses
              </a>
            </ListItem> */}
          </List>
        </div>
        <div className={classes.right}>
          &copy; {1900 + new Date().getYear()}
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  whiteFont: PropTypes.bool,
};
