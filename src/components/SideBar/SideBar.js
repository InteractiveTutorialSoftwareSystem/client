import React, { useState } from "react";

// @mui/material components
import { makeStyles } from "@mui/styles";

import Drawer from '@mui/material/Drawer';
import HeaderLinks from "components/Header/HeaderLinks.js";
import Button from "components/CustomButtons/Button.js";
import styles from "assets/jss/material-kit-react/components/sideBarStyle.js";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/icons-material/Menu";

const useStyles = makeStyles(styles);

export default function SideBar() {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={classes.container}>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerToggle}
      >
        <Menu />
      </IconButton>
      <Drawer
        variant="temporary"
        anchor={"left"}
        open={mobileOpen}
        classes={{
          paper: classes.drawerPaper,
        }}
        onClose={handleDrawerToggle}
      >
        <div className={classes.appResponsive}>
          <HeaderLinks side={true} />
        </div>
      </Drawer>
    </div>
  )
}

