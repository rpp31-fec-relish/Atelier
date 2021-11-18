import React from 'react';
import QandAElement from './QandAElement.jsx';


function QandAElementContainer({questions, currPageCounter, setCurrPageCounter}) {

  const elements = questions.map((question) => {
    return <QandAElement question={question} key={question.question_id} currPageCounter={currPageCounter} setCurrPageCounter={setCurrPageCounter}/>
  });
  if (elements.length === 0) {
    return (<div id='noQuestions'> There are no questions yet! </div>)
  }
  return (<div>{elements}</div>);

}

export default QandAElementContainer;