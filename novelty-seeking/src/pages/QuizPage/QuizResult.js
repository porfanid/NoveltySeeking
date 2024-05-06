/**
 * Simple page to display a message after each question
 */
import nextImage from "./images/next.png";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import "./answer.css";
import {useTranslation} from "react-i18next";

function QuizResult(props){
    let { index,choice,category, counter } = useParams();
    const { t} = useTranslation("common");
    const addToAnswerSet=()=>{
        props.completeAnswerSet(index)
    }

    const correct_answers = t("quiz-correct-answers", { returnObjects: true });

    const wrong_answers = t("quiz-wrong-answers", { returnObjects: true });

    useEffect(() => {
        addToAnswerSet(index)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [index]);

    index = parseInt(index);
    const navigate = useNavigate();

    function repeat(){
        props.setCurrentAnswer("choice", choice);
        navigate(process.env.PUBLIC_URL+"/video/"+(index+1)+"/choice/"+choice+"/category/"+category+"/counter/"+(parseInt(counter)+1))
    }

    function changeCategory(){
        props.setCurrentAnswer("choice", choice);
        navigate(process.env.PUBLIC_URL+"/video/"+(index+1)+"/choice/"+choice+"/category/"+(parseInt(category)+parseInt(counter))+"/counter/1")
    }

    function moveToNext(){
        navigate(process.env.PUBLIC_URL+"/choice/"+(index+1)+"/category/"+(parseInt(category)+parseInt(counter))+"/counter/1")
    }
    return(
        <>
            {(props.isAnswerCorrect) ? <h2>{correct_answers[(index%correct_answers.length)]}</h2> : <h2>{wrong_answers[(index%wrong_answers.length)]}</h2>}
            <span className={"mt-3 text-white"} style={{fontSize: 32}}>
                {t("choose-next")}:
            </span>

            <div className={"center mx-auto text-center mb-5"}>
                <div className={"d-flex flex-row flex-wrap justify-content-center mb-5"}>
                    <div className={"col-md-4 p-3"}>
                        <img
                            name={"repeat"}
                            src={process.env.PUBLIC_URL + `/assets/images/options/${choice}/repeat/${category}/${counter}.PNG`}
                            alt={"repeat"}
                            onClick={repeat}
                            style={{
                                filter: "blur(3px)",
                                width: "auto",
                                maxHeight: "33vh"
                            }}
                            className="option-image"
                        />
                        <p className={"h2"} onClick={repeat}>{t("same-video")}</p>
                    </div>


                    <div className={"col-md-4 p-3"}>
                        <img
                            name={"changeCategory"}
                            src={process.env.PUBLIC_URL + `/assets/images/options/${choice}/category.png`}
                            alt={"change category"}
                            onClick={changeCategory}
                            style={{
                                width: "auto",
                                maxHeight: "33vh"
                            }}
                            className="option-image"
                        />
                        <p className={"h2"} onClick={changeCategory}>{t("same-category")}</p>
                    </div>

                    <div className={"col-md-4 p-3"}>
                        <img
                            name={"next"}
                            src={nextImage}
                            alt={"next"}
                            onClick={moveToNext}
                            className="option-image"
                            style={{
                                width: "auto",
                                maxHeight: "33vh"
                            }}
                        />
                        <p className={"h2"} onClick={moveToNext}>{t("different-category")}</p>
                    </div>
                </div>
            </div>
        </>

    );
}

export default QuizResult
