import {
  primaryColor,
  secondaryColor,
  dangerColor,
  successColor,
  grayColor,
  darkGrayColor,
  lightGrayColor,
  defaultFont,
} from "assets/jss/material-kit-react.js";

const customInputStyle = {
  disabled: {
    "&:before": {
      borderColor: "transparent !important",
    },
  },
  underline: {
    "&:hover:not($disabled):before,&:before": {
      borderColor: grayColor + " !important",
      borderWidth: "1px !important",
    },
    "&:after": {
      borderColor: primaryColor,
      borderWidth: "2px !important",
    },
  },
  underlineError: {
    "&:after": {
      borderColor: dangerColor,
    },
  },
  underlineSuccess: {
    "&:after": {
      borderColor: successColor,
    },
  },
  whiteUnderline: {
    "&:hover:not($disabled):before,&:before": {
      borderColor: "#FFFFFF",
    },
    "&:after": {
      borderColor: "#FFFFFF",
    },
  },
  labelRoot: {
    ...defaultFont,
    color: grayColor + " !important",
    fontWeight: "500",
    fontSize: "0.875rem",
    lineHeight: "1.5",
    top: "10px",
    letterSpacing: "-0.01em",
    "& + $underline": {
      marginTop: "0px",
    },
  },
  labelRootError: {
    color: dangerColor + " !important",
  },
  labelRootSuccess: {
    color: successColor + " !important",
  },
  formControl: {
    margin: "0 0 17px 0",
    paddingTop: "27px",
    position: "relative",
    "& svg,& .fab,& .far,& .fal,& .fas,& .material-icons": {
      color: "#495057",
    },
  },
  input: {
    color: darkGrayColor,
    height: "unset",
    "&,&::placeholder": {
      fontSize: "0.875rem",
      ...defaultFont,
      fontWeight: "400",
      lineHeight: "1.5",
      opacity: "1",
    },
    "&::placeholder": {
      color: lightGrayColor,
    },
  },
  whiteInput: {
    "&,&::placeholder": {
      color: "#FFFFFF",
      opacity: "1",
    },
  },
};

export default customInputStyle;
