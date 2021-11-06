import React from 'react';

class QandAElement extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      moreClicked: false,
      helpfulClicked: false,
      reportClicked: false,
      isSeller: null,
      numberOfAnswers: null,
    };
  }

  handleClicks(e) {
    console.log(e);
  }

  render() {
    console.log(this.props.question);
    const answers = Object.keys(this.props.question.answers).map((answerId) => {
      return (
      <div key={answerId}>
        <div> A: {this.props.question.answers[answerId].body}</div>
        <div id='AnswerHelpful'>
          by {this.props.question.answers[answerId].answerer_name}, {this.props.question.answers[answerId].date} |
          Helpful?
          <button id='HelpfulButton'> Yes </button> |
          <button id='ReportButton'> Report </button>
         </div>
      </div>
      );
    });
    if (this.props.question.answers.length > 2) {
      return (
        <div key={this.props.question.question_id}>
          <div>
        Q : {this.props.question.question_body}
          </div>
        <div id='QuestionHelpful'>
        Helpful?
        <button id='HelpfulButton'> Yes </button> |
        <button id='AddAnswerButton'> Add Answer </button>
         </div>
        <div>{answers}</div>
        <div>
        <button id='MoreAnswers'> LOAD MORE ANSWERS </button>
        </div>
        </div>
      );
    } else {
      return (
        <div key={this.props.question.question_id}>
          <div>
        Q : {this.props.question.question_body}
          </div>
        <div id='QuestionHelpful'>
        Helpful?
        <button id='HelpfulButton'> Yes </button> |
         <button id='AddAnswerButton'> Add Anser </button>
         </div>
        <div>{answers}</div>

        </div>
      );
    }
  }

}

export default QandAElement;