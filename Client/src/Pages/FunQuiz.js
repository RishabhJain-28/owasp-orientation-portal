import React from 'react';
import Question from '../Components/QuestionCard';
import '../Components/quiz.css';
import {ButtonGroup, ProgressBar} from 'react-bootstrap';

const FunQuiz = () => {
    return ( 
        <div className="quiz_body">
            <div className="container">
                <div className="row justify-content-center">
                    <img 
                        src="IMAGES/owasp_logo-13.png"
                        style={{height:"60px"}}
                        className="mt-3  mb-3"
                    />
                </div>
                <div className="row justify-content-center mt-3 mb-4">
                    <h1 className="quiz_heading"><span>FUN</span> QUIZ</h1>
                </div>
                <div className="mb-2">
                    <Question />
                </div>
                <ProgressBar className="mb-3" animated now={14} min={0} max={15} />
                <div className="container">
                    <div className="row justify-content-center">
                        <ButtonGroup className="m-2 ml-4 mr-4">
                            <button className="btn blue_btn">Previous</button>
                        </ButtonGroup>
                        <ButtonGroup className="m-2 ml-4 mr-4">
                            <button className="btn pink_btn">Submit</button>
                        </ButtonGroup>
                        <ButtonGroup className="m-2 ml-4 mr-4">
                            <button className="btn blue_btn">Next</button>
                        </ButtonGroup>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default FunQuiz;