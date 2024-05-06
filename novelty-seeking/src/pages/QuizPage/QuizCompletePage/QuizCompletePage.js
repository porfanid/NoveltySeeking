import {useEffect} from "react";
import {number_of_questions} from "../../../assets/settings";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

function QuizCompletePage(props){

    const navigate = useNavigate();
    const { t} = useTranslation("common");

    useEffect(() => {
        props.completeAnswerSet(number_of_questions.toString());
        console.log(JSON.stringify(props.answers))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return(
        <>
            <h2>{t("congrats")}</h2>
            <div className={"center mx-auto text-center"}>
                <div className={"d-flex flex-row flex-wrap justify-content-center"}>
                    <div className={"col-md-4 p-3"}>
                    <h5 className={"text-white"}>{t("quiz-end")}</h5>
                    </div>
                </div>
            </div>

            <div className="buttons">
                <div className="big-border-button">
                    <button className="main-button" onClick={() => {
                        navigate(`${process.env.PUBLIC_URL}/questionnaire`);
                    }}>
                        {t("continue-to-questionnaire")}
                    </button>
                </div>
                <div className="icon-button">

                </div>
            </div>

        </>
    )
}

export default QuizCompletePage
