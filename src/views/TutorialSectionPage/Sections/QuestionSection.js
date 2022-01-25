import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import Quiz from 'react-quiz-component';

import { Provider } from "react-redux";
import QuizForm from "../../../components/QuestionForm/QuizForm";
import store from "../../../components/QuestionForm/store";

import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';

import styles from "assets/jss/material-kit-react/views/tutorialSectionPageSections/questionStyle.js";

const useStyles = makeStyles(styles);

export default function QuestionSection(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const history = useHistory();

  const setResult = (values) => {
    // save quiz information to backend
    props.handleQuestionChange(null);
    props.handleQuestionChange(values);

    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({ 
        name: props.tutorialSectionTitle,
        question: values,
        tutorial_type: "Question"
      })
    };

    fetch(process.env.REACT_APP_TUTORIAL_URL + '/tutorial_section/update/' + props.id, requestOptions)
      .then(response => {
        if (response.status == 200) {
          console.log("ok")
        }
      })
  }

  return (
    <div style={{width: "100%"}}>
      <div className={classes.gridItem}>
        <SplitterLayout customClassName={classes.splitter}>
          <div>
            <Provider store={store}>
              <QuizForm onSubmit={setResult} data={props.question} />
            </Provider>
          </div>
          <div>
            {props.question != null || props.question != undefined || props.question
              ? <Quiz quiz={props.question} revealAnswerOnSubmit/>
              : null
            }
          </div>
        </SplitterLayout>
      </div>
    </div>
  );
}