import React from 'react';
import QandAElement from './QandAElement.jsx';


function QandAElementContainer({questions, modalClick}) {

  const elements = questions.sort((a, b) => b.question_helpfulness - a.question_helpfulness).map((question) => {
    return <QandAElement question={question} key={question.question_id} modalClick={modalClick}/>
  });
  if (elements.length === 0) {
    return (<div id='noQuestions'> There are no questions yet! </div>)
  }
  return (<div>{elements}</div>);

}

export default QandAElementContainer;