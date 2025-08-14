// @mui/material components
import { makeStyles } from "@mui/styles";

import Quiz from 'react-quiz-component';

import { Provider } from "react-redux";
import QuizForm from "../../../components/QuestionForm/QuizForm";
import store from "../../../components/QuestionForm/store";

import 'allotment/dist/style.css';
// Note: SplitterLayout component needs to be imported or replaced

import styles from "assets/jss/material-kit-react/views/tutorialSectionPageSections/questionStyle.js";

const useStyles = makeStyles(styles);

export default function QuestionSection(props) {
  const classes = useStyles();
  // Component props handled directly

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
          // Request completed successfully
        }
      })
  }

  return (
    <div style={{width: "100%"}}>
      <div className={classes.gridItem}>
        <div className={classes.splitter} style={{display: 'flex', height: '100%'}}>
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
        </div>
      </div>
    </div>
  );
}