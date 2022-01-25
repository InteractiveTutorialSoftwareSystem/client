const tutorialStyle = {
  gridContainer: {
    height: "100%",
    padding: "0px",
    flexFlow: "column",
  },
  gridHeader: {
    position: "fixed",
    background: "#FFFFFF",
    top: "0",
    width: "100%",
    padding: "0px 10px",
    height: "55px",
    display: "flex",
    alignItems: "center",
  },
  gridHeaderLeft: {
    display: "flex",
    alignItems: "center",
  },
  gridHeaderCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  gridHeaderRight: {
    display: "flex",
    justifyContent: "flex-end",
  },
  textOverflow: {
    whiteSpace: "nowrap", 
    overflow: "hidden", 
    textOverflow: "ellipsis"
  },
  textOverflowTitle: {
    flex: 1,
    whiteSpace: "nowrap", 
    overflow: "hidden", 
    textOverflow: "ellipsis",
    margin: "0 10px"
  },
  captionOn: {
    borderBottom: "1px solid #9C27B0",
    display: "flex",
    alignItems: "center"
  },
  topRightIcon: {
    display: "flex"
  },
  dropdownDetail: {
    display: "flex",
    alignItems: "center"
  },
  dropdownIcon: {
    marginRight: "5px"
  },
  gridHeaderCenterSubWrapper: {
    display: "flex",
    alignItems: "center",
    whiteSpace: "nowrap",
    overflow: "hidden"
  },
  icon: {
    flex: "0 0 auto"
  }
};

export default tutorialStyle;
