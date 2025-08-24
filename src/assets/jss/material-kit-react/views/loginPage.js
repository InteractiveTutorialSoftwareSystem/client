import { 
  container, 
  grayColor, 
  darkGrayColor,
  lightGrayColor,
  whiteColor,
  primaryColor,
  secondaryColor,
  defaultFont,
  headingFont 
} from "assets/jss/material-kit-react.js";

const signupPageStyle = {
  container: {
    ...container,
    zIndex: "2",
    position: "relative",
    paddingTop: "3rem",
    color: whiteColor,
    paddingBottom: "3rem",
  },
  cardHidden: {
    opacity: "0",
    transform: "translate3d(0, -60px, 0)",
  },
  pageHeader: {
    minHeight: "100vh",
    height: "auto",
    display: "flex",
    position: "relative",
    margin: "0",
    padding: "0",
    border: "0",
    alignItems: "center",
    justifyContent: "center",
    "&:before": {
      background: "rgba(0, 0, 0, 0.5)",
    },
    "&:before,&:after": {
      position: "absolute",
      zIndex: "1",
      width: "100%",
      height: "100%",
      display: "block",
      left: "0",
      top: "0",
      content: '""',
    },
    "& footer li a,& footer li a:hover,& footer li a:active": {
      color: "#FFFFFF",
    },
    "& footer": {
      position: "absolute",
      bottom: "0",
      width: "100%",
    },
  },
  form: {
    margin: "0",
  },
  cardHeader: {
    width: "auto",
    textAlign: "center",
    marginLeft: "24px",
    marginRight: "24px",
    marginTop: "-48px",
    marginBottom: "24px",
    borderRadius: "12px",
    padding: "24px",
    background: "linear-gradient(135deg, " + primaryColor + ", " + secondaryColor + ")",
    boxShadow: "0 8px 16px -4px rgba(212, 165, 116, 0.25), 0 4px 12px 0px rgba(0, 0, 0, 0.08)",
  },
  socialIcons: {
    maxWidth: "24px",
    marginTop: "0",
    width: "100%",
    transform: "none",
    left: "0",
    top: "0",
    height: "100%",
    lineHeight: "41px",
    fontSize: "20px",
  },
  divider: {
    marginTop: "30px",
    marginBottom: "0px",
    textAlign: "center",
  },
  cardFooter: {
    paddingTop: "0rem",
    border: "0",
    borderRadius: "12px",
    justifyContent: "center !important",
  },
  socialLine: {
    marginTop: "1rem",
    textAlign: "center",
    padding: "0",
  },
  inputIconsColor: {
    color: "#495057",
  },
  backdrop: {
    zIndex: 1400,
    color: '#fff',
  },
  gridContainer: {
    justifyContent: "center !important",
    marginLeft: "0 !important",
    marginRight: "0 !important",
  },
  inputLabel: {
    display: 'block',
    marginBottom: '0.5rem',
    color: grayColor,
    fontSize: '0.875rem',
    fontWeight: '500',
    ...defaultFont,
    letterSpacing: '-0.01em'
  },
};

export default signupPageStyle;
