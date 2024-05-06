/**
 * Complete Page. The test has been completed and the user can return to the beginning
 */
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

export default function QuizAndQuestionnaireCompletePage(){
    const navigate = useNavigate();
    const { t} = useTranslation("common");
    return(
        <>
            <h2>{t("thank-you")}</h2>
            <p>
                <h3 className={"text-white"}>{t("answered-questions")}</h3>
            </p>
            <div className={"center mx-auto text-center"}>
                <div className={"d-flex flex-row flex-wrap justify-content-center"}>
                    <div className={"col-md-4 p-3"}>
                        <h5 className={"text-white"}>{t("test-is-complete")}</h5>
                    </div>
                </div>
                <div className={"d-flex flex-row flex-wrap justify-content-center"}>
                    <div className={"col-md-4 p-3"}>
                        <h5 className={"text-white"}>{t("have-a-nice-day")}</h5>
                    </div>
                </div>
            </div>

            <div className="buttons">
                <div className="big-border-button">
                    <button className="main-button" onClick={() => {
                        navigate(`${process.env.PUBLIC_URL}/user_code`);
                    }}>
                        {t("back-to-start")}
                    </button>
                </div>
                <div className="icon-button">
                </div>
            </div>
        </>
    )
}
