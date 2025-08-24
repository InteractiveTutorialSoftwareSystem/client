import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import PropTypes from "prop-types";
import ReactMarkdown from 'react-markdown'
// @mui/material components
import { makeStyles } from "@mui/styles";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from "@mui/material/InputAdornment";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
// core components
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
// material ui icon
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import StopIcon from '@mui/icons-material/Stop';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PublishIcon from '@mui/icons-material/Publish';
import ViewCompactIcon from '@mui/icons-material/ViewCompact';
import SaveIcon from '@mui/icons-material/Save';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TextRotateUpIcon from '@mui/icons-material/TextRotateUp';
import ErrorIcon from '@mui/icons-material/Error';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import BuildIcon from '@mui/icons-material/Build';

import sampleData from './sample.json'
const {sampleDescription, sampleInput, samplePythonCode, sampleJavaCode, sampleJavaScriptCode} = sampleData;
import '../../../assets/css/codeSection.css';
import '../../../assets/css/modal.css';

// editor
import AceEditor from "react-ace";
import "../../EditorImport";

// recording
import AudioReactRecorder, { RecordState } from "../../../components/AudioReactRecorder";

// Modal
import Slide from "@mui/material/Slide";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import IconButton from "@mui/material/IconButton";
import Hidden from '@mui/material/Hidden';

//dock
import DockLayout from 'rc-dock';
import "rc-dock/dist/rc-dock.css";

//speech recognition
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import {decode} from 'html-entities';

import styles from "assets/jss/material-kit-react/views/tutorialSectionPageSections/codeStyle.js";
import { grayColor } from "assets/jss/material-kit-react.js";

const useStyles = makeStyles(styles);

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="down" ref={ref} {...props} />;
});

const Context = React.createContext();

export default function TutorialPage(props) {
  const { id } = useParams();
  const classes = useStyles();
  const navigate = useNavigate();
  const { ...rest } = props;

  const [authorLayout, setAuthorLayout] = useState();
  const [layoutMenuAnchor, setLayoutMenuAnchor] = useState(null);
  const [themeChosen, setThemeChosen] = useState("github");
  const [recordState, setRecordState] = useState(null);
  const [audioData, setAudioData] = useState(null);
  const [isAudioRecording, setIsAudioRecording] = useState(false);
  const [showRecordingModal, setShowRecordingModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [stackoverflowSearchField, setStackoverflowSearchField] = useState("");
  const [stackoverflowSuggestedResult, setStackoverflowSuggestedResult] = useState([]);
  const [stackoverflowResult, setStackoverflowResult] = useState();
  const [timer, setTimer] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [duration, setDuration] = useState(0);
  const [keystrokes, setKeystrokes] = useState([]);
  const [consoleActions, setConsoleActions] = useState([]);
  const [consoleScrollActions, setConsoleScrollActions] = useState([]);
  const [inputKeystrokes, setInputKeystrokes] = useState([]);
  const [inputScrollActions, setInputScrollActions] = useState([]);
  const [layoutActions, setLayoutActions] = useState([]);
  const [selectActions, setSelectActions] = useState([]);
  const [scrollActions, setScrollActions] = useState([]);
  const [editorScrollActions, setEditorScrollActions] = useState([]);
  const [getMediaError, setGetMediaError] = useState("");
  const [backdropOpen, setBackdropOpen] = useState(false);
  const [showCodeRun, setShowCodeRun] = useState(true);
  const [showCompile, setShowCompile] = useState(true);
  const [transcriptResult, setTranscriptResult] = useState([]);
  const [transcriptResultSlice, setTranscriptResultSlice] = useState(0);
  const [interimResultTime, setInterimResultTime] = useState(null);
  const [consoleError, setConsoleError] = useState("");
  const [stackoverflowLoading, setStackoverflowLoading] = useState(false);
  const [recordingFound, setRecordingFound] = useState(false);
  
  const [ide, setIde] = useState("");
  const [editorCursor, setEditorCursor] = useState([1,1]);
  const [random, setRandom] = useState(0);
  const increment = useRef(null);
  const editorRef = useRef(null);
  const inputIdeRef = useRef(null);
  const consoleIdeRef = useRef(null);

  const {
    interimTranscript,
    finalTranscript,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition()

  const tutorTab = () => {
    let id, title, curInstr, language;
    if (props.languageChosen == "python") {
      id = "python-tutor";
      title = "Python Tutor";
      curInstr = "1";
      language = "3";
      return {
        id,
        title,
        cached: true,
        closable: true,
        content: (
          <Context.Consumer>
            {(value) => 
              <div className={classes.editorPane}>
                {value.ide?
                <iframe width="100%" height="100%" frameBorder="0" key={value.random}
                  src={"https://pythontutor.com/iframe-embed.html#code=" + encodeURIComponent(value.ide) + "&cumulative=false&curInstr=" + curInstr + "&heapPrimitives=nevernest&origin=opt-frontend.js&py=" + language + "&rawInputLstJSON=%5B%5D&textReferences=false"}>
                </iframe> :
                <p>No code in Editor panel</p>
                }
              </div>
            }
          </Context.Consumer>
        )
      }
    } else if (props.languageChosen == "java") {
      id = "java-tutor";
      title = "Java Tutor";
      curInstr = "0";
      language = "java";
      return {
        id,
        title,
        cached: true,
        closable: true,
        content: (
          <Context.Consumer>
            {(value) => 
              <div className={classes.editorPane}>
                {value.ide?
                <a key={value.random} target="_blank"
                  href={"http://pythontutor.com/iframe-embed.html#code=" + encodeURIComponent(value.ide) + "&cumulative=false&curInstr=" + curInstr + "&heapPrimitives=nevernest&origin=opt-frontend.js&py=" + language + "&rawInputLstJSON=%5B%5D&textReferences=false"} rel="noreferrer">
                    Link to Java Tutor
                </a> :
                <p>No code in Editor panel</p>
                }
              </div>
            }
          </Context.Consumer>
        )
      }
    } else if (props.languageChosen == "javascript") {
      id = "javascript-tutor";
      title = "JavaScript Tutor";
      curInstr = "0";
      language = "js";
      return {
        id,
        title,
        cached: true,
        closable: true,
        content: (
          <Context.Consumer>
            {(value) => 
              <div className={classes.editorPane}>
                {value.ide?
                <a key={value.random} target="_blank"
                  href={"http://pythontutor.com/iframe-embed.html#code=" + encodeURIComponent(value.ide) + "&cumulative=false&curInstr=" + curInstr + "&heapPrimitives=nevernest&origin=opt-frontend.js&py=" + language + "&rawInputLstJSON=%5B%5D&textReferences=false"} rel="noreferrer">
                    Link to JavaScript Tutor
                </a> :
                <p>No code in Editor panel</p>
                }
              </div>
            }
          </Context.Consumer>
        )
      }
    }
  }

  const defaultLayout = {
    dockbox: {
      mode: 'horizontal',
      children: [
        {
          size: 400,
          tabs: [
            {
              id: 'description', 
              title: 'Description',
              cached: true,
              closable: true,
              content: (
                <Context.Consumer>
                  {(value) => 
                    <div className={classes.markdownDiv}>
                      <TextareaAutosize
                        className={classes.textArea}
                        placeholder="Insert Description Here"
                        value={value.description}
                        onChange={(e) => props.handleDescriptionChange(e.target.value)}
                      />
                    </div>
                  }
                </Context.Consumer>
              )
            },
            {
              id: 'description-preview', 
              title: 'Preview',
              cached: true,
              closable: true,
              content: (
                <Context.Consumer>
                  {(value) => value.description
                    ? (<div id="markdownDiv" className={classes.markdownPreviewDiv}><ReactMarkdown>{value.description}</ReactMarkdown></div>)
                    : (<div id="markdownDiv" className={classes.markdownPreviewDiv}><ReactMarkdown>Nothing to display</ReactMarkdown></div>)
                  }
                </Context.Consumer>
              )
            }
          ]
        },
        {
          mode: 'vertical',
          size: 600,
          children: [
            {
              size: 600,
              tabs: [
                {
                  id: 'editor',
                  title: 'Editor',
                  cached: true,
                  closable: true,
                  content: (
                    <div className={classes.editorPane}>
                      <AceEditor
                        ref={editorRef}
                        className={classes.editor}
                        mode={props.languageChosen}
                        theme={themeChosen}
                        name="ide"
                        onChange={(e) => {setIde(e); props.handleIdeChange(e)}}
                        onCursorChange={(e) => setEditorCursor([e.cursor.row + 1, e.cursor.column + 1])}
                        editorProps={{ $blockScrolling: true }}
                        setOptions={{enableLiveAutocompletion:true,}}
                      />
                      <Context.Consumer>
                        {(value) => <div className={classes.bottomLeftDiv}>
                          Ln {value.editorCursor[0]}, Col {value.editorCursor[1]} | Spaces: 4 | Filename: {value.filename}
                        </div>}
                      </Context.Consumer>
                      {/* Run and Compile buttons moved to top-right header */}
                    </div>
                  )
                },
              ]
            },
            {
              mode: 'horizontal',
              size: 400,
              children: [
                {
                  size: 100,
                  tabs: [
                    {
                      id: 'input',
                      title: 'Input',
                      cached: true,
                      closable: true,
                      content: (
                        <div className={classes.editorPane}>
                          <AceEditor
                            className={classes.editor}
                            mode="sh"
                            theme={themeChosen}
                            ref={inputIdeRef}
                            name="input"
                            editorProps={{ $blockScrolling: true }}
                            highlightActiveLine={false}
                            showGutter={false}
                            showPrintMargin={false}
                            setOptions={{
                              showLineNumbers: false
                            }}
                            onChange={(e) => props.handleInputIdeChange(e)}
                          />
                        </div>
                      )
                    },
                  ]
                },
                {
                  tabs: [
                    {
                      id: 'output',
                      title: 'Output',
                      cached: true,
                      closable: true,
                      content: (
                        <div className={classes.editorPane}>
                          <AceEditor
                            className={classes.editor}
                            mode="sh"
                            theme={themeChosen}
                            name="console"
                            ref={consoleIdeRef}
                            editorProps={{ $blockScrolling: true }}
                            highlightActiveLine={false}
                            showGutter={false}
                            readOnly={true}
                            showPrintMargin={false}
                            setOptions={{
                              showLineNumbers: false
                            }}
                          />
                          <div className={classes.bottomLeftDiv}>
                            {props.version}
                          </div>
                          <div className={classes.bottomRightDiv}>
                            <Context.Consumer>
                              {(value) => value.consoleError != "" &&
                                <IconButton onClick={value.handlePreSearch}>
                                  <ErrorIcon color="error" />
                                </IconButton>
                              }
                            </Context.Consumer>
                            <Button round onClick={() => handleClearOutput()}>
                              Clear Output
                            </Button>
                          </div>
                        </div>
                      )
                    },
                    tutorTab(),
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  }

  useEffect(() => {
    setRecordingFound(props.recordingFound)
  }, [props.recordingFound])

  useEffect(() => {
    setIde(props.ide)
    const editorRefObserver = new MutationObserver((mutations, me) => {
      if (editorRef) {
        editorRef.current.editor.setValue(props.ide);
        editorRef.current.editor.clearSelection();
        me.disconnect();
        return;
      }
    })
    editorRefObserver.observe(document, {
      childList: true,
      subtree: true
    });
    const inputRefObserver = new MutationObserver((mutations, me) => {
      if (inputIdeRef) {
        inputIdeRef.current.editor.setValue(props.input);
        inputIdeRef.current.editor.clearSelection();
        me.disconnect();
        return;
      }
    })
    inputRefObserver.observe(document, {
      childList: true,
      subtree: true
    });
  }, [props.input, props.ide])

  useEffect(() => {
    if (props.tutorialId) {
      const details = {
        'userid': props.userId,
        'tutorialid': props.tutorialId,
        'role': props.role,
      };

      fetch(process.env.REACT_APP_TUTORIAL_URL + '/get_learner_layout', {
        method: 'POST',
        body: JSON.stringify(details)
      })
      .then(response => response.json())
      .then(data => {setAuthorLayout(JSON.parse(data.layout))})
    }
  }, [props.tutorialId]);

  const saveLayout = () => {
    const newLayout = props.layoutRef.current.saveLayout();
    setAuthorLayout(newLayout);

    const saveDetails = {
      'userid': props.userId,
      'tutorialid': props.tutorialId,
      'layout': newLayout,
      'role': props.role,
    };

    fetch(process.env.REACT_APP_TUTORIAL_URL + '/save_learner_layout', {
      method: 'POST',
      body: JSON.stringify(saveDetails)
    })
  }

  const recordKeystroke = (e, editor) => {
    const keyEvent = {
      'content': editor.getValue(),
      'selection': editor.getSelectionRange(),
      'timestamp': Date.now() - startTime,
    }
    keystrokes.push(keyEvent);
  }

  const recordConsoleAction = (e, output) => {
    const keyEvent = {
      'content': output.getValue(),
      'selection': output.getSelectionRange(),
      'timestamp': Date.now() - startTime,
    }
    consoleActions.push(keyEvent);
  }

  const recordInputKeystroke = (e, editor) => {
    const keyEvent = {
      'content': editor.getValue(),
      'selection': editor.getSelectionRange(),
      'timestamp': Date.now() - startTime,
    }
    inputKeystrokes.push(keyEvent);
  }

  const recordInputScroll = (scrollTop) => {
    const inputScrollEvent = {
      'timestamp': Date.now() - startTime,
      'scroll': scrollTop,
    }
    inputScrollActions.push(inputScrollEvent)
  }


  const recordConsoleScroll = (scrollTop) => {
    const consoleScrollEvent = {
      'timestamp': Date.now() - startTime,
      'scroll': scrollTop,
    }
    consoleScrollActions.push(consoleScrollEvent);
  }


  const recordLayout = (newLayout) => {
    if (props.recordStartState) {
      const layoutEvent = {
        'layout': newLayout,
        'timestamp': Date.now() - startTime,
      }
      layoutActions.push(layoutEvent);
    }
  }

  const updateLayoutActions = () => {
    if (props.recordStartState) {
      const layoutEvent = {
        'layout': props.layoutRef.current.saveLayout(),
        'timestamp': Date.now() - startTime,
      }
      layoutActions.push(layoutEvent);
    }
  }

  const recordEditorScroll = (scrollTop) => {
    const editorScrollEvent = {
      'timestamp': Date.now() - startTime,
      'scroll': scrollTop,
    }
    editorScrollActions.push(editorScrollEvent);
  }

  const recordMarkdownScroll = () => {
    const scrollEvent = {
      'timestamp': Date.now() - startTime,
      'scroll': getMarkdownScroll(),
    }
    scrollActions.push(scrollEvent);
  }

  const getMarkdownScroll = () => {
    const markdownDivElement = document.getElementById('markdownDiv');
    if (!markdownDivElement) {return}
    const scrollPosition = markdownDivElement.scrollTop;
    const scrollHeight = markdownDivElement.scrollHeight - markdownDivElement.clientHeight;
    const scrollPercent = scrollPosition/scrollHeight;
    return scrollPercent;
  }

  const recordMarkdownSelect = () => {
    const markdownSelect = getMarkdownSelect();
    const selectEvent = {
      'timestamp': Date.now() - startTime,
      'data': markdownSelect,
    }
    selectActions.push(selectEvent);
  }

  const getMarkdownSelect = () => {
    try {
      const sel = window.getSelection();
      const range = sel.getRangeAt(0);
      let startNode = range.startContainer;
      let endNode = range.endContainer;

      let startIsText, startFlag;
      if (startNode.nodeType == 3) {
        startIsText = true;
        startFlag = startNode.parentNode;
        startNode = startNode.nodeValue;
      } else {
        startIsText = false;
        startFlag = startNode;
      }
      let endIsText, endFlag;
      if (endNode.nodeType == 3) {
        endIsText = true;
        endFlag = endNode.parentNode;
        endNode = endNode.nodeValue;
      } else {
        endIsText = false;
        endFlag = endNode;
      }

      const startOffset = range.startOffset; 
      const endOffset = range.endOffset; 

      const startTagName = startFlag.nodeName;
      const startHTML = startFlag.innerHTML;

      const endTagName = endFlag.nodeName;
      const endHTML = endFlag.innerHTML;

      const rInfo = {
        startNode,
        startOffset,
        startIsText,
        startTagName,
        startHTML,

        endNode,
        endOffset,
        endIsText,
        endTagName,
        endHTML,
      };

      return JSON.stringify(rInfo);
    } catch(e){
      return null;
    }
  }

  useEffect(() => {
    if (props.recordStartState) {
      if (editorRef.current) {
        const editor = editorRef.current.editor;
        editor.on("changeSelection", recordKeystroke);
        editor.session.on("changeScrollTop", recordEditorScroll);
      }
      if (consoleIdeRef.current) {
        const editor = consoleIdeRef.current.editor;
        editor.on("changeSelection", recordConsoleAction);
        editor.session.on("changeScrollTop", recordConsoleScroll);
      }
      if (inputIdeRef.current){
        const editor = inputIdeRef.current.editor;
        editor.on("changeSelection", recordInputKeystroke);
        editor.session.on("changeScrollTop", recordInputScroll);
      }
      const markdownDivElement = document.getElementById('markdownDiv');
      if (markdownDivElement) {
        markdownDivElement.onscroll = recordMarkdownScroll;
        markdownDivElement.onmouseup = recordMarkdownSelect;
      }
    }
  }, [props.recordStartState])

  useEffect(() => {
    if (props.recordStartState && browserSupportsSpeechRecognition) {
      const newTranscript = {
        "text": finalTranscript.split(" ").slice(transcriptResultSlice, finalTranscript.split(" ").length).join(" "),
        "timestamp": interimResultTime,
        "endTime": Date.now() - startTime,
      }
      setTranscriptResultSlice(finalTranscript.split(" ").length)
      setInterimResultTime(null)
      transcriptResult.push(newTranscript)
    }
  }, [finalTranscript])

  useEffect(() => {
    if (props.recordStartState && browserSupportsSpeechRecognition) {
      if (!interimResultTime) {
        setInterimResultTime(Date.now() - startTime)
      }
    }
  }, [interimTranscript])

  const handleAudioStart = async () => {
    // save current state of ide
    setStartTime(Date.now());
    resetTranscript();
    
    if(browserSupportsSpeechRecognition) {
      SpeechRecognition.startListening({ continuous: true });
    }

    const stateTranscriptEvent = {
      'text': '',
      'timestamp': 0,
      'endTime': 0
    }
    setTranscriptResult([stateTranscriptEvent])

    if (editorRef.current) {
      const stateKeyEvent = {
        'content': editorRef.current.editor.getValue(),
        'selection': editorRef.current.editor.getSelectionRange(),
        'timestamp': 0
      }
      setKeystrokes([stateKeyEvent]);

      const stateEditorScrollEvent = {
        'timestamp': 0,
        'scroll': editorRef.current.editor.session.getScrollTop(),
      }
      setEditorScrollActions([stateEditorScrollEvent])
    }

    if (consoleIdeRef.current) {
      const stateKeyEvent = {
        'content': consoleIdeRef.current.editor.getValue(),
        'selection': consoleIdeRef.current.editor.getSelectionRange(),
        'timestamp': 0
      }
      setConsoleActions([stateKeyEvent])

      const stateConsoleScrollEvent = {
        'timestamp': 0,
        'scroll': consoleIdeRef.current.editor.session.getScrollTop(),
      }
      setConsoleScrollActions([stateConsoleScrollEvent])
    }

    if (inputIdeRef.current){
      const stateKeyEvent = {
        'content': inputIdeRef.current.editor.getValue(),
        'selection': inputIdeRef.current.editor.getSelectionRange(),
        'timestamp': 0
      }
      setInputKeystrokes([stateKeyEvent])

      const stateInputScrollEvent = {
        'timestamp': 0,
        'scroll': inputIdeRef.current.editor.session.getScrollTop(),
      }
      setInputScrollActions([stateInputScrollEvent]);
    }



    const stateLayoutEvent = {
      'layout': props.layoutRef.current.saveLayout(),
      'timestamp': 0,
    }
    setLayoutActions([stateLayoutEvent]);

    const stateScrollEvent = {
      'timestamp': 0,
      'scroll': getMarkdownScroll(),
    }
    setScrollActions([stateScrollEvent]);

    const stateSelectEvent = {
      'timestamp': 0,
      'data': getMarkdownSelect(),
    }
    setSelectActions([stateSelectEvent]);

    // start timer
    clearInterval(increment.current);
    setTimer(0);
    try {
      await navigator.mediaDevices.getUserMedia({
        audio: true,
      })
      setRecordState(RecordState.START);
      setIsAudioRecording(true);
      setGetMediaError("");
    } catch (err) {
      setIsAudioRecording(false);
      setGetMediaError("No microphone detected. Recording without audio. Enable microphone and rerecord if audio is needed.");
    }
    props.handleRecordStartStateChange(true);
    increment.current = setInterval(() => {
      setTimer((timer) => timer + 1)
    }, 1000);
  }

  const handleAudioStop = () => {
    if (interimTranscript != "" && browserSupportsSpeechRecognition) {
      const newTranscript = {
        "text": interimTranscript,
        "timestamp": interimResultTime,
        "endTime": Date.now() - startTime,
        "end": "transcript"
      };
      transcriptResult.push(newTranscript);
    }
    if(browserSupportsSpeechRecognition) {
      SpeechRecognition.stopListening();
    }
    setDuration(Date.now() - startTime);
    setRecordState(RecordState.STOP);
    props.handleRecordStartStateChange(false);
    clearInterval(increment.current);
    setShowRecordingModal(true);
  }

  const handleOnStop = (file) => {
    setAudioData(file);
  }

  const formatTime = () => {
    const getSeconds = `0${(timer % 60)}`.slice(-2);
    const minutes = `0${Math.floor(timer / 60)}`;
    return `${minutes} : ${getSeconds}`
  }

  const handleRunCode = (filename) => {
    if (!consoleIdeRef.current) {
      return
    }
    let input = "";
    if (inputIdeRef.current) {
      input = inputIdeRef.current.editor.getValue();
    }
    const ide = editorRef.current.editor.getValue();
    setShowCodeRun(false);
    setRandom(random + 1)
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({ data: ide, input, filename })
    };

    fetch(process.env.REACT_APP_TUTORIAL_URL + '/run_script/' + props.languageChosen, requestOptions)
      .then(response => response.json())
      .then(data => {
        let newResult = consoleIdeRef.current.editor.getValue() + "> " + data.output;
        if (data.time) {
          newResult += "> Time taken: " + (Math.ceil(data.time * 1000)/1000).toFixed(3) + "s\n";
        }
        consoleIdeRef.current.editor.setValue(newResult);
        consoleIdeRef.current.editor.clearSelection();
        consoleIdeRef.current.editor.session.setScrollTop(9999999);
        const output = data.output.toLowerCase();
        
        if (output.includes("error") || output.includes("exception")) {
          const sentenceArray = output.split("\n")
          for (const sentence of sentenceArray) {
            if (sentence.includes("error") || sentence.includes("exception")) {
              let consoleErrorString = ""
              for (const word of sentence.split(" ")) {
                if (props.languageChosen == "python") {
                  if (!word.includes("'")) {
                    consoleErrorString += word + " ";
                  }
                }
                if (props.languageChosen == "java" || props.languageChosen == "javascript") {
                  if (word.includes("error") || word.includes("exception")) {
                    consoleErrorString += word + " ";
                  }
                }
              }
              setConsoleError(consoleErrorString);
            }
          }
        } else {
          setConsoleError("");
        }
        setShowCodeRun(true);
      });
  }

  const handleCompileCode = (filename) => {
    if (!consoleIdeRef.current) {
      return
    }
    const ide = editorRef.current.editor.getValue();
    setShowCompile(false);
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({ data: ide, filename })
    };

    fetch(process.env.REACT_APP_TUTORIAL_URL + '/compile_script/' + props.languageChosen, requestOptions)
      .then(response => response.json())
      .then(data => {
        let newResult = consoleIdeRef.current.editor.getValue() + "> " + data.output;
        if (data.time) {
          newResult += "> Compile time: " + (Math.ceil(data.time * 1000)/1000).toFixed(3) + "s\n";
        }
        consoleIdeRef.current.editor.setValue(newResult);
        consoleIdeRef.current.editor.clearSelection();
        consoleIdeRef.current.editor.session.setScrollTop(9999999);
        
        // Set console error if compilation failed
        if (!data.success && data.output) {
          const output = data.output.toLowerCase();
          if (output.includes("error") || output.includes("exception")) {
            const sentenceArray = output.split("\n")
            for (const sentence of sentenceArray) {
              if (sentence.includes("error") || sentence.includes("exception")) {
                let consoleErrorString = ""
                for (const word of sentence.split(" ")) {
                  if (props.languageChosen == "java") {
                    if (word.includes("error") || word.includes("exception")) {
                      consoleErrorString += word + " ";
                    }
                  }
                }
                setConsoleError(consoleErrorString);
              }
            }
          }
        } else {
          setConsoleError("");
        }
        setShowCompile(true);
      });
  }

  const handleSaveRecording = async () => {
    // save recording
    setBackdropOpen(true)
    let input = "";
    if (inputIdeRef.current) {
      input = inputIdeRef.current.editor.getValue();
    }
    let ide = "";
    if (editorRef.current) {
      ide = editorRef.current.editor.getValue();
    }
    if (isAudioRecording) {
      const toBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(",")[1]);
        reader.onerror = error => reject(error);
      })

      const encodedFile = await toBase64(audioData.blob);
      const form = new FormData();
      form.append('file', encodedFile)
      form.append('tutorial_section_id', id)
      form.append('keystroke', JSON.stringify(keystrokes))
      form.append('consoleAction', JSON.stringify(consoleActions))
      form.append('consoleScrollAction', JSON.stringify(consoleScrollActions))
      form.append('inputKeystrokes', JSON.stringify(inputKeystrokes))
      form.append('inputScrollAction', JSON.stringify(inputScrollActions))
      form.append('layoutAction', JSON.stringify(layoutActions))
      form.append('selectAction', JSON.stringify(selectActions))
      form.append('scrollAction', JSON.stringify(scrollActions))
      form.append('editorScrollAction', JSON.stringify(editorScrollActions))
      form.append('name', props.tutorialSectionTitle)
      form.append('tutorial_type', "Code")
      form.append('language', props.languageChosen)
      form.append('description', props.description)
      form.append('code_content', ide)
      form.append('code_input', input)
      form.append('transcript', JSON.stringify(transcriptResult))
      form.append('duration', duration)
      const requestOptions = {
        method: 'POST',
        body: form
      };

      fetch(process.env.REACT_APP_TUTORIAL_URL + '/upload_recording', requestOptions)
        .then(response => response.json())
        .then(data => {
          if (data.message == "success") {
            setShowRecordingModal(false);
            setBackdropOpen(false);
            setRecordingFound(true)
          }
        })

    } else {
      const form = new FormData();
      form.append('tutorial_section_id', id)
      form.append('keystroke', JSON.stringify(keystrokes))
      form.append('consoleAction', JSON.stringify(consoleActions))
      form.append('consoleScrollAction', JSON.stringify(consoleScrollActions))
      form.append('inputKeystrokes', JSON.stringify(inputKeystrokes))
      form.append('inputScrollAction', JSON.stringify(inputScrollActions))
      form.append('layoutAction', JSON.stringify(layoutActions))
      form.append('selectAction', JSON.stringify(selectActions))
      form.append('scrollAction', JSON.stringify(scrollActions))
      form.append('editorScrollAction', JSON.stringify(editorScrollActions))
      form.append('name', props.tutorialSectionTitle)
      form.append('tutorial_type', "Code")
      form.append('language', props.languageChosen)
      form.append('description', props.description)
      form.append('code_content', ide)
      form.append('code_input', input)
      form.append('duration', duration)

      const requestOptions = {
        method: 'POST',
        body: form
      };

      fetch(process.env.REACT_APP_TUTORIAL_URL + '/upload_recording', requestOptions)
        .then(response => response.json())
        .then(data => {
          if (data.message == "success") {
            setShowRecordingModal(false);
            setGetMediaError("");
            setBackdropOpen(false);
          }
        })
    }
  }

  const handleUploadMarkdown = async (e) => {
    const file = e.target.files[0];
    
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = (e.target.result)
      props.handleDescriptionChange(text)
    };
    reader.readAsText(file)
  }

  const handleClearOutput = () => {
    consoleIdeRef.current.editor.setValue("");
  }

  const handlePreSearch = () => {
    // handle search when user click on search button. whenever console has error, it will suggest stackoverflow thread
    setStackoverflowSuggestedResult([])
    if (consoleError) {
      setStackoverflowLoading(true);
      const requestOptions = {
        method: 'GET'
      }
      fetch("https://api.stackexchange.com/2.3/search/advanced?page=1&pagesize=5&order=desc&sort=relevance&tagged=" + props.languageChosen + "&body=" + consoleError + "&site=stackoverflow&key=" + process.env.REACT_APP_STACKEXCHANGE_KEY + "&filter=withbody", requestOptions)
        .then(response => response.json())
        .then(data => {
          setStackoverflowLoading(false);
          setStackoverflowSuggestedResult(data.items);
        })
    }
    setShowSearchModal(true)
  }

  const handleStackoverflowSearchResult = (keyword) => {
    // handle search on Stackoverflow tab
    if (keyword){
      setStackoverflowLoading(true);
      const requestOptions = {
        method: 'GET'
      }
      fetch("https://api.stackexchange.com/2.3/search/advanced?page=1&pagesize=5&order=desc&sort=relevance&tagged=" + props.languageChosen + "&body=" + keyword + "&site=stackoverflow&key=" + process.env.REACT_APP_STACKEXCHANGE_KEY + "&filter=withbody", requestOptions)
        .then(response => response.json())
        .then(data => {
          setStackoverflowResult(data.items);
          setStackoverflowLoading(false);
        })
    }
  }

  const removeTagsAndCodes = (text) => {
    // remove the html tags and code tag from markdown description
    const strippedText = decode(text.replace(/<(.|\n)*?>/g, '').replace(/\n/g, ' '));
    const strippedArray = strippedText.split(" ");
    if(strippedArray.length > 30) {
      return strippedArray.slice(0,30).join(" ") + "...";
    }
    return strippedText;
  }
  
  const handleLayoutDropdown = (value) => {
    if (value.props.children[1] == "Save Layout") {
      saveLayout();
    } else if (value.props.children[1] == "Load Saved Layout") {
      props.layoutRef.current.loadLayout(authorLayout);
      updateLayoutActions();
    } else if (value.props.children[1] == "Restore Layout") {
      props.layoutRef.current.loadLayout(defaultLayout);
      updateLayoutActions();
    }
  }

  const uploadSample = () => {
    props.handleDescriptionChange(sampleDescription);
    inputIdeRef.current.editor.setValue(sampleInput);
    inputIdeRef.current.editor.clearSelection();
    switch(props.languageChosen) {
      case "python":
        editorRef.current.editor.setValue(samplePythonCode);
        break;
      case "java":
        editorRef.current.editor.setValue(sampleJavaCode);
        break;
      case "javascript":
        editorRef.current.editor.setValue(sampleJavaScriptCode);
        break;
    }
    editorRef.current.editor.clearSelection();
  }

  return (
    <Context.Provider 
      value={{
        showCodeRun,
        showCompile,
        "description": props.description,
        ide,
        random,
        editorCursor,
        "filename": props.filename,
        consoleError,
        handlePreSearch
      }}
    >
      <div style={{width: "100%"}}>
        <Grid item xs={12} className={classes.gridHeader}>
        <div className={classes.gridHeaderButton}>
          <div>
            <input
              className={classes.upload}
              accept=".md"
              id="contained-button-file"
              type="file"
              onChange={(e) => handleUploadMarkdown(e)}
              onClick={(e) => e.target.value = null}
            />
            <label htmlFor="contained-button-file">
              <Hidden xsDown>
                <Button component="span" id="upload-button">
                  <PublishIcon />
                  Upload
                </Button>
              </Hidden>
              <Hidden smUp>
                <Tooltip title="Upload">
                  <Button justIcon component="span">
                    <PublishIcon />
                  </Button>
                </Tooltip>
              </Hidden>
            </label>
          </div>
          <div>
            <Hidden xsDown>
              <Button onClick={() => uploadSample()}>
                <TextRotateUpIcon/>
                Upload Sample
              </Button>
            </Hidden>
            <Hidden smUp>
              <Tooltip title="Upload Sample">
                <Button justIcon onClick={() => uploadSample()}>
                  <TextRotateUpIcon/>
                </Button>
              </Tooltip>
            </Hidden>
          </div>

          {(!props.recordStartState)
            ? (
              <div id="start-recording-button">
                <Hidden xsDown>
                  <Button className={classes.button} onClick={() => handleAudioStart()}>
                    <FiberManualRecordIcon style={{ color: "red" }} />
                      Start Recording
                  </Button>
                </Hidden>
                <Hidden smUp>
                  <Tooltip title="Start Recording">
                    <Button justIcon className={classes.button} onClick={() => handleAudioStart()}>
                      <FiberManualRecordIcon style={{ color: "red" }} />
                    </Button>
                  </Tooltip>
                </Hidden>
              </div>
            )
            : (
              <div>
                <Hidden xsDown>
                  <Button className={classes.button} onClick={() => handleAudioStop()}>
                    <StopIcon style={{ color: "black" }} />
                      Stop Recording
                  </Button>
                </Hidden>
                <Hidden smUp>
                  <Tooltip title="Stop Recording">
                    <Button justIcon className={classes.button} onClick={() => handleAudioStop()}>
                      <StopIcon style={{ color: "black" }} />
                    </Button>
                  </Tooltip>
                </Hidden>
              </div>
            )
          }
          <Hidden xsDown>
            <Tooltip title="Preview Section" >
              {recordingFound == false || props.recordStartState 
                ? (
                  <Button id="preview-button" className={classes.previewButton} disabled={recordingFound == false || props.recordStartState }>
                    <VisibilityIcon/>
                    Preview
                  </Button>
                ) : (
                  <Link to={`/tutorial/${props.tutorialId}/${props.sectionSequence}`} target="_blank">
                    <Button id="preview-button" className={classes.previewButton}>
                      <VisibilityIcon/>
                      Preview
                    </Button>
                  </Link>
                )
              }
            </Tooltip>
          </Hidden>
          <Hidden smUp>
            <Tooltip title="Preview Section" >
              {recordingFound == false || props.recordStartState 
                ? (
                  <Button justIcon id="preview-button" className={classes.previewButton} disabled={recordingFound == false || props.recordStartState }>
                    <VisibilityIcon/>
                  </Button>
                ) : (
                  <Link to={`/tutorial/${props.tutorialId}/${props.sectionSequence}`} target="_blank">
                    <Button justIcon id="preview-button" className={classes.previewButton}>
                      <VisibilityIcon/>
                    </Button>
                  </Link>
                )
              }
            </Tooltip>
          </Hidden>
          <div className={classes.audioRecorder}>
            <AudioReactRecorder state={recordState} className={classes.audioRecorder} onStop={(data) => handleOnStop(data)} />
          </div>
          {props.recordStartState && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center' }}><FiberManualRecordIcon className="blinking" style={{ color: "red" }} /><p style={{ margin: "0px" }}>{formatTime()}</p></div>
              <p style={{ margin: "0px" }}>{getMediaError}</p>
              <p style={{ margin: "0px" }}>{!browserSupportsSpeechRecognition && "Speech to text not supported in this browser"}</p>
            </div>
          )}
        </div>
        <div style={{display: 'inline-flex', alignItems: 'center', gap: '8px'}}>
          {/* DEBUG: Primary Action Buttons - Execute Group */}
          <Context.Consumer>
            {(value) => {
              console.log('DEBUG: showCodeRun =', value.showCodeRun);
              console.log('DEBUG: showCompile =', value.showCompile);
              console.log('DEBUG: filename =', value.filename);
              return value.showCodeRun ? (
                <Button 
                  round 
                  color="success" 
                  onClick={() => {handleRunCode(value.filename); setRandom(value.random + 1)}}
                  style={{backgroundColor: 'green', color: 'white'}}
                >
                  <PlayArrowIcon />
                  <Hidden xsDown>Run</Hidden>
                </Button>
              ) : (
                <Button disabled round color="success" style={{backgroundColor: 'gray'}}>
                  <CircularProgress size={20} />
                  <Hidden xsDown>Run</Hidden>
                </Button>
              );
            }}
          </Context.Consumer>
          
          <Context.Consumer>
            {(value) => value.showCompile ? (
              <Button 
                round 
                color="primary" 
                onClick={() => handleCompileCode(value.filename)}
                style={{backgroundColor: 'blue', color: 'white'}}
              >
                <BuildIcon />
                <Hidden xsDown>Compile</Hidden>
              </Button>
            ) : (
              <Button disabled round color="primary" style={{backgroundColor: 'lightblue'}}>
                <CircularProgress size={20} />
                <Hidden xsDown>Compile</Hidden>
              </Button>
            )}
          </Context.Consumer>

          {/* Divider */}
          <div style={{ width: '1px', height: '32px', backgroundColor: grayColor, margin: '0 4px' }} />

          {/* Helper Actions */}
          <Hidden xsDown>
            <Button onClick={handlePreSearch} size="sm">
              <SearchIcon/>
              Search
            </Button>
            <Tooltip title="Layout Options">
              <Button onClick={(e) => setLayoutMenuAnchor(e.currentTarget)} style={{backgroundColor: 'gray', color: 'white'}}>
                <MoreHorizIcon/>
                Layout
              </Button>
            </Tooltip>
            <Menu
              anchorEl={layoutMenuAnchor}
              open={Boolean(layoutMenuAnchor)}
              onClose={() => setLayoutMenuAnchor(null)}
              keepMounted
            >
              <MenuItem onClick={() => {saveLayout(); setLayoutMenuAnchor(null);}}>
                <SaveIcon style={{marginRight: 8}}/>
                Save Layout
              </MenuItem>
              <MenuItem 
                onClick={() => {props.layoutRef.current.loadLayout(authorLayout); setLayoutMenuAnchor(null);}}
                disabled={authorLayout == null || props.recordStartState}
              >
                <ViewCompactIcon style={{marginRight: 8}}/>
                Load Layout
              </MenuItem>
              <MenuItem 
                onClick={() => {props.layoutRef.current.loadLayout(props.refreshedLayout); setLayoutMenuAnchor(null);}}
                disabled={props.recordStartState}
              >
                <RefreshIcon style={{marginRight: 8}}/>
                Restore Layout
              </MenuItem>
            </Menu>
          </Hidden>
          <Hidden smUp>
            <Tooltip title="Search">
              <Button justIcon onClick={handlePreSearch}><SearchIcon/></Button>
            </Tooltip>
            <Tooltip title="Layout Options">
              <Button justIcon onClick={(e) => setLayoutMenuAnchor(e.currentTarget)}>
                <MoreHorizIcon/>
              </Button>
            </Tooltip>
          </Hidden>
        </div>
      </Grid>

      <Grid container className={classes.gridItem}>
        <Context.Provider 
          value={{
            showCodeRun,
            showCompile,
            "description": props.description,
            ide,
            random,
            editorCursor,
            "filename": props.filename,
            consoleError,
            handlePreSearch
          }}
        >
          <DockLayout
            defaultLayout={defaultLayout}
            ref={props.layoutRef}
            onLayoutChange={recordLayout}
            style={{position: 'absolute', left: 0, top: 100, right: 0, bottom: 0}}
          />
        </Context.Provider>
      </Grid>
      
      {/* Save Recording Modal */}
      <Modal open={showRecordingModal} onClose={() => setShowRecordingModal(false)}>
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
            <h5>Do you want to save this recording?</h5>
          </div>
          <div className={classes.modalFooter + " " + classes.modalFooterCenter} style={{marginTop: '20px'}}>
            <Button onClick={() => setShowRecordingModal(false)}>No</Button>
            <Button onClick={() => handleSaveRecording()} color="success">Yes</Button>
          </div>
        </Box>
      </Modal>

      {/* Search Dialog */}
      <Modal open={showSearchModal} onClose={() => setShowSearchModal(false)}>
        <Box style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: '1200px',
          maxHeight: '90vh',
          backgroundColor: '#fff',
          border: '1px solid #ccc',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          overflow: 'auto'
        }}>
          <div id="classic-modal-slide-title" className={classes.modalHeader}>
            <h4>Search</h4>
            <IconButton
              onClick={() => setShowSearchModal(false)}
              style={{ position: 'absolute', right: 8, top: 8 }}
            >
              ✕
            </IconButton>
          </div>
          <div className={classes.searchModal}>
          <CustomInput
            id="regular"
            inputProps={{
              value: stackoverflowSearchField,
              placeholder: "Type your keywords here to search StackOverflow",
              onChange: (e) => {
                setStackoverflowSearchField(e.target.value)
              },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => handleStackoverflowSearchResult(stackoverflowSearchField)}
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
            formControlProps={{
              style: {
                padding: "0px",
                margin: "0px",
                width: "100%"
              }
            }}
          />
          <div className={classes.searchResult}>
            {!stackoverflowLoading && stackoverflowResult &&
              (
                <List
                  subheader={
                    <ListSubheader component="div" className={classes.listSubheader}>
                      Search Result
                    </ListSubheader>
                  }
                >
                  {stackoverflowResult.map((item) => {
                      return(
                        <ListItem button component="a" key={item.link} href={item.link} target="_blank">
                          <ListItemText primary={decode(item.title)} secondary={removeTagsAndCodes(item.body)}/>
                        </ListItem>
                      )
                    })
                  }
                </List>
              )
            }

            {consoleError && !stackoverflowLoading && stackoverflowSuggestedResult &&
              (
                <List
                  subheader={
                    <ListSubheader component="div" className={classes.listSubheader}>
                      Suggested Threads
                    </ListSubheader>
                  }
                >
                  {stackoverflowSuggestedResult.map((item) => {
                      return(
                        <ListItem button component="a" key={item.link} href={item.link} target="_blank">
                          <ListItemText primary={decode(item.title)} secondary={removeTagsAndCodes(item.body)} />
                        </ListItem>
                      )
                    })
                  }
                </List>
              )
            }
            {stackoverflowLoading &&
              (
                <div className={classes.stackoverflowLoading}>
                  <CircularProgress />
                </div>
              )
            }
          </div>
          </div>
        </Box>
      </Modal>

      <Backdrop className={classes.backdrop} open={backdropOpen}>
        <CircularProgress />
      </Backdrop>
      </div>
    </Context.Provider>
  );
}

TutorialPage.propTypes = {
  languageChosen: PropTypes.string,
  handleDescriptionChange: PropTypes.func,
  handleIdeChange: PropTypes.func,
  handleInputIdeChange: PropTypes.func,
  version: PropTypes.string,
  recordingFound: PropTypes.bool,
  ide: PropTypes.string,
  input: PropTypes.string,
  tutorialId: PropTypes.string,
  userId: PropTypes.string,
  role: PropTypes.string,
  layoutRef: PropTypes.object,
  recordStartState: PropTypes.bool,
  handleRecordStartStateChange: PropTypes.func,
  tutorialSectionTitle: PropTypes.string,
  description: PropTypes.string,
  sectionSequence: PropTypes.number,
  filename: PropTypes.string,
};
