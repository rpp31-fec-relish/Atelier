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
  const [searchTerm, setSearchTerm] = useState(" ");
  const [searchResults, setSearchResults] = useState([]);


  const openQuestionModal = () => {
    setShowQuestionModal(prev => !prev);
  }

  const openAnswerModal = () => {
    setShowAnswerModal(prev => !prev);
  }

  const handleChange = event => {
    setSearchTerm(event.target.value);
  };


  useEffect(() => {
    console.log('QandA mounted');
    let currentProduct = props.currentProduct;
    helperFunctions.getQuestionsById(currentProduct, currPageCounter, 2)
    .then((questions) => {
      console.log('questions from fetch', questions);
      setCurrQuestions(questions);
      setCurrPageCounter(currPageCounter + 1);
      setSearchTerm(" ")
      setSearchTerm("")
    })
    .catch((err) => {
      console.error('Error setting state of QandA', err)
    });
  }, [props.currentProduct]);


  useEffect(() => {
    if( searchTerm === "" ) {
        setSearchResults(currQuestions)
    } else {
      let results = currQuestions.filter(question => question.question_body.toLowerCase().includes(searchTerm.toLowerCase()));
      console.log("searchResults", results);
      setSearchResults(results);
    }
  }, [searchTerm]);

    return (
      <div id='QandAContainer'>
        <div id='QandATitle'>Questions & Answers</div>
        <input type='text' id='QandASearchBar'placeholder='HAVE A QUESTION? SEARCH FOR ANSWERS...' value={searchTerm} onChange={handleChange}></input>
        <QandAElementContainer questions={searchResults} currPageCounter={currPageCounter} setCurrPageCounter={setCurrPageCounter} modalClick={openAnswerModal}/>
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