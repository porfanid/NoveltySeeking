/*
 * This is a simple example of a questionnaire component that uses React hooks to manage state.
 * It displays the questions to the users, but from the 18th question onwards, it also asks the user to select their class.
 */
import React, {useState} from 'react';
import { FormControl, FormControlLabel, Radio, RadioGroup, Button } from '@mui/material';
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Questionnaire = (props) => {
    const [answers, setAnswers] = useState({});
    const navigate = useNavigate();

    const questions = [
        /**
         * sample questions because the JTCI questionair hadn't arrived yet and we didn't want to mix the results.
         */
        { id: '1', text: 'Γενικά, προτιμώ να αποταμιεύω τα χρήματά μου, παρά να τα ξοδεύω.' },
        { id: '2', text: 'Πριν δοκιμάσω κάτι καινούργιο, αγχώνομαι.' },
        { id: '3', text: 'Μου αρέσει να ακολουθώ κανόνες.' },
        { id: '4', text: 'Σκέφτομαι πολύ τι μπορεί να πάει λάθος πριν πάρω μία απόφαση.' },
        { id: '5', text: 'Παίρνω αποφάσεις γρήγορα, γιατί δεν μου αρέσει να περιμένω.' },
        { id: '6', text: 'Συχνά φοβάμαι να δοκιμάσω νέες εμπειρίες.' },
        { id: '7', text: 'Ακόμα κι όταν έχω πολλά χρήματα, προτιμώ να τα αποταμιεύω παρά να τα ξοδεύω για τον εαυτό μου.' },
        { id: '8', text: 'Προτιμώ να μην έχω καθόλου κανόνες.' },
        { id: '9', text: 'Χάνω εύκολα την ψυχραιμία μου.' },
        { id: '10', text: 'Μου αρέσει να σχεδιάζω από πριν ακόμα και τις απλές καθημερινές δραστηριότητες.' },
        { id: '11', text: 'Προτιμώ να παίρνω αποφάσεις αφού εξετάσω όλες τις επιλογές.' },
        { id: '12', text: 'Όταν δοκιμάζω κάτι καινούργιο συνήθως αισθάνομαι πολύ νευρικός/ή.' },
        { id: '13', text: 'Συχνά παραλλάσσω την αλήθεια ή υπερβάλλω για να πω μια πιο αστεία ή ενδιαφέρουσα ιστορία.' },
        { id: '14', text: 'Όταν χρειάζεται να πάρω μία γρήγορη απόφαση, δυσκολεύομαι.' },
        { id: '15', text: 'Παραβιάζω τους κανόνες αν μπορώ να τη γλιτώσω.' },
        { id: '16', text: 'Σε άγνωστες καταστάσεις νιώθω άβολα και νευρικά.' },
        { id: '17', text: 'Μου αρέσει όταν τα πράγματα γίνονται με αυστηρό και τακτικό τρόπο.' },
        { id: '18', text: 'Συνήθως δεν ολοκληρώνω μία εργασία/δουλειά που χρειάζεται πολύ χρόνο. ' },
        /**
         * New Questions from the JTCI questionair to validate our results
         */
        { id: '19', text: 'Συνήθως όταν θέλω να έχω κάτι, το θέλω άμεσα.' },
        { id: '20', text: 'Συχνά λέω αυτό που μου έρχεται πρώτο στο μυαλό.' },
        { id: '21', text: 'Προτιμώ να σκέφτομαι προσεκτικά πριν πάρω μία απόφαση.' },
        { id: '22', text: 'Συχνά κάνω κάτι χωρίς πρώτα να έχω σκεφτεί αν θα λειτουργήσει.' },
        { id: '23', text: 'Συχνά ενθουσιάζομαι με νέα πράγματα και θέλω να τα δοκιμάσω αμέσως.' },
        { id: '24', text: 'Μου αρέσουν πολύ τα πάρτυ-έκπληξη και οι αυθόρμητες πράξεις.' },
        { id: '25', text: 'Προτιμώ να αποταμιεύω, παρά να ξοδεύω τα χρήματά μου αμέσως.' },
        { id: '26', text: 'Μου αρέσει να παίρνω γρήγορες αποφάσεις.' },
        { id: '27', text: 'Όταν έχω χρήματα, τα ξοδεύω αμέσως σε κάτι.' },
        { id: '28', text: 'Συχνά έχω διάθεση να κάνω κάτι καινούργιο ή τρελό.' },
        { id: '29', text: 'Όταν κάτι μου κινεί την περιέργεια, τότε αδιαφορώ για τους κινδύνους και τις απαγορεύσεις.' },
        { id: '30', text: 'Μου αρέσει να ακολουθώ κανόνες.' },
        { id: '31', text: 'Ενθουσιάζομαι εύκολα με νέες ιδέες ή δραστηριότητες.' },
        { id: '32', text: 'Προτιμώ δραστηριότητες χωρίς κανόνες.' },
        { id: '33', text: 'Συχνά κάνω πράγματα που στην πραγματικότητα δεν μου επιτρέπεται να κάνω.' },
    ];

    const [selectedClass, setSelectedClass] = useState(
        answers.hasOwnProperty(questions.length + 4) ? answers[questions.length + 4] : undefined
    );

    const handleChange = (event) => {
        setAnswers({ ...answers, [event.target.name]: event.target.value });
    };

    const handleClassChange = (event) => {
        handleChange(event);
        const selectedValue = event.target.value;
        setSelectedClass(selectedValue);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // code to see if all questions have been answered
        const requiredQuestionIds = questions.filter(question => question.id > 18).map(question => question.id);
        if(selectedClass === '10' || selectedClass === '11') {
            requiredQuestionIds.push((questions.length + 1).toString())
        }else{
            requiredQuestionIds.push((questions.length + 2).toString())
        }

        requiredQuestionIds.push((questions.length+3).toString())
        requiredQuestionIds.push((questions.length+4).toString())
        let answeredQuestionIds = Object.keys(answers);

        let missingAnswers = requiredQuestionIds.filter(id => !answeredQuestionIds.includes(id));

        if (missingAnswers.length > 0) {
            // If there are unanswered questions, display an error message or handle accordingly
            alert(`Δεν έχετε απαντήσει τις ερωτήσεις: `+missingAnswers.join(", "));
            console.log(requiredQuestionIds)
            console.log(answeredQuestionIds)
            return;
        }

        let error = false;
        Object.entries(answers).forEach(([questionId, answer])=>{
            console.log(props.code+": "+questionId+": "+answer);

            const data={
                "code": props.code,
                "index": questionId,
                "answer": answer
            }


            axios.post(process.env.PUBLIC_URL+"/questionaire.php", data)
                .then(response => {
                    console.log(response.data);
                    // Handle the response data as needed
                })
                .catch(errorMessage => {
                    error = true;
                    console.error('Error:', errorMessage);
                    alert(errorMessage);
                    // Handle errors
                });
        });

        if(!error) {
            setAnswers({});
            navigate(process.env.PUBLIC_URL+"/Complete");
        }
    };

    return (
        <>
            <div className="d-flex flex-row">
                <div className="flex-column-reverse flex-fill d-flex justify-content-center">
                    <h2>Ερωτηματολόγιο</h2>
                </div>
                <div className="flex-column-reverse d-flex pe-3" style={{
                    fontSize: "50px",
                    fontWeight: "bold",
                    fontFamily: "Arial, sans-serif",
                    color: "black",
                    textShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)"
                }}>
                    JTCI 12-18
                </div>
            </div>


            <div className="container mt-5">


                <div className="row justify-content-center">
                    <div className={"card col-7"}>

                        <div className={"card-body"}>
                            Στο ερωτηματολόγιο αυτό θα βρεις δηλώσεις που θα μπορούσαν να περιγράψουν τις στάσεις, τις
                            απόψεις,
                            τα ενδιαφέροντα και τα συναισθήματά σου. Κάθε δήλωση μπορεί να απαντηθεί με την επιλογή <b>«όχι,
                            δεν
                            ισχύει», «μάλλον δεν ισχύει», «ισχύει εν μέρει», «μάλλον ισχύει», «ναι, ισχύει»</b>. Διάβασε
                            κάθε δήλωση
                            και σημείωσε <u>ποια ισχύει περισσότερο για εσένα</u>. Απάντησε σε <u>όλες</u> τις δηλώσεις
                            ακόμα κι αν δεν είσαι
                            σίγουρος/η για την απάντηση. Διάβασε προσεκτικά κάθε πρόταση, αλλά μην αφιερώνεις πολύ χρόνο
                            για
                            να αποφασίσεις την απάντηση. Δεν υπάρχουν «σωστές» ή «λανθασμένες» απαντήσεις∙ περίγραψε
                            απλώς
                            τις <u>προσωπικές σου</u> απόψεις και συναισθήματα. Αν κάποιες προτάσεις σου φαίνονται
                            παρόμοιες, αυτό
                            είναι για να περιγράψεις τον εαυτό σου με ακρίβεια. Προσπάθησε να περιγράψετε τον εαυτό σου
                            όπως
                            <u>συνήθως ή ως επί το πλείστον</u> αισθάνεσαι ή ενεργείς, κι όχι μόνο όπως αισθάνεσαι αυτή
                            τη στιγμή.
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-8">
                        <div className="">
                            <div className="">
                                <form onSubmit={handleSubmit}>
                                    <FormControl component="fieldset">

                                        <div className="card form-group p-3" key={questions.length + 4}>
                                            <label><b>1 - Τάξη:</b></label>
                                            <hr/>
                                            <RadioGroup
                                                name={(questions.length + 4).toString()}
                                                value={(answers.hasOwnProperty(questions.length + 4)) ? answers[questions.length + 4] : "undefined"}
                                                onChange={handleClassChange}
                                                className={"radio-group"}
                                            >
                                                <div className={"row"}>
                                                    <div className={"col-auto justify-content-center"}>Δημοτικό</div>
                                                    <div className={"col-auto"}>

                                                        <FormControlLabel value="10"
                                                                          control={<Radio color="primary"/>}
                                                                          label="E"/>
                                                    </div>
                                                    <div className={"col-auto"}>
                                                        <FormControlLabel value="11"
                                                                          control={<Radio color="primary"/>}
                                                                          label="ΣΤ"/>
                                                    </div>
                                                </div>

                                                <hr/>
                                                <div className={"row"}>
                                                    <div className={"col-auto "}>Γυμνάσιο</div>
                                                    <div className={"col-auto"}>

                                                        <FormControlLabel value="20"
                                                                          control={<Radio color="primary"/>}
                                                                          label="A"/>
                                                    </div>
                                                    <div className={"col-auto"}>
                                                        <FormControlLabel value="21"
                                                                          control={<Radio color="primary"/>}
                                                                          label="Β"/>
                                                    </div>
                                                    <div className={"col-auto"}>
                                                        <FormControlLabel value="22"
                                                                          control={<Radio color="primary"/>}
                                                                          label="Γ"/>
                                                    </div>
                                                </div>

                                                <hr/>
                                                <div className={"row"}>
                                                    <div className={"col-auto "}>Λύκειο</div>
                                                    <div className={"col-auto"}>

                                                        <FormControlLabel value="30"
                                                                          control={<Radio color="primary"/>}
                                                                          label="A"/>
                                                    </div>
                                                    <div className={"col-auto"}>
                                                        <FormControlLabel value="31"
                                                                          control={<Radio color="primary"/>}
                                                                          label="Β"/>
                                                    </div>
                                                    <div className={"col-auto"}>
                                                        <FormControlLabel value="32"
                                                                          control={<Radio color="primary"/>}
                                                                          label="Γ"/>
                                                    </div>
                                                </div>
                                            </RadioGroup>
                                        </div>


                                        {questions.map(question => (question.id > 18) ? (
                                            <div className="card form-group p-3" key={question.id}>
                                                <label><b>{question.id - 17} - {question.text}</b></label>
                                                <hr/>
                                                <RadioGroup
                                                    name={question.id}
                                                    value={(answers.hasOwnProperty(question.id)) ? answers[question.id] : "undefined"}
                                                    onChange={handleChange}
                                                    className="radio-group"
                                                >
                                                    <FormControlLabel value="0" control={<Radio color="primary"/>}
                                                                      label="0 - ΟΧΙ"/>
                                                    <FormControlLabel value="1" control={<Radio color="primary"/>}
                                                                      label="1 - ΜΑΛΛΟΝ ΟΧΙ"/>
                                                    <FormControlLabel value="2" control={<Radio color="primary"/>}
                                                                      label="2 - ΕΝ ΜΕΡΕΙ"/>
                                                    <FormControlLabel value="3" control={<Radio color="primary"/>}
                                                                      label="3 - ΜΑΛΛΟΝ ΝΑΙ"/>
                                                    <FormControlLabel value="4" control={<Radio color="primary"/>}
                                                                      label="4 - ΝΑΙ"/>
                                                </RadioGroup>
                                            </div>
                                        ) : null)}


                                        <div className="card form-group p-3" key={questions.length + 1}>
                                            <div className={"card-header-pills"}>
                                                <b>
                                                    {(questions.length - 16)} - Σημείωσε τον βαθμό που παίρνεις πιο
                                                    συχνά
                                                    στο σχολείο:
                                                </b>
                                            </div>
                                            <hr/>
                                            {(selectedClass === '10' || selectedClass === '11') &&<div className={"card-body"}>
                                                <RadioGroup
                                                    name={(questions.length + 1).toString()}
                                                    value={(answers.hasOwnProperty((questions.length + 1))) ? answers[(questions.length + 1)] : "undefined"}
                                                    onChange={handleChange}
                                                    className="radio-group"
                                                >
                                                    <div className={"row"}>
                                                        <div className={"col-2"}
                                                             style={{border: "2px solid black"}}><b>Δημοτικό</b>
                                                        </div>
                                                        {
                                                            Array.from({length: 10}).map((_, index) => (
                                                                <div className={"col-1"}
                                                                     style={{border: "1px solid black"}}>
                                                                    <FormControlLabel value={index + 1} control={<Radio
                                                                        color="primary"/>} label={index + 1}/>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                </RadioGroup>
                                            </div>}


                                            {(selectedClass === '20' || selectedClass === '21' || selectedClass === '22' || // Show for Γυμνάσιο or Λύκειο
                                                selectedClass === '30' || selectedClass === '31' || selectedClass === '32') &&<div className={"card-body"}>
                                                <RadioGroup
                                                    name={(questions.length + 2).toString()}
                                                    value={(answers.hasOwnProperty((questions.length + 2))) ? answers[(questions.length + 2)] : "undefined"}
                                                    onChange={handleChange}
                                                    className="radio-group"
                                                >
                                                    <div className={"row"}>
                                                        <div className={"col-2"}
                                                             style={{border: "2px solid black"}}><b>{(selectedClass === '20' || selectedClass === '21' || selectedClass === '22')?<>Γυμνάσιο</>:<>Λύκειο</>}</b>
                                                        </div>
                                                        <div className={"col-10"}>
                                                            <div className={"row p-0"}>
                                                                {
                                                                    Array.from({length: 20}).map((_, index) => (
                                                                        <div className={"col-md"}
                                                                             style={{border: "1px solid black"}}>
                                                                            <FormControlLabel value={index + 1}
                                                                                              control={<Radio
                                                                                                  color="primary"/>}
                                                                                              label={index + 1}/>
                                                                        </div>
                                                                    ))
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </RadioGroup>
                                            </div>}
                                        </div>


                                        <div className="card form-group p-3" key={questions.length + 3}>
                                            <label><b>{questions.length - 15} - Σημείωσε πόσο καλά
                                                καταλαβαίνεις ένα κείμενο όταν το διαβάζεις:</b></label>
                                            <hr/>
                                            <RadioGroup
                                                name={(questions.length + 3).toString()}
                                                value={(answers.hasOwnProperty(questions.length + 3)) ? answers[questions.length + 3] : "undefined"}
                                                onChange={handleChange}
                                                className={"radio-group"}
                                            >
                                                <FormControlLabel value="0"
                                                                  control={<Radio color="primary"/>}
                                                                  label="Κακά"/>
                                                <FormControlLabel value="1"
                                                                  control={<Radio color="primary"/>}
                                                                  label="Μέτρια"/>
                                                <FormControlLabel value="2"
                                                                  control={<Radio color="primary"/>}
                                                                  label="Πολύ καλά"/>
                                                <FormControlLabel value="3"
                                                                  control={<Radio color="primary"/>}
                                                                  label="Τέλεια"/>
                                            </RadioGroup>
                                        </div>


                                        <Button className="m-4" type="submit" variant="contained"
                                                color="primary">Υποβολη</Button>
                                    </FormControl>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Questionnaire;

