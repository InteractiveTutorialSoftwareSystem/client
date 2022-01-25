import { container } from "assets/jss/material-kit-react.js";
import imagesStyle from "assets/jss/material-kit-react/imagesStyles.js";

const profilePageStyle = {
  container: {
    ...container,
    zIndex: "2",
    position: "relative",
    paddingTop: "10vh",
    color: "#FFFFFF",
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
  nested: {
    paddingLeft: "30px",
  },
  mainContainer: {
    padding: "30px", 
    maxHeight: "80vh", 
    overflow: "auto",
  },
  profileDiv: {
    display:"inline-block",
    position:"relative",
  },
  ...imagesStyle,
  main: {
    background: "#FFFFFF",
    position: "relative",
    zIndex: "3",
  },
  card: {
    margin: "10px 0",
    textTransform: "capitalize",
  },
  avatarDiv: {
    display: "flex",
  },
  authorNameSpan: {
    margin: "auto 10px",
  },
  noSectionText: {
    display: "flex",
    justifyContent: "center"
  },
  createTutorialButton: {
    display: "flex",
    flexDirection: "row-reverse"
  }
};

export default profilePageStyle;
