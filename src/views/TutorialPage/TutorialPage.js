import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
// @mui/material components
import { makeStyles } from "@mui/styles";

// core components
import CodeSection from './Sections/CodeSection.js';
import QuestionSection from './Sections/QuestionSection.js';

import SideBar from "components/SideBar/SideBar.js";
import Button from "components/CustomButtons/Button.js";
import Hidden from '@mui/material/Hidden';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";

// material ui icon
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ViewCompactIcon from '@mui/icons-material/ViewCompact';
import SaveIcon from '@mui/icons-material/Save';
import RefreshIcon from '@mui/icons-material/Refresh';
import SearchIcon from '@mui/icons-material/Search';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

// tour
import Joyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride';

import { createSilentAudio } from 'create-silent-audio';

import styles from "assets/jss/material-kit-react/views/TutorialPage.js";

const useStyles = makeStyles(styles);

export default function TutorialPage(props) {
  const { id, pid } = useParams();
  const classes = useStyles();
  const navigate = useNavigate();

  const layoutRef = useRef(null);
  const inputIdeRef = useRef(null);
  const playbackIdeRef = useRef(null);
  const consoleIdeRef = useRef(null);
  const player = useRef(null);

  const [tourStart, setTourStart] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [preTourLayout, setPreTourLayout] = useState(null);
  const [preTourCode, setPreTourCode] = useState("");
  const [preTourInput, setPreTourInput] = useState("");
  const [preTourOutput, setPreTourOutput] = useState("");

  const [tutorialTitle, setTutorialTitle] = useState("");
  const [filename, setFilename] = useState("");
  const [pageNumber, setPageNumber] = useState("");
  const [pageNames, setPageNames] = useState([]);
  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(true);
  const [tutorialType, setTutorialType] = useState("");
  const [learnerLayout, setLearnerLayout] = useState();
  const [refreshedLayout, setRefreshedLayout] = useState();
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [frequentWord, setFrequentWord] = useState([]);
  const [tutorialSectionId, setTutorialSectionId] = useState(null)

  const [description, setDescription] = useState("");
  const [inputIde, setInputIde] = useState("");
  const [languageChosen, setLanguageChosen] = useState("");
  const [iframePy, setIframePy] = useState("3")
  const [version, setVersion] = useState("");
  const [themeChosen, setThemeChosen] = useState("github");
  const [keystrokes, setKeystrokes] = useState([]);
  const [consoleActions, setConsoleActions] = useState([]);
  const [consoleScrollActions, setConsoleScrollActions] = useState([]);
  const [inputKeystrokes, setInputKeystrokes] = useState([]);
  const [inputScrollActions, setInputScrollActions] = useState([]);
  const [layoutActions, setLayoutActions] = useState([]);
  const [selectActions, setSelectActions] = useState([]);
  const [scrollActions, setScrollActions] = useState([]);
  const [editorScrollActions, setEditorScrollActions] = useState([]);
  const [transcript, setTranscript] = useState([]);
  const [tabValue, setTabValue] = useState(0);

  const [recordingSrc, setRecordingSrc] = useState("");

  const [question, setQuestion] = useState(null);

  const steps = [
    {
      content: <h4>Welcome to the Interactive Tutorial System Learner Tour.</h4>,
      target: 'body',
      placement: 'center',
      placementBeacon : 'top',
    },
    {
      content: <h4>This is the <b>Description</b> tab.</h4>,
      target: '.dock.dock-top',
      placement: 'right',
      spotlightClicks: true,
    },
    {
      content: <h4>This is the code pane. The author&apos;s recording will playback in the <b>Playback</b> tab. You can practice on your own in the <b>Practice</b> tab.</h4>,
      target: '.dock-box.dock-vbox > .dock-panel > .dock.dock-top',
    },
    {
      content: <h4>Let us now try to print some inputs. In the <b>Input</b> tab, we see that <code>&quot;python&quot;</code> is the first input and <code>&quot;java&quot;</code> is the second input.</h4>,
      target: '.dock-box.dock-vbox > .dock-box.dock-hbox > .dock-panel > .dock.dock-top',
    },
    {
      content: <h4>Code that takes in the two inputs and prints them has been added.</h4>,
      target: '.dock-box.dock-vbox > .dock-panel > .dock.dock-top',
    },
    {
      content: <h4>We can run the code now.</h4>,
      target: '#playback-code-run-button',
    },
    {
      content: <h4>The output will be displayed in the <b>Console</b> tab.</h4>,
      target: '.dock-box.dock-vbox > .dock-box.dock-hbox > .dock-panel:last-child > .dock.dock-top',
    },
    {
      content: <h4>You can resize and maximize the panels, close unnecessary tabs and drag tabs around. Try it now.</h4>,
      target: '.dock-layout',
      placement: 'top-end',
      spotlightClicks: true,
      hideBackButton: true,
    },
    {
      content: <h4>Once done, you can save the current layout and load the saved layout for the rest of this tutorial. You can also restore to the default layout.</h4>,
      target: '#layout-button',
      spotlightClicks: true,
    },
    {
      content: <h4>With the player controls, you can play and pause the recording, seek to any point of the playback, and control the volume.</h4>,
      target: '.rhap_container',
    },
    {
      content: <h4>You can also perform search functions with this button.</h4>,
      target: '#search-button',
    },
    {
      content: <h4>There are two types of searches - <b>Tutorial</b> and <b>Stackoverflow</b> search.</h4>,
      target: '#classic-modal-slide-title > div',
      styles: {
        options: {
          zIndex: 10000,
        },
      },
    },
    {
      content: <h4>In <b>Tutorial search</b>, the search results show where the word appears in the recording. The most frequent words are also provided as search hints.</h4>,
      target: '#simple-tabpanel-0',
      styles: {
        options: {
          zIndex: 10000,
        },
      },
    },
    {
      content: <h4>In <b>Stackoverflow search</b>, the search results will show relevant questions from Stack Overflow. Suggested Threads will also appear when there is an error in the <b>Console</b> tab.</h4>,
      target: '#simple-tabpanel-1',
      styles: {
        options: {
          zIndex: 10000,
        },
      },
    },
    {
      content: <h4>This brings us to the end of the tour. Thank you.&#x1F60A;</h4>,
      target: 'body',
      placement: 'center',
      placementBeacon : 'top',
    },
  ]

  const setTourStartState = () => {
    // Save the learner's current state and set everything to default state for the tour
    player.current.audio.current.pause(); 
    setPreTourLayout(layoutRef.current.saveLayout());
    if (playbackIdeRef.current) {
      setPreTourCode(playbackIdeRef.current.editor.getValue());
      playbackIdeRef.current.editor.setValue("");
    }
    if (inputIdeRef.current) {
      setPreTourInput(inputIdeRef.current.editor.getValue());
      inputIdeRef.current.editor.setValue("");
    }
    if (consoleIdeRef.current) {
      setPreTourOutput(consoleIdeRef.current.editor.getValue());
      consoleIdeRef.current.editor.setValue("");
    }
    layoutRef.current.loadLayout(refreshedLayout);
  }

  const handleJoyrideCallback = (data) => {
    // Customize the tour to add code at certain steps and accomodate the modal
    // Step indexes in this function will need to be updated if the steps above change
    const { action, index, type, status } = data;
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];
    if (finishedStatuses.includes(status)) {
      // Restore to learner's state before tour was started
      setTourStart(false);
      if (playbackIdeRef.current) {
        playbackIdeRef.current.editor.setValue(preTourCode);
        playbackIdeRef.current.editor.clearSelection();
      }
      if (inputIdeRef.current) {
        inputIdeRef.current.editor.setValue(preTourInput);
        inputIdeRef.current.editor.clearSelection();
      }
      if (consoleIdeRef.current) {
        consoleIdeRef.current.editor.setValue(preTourOutput);
        consoleIdeRef.current.editor.clearSelection();
      }
      layoutRef.current.loadLayout(preTourLayout);
      setShowSearchModal(false);
      setStepIndex(0);
    } else if (([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND]).includes(type)) {
      // console.log(action, index, type, status)
      const stepIndex = index + (action === ACTIONS.PREV ? -1 : 1);
      if (index === 2 && action === ACTIONS.NEXT) {
        inputIdeRef.current.editor.setValue("python\njava");
        inputIdeRef.current.editor.clearSelection();
      }
      if (index === 3 && action === ACTIONS.NEXT) {
        if (languageChosen == "python") {
          playbackIdeRef.current.editor.setValue("language1 = input()\nlanguage2 = input()\nprint(\"I am learning to code in \" + language1 + \" and \" + language2)");
        } else if (languageChosen == "java") {
          playbackIdeRef.current.editor.setValue("import java.util.Scanner;\n\npublic class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tScanner input = new Scanner(System.in);\n\t\tString language1 = input.next();\n\t\tString language2 = input.next();\n\t\tSystem.out.print(\"I am learning to code in \" + language1 + \" and \" + language2);\n\t}\n}");
        } else if (languageChosen == "javascript") {
          playbackIdeRef.current.editor.setValue("const stdin = process.openStdin();\n\nstdin.on('data', input => {\n\tinput = input.toString().split(\"\\n\");\n\tlanguage1 = input[0];\n\tlanguage2 = input[1];\n\tconsole.log(\"I am learning to code in \" + language1 + \" and \" + language2);\n});");
        }
        playbackIdeRef.current.editor.clearSelection();
      }
      if (index === 5 && action === ACTIONS.NEXT) {
        consoleIdeRef.current.editor.setValue("> I am learning to code in python and java\n");
        consoleIdeRef.current.editor.clearSelection();
      }
      if (index === 11 && action === ACTIONS.NEXT) {
        setTourStart(false);
        setShowSearchModal(true);
        setTabValue(0);
        setTimeout(() => {
          setTourStart(true);
        }, 400);
      }
      if (index === 12 && action === ACTIONS.PREV) {
        setShowSearchModal(false);
      }
      if (index === 13 && action === ACTIONS.NEXT) {
        setTourStart(false);
        setTabValue(1);
        setTimeout(() => {
          setTourStart(true);
        }, 400);
      }
      if (index === 14 && action === ACTIONS.PREV) {
        setTourStart(false);
        setTabValue(0);
        setTimeout(() => {
          setTourStart(true);
        }, 400);
      }
      if (index === 14 && action === ACTIONS.NEXT) {
        setShowSearchModal(false);
      }
      if (index === 15 && action === ACTIONS.PREV) {
        setTourStart(false);
        setShowSearchModal(true);
        setTabValue(1);
        setTimeout(() => {
          setTourStart(true);
        }, 400);
      }
      setStepIndex(stepIndex);
    }
  };

  useEffect(() => {
    if (id && pid) {
      const requestOptions = {
        method: 'GET',
      };

      fetch(process.env.REACT_APP_TUTORIAL_URL + '/tutorial/get/' + id + '/' + pid + '/' + props.userId, requestOptions)
        .then(response => response.json())
        .then(data => {
          setTutorialTitle(data.tutorial_name);
          setFilename(data.tutorial_pages[data.tutorial_page].replace(/[^A-Z0-9]/ig, '_').toLowerCase())
          setPageNumber(data.tutorial_page);
          setPageNames(data.tutorial_pages);
          const tempTutorialType = data.tutorial_type;
          
          if (tempTutorialType == "Code") {
            setDescription(data.description);
            setLanguageChosen(data.language);
            if (data.language == 'java') {
              setIframePy('java');
            }
            setVersion(data.version);
            setKeystrokes(JSON.parse(JSON.parse(data.keystroke)));
            setConsoleActions(JSON.parse(JSON.parse(data.consoleAction)));
            setConsoleScrollActions(JSON.parse(JSON.parse(data.consoleScrollAction)))
            setLayoutActions(JSON.parse(JSON.parse(data.layoutAction)));
            setSelectActions(JSON.parse(JSON.parse(data.selectAction)));
            setScrollActions(JSON.parse(JSON.parse(data.scrollAction)));
            setEditorScrollActions(JSON.parse(JSON.parse(data.editorScrollAction)))
            setTranscript(JSON.parse(JSON.parse(data.transcript)));
            setTutorialSectionId(data.tutorial_section_id)
            setInputKeystrokes(JSON.parse(JSON.parse(data.inputKeystrokes)))
            setInputScrollActions(JSON.parse(JSON.parse(data.inputScrollAction)))
            if (data.frequent_word) {
              try {
                const frequentWordData = JSON.parse(data.frequent_word).map((word, i) => ({
                  key: i, label: word
                }))
                setFrequentWord(frequentWordData);
              } catch (error) {
                console.error('Error parsing frequent_word data:', error);
                setFrequentWord([]);
              }
            }

            if (data.recording != null) {
              setRecordingSrc(data.recording);
            } else {
              const duration = Math.ceil(data.duration/1000);
              setRecordingSrc(createSilentAudio(duration?duration:1));
            }  
          }

          if (tempTutorialType == "Question") {
            setQuestion(JSON.parse(data.question));
          }

          if (pid > 1) {
            setPrevDisabled(false);
          }
          if (pid < data.tutorial_pages.length) {
            setNextDisabled(false);
          }

          if (data.input_ide) {
            setInputIde(data.input_ide)
          } else {
            setInputIde("")
          }

          setTutorialType(tempTutorialType);

          setRefreshedLayout({
            dockbox: {
              mode: 'horizontal',
              children: [
                {
                  size: 400,
                  tabs: [{id: 'description-preview'}],
                },
                {
                  mode: 'vertical',
                  size: 600,
                  children: [
                    {
                      size: 600,
                      tabs: [{id: 'editor'}, {id: 'practice'}]
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

  const goPrev = () => {
    // Directs learner to previous page
    navigate(`/tutorial/${id}/${parseInt(pid)-1}`);
  }

  const goNext = () => {
    // Directs learner to next page
    navigate(`/tutorial/${id}/${parseInt(pid)+1}`);
  }

  useEffect(() => {
    const details = {
      'userid': props.userId,
      'tutorialid': id,
      'role': props.role,
    };

    fetch(process.env.REACT_APP_TUTORIAL_URL + '/get_learner_layout', {
      method: 'POST',
      body: JSON.stringify(details)
    })
    .then(response => response.json())
    .then(data => {setLearnerLayout(JSON.parse(data.layout))})
  }, []);

  const saveLayout = () => {
    const newLayout = layoutRef.current.saveLayout();
    setLearnerLayout(newLayout);

    const saveDetails = {
      'userid': props.userId,
      'tutorialid': id,
      'layout': newLayout,
      'role': props.role,
    };

    fetch(process.env.REACT_APP_TUTORIAL_URL + '/save_learner_layout', {
      method: 'POST',
      body: JSON.stringify(saveDetails)
    })
  }

  const handleLayoutDropdown = (value) => {
    if (value.props.children[1] == "Save Layout") {
      saveLayout();
    } else if (value.props.children[1] == "Load Saved Layout") {
      layoutRef.current.loadLayout(learnerLayout)
    } else if (value.props.children[1] == "Restore Layout") {
      layoutRef.current.loadLayout(refreshedLayout)
    }
  }

  return (
    <div>
      {tutorialType == "Code" &&
        <Joyride
          callback={handleJoyrideCallback}
          steps={steps}
          stepIndex={stepIndex}
          run={tourStart}
          continuous={true}
          disableCloseOnEsc={true}
          showSkipButton={true}
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
        {/* Navigation Bar */}
        <Grid container className={classes.gridHeader}>
          <Grid item xs={1} sm={3} className={classes.gridHeaderLeft}>
            <SideBar />
            <Hidden only='xs'>
              <h5 className={classes.textOverflow}>{tutorialTitle}</h5>
            </Hidden>
          </Grid>
          <Grid item xs={8} sm={5} className={classes.gridHeaderCenter}>
            <div className={classes.gridHeaderCenterSubWrapper}>
              <Tooltip title="Previous Page">
                <Button justIcon disabled={prevDisabled} onClick={()=>goPrev()}><ArrowBackIcon/></Button>
              </Tooltip>
              <h5 className={classes.textOverflowTitle}>{pageNames[pageNumber]}</h5>
              <Tooltip title="Next Page" >
                <Button justIcon className={classes.icon} disabled={nextDisabled} onClick={()=>goNext()}><ArrowForwardIcon/></Button>
              </Tooltip>
            </div>
          </Grid>
          <Grid item xs={3} sm={4} className={classes.gridHeaderRight}>
            {tutorialType == "Code" &&
              <div className={classes.topRightIcon}>
                <Hidden smDown>
                  <Tooltip title="Search">
                    <Button id="search-button" onClick={() => setShowSearchModal(true)} id="search-button">
                      <SearchIcon/>
                      Search
                    </Button>
                  </Tooltip>
                  <div id="layout-button">
                    <CustomDropdown
                      buttonText={"Layout"}
                      dropdownList={[
                        <span className={classes.dropdownDetail}>
                          <SaveIcon className={classes.dropdownIcon}/>
                          Save Layout
                        </span>,
                        [
                          <span className={classes.dropdownDetail}>
                            <ViewCompactIcon className={classes.dropdownIcon}/>
                            Load Saved Layout
                          </span>,
                          learnerLayout == null
                        ],
                        <span className={classes.dropdownDetail}>
                          <RefreshIcon className={classes.dropdownIcon}/>
                          Restore Layout
                        </span>,
                      ]}
                      onClick={(e) => handleLayoutDropdown(e)}
                      right={true}
                    />
                  </div>
                </Hidden>
                <Hidden mdUp>
                  <Tooltip title="Search">
                    <Button id="search-button" justIcon onClick={() => setShowSearchModal(true)} id="search-button"><SearchIcon/></Button>
                  </Tooltip>
                  <div id="layout-button">
                    <CustomDropdown
                      id="layout-button"
                      buttonProps={{
                        justIcon: true,
                      }}
                      buttonText={<MoreHorizIcon />}
                      caret={false}
                      dropdownList={[
                        <span className={classes.dropdownDetail}>
                          <SaveIcon className={classes.dropdownIcon}/>
                          Save Layout
                        </span>,
                        [
                          <span className={classes.dropdownDetail}>
                            <ViewCompactIcon className={classes.dropdownIcon}/>
                            Load Saved Layout
                          </span>,
                          learnerLayout == null
                        ],
                        <span className={classes.dropdownDetail}>
                          <RefreshIcon className={classes.dropdownIcon}/>
                          Restore Layout
                        </span>,
                        
                      ]}
                      onClick={(e) => handleLayoutDropdown(e)}
                      right={true}
                    />
                  </div>
                </Hidden>
                <Hidden xsDown>
                  <Tooltip title="Start Tour">
                    <Button justIcon round color="warning" onClick={()=>{setTourStartState(); setTourStart(true);}}>?</Button>
                  </Tooltip>
                </Hidden>
              </div>
            }
          </Grid>
        </Grid>

        {tutorialType == "Code" &&
          <CodeSection
            description={description}
            transcript={transcript}
            layoutRef={layoutRef}
            inputIdeRef={inputIdeRef}
            playbackIdeRef={playbackIdeRef}
            consoleIdeRef={consoleIdeRef}
            player={player}
            filename={filename}
            languageChosen={languageChosen}
            iframePy={iframePy}
            version={version}
            themeChosen={themeChosen}
            keystrokes={keystrokes}
            consoleActions={consoleActions}
            consoleScrollActions={consoleScrollActions}
            inputKeystrokes={inputKeystrokes}
            inputScrollActions={inputScrollActions}
            layoutActions={layoutActions}
            selectActions={selectActions}
            scrollActions={scrollActions}
            editorScrollActions={editorScrollActions}
            recordingSrc={recordingSrc}
            showSearchModal={showSearchModal}
            setShowSearchModal={setShowSearchModal}
            frequentWord={frequentWord}
            tutorialSectionId={tutorialSectionId}
            input={inputIde}
            tabValue={tabValue}
            setTabValue={setTabValue}
          />
        }

        {question &&
          <QuestionSection question={question}/>
        }

      </Grid>
    </div>
  );
}
