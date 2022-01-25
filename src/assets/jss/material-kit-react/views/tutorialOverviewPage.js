import { container } from "assets/jss/material-kit-react.js";
import {
  primaryColor,
} from "assets/jss/material-kit-react.js";

const tutorialOverviewStyle = {
  container: {
    ...container,
    zIndex: "2",
    position: "relative",
    paddingTop: "20vh",
    color: "#FFFFFF",
    paddingBottom: "200px",
  },
  cardHidden: {
    opacity: "0",
    transform: "translate3d(0, -60px, 0)",
  },
  pageHeader: {
    minHeight: "100vh",
    height: "auto",
    display: "inherit",
    position: "relative",
    margin: "0",
    padding: "0",
    border: "0",
    alignItems: "center",
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
  cardButton: {
    textAlign: "right",
    padding: "0.9375rem 1.875rem",
  },
  cardBody: {
    textAlign: "center",
  },
  cardSubHeading: {
    display: "flex",
    alignItems: "center",
  },
  infoButton: {
    padding: "0px !important",
  },
  sequenceHeaderContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  tutorialSequenceHeaderLeft: {
    display: "flex",
    paddingRight: "0px"
  },
  tutorialSequenceHeaderRight: {
    display: "flex",
    justifyContent: "flex-end",
    paddingLeft: "0px"
  },
  titleContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  modal: {
    borderRadius: "6px",
    width: "-webkit-fill-available"
  },
  modalHeader: {
    borderBottom: "none",
    paddingTop: "24px",
    paddingRight: "24px",
    paddingBottom: "0",
    paddingLeft: "24px",
    minHeight: "16.43px",
  },
  modalTitle: {
    margin: "0",
    lineHeight: "1.42857143",
  },
  modalCloseButton: {
    color: "#999999",
    marginTop: "-12px",
    WebkitAppearance: "none",
    padding: "0",
    cursor: "pointer",
    background: "0 0",
    border: "0",
    fontSize: "inherit",
    opacity: ".9",
    textShadow: "none",
    fontWeight: "700",
    lineHeight: "1",
    float: "right",
  },
  modalClose: {
    width: "16px",
    height: "16px",
  },
  modalBody: {
    paddingTop: "24px",
    paddingRight: "24px",
    paddingBottom: "16px",
    paddingLeft: "24px",
    position: "relative",
  },
  modalFooter: {
    padding: "15px",
    textAlign: "right",
    paddingTop: "0",
    margin: "0",
    border: "0",
  },
  modalFooterCenter: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  tutorialSectionItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  tutorialSectionButton: {
    paddingTop: "0px !important",
    paddingBottom: "0px !important",
  },
  tutorialSectionIcon: {
    marginLeft: "5px"
  },
  dropdownDetail: {
    display: "flex",
    alignItems: "center"
  },
  dropdownIcon: {
    marginRight: "5px"
  },
  visibilityButtonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "0px"
  },
  dateTime: {
    '& label.Mui-focused': {
      color: '#9c27b0',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#9c27b0',
    },
  },
  checkedIcon: {
    width: "20px",
    height: "20px",
    border: "1px solid rgba(0, 0, 0, .54)",
    borderRadius: "3px",
  },
  uncheckedIcon: {
    width: "0px",
    height: "0px",
    padding: "9px",
    border: "1px solid rgba(0, 0, 0, .54)",
    borderRadius: "3px",
  },
  label: {
    cursor: "pointer",
    paddingLeft: "0",
    fontSize: "14px",
    lineHeight: "1.428571429",
    fontWeight: "400",
    display: "inline-flex",
    transition: "0.3s ease all",
    letterSpacing: "unset",
  },
  checked: {
    color: primaryColor + "!important",
  },
  visibilityIcon: {
    marginLeft: "10px"
  }
};

export default tutorialOverviewStyle;
