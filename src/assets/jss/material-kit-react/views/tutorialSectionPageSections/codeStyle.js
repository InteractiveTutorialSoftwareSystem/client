const codeStyle = {
  gridContainer: {
    height: "100%",
    padding: "0px",
    flexFlow: "column",
  },
  gridFooter: {
    position: "fixed",
    bottom: "0px",
    height: "64px",
  },
  markdownDiv: {
    'height':'100%',
    'padding':'15px'
  },
  markdownPreviewDiv: {
    'overflow':'auto', 
    'height':'100%',
    'padding':'15px',

  },
  editor: {
    "height":"100% !important", 
    "width":"100% !important"
  },
  editorPane: {
    "height":"100%", 
    "width":"100%"
  },
  codeButton: {
    "position":"absolute", 
    "right":"0",
    "bottom":"0"
  },
  bottomRightDiv: {
    "position":"absolute", 
    "right":"0", 
    "bottom":"0",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  bottomLeftDiv: {
    "position":"absolute", 
    "left":"0", 
    "bottom":"0",
    "backgroundColor": "lightgray",
    "fontSize":"12px",
    "lineHeight": "normal",
    "padding": "2px",
    "opacity": "0.7",
    "fontWeight": "bold",
    "zIndex":"4",
  },
  spinner: {
    "position":"absolute", 
    "right":"10px", 
    "bottom":"10px"
  },
  gridHeader: {
    width: "100%",
    padding: "0px 10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "fit-content",
  },
  gridHeaderButton: {
    display: "flex",
    alignItems: "center",
  },
  gridItem: {
    height: "calc(100vh - 49px - 52px)",
  },
  textArea: {
    height: "100% !important",
    width: "100% !important",
    overflowY: "scroll !important",
    resize: "none",
  },
  audioRecorder: {
    display: "none !important"
  },
  modal: {
    borderRadius: "6px",
  },
  searchModal: {
    borderRadius: "6px",
    minHeight: "80vh",
    maxHeight: "80vh",
    // minWidth: "90vw",
    // maxWidth: "90vw",
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
  upload: {
    display: "none"
  },
  searchResult: {
    paddingTop: "10px"
  },
  topFiveResult: {
    display: 'flex',
    flexWrap: 'wrap',
    listStyle: 'none',
    margin: 0,
  },
  chip: {
    marginRight: "5px"
  },
  listSubheader: {
    position: "static",
    paddingLeft: "0px",
    paddingRight: "0px"
  },
  backdrop: {
    zIndex: 1400,
    color: '#fff',
  },
  stackoverflowLoading: {
    justifyContent: "center",
    display: "flex",
    margin: "30px",
  },
  dropdownDetail: {
    display: "flex",
    alignItems: "center"
  },
  dropdownIcon: {
    marginRight: "5px"
  },
};

export default codeStyle;
