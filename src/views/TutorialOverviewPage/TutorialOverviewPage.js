import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { format, isAfter, parseISO } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
// @mui/material components
import { makeStyles } from "@mui/styles";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import Tooltip from "@mui/material/Tooltip";
import CustomInput from "components/CustomInput/CustomInput.js";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import styled from "styled-components";

import styles from "assets/jss/material-kit-react/views/tutorialOverviewPage.js";
import { infoColor, grayColor } from "assets/jss/material-kit-react.js";

// Modal
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import IconButton from "@mui/material/IconButton";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import DeleteIcon from '@mui/icons-material/Delete';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import CodeIcon from '@mui/icons-material/Code';
import Check from "@mui/icons-material/Check";
import Close from "@mui/icons-material/Close";

import InfoIcon from '@mui/icons-material/Info';
import image from "assets/img/bg7.jpg";

const useStyles = makeStyles(styles);

const Container = styled.div`
  border: 1px solid ${grayColor};
  border-radius: 3px;
  padding: 8px;
`;

const Item = styled.div`
  padding: 8px;
  border: 1px solid ${grayColor};
  border-radius: 3px;
  margin-bottom: 8px;
`;

// Transition component removed as it's not used
// const Transition = React.forwardRef((props, ref) => {
//   return <Slide direction="down" ref={ref} {...props} />;
// });
// Transition.displayName = 'Transition';

export default function TutorialOverviewPage(props) {
  const [unorderedSequence, setUnorderedSequence] = useState(null);
  const [createMenuAnchor, setCreateMenuAnchor] = useState(null);
  const [languageMenuAnchor, setLanguageMenuAnchor] = useState(null);
  const [orderedSequence, setOrderedSequence] = useState(null);
  
  const classes = useStyles();
  const { ...rest } = props;
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [tutorialName, setTutorialName] = useState("")

  const languageList = ["python", "java", "javascript"]
  const [languageChosen, setLanguageChosen] = useState(null)

  const [deleteTutorialModal, setDeleteTutorialModal] = useState(false);
  const [deleteTutorialSectionModal, setDeleteTutorialSectionModal] = useState(false);
  const [showTutorialModal, setShowTutorialModal] = useState(false);
  const [deleteTutorialSection, setDeleteTutorialSection] = useState(null);
  const [startDatetime, setStartDatetime] = useState("");
  const [endDatetime, setEndDatetime] = useState("");
  const [withoutEndDate, setWithoutEndDate] = useState(false)
  const [isHidden, setIsHidden] = useState(null)
  const [dateErrorMessage, setDateErrorMessage] = useState("")

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLanguageChange = (e) => {
    setLanguageChosen(e)
  }

  const onDragEnd = result => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }

    const arr = Array.from(orderedSequence);
    const [remove] = arr.splice(source.index, 1);
    arr.splice(destination.index, 0, remove);
    setOrderedSequence(arr)
  }

  useEffect(() => {
    if (id) {
      const requestOptions = {
        method: 'GET',
      };

      fetch(process.env.REACT_APP_TUTORIAL_URL + '/tutorial_section/get/tutorial_id/' + id, requestOptions)
        .then(response => response.json())
        .then(data => {
          setUnorderedSequence(data.tutorial_section);
        });

    }
  }, [id])

  useEffect(() => {
    if (id || unorderedSequence) {
      const requestOptions = {
        method: 'GET',
      };

      fetch(process.env.REACT_APP_TUTORIAL_URL + '/tutorial/get/' + id, requestOptions)
      .then(response => response.json())
      .then(data => {
        setTutorialName(data.name)
        setLanguageChosen(data.language)
        if (unorderedSequence) {
          const result = []
          const sequence = JSON.parse(data.sequence);
          for (const seq of sequence){
            for (const elem of unorderedSequence) {
              if (elem.id == seq) {
                result.push(elem)
              }
            }
          }
          setOrderedSequence(result)
        }
        const dateTimeNow = new Date();
        if (data.start_date != null) {
          if (isAfter(dateTimeNow, parseISO(data.start_date)) && data.end_date == null) {
            setIsHidden(false)
          } else if (isAfter(dateTimeNow, parseISO(data.start_date)) && isAfter(parseISO(data.end_date), dateTimeNow)) {
            setIsHidden(false)
          } else {
            setIsHidden(true)
          }
        } else {
          setIsHidden(true)
        }
      })
    }
  }, [id, unorderedSequence])

  const handleCreateSection = (value) => {
    let sectionType = "Question";
    if (value.props.children[1] === "Create Code") {
      sectionType = "Code"
    }

    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({ 
        name: "Untitled Section",
        tutorial_id: id,
        tutorial_type: sectionType,
      })
    };

    fetch(process.env.REACT_APP_TUTORIAL_URL + '/tutorial_section/create', requestOptions)
      .then(response => response.json())
      .then(data => navigate("/tutorial/section/edit/" + data.id, {
        state: {
          tutorial_type: sectionType,
        }
      }));
  }

  const handleSave = () => {
    // handle sequence save
    if (orderedSequence) {
      const array_sequence = orderedSequence.map((elem) => elem.id)
      const requestOptions = {
        method: 'POST',
        body: JSON.stringify({
          sequence: array_sequence
        })
      };
  
      fetch(process.env.REACT_APP_TUTORIAL_URL + '/tutorial/update/' + id, requestOptions)
        .then(response => response.json())
        .then(() => {
          setSuccessMsg("Tutorial sequence has been saved")
          setSnackbarOpen(true)
          setSuccessMsg("")
        })
    } else {
      setErrorMsg("There is no tutorial section to save")
      setSnackbarOpen(true)
    }
  }

  const handleTutorialDelete = () => {
    const requestOptions = {
      method: 'GET',
    };

    fetch(process.env.REACT_APP_TUTORIAL_URL + '/tutorial/delete/' + id, requestOptions)
      .then(response => {
        if(response.status == 200){
          navigate("/tutorial")
        }
      })
  }

  const handleDeleteTutorialSection = (tutorialSection) => {
    setDeleteTutorialSectionModal(true);
    setDeleteTutorialSection(tutorialSection)
  }

  const handleTutorialSectionDeleteButton = () => {
    const requestOptions = {
      method: 'GET',
    };

    fetch(process.env.REACT_APP_TUTORIAL_URL + '/tutorial_section/delete/' + deleteTutorialSection.id, requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data.message == "success") {
          window.location.reload()
        }
      })
  }

  const handleClose = (event, reason) => {
    // snackbar
    if (reason === 'clickaway') {
      setErrorMsg("");
      setSuccessMsg("");
      return;
    }
    setSnackbarOpen(false);
    setErrorMsg("");
    setSuccessMsg("");
  };

  const handleShowTutorial = () => {
    setStartDatetime(format(new Date(), "yyyy-MM-dd'T'HH:mm"));
    setEndDatetime(format(new Date(), "yyyy-MM-dd'T'HH:mm"));
    setShowTutorialModal(true);
  }

  const handleSaveShowTutorialDate = () => {
    if (!withoutEndDate) {
      if (isAfter(parseISO(endDatetime), parseISO(startDatetime))) {
        setDateErrorMessage("");

        const requestOptions = {
          method: 'POST',
          body: JSON.stringify({ 
            startDatetime: formatInTimeZone(parseISO(startDatetime), 'Asia/Singapore', "yyyy-MM-dd'T'HH:mm:ssXXX"),
            endDatetime: formatInTimeZone(parseISO(endDatetime), 'Asia/Singapore', "yyyy-MM-dd'T'HH:mm:ssXXX"),
          })
        };
    
        fetch(process.env.REACT_APP_TUTORIAL_URL + '/tutorial/update/' + id, requestOptions)
          .then(response => response.json())
          .then(() => {
            setIsHidden(false);
            setShowTutorialModal(false);
          });

      } else {
        setDateErrorMessage("End date must be later than start date")
      }
    } else {
      const requestOptions = {
        method: 'POST',
        body: JSON.stringify({ 
          startDatetime: formatInTimeZone(parseISO(startDatetime), 'Asia/Singapore', "yyyy-MM-dd'T'HH:mm:ssXXX"),
          endDatetime: null
        })
      };
  
      fetch(process.env.REACT_APP_TUTORIAL_URL + '/tutorial/update/' + id, requestOptions)
        .then(response => response.json())
        .then(() => {
          setIsHidden(false);
          setShowTutorialModal(false);
        });
    }
  }
  
  const handleHideTutorial = () => {
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({ 
        startDatetime: null,
        endDatetime: null
      })
    };

    fetch(process.env.REACT_APP_TUTORIAL_URL + '/tutorial/update/' + id, requestOptions)
      .then(response => response.json())
      .then(() => {
        setIsHidden(true);
      });
  }

  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="Interactive Tutorial System"
        leftLinks={<HeaderLinks />}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem>
              <Card>
                <CardBody>
                  <div className={classes.titleContainer}>
                    <h2>
                      {tutorialName}
                      {isHidden && <VisibilityOffIcon className={classes.visibilityIcon} />}
                    </h2>
                    <div>
                      <Button color="danger" onClick={() => setDeleteTutorialModal(true)}>
                        Delete tutorial
                      </Button>
                      <Link to="/tutorial">
                        <Button>
                          Back
                        </Button>
                      </Link>
                    </div>
                  </div>

                  <GridContainer>
                    <GridItem xs={12} sm={6} className={classes.cardSubHeading}>
                      <h4 style={{ marginRight: "10px" }}>Language used</h4>
                      <Button 
                        onClick={(e) => setLanguageMenuAnchor(e.currentTarget)}
                        style={{textTransform: 'none'}}
                      >
                        {languageChosen ? languageChosen : "Choose Language"}
                      </Button>
                      <Menu
                        anchorEl={languageMenuAnchor}
                        open={Boolean(languageMenuAnchor)}
                        onClose={() => setLanguageMenuAnchor(null)}
                        keepMounted
                      >
                        {languageList.map((language) => (
                          <MenuItem 
                            key={language}
                            onClick={() => {
                              handleLanguageChange(language); 
                              setLanguageMenuAnchor(null);
                            }}
                          >
                            {language}
                          </MenuItem>
                        ))}
                      </Menu>
                    </GridItem>
                  </GridContainer>
                  <GridContainer className={classes.sequenceHeaderContainer}>
                    <GridItem xs={12} sm={6} className={classes.tutorialSequenceHeaderLeft}>
                      <h5 className={classes.cardSubHeading}>
                        Tutorial Sequence
                        <Tooltip
                          id="tooltip-right"
                          title={
                            <span>
                              <p>Move sequence by drag and drop</p>
                              <p>Playback will be based on this sequence (top-down)</p>
                            </span>
                          }
                          placement="right"
                          classes={{ tooltip: classes.tooltip }}
                        >
                          <InfoIcon style={{ color: infoColor, marginLeft: "10px" }}/>
                        </Tooltip>
                      </h5>
                    </GridItem>
                    <GridItem xs={12} sm={6} className={classes.tutorialSequenceHeaderRight}>
                      <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                        {orderedSequence
                          ? (
                            <Link to={"/tutorial/" + id + "/1"} target="_blank">
                              <Button>
                                Preview
                              </Button>
                            </Link>
                          ) : (
                            <Button disabled>
                              Preview
                            </Button>
                          )
                        }
                        <Button 
                          color="primary" 
                          onClick={(e) => setCreateMenuAnchor(e.currentTarget)}
                        >
                          Create Section
                        </Button>
                      </div>
                      <Menu
                        anchorEl={createMenuAnchor}
                        open={Boolean(createMenuAnchor)}
                        onClose={() => setCreateMenuAnchor(null)}
                        keepMounted
                      >
                        <MenuItem onClick={(e) => {handleCreateSection(e); setCreateMenuAnchor(null);}}>
                          <CodeIcon style={{marginRight: 8}}/>
                          Create Code
                        </MenuItem>
                        <MenuItem onClick={(e) => {handleCreateSection(e); setCreateMenuAnchor(null);}}>
                          <QuestionAnswerIcon style={{marginRight: 8}}/>
                          Create Question
                        </MenuItem>
                      </Menu>
                    </GridItem>
                  </GridContainer>

                  <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="d">
                      {provided => (
                        <Container ref={provided.innerRef} {...provided.droppableProps}>
                          { orderedSequence ?
                            (orderedSequence.map((t, i) => (
                              <Draggable draggableId={t.id} index={i} key={t.id} >
                                {p => (
                                  <div>
                                    <Item
                                      ref={p.innerRef}
                                      {...p.draggableProps}
                                      {...p.dragHandleProps}
                                      key={t.id}
                                      className={classes.tutorialSectionItem}
                                    >
                                      <div style={{ display: "flex", alignItems: "center"}}>
                                        <a
                                          onClick={() => navigate("/tutorial/section/edit/" + t.id)}
                                          style={{color: "inherit", cursor: "pointer"}}
                                        >
                                          {t.name}
                                        </a>
                                        {t.tutorial_type == "Code"
                                          ? (<CodeIcon className={classes.tutorialSectionIcon} />)
                                          : (<QuestionAnswerIcon className={classes.tutorialSectionIcon} />)
                                        }
                                      </div>
                                      <IconButton
                                        color="inherit"
                                        className={classes.tutorialSectionButton}
                                        onClick={() => handleDeleteTutorialSection(t)}
                                      >
                                        <DeleteIcon />
                                      </IconButton>
                                    </Item>
                                  </div>
                                )}
                              </Draggable>
                            )))
                            : "No section yet"
                          }
                          {provided.placeholder}
                        </Container>
                      )}
                    </Droppable>
                  </DragDropContext>
                  <GridItem className={classes.visibilityButtonContainer}>
                    {isHidden ? (
                      <Button onClick={() => handleShowTutorial()} color="primary">
                        Release Tutorial
                      </Button>
                    ) : (
                      <Button onClick={() => handleHideTutorial()} color="primary">
                        Hide Tutorial
                      </Button>
                    )}
                    <Button color="primary" onClick={() => handleSave()}>
                      Save Sequence
                    </Button>
                  </GridItem>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>

          {/* Delete tutorial modal */}
          <Modal open={deleteTutorialModal} onClose={() => setDeleteTutorialModal(false)}>
            <Box style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              backgroundColor: '#fff',
              border: '1px solid #ccc',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
              padding: '32px'
            }}>
              <div id="classic-modal-slide-title" className={classes.modalHeader}>
                <h5>Do you want to delete this tutorial?</h5>
              </div>
              <div className={classes.modalFooter + " " + classes.modalFooterCenter} style={{marginTop: '20px'}}>
                <Button onClick={() => setDeleteTutorialModal(false)}>No</Button>
                <Button onClick={() => handleTutorialDelete()} color="danger">Delete</Button>
              </div>
            </Box>
          </Modal>

          {/* Delete tutorial section modal */}
          <Modal open={deleteTutorialSectionModal} onClose={() => setDeleteTutorialSectionModal(false)}>
            <Box style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              backgroundColor: '#fff',
              border: '1px solid #ccc',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
              padding: '32px'
            }}>
              <div id="classic-modal-slide-title" className={classes.modalHeader}>
                {deleteTutorialSection
                    ? <h5>Do you want to delete {deleteTutorialSection.name}?</h5>
                    : null
                  }
              </div>
              <div className={classes.modalFooter + " " + classes.modalFooterCenter} style={{marginTop: '20px'}}>
                <Button onClick={() => {setDeleteTutorialSectionModal(false); setDeleteTutorialSection(null);}}>No</Button>
                <Button onClick={() => handleTutorialSectionDeleteButton()} color="danger">Delete</Button>
              </div>
            </Box>
          </Modal>

          {/* Show Tutorial Modal */}
          <Modal open={showTutorialModal} onClose={() => setShowTutorialModal(false)}>
            <Box style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '90%',
              maxWidth: '800px',
              maxHeight: '90vh',
              backgroundColor: '#fff',
              border: '1px solid #ccc',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
              overflow: 'auto'
            }}>
              <div id="classic-modal-slide-title" className={classes.modalHeader}>
                <IconButton
                  onClick={() => setShowTutorialModal(false)}
                  style={{ position: 'absolute', right: 8, top: 8 }}
                >
                  <Close />
                </IconButton>
              </div>
              <div id="modal-slide-description" className={classes.modalBody}>
              <GridContainer>
                <GridItem xs={12} sm={6}>
                  <CustomInput
                    labelText="Start Date"
                    id="start-datetime"
                    formControlProps={{
                      fullWidth: true,
                      className: classes.dateTime
                    }}
                    inputProps={{
                      type: "datetime-local",
                      value: startDatetime,
                      onChange: (e) => setStartDatetime(format(parseISO(e.target.value), "yyyy-MM-dd'T'HH:mm"))
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={6}>
                  <CustomInput
                    labelText="End Date"
                    id="end-datetime"
                    formControlProps={{
                      fullWidth: true,
                      className: classes.dateTime
                    }}
                    inputProps={{
                      type: "datetime-local",
                      value: endDatetime,
                      onChange: (e) => setEndDatetime(format(parseISO(e.target.value), "yyyy-MM-dd'T'HH:mm")),
                      disabled: withoutEndDate
                    }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        tabIndex={-1}
                        onClick={() => setWithoutEndDate(!withoutEndDate)}
                        checked={withoutEndDate}
                        checkedIcon={<Check className={classes.checkedIcon} />}
                        icon={<Check className={classes.uncheckedIcon} />}
                        classes={{ checked: classes.checked }}
                      />
                    }
                    classes={{ label: classes.label }}
                    label="Without end date"
                  />
                </GridItem>
              </GridContainer>
              <p style={{color: "red"}}>{dateErrorMessage}</p>
              </div>
              <div className={classes.modalFooter} style={{padding: '20px'}}>
                <Button onClick={() => {setShowTutorialModal(false);}}>Cancel</Button>
                <Button onClick={() => handleSaveShowTutorialDate()} color="success">Show</Button>
              </div>
            </Box>
          </Modal>

          {/* Error message for save sequence with no tutorial section */}
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={handleClose}
          >
            <SnackbarContent
              message={
                <span>
                  {errorMsg ? errorMsg : successMsg}
                </span>
              }
              color={errorMsg ? "danger" : "success"}
            />
          </Snackbar>
          
        </div>
      </div>
    </div>
  );
}
