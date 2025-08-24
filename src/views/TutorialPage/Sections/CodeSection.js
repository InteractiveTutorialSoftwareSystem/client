import React, { useState, useRef, useEffect } from "react";
import { flushSync } from 'react-dom';
// useParams import removed as it's not used
import PropTypes from 'prop-types';
// @mui/material components
import { makeStyles } from "@mui/styles";

import Mark from "mark.js";

// core components
import Button from "components/CustomButtons/Button.js";
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Chip from '@mui/material/Chip';
import InputAdornment from "@mui/material/InputAdornment";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import CustomInput from "components/CustomInput/CustomInput.js";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// material ui icon
//dock
import DockLayout from 'rc-dock';
import "rc-dock/dist/rc-dock.css";
import '../../../assets/css/codeSection.css';
//markdown
import ReactMarkdown from 'react-markdown'
// editor
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-sh";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-github";
// audio player
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

import SearchIcon from '@mui/icons-material/Search';
import Close from "@mui/icons-material/Close";
import ErrorIcon from '@mui/icons-material/Error';
import SettingsIcon from '@mui/icons-material/Settings';

// Modal
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
// Dialog, DialogTitle, and DialogContent imports removed as they're not used
import IconButton from "@mui/material/IconButton";
import '../../../assets/css/modal.css';

import {decode} from 'html-entities';

import styles from "assets/jss/material-kit-react/views/tutorialPageSections/codeStyle";

import Highlighter from "react-highlight-words";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div style={{ height: "100%" }}>
          {children}
        </div>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles(styles);
const Context = React.createContext();

// Transition component removed as it's not used
// const Transition = React.forwardRef((props, ref) => {
//   return <Slide direction="down" ref={ref} {...props} />;
// });
// Transition.displayName = 'Transition';

export default function CodeSection(props) {
  const classes = useStyles();
  // id removed as it's not used
  
  const practiceIdeRef = useRef(null);

  const [playbackEvents, setPlaybackEvents] = useState([]);

  const [currentTime, setCurrentTime] = useState(0);
  const [seekPosition, setSeekPosition] = useState(null);


  const [playState, setPlayState] = useState(false);
  
  const [currentKeystroke, setCurrentKeystroke] = useState(0);
  const [currentConsoleAction, setCurrentConsoleAction] = useState(0);
  const [currentConsoleScrollAction, setCurrentConsoleScrollAction] = useState(0);
  const [currentInputKeystroke, setCurrentInputKeystroke] = useState(0);
  const [currentInputScrollAction, setCurrentInputScrollAction] = useState(0);
  const [currentLayoutAction, setCurrentLayoutAction] = useState(0);
  const [currentSelectAction, setCurrentSelectAction] = useState(0);
  const [currentScrollAction, setCurrentScrollAction] = useState(0);
  const [currentEditorScrollAction, setCurrentEditorScrollAction] = useState(0);
  const [currentTranscript, setCurrentTranscript] = useState(0);
  const [currentTranscriptText, setCurrentTranscriptText] = useState("");
  const [searchField, setSearchField] = useState("");
  const [stackoverflowSearchField, setStackoverflowSearchField] = useState("");
  const [consoleError, setConsoleError] = useState("");
  const [stackoverflowLoading, setStackoverflowLoading] = useState(false);
  const [frequentWord, setFrequentWord] = useState([]);
  const [stackoverflowSuggestedResult, setStackoverflowSuggestedResult] = useState([]);
  const [stackoverflowResult, setStackoverflowResult] = useState();
  const [audioSearchResult, setAudioSearchResult] = useState(null);
  const [audioSearchLoading, setAudioSearchLoading] = useState(false);
  const [descriptionSearchResult, setDescriptionSearchResult] = useState(null);
  const [descriptionInnerText, setDescriptionInnerText] = useState("");
  const [descriptionSearchOccurence, setDescriptionSearchOccurence] = useState([]);
  const [showClearSearch, setShowClearSearch] = useState(false);

  const [showCodeRun, setShowCodeRun] = useState(true);
  const [showCompile, setShowCompile] = useState(true);
  const [ide, setIde] = useState("");
  const [playbackCursor, setPlaybackCursor] = useState([1,1]);
  const [practiceCursor, setPracticeCursor] = useState([1,1]);
  const [random, setRandom] = useState(0);

  const [playbackSettingsAnchor, setPlaybackSettingsAnchor] = useState(null)
  const [playbackSpeed, setPlaybackSpeed]=useState(1)
  const [showCaption, setShowCaption] = useState(true);


  const tutorTab = () => {
    // Python Tutor tab contents
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
                    Link to Java Tutor
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

  const practiceTab = () => {
    return {id: 'practice', title: 'Practice', cached: true, closable: true, content: (
      <div className={classes.editorPane}>
        <AceEditor
          className={classes.editor}
          mode={props.languageChosen}
          theme={props.themeChosen}
          name="practiceIde"
          ref={practiceIdeRef}
          editorProps={{ $blockScrolling: true }}
          onCursorChange={(e) => setPracticeCursor([e.cursor.row + 1, e.cursor.column + 1])}
          setOptions={{enableLiveAutocompletion:true,}}
        />
        <Context.Consumer>
          {(value) => <div className={classes.bottomLeftDiv}>
            Ln {value.practiceCursor[0]}, Col {value.practiceCursor[1]} | Spaces: 4 | Filename: {value.filename}
          </div>}
        </Context.Consumer>
      </div>
    )}
  }

  const defaultLayout = {
    dockbox: {
      mode: 'horizontal',
      children: [
        {
          size: 400,
          tabs: [
            {id: 'description-preview', title: 'Description', closable: true, content: (
              <div id="markdownDiv" className={classes.markdownDiv}>
                <Context.Consumer>
                  {(value) =>
                    <ReactMarkdown className={classes.markdownResult}>{value.description}</ReactMarkdown>
                  }
                </Context.Consumer>
                <Context.Consumer>
                  {(value) => value.showClearSearch && <div className={classes.clearSearchDiv} onClick={() => handleClearDescriptionSearch()}>
                    <Close/>Clear Search
                  </div>}
                </Context.Consumer>
              </div>
          )}]
        }, 
        {
          mode: 'vertical',
          size: 600,
          children: [
            {
              size: 600,
              tabs: [
                {id: 'editor', title: 'Playback', cached: true, closable: true, content: (
                  <div className={classes.editorPane}>
                    <AceEditor
                      className={classes.editor}
                      mode={props.languageChosen}
                      theme={props.themeChosen}
                      name="playbackIde"
                      ref={props.playbackIdeRef}
                      editorProps={{ $blockScrolling: true }}
                      onChange={(e) => setIde(e)}
                      onCursorChange={(e) => setPlaybackCursor([e.cursor.row + 1, e.cursor.column + 1])}
                      setOptions={{enableLiveAutocompletion:true,}}
                    />
                    <Context.Consumer>
                        {(value) => <div className={classes.bottomLeftDiv}>
                          Ln {value.playbackCursor[0]}, Col {value.playbackCursor[1]} | Spaces: 4 | Filename: {value.filename}
                        </div>}
                    </Context.Consumer>
                  </div>
                )}, 
                practiceTab()
              ]
            },
            {
              mode: 'horizontal',
              size: 400,
              children: [
                {
                  size: 100,
                  tabs: [
                    {id: 'input', title: 'Input', cached: true, closable: true, content: (
                      <AceEditor
                        className={classes.editor}
                        mode="sh"
                        theme={props.themeChosen}
                        name="input"
                        ref={props.inputIdeRef}
                        editorProps={{ $blockScrolling: true }}
                        highlightActiveLine={false}
                        showGutter={false}
                        showPrintMargin={false}
                        setOptions={{
                          showLineNumbers: false 
                        }}
                      />
                    )}
                  ]
                },
                {
                  tabs: [
                    {id: 'output', title: 'Console', cached: true, closable: true, content: (
                      <div className={classes.editorPane}>
                        <AceEditor
                          className={classes.editor}
                          mode="sh"
                          theme={props.themeChosen}
                          name="console"
                          ref={props.consoleIdeRef}
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
                              <IconButton onClick={() => {props.setShowSearchModal(true); props.setTabValue(1)}}>
                                <ErrorIcon color="error" />
                              </IconButton>
                            }
                          </Context.Consumer>
                          <Button round onClick={() => handleClearConsole()}>
                            Clear Output
                          </Button>
                        </div>
                      </div>
                    )},
                    tutorTab(),
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  };

  useEffect(() => {
    if(props.showSearchModal == true) {
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
    }
  }, [props.showSearchModal])

  useEffect(() => {
    setFrequentWord(props.frequentWord)
  }, [props.frequentWord])

  useEffect(() => {
    const inputRefObserver = new MutationObserver((mutations, me) => {
      if (props.inputIdeRef) {
        props.inputIdeRef.current.editor.setValue(props.input);
        props.inputIdeRef.current.editor.clearSelection();
        me.disconnect();
        return;
      }
    })
    inputRefObserver.observe(document, {
      childList: true,
      subtree: true
    });
  }, [props.input])



  useEffect(() => {
    const descriptionDiv = document.getElementById("description-preview")
    setDescriptionInnerText(descriptionDiv.innerText.split('\n').filter((elem) => elem != ""))
  }, [props.description])

  const handlePlaybackRun = () => {
    // Playback tab code run function
    if (!props.consoleIdeRef.current) {
      return
    }
    let input = "";
    if (props.inputIdeRef.current) {
      input = props.inputIdeRef.current.editor.getValue();
    }
    const ide = props.playbackIdeRef.current.editor.getValue();
    setShowCodeRun(false);
    setRandom(random + 1);
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({ data: ide, input, filename: props.filename })
    };

    fetch(process.env.REACT_APP_TUTORIAL_URL + '/run_script/' + props.languageChosen, requestOptions)
      .then(response => response.json())
      .then(data => {
        let newResult = props.consoleIdeRef.current.editor.getValue() + "> " + data.output;
        if (data.time) {
          newResult += "> Time taken: " + (Math.ceil(data.time * 1000)/1000).toFixed(3) + "s\n";
        }
        props.consoleIdeRef.current.editor.setValue(newResult);
        props.consoleIdeRef.current.editor.clearSelection();
        props.consoleIdeRef.current.editor.session.setScrollTop(99999999);
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

  const handlePlaybackCompile = () => {
    // Playback tab code compile function
    if (!props.consoleIdeRef.current) {
      return
    }
    const ide = props.playbackIdeRef.current.editor.getValue();
    setShowCompile(false);
    setRandom(random + 1);
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({ data: ide, filename: props.filename })
    };

    fetch(process.env.REACT_APP_TUTORIAL_URL + '/compile_script/' + props.languageChosen, requestOptions)
      .then(response => response.json())
      .then(data => {
        let newResult = props.consoleIdeRef.current.editor.getValue() + "> " + data.output;
        if (data.time) {
          newResult += "> Compile time: " + (Math.ceil(data.time * 1000)/1000).toFixed(3) + "s\n";
        }
        props.consoleIdeRef.current.editor.setValue(newResult);
        props.consoleIdeRef.current.editor.clearSelection();
        props.consoleIdeRef.current.editor.session.setScrollTop(99999999);
        
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

  const handlePracticeRun = () => {
    // Practice tab code run function
    if (!props.consoleIdeRef.current) {
      return
    }
    let input = "";
    if (props.inputIdeRef.current) {
      input = props.inputIdeRef.current.editor.getValue();
    }
    const ide = practiceIdeRef.current.editor.getValue();
    setShowCodeRun(false);
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({ data: ide, input, filename: props.filename })
    };

    fetch(process.env.REACT_APP_TUTORIAL_URL + '/run_script/' + props.languageChosen, requestOptions)
      .then(response => response.json())
      .then(data => {
        let newResult = props.consoleIdeRef.current.editor.getValue() + "> " + data.output;
        if (data.time) {
          newResult += "> Time taken: " + (Math.ceil(data.time * 1000)/1000).toFixed(3) + "s\n";
        }
        props.consoleIdeRef.current.editor.setValue(newResult);
        props.consoleIdeRef.current.editor.clearSelection();
        props.consoleIdeRef.current.editor.session.setScrollTop(999999999);
        setShowCodeRun(true);
      });
  }

  const handlePracticeCompile = () => {
    // Practice tab code compile function
    if (!props.consoleIdeRef.current) {
      return
    }
    const ide = practiceIdeRef.current.editor.getValue();
    setShowCompile(false);
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({ data: ide, filename: props.filename })
    };

    fetch(process.env.REACT_APP_TUTORIAL_URL + '/compile_script/' + props.languageChosen, requestOptions)
      .then(response => response.json())
      .then(data => {
        let newResult = props.consoleIdeRef.current.editor.getValue() + "> " + data.output;
        if (data.time) {
          newResult += "> Compile time: " + (Math.ceil(data.time * 1000)/1000).toFixed(3) + "s\n";
        }
        props.consoleIdeRef.current.editor.setValue(newResult);
        props.consoleIdeRef.current.editor.clearSelection();
        props.consoleIdeRef.current.editor.session.setScrollTop(999999999);
        setShowCompile(true);
      });
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

  const handleClearConsole = () => {
    props.consoleIdeRef.current.editor.setValue("");
  }

  function play() {
    // Function when Media Player play button is clicked
    setPlayState(true);
    
    if (props.playbackIdeRef.current) {
      props.playbackIdeRef.current.editor.clearSelection();
    }
    if (props.keystrokes && props.keystrokes.length > 0) {
      for (var i = currentKeystroke; i < props.keystrokes.length; i++) {
        createIdeEvent(i, currentTime);
      }
    }
    if (props.consoleActions && props.consoleActions.length > 0) {
      for (var i = currentConsoleAction; i < props.consoleActions.length; i++) {
        createConsoleEvent(i, currentTime);
      }
    }
    if (props.consoleScrollActions && props.consoleScrollActions.length > 0) {
      for (var i = currentConsoleScrollAction; i < props.consoleScrollActions.length; i++){
        createConsoleScrollEvent(i, currentTime);
      }
    }
    if(props.inputKeystrokes !== null && props.inputKeystrokes !== undefined ){
      for (var i = currentInputKeystroke; i < props.inputKeystrokes.length; i++){
        createInputEvent(i, currentTime);
      }
    }
    if (props.inputScrollActions && props.inputScrollActions.length > 0) {
      for (var i = currentInputScrollAction; i < props.inputScrollActions.length; i++){
        createInputScrollEvent(i, currentTime);
      }
    }
    if (props.layoutActions && props.layoutActions.length > 0) {
      for (var i = currentLayoutAction; i < props.layoutActions.length; i++) {
        createLayoutEvent(i, currentTime);
      }
    }
    if (props.selectActions && props.selectActions.length > 0) {
      for (var i = currentSelectAction; i < props.selectActions.length; i++) {
        createMarkdownSelectEvent(i, currentTime);
      }
    }
    if (props.scrollActions && props.scrollActions.length > 0) {
      for (var i = currentScrollAction; i < props.scrollActions.length; i++) {
        createMarkdownScrollEvent(i, currentTime);
      }
    }
    if (props.editorScrollActions && props.editorScrollActions.length > 0) {
      for (var i = currentEditorScrollAction; i < props.editorScrollActions.length; i++){
        createEditorScrollEvent(i, currentTime);
      }
    }
    if (props.transcript) {
      for (var i = currentTranscript; i < props.transcript.length; i++) {
        createTranscriptEvent(i, currentTime);
      }
    }
  }

  function createIdeEvent(i, time) {
    // Handles code and selection playback in the Playback tab
    const k = props.keystrokes[i];

    const evt = setTimeout(() => {
      setCurrentKeystroke(i);
      if (props.playbackIdeRef.current) {
        props.playbackIdeRef.current.editor.clearSelection();

        if (k.content) {
          props.playbackIdeRef.current.editor.setValue(k.content,1);
        } else {
          props.playbackIdeRef.current.editor.setValue("",1);
        }

        props.playbackIdeRef.current.editor.selection.setRange(k.selection);
      }
    }, (k.timestamp - time)/playbackSpeed);

    playbackEvents.push(evt);
  }

  function createConsoleEvent(i, time) {
    // Handles code and selection playback in the Console tab
    const k = props.consoleActions[i];
    
    const evt = setTimeout(() => {
      setCurrentConsoleAction(i);
      if (props.consoleIdeRef.current) {
        props.consoleIdeRef.current.editor.clearSelection();

        if (k.content) {
          props.consoleIdeRef.current.editor.setValue(k.content,1);
        } else {
          props.consoleIdeRef.current.editor.setValue("",1);
        }

        props.consoleIdeRef.current.editor.selection.setRange(k.selection);
      }
    }, (k.timestamp - time)/playbackSpeed);

    playbackEvents.push(evt);
  }

  function createConsoleScrollEvent(i, time){
    // Handles vertical scroll in console tab
    const k = props.consoleScrollActions[i];

    const evt = setTimeout(() => {
      if (props.consoleIdeRef.current) {
        props.consoleIdeRef.current.editor.session.setScrollTop(k.scroll);
      }
    }, (k.timestamp - time)/playbackSpeed);

    playbackEvents.push(evt)
  }

  function createInputEvent(i, time) {
    // Handles code and selection playback in the input tab
    const k = props.inputKeystrokes[i];

    if(k !== undefined){
      const evt = setTimeout(() => {
        setCurrentInputKeystroke(i);
        if (props.inputIdeRef.current) {
          props.inputIdeRef.current.editor.clearSelection();
          
          if (k.content) {
            props.inputIdeRef.current.editor.setValue(k.content,1);
          } else {
            props.inputIdeRef.current.editor.setValue("",1);
          }
          
          props.inputIdeRef.current.editor.selection.setRange(k.selection);
        }
      }, (k.timestamp - time)/playbackSpeed);
      
      playbackEvents.push(evt);
    }
  }

  function createInputScrollEvent(i, time){
    // Handles vertical scroll playback in input tab
    const k = props.inputScrollActions[i];

    if(k !== undefined){
      const evt = setTimeout(() => {
        if (props.inputIdeRef.current) {
          props.inputIdeRef.current.editor.session.setScrollTop(k.scroll);
        }
      }, (k.timestamp - time)/playbackSpeed);

      playbackEvents.push(evt)
    }
  }

  function createLayoutEvent(i, time) {
    // Handles playback layout changes
    var k = props.layoutActions[i];
    if(k !== undefined){
      var evt = setTimeout(() => {
        props.layoutRef.current.loadLayout(props.layoutActions[i].layout);
        props.layoutRef.current.dockMove(practiceTab(), 'editor', "after-tab")
        props.layoutRef.current.dockMove(props.layoutRef.current.find('editor'), 'practice', "before-tab")
      }, (k.timestamp - time)/playbackSpeed);

      playbackEvents.push(evt);
    }
  }

  function createMarkdownScrollEvent(i, time) {
    // Handles vertical scroll in Description tab
    const k = props.scrollActions[i];

    if(k !== undefined){
      const evt = setTimeout(() => {
        const markdownDivElement = document.getElementById('markdownDiv');
        if (markdownDivElement) {
          const scrollPercent = k.scroll;
          const scrollHeight = markdownDivElement.scrollHeight - markdownDivElement.clientHeight;
          const scrollPosition = scrollPercent * scrollHeight;
          markdownDivElement.scrollTop = scrollPosition;
        }
      },(k.timestamp - time)/playbackSpeed);

      playbackEvents.push(evt);
    }
  }
  function createEditorScrollEvent(i, time) {
    // Handles vertical scroll in editor 
    const k = props.editorScrollActions[i];
    if(k !== undefined){
      const evt = setTimeout(() => {
        if (props.playbackIdeRef.current) {
          props.playbackIdeRef.current.editor.session.setScrollTop(k.scroll);
        }
      }, (k.timestamp - time)/playbackSpeed);

      playbackEvents.push(evt)
    }
  }

  function createMarkdownSelectEvent(i, time) {
    // Handles selection in Description tab
    const k = props.selectActions[i];
    if(k !== undefined){
      const evt = setTimeout(() => {
        try{
          use(JSON.parse(k.data));
        } catch(e){}
      },(k.timestamp - time)/playbackSpeed);

      playbackEvents.push(evt);
    }
  }

  function createTranscriptEvent(i, time) {
    const k = props.transcript[i];
    if(k !== undefined){
      const evt = setTimeout(() => {
        setCurrentTranscriptText(k.text)
      },(k.timestamp - time)/playbackSpeed);
      playbackEvents.push(evt)
    }
    if (!playState){
      const evt2 = setTimeout(() => {
        setCurrentTranscriptText("")
      }, (k.endTime - time)/playbackSpeed);
      playbackEvents.push(evt2)
    }
  }

  function findEle(tagName, innerHTML) {
    // returns DOM element of matching tag name and inner HTML
    const list = document.getElementsByTagName(tagName);
    for (let i = 0; i < list.length; i++) {
      if (list[i].innerHTML == innerHTML) {
        return list[i];
      }
    }
  }
  
  function show(startNode,startIsText,startOffset,endNode,endIsText,endOffset,sP,eP) {
    // select element with window.getSelection
    let s, e;
    if (startIsText) {
      const childs = sP.childNodes;
      for (let i = 0; i < childs.length; i++) {
        if (childs[i].nodeType == 3 && childs[i].nodeValue == startNode)
          s = childs[i];
      }
    } else {
      s = startNode;
    }
    if (endIsText) {
      const childs = eP.childNodes;
      for (let i = 0; i < childs.length; i++) {
        if (childs[i].nodeType == 3 && childs[i].nodeValue == endNode)
          e = childs[i];
      }
    } else {
      e = startNode;
    }
    const range = document.createRange();
    range.setStart(s, startOffset);
    range.setEnd(e, endOffset);
  
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }
  
  function use(obj) {
    const sP = findEle(obj.startTagName, obj.startHTML);
    const eP = findEle(obj.endTagName, obj.endHTML);
    show(
      obj.startNode,
      obj.startIsText,
      obj.startOffset,
      obj.endNode,
      obj.endIsText,
      obj.endOffset,
      sP,
      eP
    );
  }

  function pause() {
    setPlayState(false);
    for (let i = 0; i < playbackEvents.length; i++) {
        clearTimeout(playbackEvents[i]);
    }
    setPlaybackEvents([]);
    const time = props.player.current.audio.current.currentTime * 1000;
    setCurrentTime(time);
    return Promise.resolve(time);
  }

  function seeked() {
    // Set respective states of playbook when Media Player is seeked
    // Continue to play from seeked if Media Player was playing when seeked
    var currentPlayState = playState;
    props.player.current.audio.current.pause();

    pause()
    .then((time)=>{
      // Use flushSync to ensure state updates happen synchronously for React 18
      flushSync(() => {
        var keystroke = getCurrentElement(props.keystrokes, time);
        setCurrentKeystroke(keystroke);
        
        var consoleAction = getCurrentElement(props.consoleActions, time);
        setCurrentConsoleAction(consoleAction);
        
        var consoleScrollAction = getCurrentElement(props.consoleScrollActions, time);
        setCurrentConsoleScrollAction(consoleScrollAction);

        if(props.inputKeystrokes !== null && props.inputKeystrokes !== undefined){
          var inputKeystroke = getCurrentElement(props.inputKeystrokes, time);
          setCurrentInputKeystroke(inputKeystroke);
        }
        var inputScrollAction = getCurrentElement(props.inputScrollActions, time);
        setCurrentInputScrollAction(inputScrollAction);
        
        var layoutAction = getCurrentElement(props.layoutActions, time);
        setCurrentLayoutAction(layoutAction);
        
        var selectAction = getCurrentElement(props.selectActions, time);
        setCurrentSelectAction(selectAction);
        
        var scrollAction = getCurrentElement(props.scrollActions, time);
        setCurrentScrollAction(scrollAction);
        
        var editorScrollAction = getCurrentElement(props.editorScrollActions, time);
        setCurrentEditorScrollAction(editorScrollAction);

        if (props.transcript) {
          var transcript = getCurrentElement(props.transcript, time);
          setCurrentTranscript(transcript);
        }
      });
      
      // Create events after state is flushed
      var keystroke = getCurrentElement(props.keystrokes, time);
      if (keystroke >= 0) createIdeEvent(keystroke, time);
      
      var consoleAction = getCurrentElement(props.consoleActions, time);
      if (consoleAction >= 0) createConsoleEvent(consoleAction, time);
      
      var consoleScrollAction = getCurrentElement(props.consoleScrollActions, time);
      if (consoleScrollAction >= 0) createConsoleScrollEvent(consoleScrollAction, time);

      if(props.inputKeystrokes !== null && props.inputKeystrokes !== undefined){
        var inputKeystroke = getCurrentElement(props.inputKeystrokes, time);
        if (inputKeystroke >= 0) createInputEvent(inputKeystroke, time);
      } else{
        var inputKeystroke = ""
      }
      var inputScrollAction = getCurrentElement(props.inputScrollActions, time);
      if (inputScrollAction >= 0) createInputScrollEvent(inputScrollAction, time);
      
      var layoutAction = getCurrentElement(props.layoutActions, time);
      if (layoutAction >= 0) createLayoutEvent(layoutAction, time);
      
      var selectAction = getCurrentElement(props.selectActions, time);
      if (selectAction >= 0) createMarkdownSelectEvent(selectAction, time);
      
      var scrollAction = getCurrentElement(props.scrollActions, time);
      if (scrollAction >= 0) createMarkdownScrollEvent(scrollAction, time);
      
      var editorScrollAction = getCurrentElement(props.editorScrollActions, time);
      if (editorScrollAction >= 0) createEditorScrollEvent(editorScrollAction, time);

      if (props.transcript) {
        var transcript = getCurrentElement(props.transcript, time);
        if (transcript >= 0) createTranscriptEvent(transcript, time);
      } else {
        var transcript = "";
      }
      return Promise.resolve([keystroke, consoleAction, consoleScrollAction, inputKeystroke, inputScrollAction, layoutAction, selectAction, scrollAction, editorScrollAction, transcript, time]);
    })
    .then(([keystroke, consoleAction, consoleScrollAction, inputKeystroke, inputScrollAction, layoutAction, selectAction, scrollAction, editorScrollAction, transcript, time])=>{
      if (currentPlayState) {
        props.player.current.audio.current.play();
      }
    });
    
  }

  function getCurrentElement(elementArray, time) {
    // return index of elementArray which would be run at given time (it's a binary search) 
    if (!elementArray || elementArray.length === 0) {
      return -1;
    }
    var bottom = 0;
    var top = elementArray.length - 1;
    var mid = 0;
    while (bottom <= top) {
      mid = Math.floor((bottom + top) / 2);
      if (time < elementArray[mid].timestamp) {
        if (mid == 0) {
          return -1;
        } else {
          top = mid - 1;
        }
      } else {
        if (mid == elementArray.length - 1) {
          break;
        } else if (time >= elementArray[mid + 1].timestamp) {
          bottom = mid + 1;
        } else {
          break;
        }
      }
    }
    return mid;
  }


  const handleSearchResult = (keyword) => {
    // return search result from user's input
    setAudioSearchLoading(true);
    setSearchField(keyword);
    
    const descriptionSearch = descriptionInnerText.filter((item) => item.toLowerCase().includes(keyword))
    setDescriptionSearchResult(descriptionSearch)
    const numberOfOccurence = descriptionSearch.map((item) => (item.toLowerCase().match(new RegExp(keyword, "g")) || []).length)
    setDescriptionSearchOccurence(numberOfOccurence)

    const requestOptions = {
      method: 'GET'
    }
    fetch(process.env.REACT_APP_TUTORIAL_URL + "/tutorial_section/search/keyword/" + keyword + "/" + props.tutorialSectionId, requestOptions)
      .then(response => response.json())
      .then(data => {
        setAudioSearchLoading(false);
        setAudioSearchResult(data.result);
      })
  }
  
  const handleStackoverflowSearchResult = (keyword) => {
    // handle search in StackOverflow tab
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

  
  const formatTime = (time) => {
    // format time to MM:SS
    const getSeconds = `0${Math.floor(time/1000)}`.slice(-2);
    const minutes = `0${Math.floor(time/(1000 * 60))}`;
    return `${minutes}:${getSeconds}`
  }

  const handleChooseAudioResult = (time) => {
    const context = document.querySelector("#markdownDiv");
    const instance = new Mark(context);
    instance.unmark();
    setShowClearSearch(false);
    props.setShowSearchModal(false);
    if (props.player.current?.audio.current) {
      props.player.current.audio.current.currentTime = time/1000;
      props.player.current.audio.current.playbackRate = playbackSpeed;
      props.player.current.audio.current.play();
    }
  }

  const handleTabChange = (event, newValue) => {
    props.setTabValue(newValue);
  };

  const handleChooseDescriptionResult = (i) => {
    props.setShowSearchModal(false);

    const counter = []
    let startIndex;
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const current = descriptionSearchOccurence.slice(0, i);
    if (current.length != 0) {
      startIndex = current.reduce(reducer);
    } else {
      startIndex = 0
    }
    
    for (let j = startIndex; j < startIndex + descriptionSearchOccurence[i] ; j++) {
      counter.push(j)
    }

    let currentCounter = 0;
    const options = {
      filter() {
        currentCounter++;
        if (counter.includes(currentCounter - 1)) {
          return true;
        } else {
          return false;
        }
      },
      "each"(node){
        node.scrollIntoView({block: "center"})
      },
    }
    const context = document.querySelector("#markdownDiv");
    const instance = new Mark(context);
    instance.unmark();
    instance.mark(searchField, options);
    setShowClearSearch(true);
  }

  const handleClearDescriptionSearch = () => {
    const context = document.querySelector("#markdownDiv");
    const instance = new Mark(context);
    instance.unmark();
    setShowClearSearch(false);
  }

  
  // Function to detect which tab is currently active
  const getActiveEditorTab = () => {
    // Check which dock tab is currently active by looking for active tab elements
    const activeTabs = document.querySelectorAll('.dock-tab.dock-tab-active');
    
    // Look for active tab with specific text content
    for (let tab of activeTabs) {
      const tabText = tab.textContent || tab.innerText || '';
      
      if (tabText.includes('Practice')) {
        return 'practice';
      }
      if (tabText.includes('Playback')) {
        return 'editor';
      }
    }
    
    // Fallback: try checking refs directly
    if (practiceIdeRef.current && practiceIdeRef.current.editor) {
      const practiceContainer = practiceIdeRef.current.container;
      if (practiceContainer && practiceContainer.offsetParent !== null) {
        return 'practice';
      }
    }
    
    // Default to editor if can't determine
    return 'editor';
  };

  // Expose functions globally for header buttons
  useEffect(() => {
    window.handleRunCode = () => {
      const currentActiveTab = getActiveEditorTab();
      if (currentActiveTab === 'practice') {
        // If practice tab is active, use practice handler
        handlePracticeRun();
      } else {
        // Otherwise use playbook handler
        handlePlaybackRun();
      }
    };
    
    window.handleCompileCode = () => {
      const currentActiveTab = getActiveEditorTab();
      if (currentActiveTab === 'practice') {
        // If practice tab is active, use practice handler
        handlePracticeCompile();
      } else {
        // Otherwise use playback handler  
        handlePlaybackCompile();
      }
    };
    
    return () => {
      // Cleanup
      delete window.handleRunCode;
      delete window.handleCompileCode;
    };
  }, []);
  
  return (
    <div>
      <Grid container spacing={0} className={classes.gridContainer}>
        {/* Body */}
        <Context.Provider
          value={{
            showCodeRun,
            showCompile,
            "description": props.description,
            ide,
            "filename": props.filename,
            random,
            playbackCursor,
            practiceCursor,
            consoleError,
            "setShowSearchModal": props.setShowSearchModal,
            showClearSearch
          }}
        >
        
        <DockLayout
          defaultLayout={defaultLayout}
          ref={props.layoutRef}
          style={{position: 'absolute', left: 0, top: 55, right: 0, bottom: 64}}
        />
        </Context.Provider>
        
        {showCaption ? (
            <Grid container justify="center" className={classes.captionDiv}>
                <h5 className={classes.caption}>{currentTranscriptText}</h5>
            </Grid>
          ) : null
        }
        
        {/* Audio Player */}
        <Grid container className={classes.gridFooter}>
          <AudioPlayer
            autoPlay={false}
            ref={props.player}
            src={props.recordingSrc}
            preload="auto"
            layout="horizontal"
            onPlay={()=>play()}
            onPause={()=>pause()}
            onSeek={()=>{
              console.log("onSeek called - doing nothing");
            }}
            onSeeked={()=>seeked()}
            customAdditionalControls={[
              <div key="playback-settings">
                <IconButton
                  onClick={(e)=>setPlaybackSettingsAnchor(e.currentTarget)}
                 ><SettingsIcon/>
                 </IconButton>
              <Menu                
                keepMounted
                open={playbackSettingsAnchor!==null}
                anchorEl={playbackSettingsAnchor}
                onClose={()=>setPlaybackSettingsAnchor(null)}
              >
                <MenuItem onClick={()=>setShowCaption(!showCaption)}>
                  <Grid container justify="space-between" alignItems="center">
                    <Grid item>Caption</Grid>
                    <Grid item >
                      <Chip label={showCaption?"On":"Off"} size="small"/>
                    </Grid>
                  </Grid>
                </MenuItem>
                {[0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map((val,index)=>
                    <MenuItem 
                    value={val} 
                    key={index}
                    selected={playbackSpeed===val}
                    onClick={e=>{
                          setPlaybackSpeed(val);
                          pause();
                          seeked();
                          if (props.player.current?.audio.current) {
                            props.player.current.audio.current.playbackRate = val;
                          }
                        }}
                      >
                      {val}x
                      </MenuItem>
                  )}
              </Menu>
            </div>
            ]}
          />
        </Grid>
      </Grid>

      {/* Search Dialog */}
      <Modal 
        open={props.showSearchModal} 
        onClose={() => props.setShowSearchModal(false)}
        aria-labelledby="search-modal-title"
      >
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
            <IconButton
              onClick={() => props.setShowSearchModal(false)}
              style={{ position: 'absolute', right: 8, top: 8 }}
            >
              <Close />
            </IconButton>
            <Tabs
              value={props.tabValue}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              aria-label="full width tabs example"
            >
              <Tab label="Tutorial" />
              <Tab label="StackOverflow" />
            </Tabs>
          </div>
          <div id="modal-slide-description" className={classes.searchModal}>
          <TabPanel value={props.tabValue} index={0}>
            <CustomInput
              id="regular"
              inputProps={{
                value: searchField,
                placeholder: "Type your keywords here to search from Tutorial",
                onChange: (e) => {
                  setSearchField(e.target.value)
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={() => handleSearchResult(searchField.toLowerCase())}
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
              <div className={classes.topFiveResult}>
                {frequentWord && (
                  frequentWord.map((data) => {
                    return (
                      <span key={data.key}>
                        <Chip
                          label={data.label}
                          className={classes.chip}
                          onClick={() => {
                            handleSearchResult(data.label.toLowerCase());
                          }}
                        />
                      </span>
                    );
                  })
                )}
              </div>
              {audioSearchResult && !audioSearchLoading &&
                (
                  <List
                    subheader={
                      <ListSubheader component="div" className={classes.listSubheader}>
                        Search Result
                      </ListSubheader>
                    }
                  >
                    {audioSearchResult.length != 0 ?
                      (audioSearchResult.map((item) => {
                        return(
                          <ListItem button component="a" key={item.timestamp} href={item.link} target="_blank" onClick={() => {handleChooseAudioResult(item.timestamp)}}>
                            <Highlighter
                              highlightClassName="YourHighlightClass"
                              searchWords={[searchField]}
                              autoEscape={true}
                              textToHighlight={formatTime(item.timestamp) + " | " + item.text}
                            />
                          </ListItem>
                        )
                      })) : (
                        <p>No result found in Audio</p>
                      )
                    }
                  </List>
                )
              }
              {descriptionSearchResult &&
                (
                  <List
                    subheader={
                      <ListSubheader component="div" className={classes.listSubheader}>
                        Search Result
                      </ListSubheader>
                    }
                  >
                    {descriptionSearchResult.length != 0 ?
                      (descriptionSearchResult.map((item, i) => {
                        return(
                          <ListItem button key={i} onClick={() => handleChooseDescriptionResult(i)}>
                            <Highlighter
                              highlightClassName="YourHighlightClass"
                              searchWords={[searchField]}
                              autoEscape={true}
                              textToHighlight={item}
                            />
                          </ListItem>
                        )
                      })) : (
                        <p>No result found in Description</p>
                      )
                    }
                  </List>
                )
              }
            </div>
          </TabPanel>
          <TabPanel value={props.tabValue} index={1}>
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
                            <ListItemText primary={decode(item.title)} secondary={removeTagsAndCodes(item.body)} />
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
          </TabPanel>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

// Add PropTypes for CodeSection
CodeSection.propTypes = {
  description: PropTypes.string,
  transcript: PropTypes.array,
  layoutRef: PropTypes.object,
  inputIdeRef: PropTypes.object,
  playbackIdeRef: PropTypes.object,
  consoleIdeRef: PropTypes.object,
  player: PropTypes.object,
  filename: PropTypes.string,
  languageChosen: PropTypes.string,
  themeChosen: PropTypes.string,
  keystrokes: PropTypes.array,
  consoleActions: PropTypes.array,
  consoleScrollActions: PropTypes.array,
  inputKeystrokes: PropTypes.array,
  inputScrollActions: PropTypes.array,
  layoutActions: PropTypes.array,
  selectActions: PropTypes.array,
  scrollActions: PropTypes.array,
  editorScrollActions: PropTypes.array,
  recordingSrc: PropTypes.string,
  showSearchModal: PropTypes.bool,
  setShowSearchModal: PropTypes.func,
  frequentWord: PropTypes.array,
  tabValue: PropTypes.number,
  setTabValue: PropTypes.func,
  version: PropTypes.string,
  input: PropTypes.string,
  tutorialSectionId: PropTypes.string
};
