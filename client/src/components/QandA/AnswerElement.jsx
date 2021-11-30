import React, { useState, useEffect } from 'react'
import helperFunctions from '../../helperFunctions.js';

function AnswerElement({answer, timeStamp, id}) {

  const [masterHelpful, setHelpfulMaster] = useState(false);
  const [masterReported, setReportedMaster] = useState(false);
  const [helpfulClicked, toggleHelpful] = useState(false);
  const [reportClicked, toggleReport] = useState('Report');
  const [helpfulness, setHelpfulness] = useState(answer.helpfulness)

  const handleReportToggle = (e) => {
    if(masterReported === false) {
      helperFunctions.reportAnswerById(parseInt(e.target.getAttribute('answerid')));
      setReportedMaster(true);
    }
    toggleReport('Reported!');
  };

  const handleToggleHelpful = (answerId) => {
    toggleHelpful(prev => !prev)
    if(masterHelpful === false) {
      setHelpfulMaster(true);
      helperFunctions.markAnswerHelpfulById(answerId);
    }
  };

  const handleHelpfulClicked = (e) => {
    handleToggleHelpful(parseInt(e.target.getAttribute('answerid')));
    if(helpfulClicked == true) {
      setHelpfulness(helpfulness - 1);
    } else {
      setHelpfulness(helpfulness + 1);
    }
  };

  return(
    <div key={id} id='AnswerBody'>
    <div> A : {answer.body}</div>
    <div id='AnswerHelpful'>
      by {answer.answerer_name}, {timeStamp} |
      Helpful?
      <button id='HelpfulButton' answerid={id} onClick={handleHelpfulClicked}> Yes ({helpfulness})</button> |
      <button id='ReportButton' answerid={id} onClick={handleReportToggle}> {reportClicked} </button>
      </div>
    </div>
  );

}

export default AnswerElement;