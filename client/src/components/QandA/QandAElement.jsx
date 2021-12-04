import React, { useState, useEffect } from 'react';
import helperFunctions from '../../helperFunctions.js';
import AnswerElement from './AnswerElement.jsx';

function QandAElement({question, modalClick}) {

  const [masterHelpful, setMaster] = useState(false);
  const [helpfulClicked, toggleHelpful] = useState(false);
  const [helpfulness, setHelpfulness] = useState(question.question_helpfulness);
  const [answerCount, setAnswerCount] = useState(2);

  const handleMoreToggle = () => {
    setAnswerCount(prev => prev + 2);
  };

  const handleClicks = (e) => {
    console.log(e);
  };

  const handleToggleHelpful = (questionid) => {
    toggleHelpful(prev => !prev)
    if(masterHelpful === false) {
      setMaster(true);
      helperFunctions.markQuestionHelpfulById(questionid);
    }
  };

  const handleHelpfulClicked = (e) => {
    handleToggleHelpful(parseInt(e.target.getAttribute('questionid')));
    if(helpfulClicked == true) {
      setHelpfulness(helpfulness - 1);
    } else {
      setHelpfulness(helpfulness + 1);
    }
  };

  const addAnswerHandler = () => {
    modalClick(question.question_id);
  };

  const answers = Object.entries(question.answers).sort((a, b) => b[1].helpfulness - a[1].helpfulness).map((answerEntry) => {
    let dateTime = question.answers[answerEntry[0]].date.split('-');
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let timeStamp = months[parseInt(dateTime[1])-1] + ' ' + dateTime[2].slice(0,2) + ', ' + dateTime[0];
    return (<AnswerElement answer={question.answers[answerEntry[0]]} timeStamp={timeStamp} id={answerEntry[0]} key={answerEntry[0]}/>);
  });
  if (answers.length > 2 && answerCount <= answers.length) {
    return (
      <div key={question.question_id}>
        <div id='QuestionHeader'>
      Q : {question.question_body}
        </div>
      <div id='QuestionHelpful'>
      Helpful?
      <button id='HelpfulButton' questionid={question.question_id} onClick={handleHelpfulClicked}> Yes ({helpfulness})</button> |
      <button id='AddAnswerButton' onClick={addAnswerHandler}> Add Answer </button>
        </div>
      <div>{answers.slice(0, answerCount)}</div>
      <div>
      <button id='MoreAnswers' onClick={handleMoreToggle}> LOAD MORE ANSWERS </button>
      </div>
      </div>
    );
  } else {
    return (
      <div key={question.question_id}>
        <div id='QuestionHeader'>
      Q : {question.question_body}
        </div>
      <div id='QuestionHelpful'>
      Helpful?
      <button id='HelpfulButton' questionid={question.question_id} onClick={handleHelpfulClicked}> Yes ({helpfulness})</button> |
        <button id='AddAnswerButton' questionid={question.question_id} onClick={addAnswerHandler}> Add Answer </button>
        </div>
      <div>{answers}</div>

      </div>
    );
  }

}

export default QandAElement;
