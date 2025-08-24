import {
  containerFluid,
  primaryColor,
  secondaryColor,
  infoColor,
  successColor,
  warningColor,
  dangerColor,
  roseColor,
  darkGrayColor,
  lightGrayColor,
  whiteColor,
  headingFont,
  transition,
  boxShadow,
  drawerWidth,
} from "assets/jss/material-kit-react.js";

const headerStyle = {
  appBar: {
    display: "flex",
    border: "0",
    borderRadius: "8px",
    padding: "1rem 0",
    marginBottom: "24px",
    color: darkGrayColor,
    width: "100%",
    backgroundColor: whiteColor,
    boxShadow:
      "0 2px 8px 0px rgba(0, 0, 0, 0.08), 0 1px 4px -1px rgba(0, 0, 0, 0.06)",
    transition: "all 200ms ease 0s",
    alignItems: "center",
    flexFlow: "row nowrap",
    justifyContent: "flex-start",
    position: "relative",
    zIndex: "unset",
  },
  absolute: {
    position: "absolute",
    zIndex: "1100",
  },
  fixed: {
    position: "fixed",
    zIndex: "1100",
  },
  container: {
    ...containerFluid,
    minHeight: "80px",
    flex: "1",
    alignItems: "center",
    justifyContent: "space-between",
    display: "flex",
    flexWrap: "nowrap",
  },
  flex: {
    flex: 1,
  },
  title: {
    lineHeight: "1.3 !important",
    fontSize: "2rem !important",
    fontWeight: "700 !important",
    ...headingFont,
    borderRadius: "8px",
    textTransform: "none",
    color: "#FFFFFF !important",
    padding: "12px 20px",
    letterSpacing: "-0.02em",
    textAlign: "center !important",
    flex: 1,
    display: "block !important",
    "&:hover,&:focus": {
      color: "#FFFFFF !important",
      background: "transparent",
      transform: "translateY(-1px)",
      transition: "all 200ms ease",
    },
  },
  appResponsive: {
    margin: "20px 10px",
  },
  primary: {
    backgroundColor: primaryColor,
    color: "#FFFFFF",
    boxShadow:
      "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(156, 39, 176, 0.46)",
  },
  info: {
    backgroundColor: infoColor,
    color: "#FFFFFF",
    boxShadow:
      "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(0, 188, 212, 0.46)",
  },
  success: {
    backgroundColor: successColor,
    color: "#FFFFFF",
    boxShadow:
      "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(76, 175, 80, 0.46)",
  },
  warning: {
    backgroundColor: warningColor,
    color: "#FFFFFF",
    boxShadow:
      "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(255, 152, 0, 0.46)",
  },
  danger: {
    backgroundColor: dangerColor,
    color: "#FFFFFF",
    boxShadow:
      "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(244, 67, 54, 0.46)",
  },
  rose: {
    backgroundColor: roseColor,
    color: "#FFFFFF",
    boxShadow:
      "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(233, 30, 99, 0.46)",
  },
  transparent: {
    backgroundColor: "transparent !important",
    boxShadow: "none",
    paddingTop: "25px",
    color: "#FFFFFF",
  },
  dark: {
    color: "#FFFFFF",
    backgroundColor: "#212121 !important",
    boxShadow:
      "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(33, 33, 33, 0.46)",
  },
  white: {
    border: "0",
    padding: "0.625rem 0",
    marginBottom: "20px",
    color: "#555",
    backgroundColor: "#fff !important",
    boxShadow:
      "0 4px 18px 0px rgba(0, 0, 0, 0.12), 0 7px 10px -5px rgba(0, 0, 0, 0.15)",
  },
  drawerPaper: {
    border: "none",
    borderRadius: "8px",
    transitionProperty: "top, bottom, width",
    transitionDuration: ".2s, .2s, .35s",
    transitionTimingFunction: "linear, linear, ease",
    width: "200px",
    maxWidth: "250px",
    ...boxShadow,
    position: "fixed",
    display: "block",
    top: "80px",
    height: "auto",
    maxHeight: "400px",
    left: "16px",
    right: "auto",
    visibility: "visible",
    overflowY: "auto",
    borderTop: "none",
    textAlign: "left",
    paddingRight: "0px",
    paddingLeft: "0px",
    backgroundColor: "#fff",
    ...transition,
  },
};

export default headerStyle;
