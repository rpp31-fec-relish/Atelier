import React, { useState, useEffect } from 'react'
import QandAElementContainer from './QandAElementContainer.jsx';
import QuestionModal from './QuestionModal.jsx';
import AnswerModal from './AnswerModal.jsx';
import helperFunctions from '../../helperFunctions';

function QandA(props) {

  const [currQuestions, setCurrQuestions] = useState([]);
  const [currPageCounter, setCurrPageCounter] = useState(1);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [showAnswerModal, setShowAnswerModal] = useState(false);


  const openQuestionModal = () => {
    setShowQuestionModal(prev => !prev);
  }

  const openAnswerModal = () => {
    setShowAnswerModal(prev => !prev);
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
  }, [props.currentProduct]);

    return (
      <div id='QandAContainer'>
        <div id='QandATitle'>Questions & Answers</div>
        <input type='text' id='QandASearchBar'placeholder='HAVE A QUESTION? SEARCH FOR ANSWERS...'></input>
        <QandAElementContainer questions={currQuestions} currPageCounter={currPageCounter} setCurrPageCounter={setCurrPageCounter} modalClick={openAnswerModal}/>
        <div id='MoreAnswersContainer'>
        </div>
        <div id='AskMoreQuestionsContainer'>
          <button id='MoreAnswerdQuestionsButton'> MORE ANSWERED QUESTIONS </button>
          <button id='AddQuestionButtton' onClick={openQuestionModal}> ADD A QUESTION + </button>
          <QuestionModal showModal={showQuestionModal} setShowModal={openQuestionModal} />
          <AnswerModal showModal={showAnswerModal} setShowModal={openAnswerModal} />
        </div>
      </div>
    );

}

export default QandA;