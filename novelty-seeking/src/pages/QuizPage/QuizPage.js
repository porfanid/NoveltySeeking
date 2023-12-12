import Header from "../../GeneralComponents/Header";
import {NavLink, useParams} from "react-router-dom";
import "./answer.css";
import {useEffect, useState} from "react";

function QuizPage(props){
    let {index} = useParams();

    const [answers, setAllAnswers] = useState([]);

    const questions = props.questions
    const choice = props.choice;
    const setQuizCorrectAnswer = props.setQuizCorrectAnswer;

    useEffect(()=> {
        const falseAnswers = questions[choice][index]["false answers"];
        const correctAnswer = questions[choice][index]["correct answer"];
        setQuizCorrectAnswer(correctAnswer);
        const allAnswers = [...falseAnswers, correctAnswer];

        // Shuffle the answers using Fisher-Yates algorithm
        for (let i = allAnswers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [allAnswers[i], allAnswers[j]] = [allAnswers[j], allAnswers[i]];
        }
        setAllAnswers(allAnswers);
    }, [questions, index, choice, setQuizCorrectAnswer])


    const handleAnswerClick = (event, selectedAnswer) => {
        const answerBoxes = document.querySelectorAll('.answer-box');
        answerBoxes.forEach((box) => {
            box.style.border = 'none';
        });
        event.target.style.border= "10px solid red";
        props.setSelectedQuiz(selectedAnswer);
    };

    return(
        <>
            <Header/>
            <h2>{props.questions[props.choice][index].question}</h2>

            <div className="answer-container">
                    {answers.map((answer, index) => (
                        <div
                            key={index}
                            className={`answer-box`}
                            onClick={(event) => handleAnswerClick(event, answer)}
                        >
                            {answer}
                        </div>
                    ))}
            </div>

            <div className="buttons">
                <div className="big-border-button">
                    <NavLink className="active" to={process.env.PUBLIC_URL+(index<=7)?`/quizResult/${index}`:"/complete"}>
                        Επόμενη Σελίδα
                    </NavLink>
                </div>
                <div className="icon-button">
                    <a href="https://youtube.com/templatemo" target="_blank" rel={"noreferrer"}><i className="fa fa-play"></i> Watch Our Video Now</a>
                </div>
            </div>
        </>
    )
}

export default QuizPage
