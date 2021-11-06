import React, { useState, useEffect } from 'react'
import QandAElementContainer from './QandAElementContainer.jsx';
import QandAModal from './QandAModal.jsx';
import helperFunctions from '../../helperFunctions';

function QandA(props) {

  const [currQuestions, setCurrQuestions] = useState([]);
  const [currPageCounter, setCurrPageCounter] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(prev => !prev);
  }

  useEffect(() => {
    console.log('QandA mounted');
    let currentProduct = props.currentProduct;
    helperFunctions.getQuestionsById(currentProduct, currPageCounter, 2)
    .then((questions) => {
      console.log('questions from fetch', questions);
      setCurrQuestions(questions);
      setCurrPageCounter(currPageCounter + 1);
    })
    .catch((err) => {
      console.error('Error setting state of QandA', err)
    });
  }, []);

    return (
      <div id='QandAContainer'>
        <div id='QandATitle'>Questions & Answers</div>
        <input type='text' id='QandASearchBar'placeholder='HAVE A QUESTION? SEARCH FOR ANSWERS...'></input>
        <QandAElementContainer questions={currQuestions}/>
        <div id='MoreAnswersContainer'>
        </div>
        <div id='AskMoreQuestionsContainer'>
          <button id='MoreAnswerdQuestionsButton'> MORE ANSWERED QUESTIONS </button>
          <button id='AddQuestionButtton' onClick={openModal}> ADD A QUESTION + </button>
          <QandAModal showModal={showModal} setShowModal={openModal} />
        </div>
      </div>
    );

}

export default QandA;