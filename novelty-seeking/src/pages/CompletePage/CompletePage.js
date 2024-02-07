import Header from "../../GeneralComponents/Header";
import {useEffect} from "react";
import {get_time_for_entire_quiz, number_of_questions} from "../../assets/settings";

function CompletePage(props){

    useEffect(() => {
        if(get_time_for_entire_quiz) {
            props.totalDuration(Date.now());
        }
        props.completeAnswerSet(number_of_questions.toString());
        console.log(JSON.stringify(props.answers))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return(
        <>
            <Header/>
            <h2>Συγχαρητήρια</h2>
            <p>
                <h3 className={"text-white"}>Απάντησες σωστά και κέρδισες το δώρο</h3>
            </p>
            <div className={"center mx-auto text-center"}>
                <div className={"d-flex flex-row flex-wrap justify-content-center"}>
                    <div className={"col-md-4 p-3"}>
                    <h5 className={"text-white"}>Το τεστ ολοκληρώθηκε.</h5>
                    </div>
                </div>
                <div className={"d-flex flex-row flex-wrap justify-content-center"}>
                    <div className={"col-md-4 p-3"}>
                        <h5 className={"text-white"}>Μπορείτε να κλείσετε αυτό το παράθυρο</h5>
                    </div>
                </div>
            </div>

            <div className="buttons">
                <div className="big-border-button">
                    <p></p>
                </div>
                <div className="icon-button">

                </div>
            </div>

        </>
    )
}

export default CompletePage
