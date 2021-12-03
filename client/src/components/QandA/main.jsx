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
  const [currQuestionId, setCurrQuestionId] = useState(0);
  const [answersSubmitted, addSumbission] = useState(0);
  const [loadMoreQuestionsText, changeQuestionText] = useState('MORE ANSWERED QUESTIONS');


  const openQuestionModal = () => {
    setShowQuestionModal(prev => !prev);
  }

  const openAnswerModal = (questionId) => {
    if(questionId) {
      setCurrQuestionId(questionId);
    }
    setShowAnswerModal(prev => !prev);
  }

  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleMoreQuestions = () => {
    setCurrPageCounter(currPageCounter + 1);
  }

  // useEffect(() => {
  //   document.addEventListener('mousedown', (event) => {
  //     helperFunctions.postInteraction({
  //       element: event.target.outerHTML.toString(),
  //       widget: 'QandA',
  //       time: Date.now().toString()
  //     });
  //   });
  // }, []);

  useEffect(() => {
    console.log('QandA mounted');
    let currentProduct = props.currentProduct;
    // console.log("getting questions for", currentProduct);
    helperFunctions.getQuestionsById(currentProduct,  currPageCounter, 2)
    .then((questions) => {
      setCurrQuestions([...new Set(questions)]);
      setCurrPageCounter(1);
      setSearchTerm(" ")
      setSearchTerm("")
    })
    .catch((err) => {
      console.error('Error setting state of QandA', err)
    });
  }, [props.currentProduct]);

  useEffect(() => {
    console.log('QandA mounted');
    let currentProduct = props.currentProduct;
    // console.log("getting questions for", currentProduct);
    helperFunctions.getQuestionsById(currentProduct,  currPageCounter, 2)
    .then((questions) => {
      // console.log('questions from fetch', questions);
      if(currPageCounter > 1) {
        if(questions.length === 0) {
          changeQuestionText('NO MORE QUESTIONS TO LOAD');
        }
        setCurrQuestions([...new Set(currQuestions.concat(questions))]);
      }
      else {
        setCurrQuestions([...new Set(questions)]);
      }
      setCurrPageCounter(currPageCounter);
      setSearchTerm(" ")
      setSearchTerm("")
    })
    .catch((err) => {
      console.error('Error setting state of QandA', err)
    });
  }, [currPageCounter]);

  useEffect(() => {
    console.log('QandA mounted');
    let currentProduct = props.currentProduct;
    // console.log("getting questions for", currentProduct);
    helperFunctions.getQuestionsById(currentProduct,  1, 2*currPageCounter)
    .then((questions) => {
      setCurrQuestions([...new Set(questions)]);
      setCurrPageCounter(currPageCounter);
      setSearchTerm(" ")
      setSearchTerm("")
    })
    .catch((err) => {
      console.error('Error setting state of QandA', err)
    });
  }, [answersSubmitted]);



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
        <div id='AskMoreQuestionsContainer'>
          <button id='MoreAnswerdQuestionsButton' onClick={handleMoreQuestions}> {loadMoreQuestionsText} </button>
          <button id='AddQuestionButtton' onClick={openQuestionModal}> ADD A QUESTION + </button>
          <QuestionModal showModal={showQuestionModal} setShowModal={openQuestionModal} />
          <AnswerModal showModal={showAnswerModal} setShowModal={openAnswerModal} currQuestionId={currQuestionId} addSumbission={addSumbission}/>
        </div>
      </div>
    );

}

export default QandA;