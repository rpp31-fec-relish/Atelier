import React from 'react';
import QandAElements from './QandAElements.jsx';

class QandA extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id='QandAContainer'>
        <div id='QandATitle'>Questions & Answers</div>
        <input type='text' id='QandASearchBar'placeholder='HAVE A QUESTION? SEARCH FOR ANSWERS...'></input>
        <QandAElements/>
        <div id='MoreAnswersContainer'>
        <button id='MoreAnswers'> LOAD MORE ANSWERS </button>
        </div>
        <div id='AskMoreQuestionsContainer'>
          <button id='MoreAnswerdQuestionsButton'> MORE ANSWERED QUESTIONS </button>
          <button id='AddQuestionButtton'> ADD A QUESTION + </button>
        </div>
      </div>
    );
  }

}

export default QandA;