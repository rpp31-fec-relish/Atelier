import React from 'react';
import QandAElement from './QandAElement.jsx';


class QandAElementContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const elements = this.props.questions.map((question) => {
      return <QandAElement question={question}/>
    });
    if (elements.length === 0) {
      return (<div id='noQuestions'> There are no questions yet! </div>)
    }
    return (<div>{elements}</div>);
  }

}

export default QandAElementContainer;