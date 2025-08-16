import { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
// @mui/material components
import { makeStyles } from "@mui/styles";
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import Hidden from '@mui/material/Hidden';
// core components
import CustomInput from "components/CustomInput/CustomInput.js";
import SideBar from "components/SideBar/SideBar.js";
import Button from "components/CustomButtons/Button.js";
// material ui icon
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import TextRotateUpIcon from '@mui/icons-material/TextRotateUp';

import QuestionSection from './Sections/QuestionSection.js';
import CodeSection from './Sections/CodeSection.js';

import styles from "assets/jss/material-kit-react/views/tutorialSectionPage.js";

import sampleData from './Sections/sample.json'
const {sampleQuestion} = sampleData;

// tour
import Joyride, {STATUS} from 'react-joyride';

const useStyles = makeStyles(styles);

export default function TutorialPage(props) {
  const { id } = useParams();
  const classes = useStyles();
  // Props destructured for component usage
  const navigate = useNavigate();

  const layoutRef = useRef(null);

  const [tourStart, setTourStart] = useState(false);
  const [preTourLayout, setPreTourLayout] = useState(null);
  const [refreshedLayout, setRefreshedLayout] = useState();
  const [typeChosen, setTypeChosen] = useState(null);
  const [tutorialId, setTutorialId] = useState("");
  const [tutorialType, setTutorialType] = useState("");
  const [languageChosen, setLanguageChosen] = useState("");
  const [iframePy, setIframePy] = useState("3")
  const [version, setVersion] = useState("");
  const [description, setDescription] = useState("");
  const [ide, setIde] = useState("");
  const [ideEditted, setIdeEditted] = useState("");
  const [input, setInput] = useState("")
  const [inputEditted, setInputEditted] = useState("")
  const [question, setQuestion] = useState(null);
  const [tutorialSectionTitle, setTutorialSectionTitle] = useState("Untitled Section");
  const [filename, setFilename] = useState("");
  const [editTitleButton, setEditTitleButton] = useState(false);
  const [sectionSequence, setSectionSequence] = useState(null);
  const [recordingFound, setRecordingFound] = useState(false);
  const [recordStartState, setRecordStartState] = useState(false);

  const steps = [
    {
      content: <h4>Welcome to the Interactive Tutorial System Author Tour.</h4>,
      target: 'body',
      placement: 'center',
      placementBeacon : 'top',
      spotlightClicks: false,
    },
    {
      content: <h4>Click the <EditIcon style={{ fontSize: "1.125rem" }}/> icon to update the tutorial section name.</h4>,
      target: '#section-name-div'
    },
    {
      content: <h4>You can upload a markdown (.md) file for this tutorial section&apos;s description.</h4>,
      target: '#upload-button'
    },
    {
      content: <h4>Alternatively, you can directly type text in the <b>Description</b> tab. You can then preview the description in the <b>Preview</b> tab.</h4>,
      target: '.dock.dock-top',
      placement: 'right'
    },
    {
      content: <h4>To aid in learning, do add relevant images and ensure that these images are presented near relevant text.</h4>,
      target: '.dock.dock-top',
      placement: 'right'
    },
    {
      content: <h4>Scrolling and text selection will be recorded. Utilize these to better direct the learner&apos;s attention.</h4>,
      target: '.dock.dock-top',
      placement: 'right'
    },
    {
      content: <h4>Before you start recording, you can resize and maximize the panels, close unnecessary tabs and drag tabs around. These interactions will also be recorded during recording.</h4>,
      target: '.dock-layout',
      placement: 'top-end',
      hideBackButton: true,
    },
    {
      content: <h4>You can save and load your own customized layout for the rest of this tutorial. You can also restore to the default layout.</h4>,
      target: '#save-load-layout-buttons',
    },
    {
      content: <h4>You can search for relevant questions from Stack Overflow. Suggested Threads will also appear when there is an error in the <b>Output</b> tab.</h4>,
      target: '#search-button',
    },
    {
      content: <h4>Once you&apos;re all set, click this button to start recording!</h4>,
      target: '#start-recording-button',
      spotlightClicks: false,
    },
    {
      content: <h4>Recording with audio is recommended. Do enable your microphone for audio recording. If no microphone is detected, audio will not be recorded.</h4>,
      target: '#start-recording-button',
      spotlightClicks: false,
    },
    {
      content: <h4>When you have finished recording, you can preview the recording here.</h4>,
      target: '#preview-button',
      spotlightClicks: false,
    },
    {
      content: 
      <div>
        <h4>This brings us to the end of the tour.</h4>
        <h5>To aid in learning, do refer to this <a href="https://waterbearlearning.com/mayers-principles-multimedia-learning/" target="_blank" rel="noreferrer"><u>link</u></a> for more information on Mayer&apos;s Principles of Multimedia Learning.</h5>
      </div>,
      target: 'body',
      placement: 'center',
      placementBeacon : 'top',
      spotlightClicks: false,
    }
  ]

  const setTourStartState = () => {
    // Set to default layout for the tour
    setPreTourLayout(layoutRef.current.saveLayout());
    layoutRef.current.loadLayout(refreshedLayout);
  }

  useEffect(() => {
    if (id) {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      };

      fetch(process.env.REACT_APP_TUTORIAL_URL + '/tutorial_section/get/' + id, requestOptions)
        .then(response => response.json())
        .then(data => {
          setTutorialType(data.tutorial_type)
          setLanguageChosen(data.language)
          if (data.language == 'java') {
            setIframePy('java');
          }
          setVersion(data.version);
          setTypeChosen(data.tutorial_type)
          setTutorialSectionTitle(data.name)
          setFilename(data.name.replace(/[^A-Z0-9]/ig, '_').toLowerCase())
          setTutorialId(data.tutorial_id)
          setSectionSequence(data.sequence)
          if (data.question) {
            const questionData = JSON.parse(data.question)
            setQuestion(questionData)
          }
          if (data.code_content) {
            setIde(data.code_content)
          }
          if (data.code_input) {
            setInput(data.code_input)
          }
          if (data.description) {
            setDescription(data.description)
          }
          if (data.recording != null) {
            setRecordingFound(true);
          }
          setRefreshedLayout({
            dockbox: {
              mode: 'horizontal',
              children: [
                {
                  size: 400,
                  tabs: [{id: 'description'}, {id: 'description-preview'}],
                },
                {
                  mode: 'vertical',
                  size: 600,
                  children: [
                    {
                      size: 600,
                      tabs: [{id: 'editor'}]
                    },
                    {
                      mode: 'horizontal',
                      size: 400,
                      children: [
                        {
                          size: 100,
                          tabs: [{id: 'input'}]
                        },
                        {
                          tabs: [{id: 'output'}, {id: data.language+'-tutor'}]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          });
        });
    }
  }, [id])

  const handleJoyrideCallback = (data) => {
    // Code for tour
    const { status } = data;
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setTourStart(false);
      layoutRef.current.loadLayout(preTourLayout);
    }
  };

  const handleSaveTutorialSection = () => {
    if (tutorialType == "Code") {
      const requestOptions = {
        method: 'POST',
        body: JSON.stringify({
          name: tutorialSectionTitle,
          language: languageChosen,
          description,
          code_content: ideEditted,
          code_input: inputEditted,
        })
      };
  
      fetch(process.env.REACT_APP_TUTORIAL_URL + '/tutorial_section/update/' + id, requestOptions)
        .then(response => response.json())
        .then(data => navigate("/tutorial/overview/" + data.tutorial_id));
    } else {
      const requestOptions = {
        method: 'POST',
        body: JSON.stringify({ 
          name: tutorialSectionTitle,
          question,
        })
      };
  
      fetch(process.env.REACT_APP_TUTORIAL_URL + '/tutorial_section/update/' + id, requestOptions)
        .then(response => {
          if (response.status == 200) {
            navigate("/tutorial/overview/" + tutorialId)
          }
        })
    }
  }

  const handleDescriptionChange = (value) => {
    setDescription(value)
  }

  const handleIdeChange = (value) => {
    setIdeEditted(value)
  }

  const handleInputIdeChange = (value) => {
    setInputEditted(value)
  }

  const handleQuestionChange = (value) => {
    setQuestion(value)
  }

  const handleRecordStartStateChange = (value) => {
    setRecordStartState(value)
  }

  return (
    <div className={classes.container}>
      {typeChosen == "Code" &&
        <Joyride
          callback={handleJoyrideCallback}
          steps={steps}
          run={tourStart}
          continuous={true}
          disableCloseOnEsc={true}
          showSkipButton={true}
          spotlightClicks={true}
          disableOverlayClose={true}
          locale={{ back: 'Back', close: 'Close', last: 'Next', next: 'Next', skip: 'Skip' }}
          styles={
            {
              buttonClose: {
                display: 'none',
              },
            }
          }
        />
      }
      <Grid container spacing={0} className={classes.gridContainer}>
        <Grid item xs={8} className={classes.gridHeaderLeft}>
          <SideBar />
          {editTitleButton
            ? (
              <div className={classes.inputContainer} id="section-name-div">
                <CustomInput
                  id="regular"
                  inputProps={{
                    defaultValue: tutorialSectionTitle,
                    placeholder: "Section Name",
                    onChange: (e) => {
                      setTutorialSectionTitle(e.target.value)
                    }
                  }}
                  formControlProps={{
                    style: {
                      padding: "0px",
                      margin: "0px",
                    }
                  }}
                />
                <CheckIcon fontSize="small" style={{ marginLeft: "10px", cursor: "pointer", color: "green" }} onClick={() => {setEditTitleButton(false); setFilename(tutorialSectionTitle.replace(/[^A-Z0-9]/ig, '_').toLowerCase())}} />
              </div>
            )
            : (
              <div className={classes.inputContainer} id="section-name-div">
                <h5 className={classes.title}>{tutorialSectionTitle}</h5>
                <EditIcon fontSize="small" style={{ marginLeft: "10px", cursor: "pointer" }} onClick={() => setEditTitleButton(true)} />
              </div>
            )
          }
        </Grid>
        <Grid item xs={4} className={classes.gridHeaderRight}>
          {typeChosen == "Code" &&
            <Tooltip title="Start Tour">
              <Button justIcon round color="warning" style={{margin: "3px 1px"}} onClick={()=>{setTourStart(true); setTourStartState();}}>?</Button>
            </Tooltip>
          }
          {typeChosen == "Question" && 
            <div>
              <Hidden xsDown>
                <Button disabled={question} style={{margin: "3px 1px"}} onClick={() => handleQuestionChange(sampleQuestion)}>
                  Upload Sample
                </Button>
              </Hidden>
              <Hidden smUp>
                <Tooltip title="Upload Sample">
                  <Button disabled={question} style={{margin: "3px 1px"}} justIcon onClick={() => handleQuestionChange(sampleQuestion)}>
                    <TextRotateUpIcon/>
                  </Button>
                </Tooltip>
              </Hidden>
              <Tooltip title="Preview Section" >
                <Link to={`/tutorial/${tutorialId}/${sectionSequence}`} target="_blank">
                  <Button id="preview-button" style={{margin: "3px 1px"}} justIcon className={classes.previewButton}><VisibilityIcon/></Button>
                </Link>
              </Tooltip>
            </div>
          }
          <Hidden xsDown>
            <Button onClick={() => handleSaveTutorialSection()} disabled={recordStartState} style={{margin: "3px 1px"}}>
              <ExitToAppIcon/>
              Back
            </Button>
          </Hidden>
          <Hidden smUp>
            <Tooltip title="Back">
              <Button justIcon onClick={() => handleSaveTutorialSection()} disabled={recordStartState} style={{margin: "3px 1px"}}>
                <ExitToAppIcon/>
              </Button>
            </Tooltip>
          </Hidden>
        </Grid>
        {typeChosen == "Code" &&
          <CodeSection
            description={description}
            ide={ide}
            input={input}
            languageChosen={languageChosen}
            iframePy={iframePy}
            version={version}
            tutorialId={tutorialId}
            tutorialSectionTitle={tutorialSectionTitle}
            filename={filename}
            userId={props.userId}
            role={props.role}
            layoutRef={layoutRef}
            handleDescriptionChange={handleDescriptionChange}
            handleIdeChange={handleIdeChange}
            handleInputIdeChange={handleInputIdeChange}
            sectionSequence={sectionSequence}
            recordingFound={recordingFound}
            recordStartState={recordStartState}
            handleRecordStartStateChange={handleRecordStartStateChange}
          />
        }
        {typeChosen == "Question" &&
          <QuestionSection
            question={question ? question : null}
            tutorialSectionTitle={tutorialSectionTitle}
            id={id}
            tutorialId={tutorialId}
            handleQuestionChange={handleQuestionChange}
          />
        }
      </Grid>
    </div>
  );
}

TutorialPage.propTypes = {
  userId: PropTypes.string,
  role: PropTypes.string,
};
