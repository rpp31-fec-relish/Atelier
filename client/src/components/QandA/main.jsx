import React from 'react';
import QandAElementContainer from './QandAElementContainer.jsx';
import helperFunctions from '../../helperFunctions';

class QandA extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currQuestions: [],
      currPageCounter: 1,
    };
  }

  componentDidMount(){
    console.log('QandA mounted');
    let currentProduct = this.props.currentProduct;
    helperFunctions.getQuestionsById(currentProduct, this.state.currPageCounter, 2)
    .then((questions) => {
      console.log('questions from fetch', questions);
      this.setState({
        currQuestions: questions,
        currPageCounter: this.state.currPageCounter + 1,
      });
    })
    .catch((err) => {
      console.error('Error setting state of QandA', err)
    });
  }

  render() {
    return (
      <div id='QandAContainer'>
        <div id='QandATitle'>Questions & Answers</div>
        <input type='text' id='QandASearchBar'placeholder='HAVE A QUESTION? SEARCH FOR ANSWERS...'></input>
        <QandAElementContainer questions={this.state.currQuestions}/>
        <div id='MoreAnswersContainer'>
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