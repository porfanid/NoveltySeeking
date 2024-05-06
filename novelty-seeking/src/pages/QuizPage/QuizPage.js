/**
 * @file QuizPage.js
 * @desc This file defines the QuizPage component which is used to display the quiz question and the 3 answers to the user
 * This is the main part of the app and is displayed 7 times to the user unless chosen otherwise in the app configuration
 */
import {NavLink, useNavigate, useParams} from "react-router-dom";
import "./answer.css";
import {useEffect, useState} from "react";
import {get_time_for_each_question, number_of_questions, show_next_button_to_quiz} from "../../assets/settings";
import {useTranslation} from "react-i18next";

function QuizPage(props){
    let {index,choice, category, counter} = useParams();

    const [answers, setAllAnswers] = useState([]);
    const [userHasAnswered, setUserHasAnswered] = useState(false);
    const navigate = useNavigate();
    const { t} = useTranslation("common");

    useEffect(()=> {

        const questions = t("quiz", { returnObjects: true })
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
        setUserHasAnswered(true);
        const answerBoxes = document.querySelectorAll('.answer-box');
        answerBoxes.forEach((box) => {
            box.style.border = 'none';
        });
        event.target.style.border = "10px solid #ADD8E6";
        props.setSelectedQuiz(selectedAnswer);
    };

    return(
        <>
            <h2 className={"mt-5"}>{t("quiz", { returnObjects: true })[choice][category][counter].question}</h2>

            <div className="answer-container mt-lg-5">
                {answers.map((answer, index) => (
                    <div
                        key={index}
                        className={`answer-box mb-5`}
                        onClick={(event) => {
                            handleAnswerClick(event, answer);
                            if(!show_next_button_to_quiz) {
                                const link = (index < number_of_questions) ? process.env.PUBLIC_URL + `/quizResult/${index}/choice/${choice}/category/${category}/counter/${counter}` : process.env.PUBLIC_URL + "/quizComplete";
                                if(get_time_for_each_question){
                                    console.log(props.startTime)
                                    props.setSelectedTime(Math.round((Date.now() - props.startTime) / 1000))
                                }
                                navigate(link);
                            }
                        }}
                    >
                        {answer}
                    </div>
                ))}
            </div>

            {(show_next_button_to_quiz)? (
                <>
                <div className="buttons mt-5">
                    <div className="big-border-button">
                        <NavLink onClick={(event)=>{
                            if(get_time_for_each_question){
                                console.log(props.startTime.toString())
                                props.setSelectedTime((Date.now() - props.startTime) / 1000)
                            }
                            if(!userHasAnswered){
                                event.preventDefault();
                                alert(t("answer-question"));
                                return false;
                            }
                        }} className="active"
                                 to={(index < number_of_questions) ? process.env.PUBLIC_URL + `/quizResult/${index}/choice/${choice}/category/${category}/counter/${counter}` : process.env.PUBLIC_URL + "/quizComplete"}>
                            {t("continue")}
                        </NavLink>
                    </div>
                </div>
                <div className={"mb-5 mt-5"}></div>
                </>
                ):(
                <>
                    <div className="buttons mt-5">
                        <div className="big-border-button">
                        </div>
                    </div>
                    <div className={"mb-2 mt-2"}>&nbsp;</div>
                </>
            )
        }


        </>
    )
}

export default QuizPage
