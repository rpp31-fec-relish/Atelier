import React, { useState, useEffect } from 'react';
import AnswerElement from './AnswerElement.jsx';

function QandAElement({question, currPageCounter, setCurrPageCounter}) {

  const handleMoreToggle = () => {
    setCurrPageCounter(currPageCounter + 2);
    console.log(currPageCounter);
  };

  const handleClicks = (e) => {
    console.log(e);
  };

  const answers = Object.entries(question.answers).sort((a, b) => b[1].helpfulness - a[1].helpfulness).map((answerEntry) => {
    let dateTime = question.answers[answerEntry[0]].date.split('-');
    let months = ['Janurary', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let timeStamp = months[parseInt(dateTime[1])-1] + ' ' + dateTime[2].slice(0,2) + ', ' + dateTime[0];
    return (<AnswerElement answer={question.answers[answerEntry[0]]} timeStamp={timeStamp} id={answerEntry[0]} key={answerEntry[0]}/>);
  });
  if (answers.length > 2) {
    return (
      <div key={question.question_id}>
        <div id='QuestionHeader'>
      Q : {question.question_body}
        </div>
      <div id='QuestionHelpful'>
      Helpful?
      <button id='HelpfulButton'> Yes </button> |
      <button id='AddAnswerButton'> Add Answer </button>
        </div>
      <div>{answers.slice(0, currPageCounter)}</div>
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
      <button id='HelpfulButton'> Yes </button> |
        <button id='AddAnswerButton'> Add Answer </button>
        </div>
      <div>{answers}</div>

      </div>
    );
  }

}

export default QandAElement;