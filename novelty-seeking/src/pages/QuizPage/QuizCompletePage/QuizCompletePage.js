import {useEffect} from "react";
import {number_of_questions} from "../../../assets/settings";
import {useNavigate} from "react-router-dom";

function QuizCompletePage(props){

    const navigate = useNavigate();

    useEffect(() => {
        props.completeAnswerSet(number_of_questions.toString());
        console.log(JSON.stringify(props.answers))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return(
        <>
            <h2>Συγχαρητήρια!!!</h2>
            <div className={"center mx-auto text-center"}>
                <div className={"d-flex flex-row flex-wrap justify-content-center"}>
                    <div className={"col-md-4 p-3"}>
                    <h5 className={"text-white"}>Το τεστ ολοκληρώθηκε.</h5>
                    </div>
                </div>
            </div>

            <div className="buttons">
                <div className="big-border-button">
                    <button className="main-button" onClick={() => {
                        navigate(`${process.env.PUBLIC_URL}/questionnaire`);
                    }}>
                        Συνέχισε στο ερωτηματολόγιο
                    </button>
                </div>
                <div className="icon-button">

                </div>
            </div>

        </>
    )
}

export default QuizCompletePage
