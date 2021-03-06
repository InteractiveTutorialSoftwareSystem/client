import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Field, FieldArray, reduxForm, formValueSelector, change as changeFieldValue } from 'redux-form';
import validate from './validate';

import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import FormHelperText from '@material-ui/core/FormHelperText'
import InputLabel from '@material-ui/core/InputLabel'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import MenuItem from '@material-ui/core/MenuItem';

import Input from '@material-ui/core/Input';

import Button from "components/CustomButtons/Button.js";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

class QuizForm extends Component {

  renderInputField = ({ input, label, type, meta: { touched, error } }) => (
    <TextField
      {...input}
      type={type}
      placeholder={label}
      label={label}
      error={touched && error != null}
      helperText={touched && error}
      style={{ width: "100%" }}
    />
  );

  renderTextareaField = ({ input, label, type, meta: { touched, error } }) => (
    <TextField
      {...input}
      type={type}
      multiline
      placeholder={label}
      label={label}
      error={touched && error != null}
      helperText={touched && error}
      style={{ width: "100%" }}
    />
  );

  renderFromHelper = ({ touched, error }) => {
    if (!(touched && error)) {
      return
    } else {
      return <FormHelperText>{touched && error}</FormHelperText>
    }
  }

  renderSelectField = ({ input, label, type, meta: { touched, error }, children }) => (
    <FormControl error={touched && error != null} style={{width: "100%"}}>
      <h5>{label}</h5>
      <Select
        native
        {...input}
        autoWidth
        value={input.value === "" || typeof input.value !== 'string' ? "" : input.value}
      >
        {children}
      </Select>
      {this.renderFromHelper({ touched, error })}
    </FormControl>
  );

  renderMultiSelectField = ({ input, label, type, meta: { touched, error }, children }) => (
    <FormControl error={touched && error != null} style={{width: "100%"}}>
      <h5>{label}</h5>
      <Select
        {...input}
        multiple
        fullWidth
        onChange={(event) => input.onChange(event.target.value)}
        value={input.value === "" || !Array.isArray(input.value) ? [] : input.value}
      >
        {children}
      </Select>
      {this.renderFromHelper({ touched, error })}
    </FormControl>
  );
  
  renderSelectQuestionTypeField = ({ input, label, type, meta: { touched, error }, children }) => (
    <FormControl error={touched && error != null}>
      <h5>{label}</h5>
      <Select
        native
        {...input}
        inputProps={{
          placeholder: label
        }}
      >
        {children}
      </Select>
      {this.renderFromHelper({ touched, error })}
    </FormControl>
  );

  renderSelectAnswerTypeField = ({ input, label, type, meta: { touched, error }, children }) => (
    <FormControl error={touched && error != null}>
      <h5>{label}</h5>
      <Select
        native
        {...input}
        inputProps={{
          placeholder: label
        }}
      >
        {children}
      </Select>
      {this.renderFromHelper({ touched, error })}
    </FormControl>
  );
  
  renderTextAnswers = ({ fields, question, answerSelectionType, meta: { error } }) => (
    <div>
      <div>
        <Button onClick={() => fields.push()}>Add Answer</Button>
      </div>
      {fields.map((answer, index) => (
        <div key={index} style={{display: "flex", padding: "10px", alignItems: "center", backgroundColor: "#CCEECC"}}>
          <Field
            name={answer}
            type="text"
            component={this.renderTextareaField}
            label={`Answer #${index + 1}`}
          />
          <IconButton aria-label="Delete Answer" onClick={() => fields.remove(index)} style={{color: "red", height: "fit-content", marginLeft: "auto"}}>
            <DeleteIcon />
          </IconButton>
        </div>
      ))}

        <div style={{backgroundColor: "#CCDECC", padding: "10px"}}>
          {!answerSelectionType && (
            <h5>Please choose the answer type</h5>
          )}
          {answerSelectionType == "single" && (
            <Field
              name={`${question}.correctAnswer`}
              component={this.renderSelectField}
              label="Correct Answer"
              style={{backgroundColor: "#EEEEEE"}}
            >
              <option value="" disabled>Please select correct answer</option>
              {fields.map((answer, index) => (
                <option key={index+1} value={index+1}>{`Answer #${index + 1}`}</option>
              ))}
            </Field>
          )}
          {answerSelectionType == "multiple" && (
            <Field
              name={`${question}.correctAnswer`}
              component={this.renderMultiSelectField}
              label="Correct Answer"
              style={{backgroundColor: "#EEEEEE"}}
            >
              <option value={[]} disabled>Please select correct answer</option>
              {fields.map((answer, index) => (
                <option key={index+1} value={index+1}>{`Answer #${index + 1}`}</option>
              ))}
            </Field>
          )}
        </div>
    
      {error && <li className="error">{error}</li>}
    </div>
  );
  
  renderQuestions = ({ fields, meta: { touched, error, submitFailed } }) => (
    <div style={{display: "flex", flexDirection: "column"}}>
      {fields.map((question, index) => (
        <div key={index} style={{display: "flex", flexDirection: "column", padding: "10px", backgroundColor: "#EFEFEF", margin: "5px 0px"}}>
          <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <h4>Question #{index + 1}</h4>
            <IconButton aria-label="Delete Question" onClick={() => fields.remove(index)} style={{color: "red", height: "fit-content"}}>
              <DeleteIcon />
            </IconButton>
          </div>
          <Field
            name={`${question}.question`}
            type="text"
            component={this.renderTextareaField}
            label="Question Title"
          />
          <Field
            name={`${question}.questionType`}
            component={this.renderSelectQuestionTypeField}
            label="Question Type"
          >
            <option value="" disabled>Please select a question type</option>
            <option value="text">Text</option>
            <option value="photo">Photo</option>
          </Field>
          <Field
            name={`${question}.answerSelectionType`}
            component={this.renderSelectAnswerTypeField}
            label="Answer Type"
          >
            <option value="" disabled>Please select a answer type</option>
            <option value="single">Single</option>
            <option value="multiple">Multiple</option>
          </Field>
          <FieldArray name={`${question}.answers`} component={this.renderTextAnswers} question={question} answerSelectionType={fields.get(index).answerSelectionType} />
          <Field
            name={`${question}.messageForCorrectAnswer`}
            type="text"
            component={this.renderTextareaField}
            label="Message for Correct Answer"
          />
          <Field
            name={`${question}.messageForIncorrectAnswer`}
            type="text"
            component={this.renderTextareaField}
            label="Message for Incorrect Answer"
          />
          <Field
            name={`${question}.explanation`}
            type="text"
            component={this.renderTextareaField}
            label="Explanation"
          />
          <Field
            name={`${question}.point`}
            type="number"
            component={this.renderInputField}
            label="Point"
          />
        </div>
      ))}
      <div>
        <Button onClick={() => fields.push({})}>Add Question</Button>
        {(touched || submitFailed) && error && <p>{error}</p>}
      </div>
    </div>
  );
  
  componentDidUpdate(prevProps) {
    if (prevProps.data == undefined && this.props.data != prevProps.data) {
      this.props.initialize(this.props.data)
    }
  }

  render() {
  const { handleSubmit, pristine, reset, submitting } = this.props;

    return (
      <div style={{padding: "10px"}}>
        <form name="quiz-form" onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column"}}>
          <Field
            name="quizTitle"
            type="text"
            component={this.renderInputField}
            label="Quiz Title"
          />
          <Field
            name="quizSynopsis"
            type="text"
            component={this.renderTextareaField}
            label="Quiz Synopsis"
          />
          <FieldArray name="questions" component={this.renderQuestions} />
          <div>
            <Button type="submit" disabled={submitting} color="success">Save and Create</Button>
            <Button type="button" disabled={pristine || submitting} onClick={reset}>
              Clear Values
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

QuizForm = reduxForm({
  form: 'quizForm',
  validate
})(QuizForm);

const selector = formValueSelector('quizForm');

QuizForm = connect(
  state => {
    const questions = selector(state, 'questions');
    const questionType = questions && questions.map(question => question.questionType);
    const answerSelectionType = questions && questions.map(question => question.answerSelectionType);
    const correctAnswer = questions && questions.map(question => question.correctAnswer);

    return { questionType: questionType, answerSelectionType: answerSelectionType, correctAnswer: correctAnswer }
  }
)(QuizForm)

export default QuizForm;