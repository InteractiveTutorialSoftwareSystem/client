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
      'overflow':'auto', 
      'height':'100%'
    },
    markdownResult: {
      padding: "15px",
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
    clearSearchDiv: {
      "position":"absolute", 
      "right":"5%", 
      "top":"0",
      "backgroundColor": "lightgray",
      "lineHeight": "normal",
      "padding": "2px",
      "opacity": "0.7",
      "zIndex":"4",
      alignItems: "center",
      display: "flex",
      cursor: "pointer"

    },
    spinner: {
      "position":"absolute", 
      "right":"10px", 
      "bottom":"10px"
    },
    captionDiv: {
      position: "fixed",
      bottom: "64px",
      zIndex: 1000,
      left: "25%",
      right: "25%",
      width: "auto",
      textAlign: "center"
    },
    captionWrapper: {
      width: "100%",
      display: "flex",
      justifyContent: "center"
    },
    caption: {
      backgroundColor: "rgba(211,211,211,0.5)",
      width: "fit-content"
    },
    searchModal: {
      borderRadius: "6px",
      minHeight: "80vh",
      maxHeight: "80vh",
      // minWidth: "90vw",
      // maxWidth: "90vw"
    },
    modalHeader: {
      borderBottom: "none",
      paddingTop: "24px",
      paddingRight: "24px",
      paddingBottom: "0",
      paddingLeft: "24px",
      minHeight: "16.43px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
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
      height: "min-content"
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
    },
    modalFooterCenter: {
      marginLeft: "auto",
      marginRight: "auto",
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
      paddingLeft: "0px",
      paddingRight: "0px",
      position: "static"
    },
    backdrop: {
      zIndex: 1400,
      color: '#fff',
    },
    stackoverflowLoading: {
      justifyContent: "center",
      display: "flex",
      margin: "30px",
    }
  };
  
  export default codeStyle;
  