import React, { useState, useEffect } from 'react'

function AnswerElement({answer, timeStamp, id}) {

  const [helpfulClicked, toggleHelpful] = useState(false);
  const [reportClicked, toggleReport] = useState('Report');
  const [helpfulness, setHelpfulness] = useState(answer.helpfulness)

  const handleReportToggle = () => {
    toggleReport('Reported!');
  };

  const handleToggleHelpful = () => {
    toggleHelpful(prev => !prev)
  };

  const handleHelpfulClicked = () => {
    handleToggleHelpful();
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
      <button id='HelpfulButton' onClick={handleHelpfulClicked}> Yes ({helpfulness})</button> |
      <button id='ReportButton' onClick={handleReportToggle}> {reportClicked} </button>
      </div>
    </div>
  );

}

export default AnswerElement;