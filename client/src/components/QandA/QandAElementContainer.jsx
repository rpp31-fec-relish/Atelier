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
    return (<div>{elements}</div>);
  }

}

export default QandAElementContainer;