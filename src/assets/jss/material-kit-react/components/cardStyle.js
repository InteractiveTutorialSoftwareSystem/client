import {
  whiteColor,
  darkGrayColor,
} from "assets/jss/material-kit-react.js";

const cardStyle = {
  card: {
    border: "0",
    marginBottom: "2rem",
    marginTop: "2rem",
    borderRadius: "12px",
    color: darkGrayColor,
    background: whiteColor,
    width: "100%",
    boxShadow:
      "0 4px 12px 0 rgba(0, 0, 0, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.06)",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    minWidth: "0",
    wordWrap: "break-word",
    fontSize: "0.875rem",
    transition: "all 250ms cubic-bezier(0.4, 0, 0.2, 1)",
  },
  cardPlain: {
    background: "transparent",
    boxShadow: "none",
  },
  cardCarousel: {
    overflow: "hidden",
  },
};

export default cardStyle;
