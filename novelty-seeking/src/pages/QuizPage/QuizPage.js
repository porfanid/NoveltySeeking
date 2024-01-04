import Header from "../../GeneralComponents/Header";
import {NavLink, useParams} from "react-router-dom";
import "./answer.css";
import {useEffect, useState} from "react";

function QuizPage(props){
    let {index,choice, category, counter} = useParams();

    const [answers, setAllAnswers] = useState([]);

    useEffect(()=> {
        const questions = props.questions
        const setQuizCorrectAnswer = props.setQuizCorrectAnswer;
        const falseAnswers = questions[choice][category][counter]["false answers"];
        const correctAnswer = questions[choice][category][counter]["correct answer"];
        setQuizCorrectAnswer(correctAnswer);
        const allAnswers = [...falseAnswers, correctAnswer];

        // Shuffle the answers using Fisher-Yates algorithm
        for (let i = allAnswers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [allAnswers[i], allAnswers[j]] = [allAnswers[j], allAnswers[i]];
        }
        setAllAnswers(allAnswers);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


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
            <h2>{props.questions[choice][category][counter].question}</h2>

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
                    <NavLink className="active" to={(index<7)?process.env.PUBLIC_URL+`/quizResult/${index}/choice/${choice}/category/${category}/counter/${counter}`:process.env.PUBLIC_URL+"/complete"}>
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
