import React, { useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { makeStyles } from "@mui/styles";
import { grayColor, infoColor } from "assets/jss/material-kit-react.js";

const useStyles = makeStyles({
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto'
  },
  playerSection: {
    marginTop: '20px'
  },
  playerWrapper: {
    marginTop: '20px'
  },
  instructionSection: {
    marginTop: '20px',
    padding: '10px',
    backgroundColor: grayColor + "30"
  },
  behaviorSection: {
    marginTop: '20px',
    padding: '10px',
    backgroundColor: infoColor + "20"
  }
});

// Simple test component to test audio seeking functionality
export default function AudioTest() {
  const classes = useStyles();
  const [playState, setPlayState] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const playerRef = useRef();

  function pause() {
    setPlayState(false);
    // Add safety check for React 18 compatibility
    const time = (playerRef.current?.audio.current?.currentTime || 0) * 1000;
    setCurrentTime(time);
    return Promise.resolve(time);
  }

  function seeked() {
    console.log("seeked() called");
    // Set respective states of playback when Media Player is seeked
    const currentPlayState = playState;
    
    // Add safety check for React 18 compatibility
    if (playerRef.current?.audio.current) {
      playerRef.current.audio.current.pause();
    }
    
    pause()
    .then((time) => {
      console.log("Seeked to time:", time);
      // Use flushSync for React 18 to ensure synchronous state update
      flushSync(() => {
        setCurrentTime(time);
      });
      return Promise.resolve(time);
    })
    .then((time) => {
      if (currentPlayState && playerRef.current?.audio.current) {
        playerRef.current.audio.current.play();
      }
    });
  }

  return (
    <div className={classes.container}>
      <h1>Audio Player Test - React 18</h1>
      <p>Test the drag and seek functionality on the timeline below.</p>
      <p>Current Time: {Math.round(currentTime)}ms</p>
      <p>Play State: {playState ? 'Playing' : 'Paused'}</p>
      
      <div className={classes.playerSection}>
        <AudioPlayer
          autoPlay={false}
          ref={playerRef}
          src="http://localhost:5002/api/files/ca7d9f4fed1a44b580a0b14ac7434e51/recording.wav"
          onPlay={() => setPlayState(true)}
          onPause={() => setPlayState(false)}
          onSeek={() => pause()}
          onSeeked={() => seeked()}
          className={classes.playerWrapper}
        />
      </div>
      
      <div className={classes.instructionSection}>
        <h3>Test Instructions:</h3>
        <ol>
          <li>Click play to start the audio</li>
          <li>Drag the timeline to a different position</li>
          <li>Check if it seeks to the clicked position or resets to 0</li>
          <li>Watch the "Current Time" display above</li>
        </ol>
      </div>

      <div className={classes.behaviorSection}>
        <h3>Expected Behavior:</h3>
        <p>With React 18 and flushSync, the timeline should seek to the clicked position and continue playing from there, not reset to 0.</p>
      </div>
    </div>
  );
}