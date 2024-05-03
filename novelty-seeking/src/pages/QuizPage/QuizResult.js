/**
 * Simple page to display a message after each question
 */
import nextImage from "./images/next.png";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";

function QuizResult(props){
    let { index,choice,category, counter } = useParams();
    const addToAnswerSet=()=>{
        props.completeAnswerSet(index)
    }

    const correct_answers = [
        "Μπράβο! Συνέχισε έτσι!",
        "Πολύ καλά, συνέχισε!",
        "Τέλεια! Συνέχισε!",
        "Εξαιρετικά!"
    ];

    const wrong_answers = [
        "Καλή προσπάθεια, συνέχισε!",
        "Δεν πειράζει, Συνέχισε να προσπαθείς",
        "Συνέχισε την προσπάθεια"
    ];

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

    function changeCategory(){
        props.setCurrentAnswer("choice", choice);
        navigate(process.env.PUBLIC_URL+"/video/"+(index+1)+"/choice/"+choice+"/category/"+(parseInt(category)+parseInt(counter))+"/counter/1")
    }

    function moveToNext(){
        navigate(process.env.PUBLIC_URL+"/choice/"+(index+1)+"/category/"+(parseInt(category)+parseInt(counter))+"/counter/1")
    }
    return(
        <>
            {/**<h2>Απάντησες {answer}</h2>**/}
            {(props.isAnswerCorrect) ? <h2>{correct_answers[(index%correct_answers.length)]}</h2> : <h2>{wrong_answers[(index%wrong_answers.length)]}</h2>}
            <p style={{fontSize: 32}}>
            Επίλεξε με τι θα ήθελες να συνεχίσεις:
            </p>

            <div className={"center mx-auto text-center"}>
                <div className={"d-flex flex-row flex-wrap justify-content-center"}>
                    <div className={"col-md-5 p-3"}>
                        <img
                            name={"repeat"}
                            src={process.env.PUBLIC_URL + `/assets/images/options/${choice}/repeat/${category}/${counter}.PNG`}
                            alt={"repeat"}
                            onClick={repeat}
                            style={{
                                width: '300px',
                                height: '300px',
                                top: 0,
                                left: 0,
                                filter: "blur(3px)"
                            }}
                        />
                        <p></p>
                        <h2 style={{fontSize: 37}} onClick={repeat}>Συνέχεια του ίδιου βίντεο</h2>
                    </div>


                    <div className={"col-md-4 p-3"}>
                        <img
                            name={"changeCategory"}
                            src={process.env.PUBLIC_URL + `/assets/images/options/${choice}/category.png`}
                            alt={"change category"}
                            onClick={changeCategory}
                            style={{
                                width: '300px',
                                height: '300px',
                                top: 0,
                                left: 0,
                            }}
                        />
                        <p></p>
                        <h2 style={{fontSize: 37}} onClick={changeCategory}>Άλλο βίντεο ίδιας κατηγορίας</h2>
                    </div>

                    <div className={"col-md-3 p-3"}>
                        <img
                            name={"next"}
                            src={nextImage}
                            alt={"next"}
                            onClick={moveToNext}
                            style={{
                                width: '300px',
                                height: '300px',
                            }}
                        />
                        <p></p>
                        <h2 style={{fontSize: 37}} onClick={moveToNext}>Βίντεο άλλης κατηγορίας</h2>
                    </div>
                </div>
            </div>
        </>
    );
}

export default QuizResult
