import Header from "../../GeneralComponents/Header";
import repeatImage from "./images/repeat.jpg";
import nextImage from "./images/next.jpg";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";

function QuizResult(props){
    let { index,choice,category, counter } = useParams();
    const addToAnswerSet=()=>{
        props.completeAnswerSet(index)
    }

    useEffect(() => {
        addToAnswerSet(index)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [index]);

    index = parseInt(index);
    const navigate = useNavigate();

    const answer=(props.isAnswerCorrect===true)?"Σωστά":"Λάθος";

    function repeat(){
        props.setCurrentAnswer("choice", choice);
        navigate(process.env.PUBLIC_URL+"/video/"+(index+1)+"/choice/"+choice+"/category/"+category+"/counter/"+(parseInt(counter)+1))
    }

    function moveToNext(){
        navigate(process.env.PUBLIC_URL+"/choice/"+(index+1)+"/category/"+(parseInt(category)+1)+"/counter/1")
    }
    return(
        <>
            <Header/>
            <h2>Απάντησες {answer}</h2>
            <p>
                Επέλεξε με τί θα ήθελες να συνεχίσεις
            </p>

            <div className={"center mx-auto text-center"}>
                <div className={"d-flex flex-row flex-wrap justify-content-center"}>
                    <div className={"col-md-4 p-3"}>
                        <img
                            name={"repeat"}
                            src={repeatImage}
                            alt={"repeat"}
                            onClick={repeat}
                        />
                        <p></p>
                        <h2 onClick={repeat}>Επανάληψη</h2>
                    </div>

                    <div className={"col-md-4 p-3"}>
                        <img
                            name={"next"}
                            src={nextImage}
                            alt={"next"}
                            onClick={moveToNext}
                        />
                        <p></p>
                        <h2 onClick={moveToNext}>Επόμενο</h2>
                    </div>
                </div>
            </div>
        </>
    );
}

export default QuizResult
