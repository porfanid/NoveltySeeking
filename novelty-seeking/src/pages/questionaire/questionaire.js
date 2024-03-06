import React, {useEffect, useState} from 'react';
import { FormControl, FormControlLabel, Radio, RadioGroup, Button } from '@mui/material';
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Questionnaire = (props) => {
    const [answers, setAnswers] = useState({});
    const navigate = useNavigate();

    const questions = [
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
        // Add more questions here if necessary
    ];

    const handleChange = (event) => {
        setAnswers({ ...answers, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // You can handle form submission logic here

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
        <div className="container mt-5">
            <h2>Ερωτηματολόγιο</h2>
            <div className="row justify-content-center">
                <div className={"card col-7"}>
                    <div className={"card-body"}>
                        → Διάβασε προσεκτικά κάθε δήλωση, αλλά μην αφιερώνεις πολύ χρόνο μέχρι να αποφασίσεις την
                        απάντηση!<br/><br/>
                        → Απάντησε σε κάθε ερώτηση, ακόμη και αν δεν είσαι απόλυτα σίγουρος/η για την
                        απάντηση!<br/><br/>
                        → Δεν υπάρχουν σωστές και λάθος απαντήσεις- απλώς προσπάθησε να αποδώσεις με μεγαλύτερη ακρίβεια
                        τις προτιμήσεις και τις συμπεριφορές σου!<br/><br/>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-8">
                    <div className="">
                        <div className="">
                            <form onSubmit={handleSubmit}>
                                <FormControl component="fieldset">
                                    {questions.map(question => (
                                        <div className="card form-group p-3" key={question.id}>
                                            <label>{question.text}</label>
                                            <RadioGroup name={question.id} value={(answers.hasOwnProperty(question.id))?answers[question.id]:"undefined"}
                                                        onChange={handleChange}>
                                                <FormControlLabel value="1" control={<Radio/>} label="Σωστό"/>
                                                <FormControlLabel value="0" control={<Radio/>} label="Λάθος"/>
                                            </RadioGroup>
                                        </div>
                                    ))}
                                    <Button className={"m-4"} type="submit" variant="contained" color="primary">Submit</Button>
                                </FormControl>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Questionnaire;

