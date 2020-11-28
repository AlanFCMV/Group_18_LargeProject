import React, { useState } from 'react';
import Popup from "reactjs-popup";
import Header from '../components/Header';
import './ViewGlobalQuizPage.css';
import HelpViewGlobalQuiz from '../components/HelpViewGlobalQuiz';

const ViewUserQuizPage = () =>
{ 
    // Question: 0
    // Answer: 1
    var questionOrAnswer = 1;
    const [cards, setCards] = useState([{Question: "Sample Question 1", Answer: "Sample Answer 1"},{Question: "Sample Question 2", Answer: "Sample Answer 2"},{Question: "Sample Question 3", Answer: "Sample Answer 3"}]); 
    var position = 0;
    var p;

    const [isLiked, setIsLiked] = useState(0);
    const [isFollowing, setIsFollowing] = useState(0);

    window.onload = function(){loadQuiz()};

    async function loadQuiz()
    {   
        questionOrAnswer = 1-questionOrAnswer;
        p = document.getElementById('carousel');
        p.innerHTML = (questionOrAnswer === 0) ? cards[position].Question : cards[position].Answer;
    }


    const moveRight = () => {
        questionOrAnswer = 1;
        if (position >= cards.length - 1) {
            position = 0;
            p.innerHTML = (questionOrAnswer === 0) ? cards[position].Question : cards[position].Answer;
            return;
        }
        p.innerHTML = (questionOrAnswer === 0) ? cards[position+1].Question : cards[position+1].Answer;
        position++;
    }

    const moveLeft = () => {
        questionOrAnswer = 1;
        if (position < 1) {
            position = cards.length - 1;
            p.innerHTML = (questionOrAnswer === 0) ? cards[position].Question : cards[position].Answer;
            return;
        }
        p.innerHTML = (questionOrAnswer === 0) ? cards[position-1].Question : cards[position-1].Answer;
        position--;
    }

    const goToUsersPage = () =>
    {
        window.location = "./ViewUser";
    }

    return (
        <div>
            <div className="container-fluid vh-100">
                <div className="row">
                    <div className="col-3 column1 vh-100">

                
                        <div className="stats-div">
                            <h3 id="like-count">Likes: 0</h3>
                            <h3 id="date-created">Date Created: 01/01/1970</h3>
                        </div>
                        
                        <Popup trigger={
                            <a className="help">
                                <img className="help-icon" alt="Help" src={require("../img/help.png")}/>
                            </a>
                        } position="top right">
                            <HelpViewGlobalQuiz />
                        </Popup>
                    </div>

                    <div className="col-6 column2 vh-100 carousel-col">
                        <div className="quiz-title-user-div">
                            <h3 className="quiz-title">Quiz Title</h3>
                            <h3 className="quiz-user" onClick={goToUsersPage}>By User Name</h3>
                        </div>

                        <div className="container carousel-container align-items-center" onClick={loadQuiz}>
                            <button id="left-btn" class="carousel-btn" onClick={moveLeft}><i class="arrow"></i></button>
                            <p id="carousel">Sample</p>
                            <button id="right-btn" class="carousel-btn" onClick={moveRight}><i class="arrow"></i></button>
                        </div>
                        <div className="buttons-div">
                            <a className="view-user-quiz-buttons" onClick={() => {setIsLiked(1-isLiked)}}><img className="clickable-icon view-user-like-icon" src={isLiked ? require("../img/addlikefull.png") : require("../img/addlikeempty.png")} /></a>
                            {/* <a className="view-user-quiz-buttons" onClick={loadQuiz}><img className="clickable-icon view-user-quiz-icon" src={require("../img/flip.png")} /></a> */}
                            <a className="view-user-quiz-buttons" onClick={()=> {setIsFollowing(1-isFollowing)}}><img className="clickable-icon view-user-follow-icon" src={isFollowing ? require("../img/adduserfull.png") : require("../img/adduserempty.png")} /></a>
                        </div>
                        
                    </div>

                    <div className="col-3 column3 vh-100"></div>
                </div>
            </div>
            <Header />
        </div>

        

    );
};

export default ViewUserQuizPage;