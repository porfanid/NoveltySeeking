import React, { useState } from 'react';
import { FormControl, FormControlLabel, Radio, RadioGroup, Button } from '@mui/material';

const Questionnaire = () => {
    const [answers, setAnswers] = useState({});

    const questions = [
        { id: '1', text: 'Is the sky blue?' },
        { id: '2', text: 'Do humans breathe oxygen?' },
        { id: '3', text: 'Is the Earth flat?' },
        { id: '4', text: 'Is the Earth flat?' }
        // Add more questions here if necessary
    ];

    const handleChange = (event) => {
        setAnswers({ ...answers, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // You can handle form submission logic here
        console.log('Form submitted with answers:', answers);
    };

    return (
        <div className="container mt-5">
            <h2>Ερωτηματολόγιο</h2>
            <div className="row justify-content-center">
                <div className={"card"}>
                    <div className={"card-body"}>
                        Hello world
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
                                            <RadioGroup name={question.id} value={answers[question.id]}
                                                        onChange={handleChange}>
                                                <FormControlLabel value="true" control={<Radio/>} label="Σωστό"/>
                                                <FormControlLabel value="false" control={<Radio/>} label="Λάθος"/>
                                            </RadioGroup>
                                        </div>
                                    ))}
                                    <Button className={"mt-4"} type="submit" variant="contained" color="primary">Submit</Button>
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

