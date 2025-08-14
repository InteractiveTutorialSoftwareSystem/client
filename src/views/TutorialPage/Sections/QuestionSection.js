import React, { useState, useEffect } from "react";
// @mui/material components
import { makeStyles } from "@mui/styles";

import Quiz from 'react-quiz-component';
import '../../../assets/css/questionStyle.css';

import styles from "assets/jss/material-kit-react/views/tutorialPageSections/questionStyle";

const useStyles = makeStyles(styles);

export default function QuestionSection(props) {
  const classes = useStyles();

  return (  
    <div className={classes.questionDiv}>
      <Quiz quiz={props.question} revealAnswerOnSubmit/>
    </div>
  );
}