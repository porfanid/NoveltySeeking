import React, { useState } from 'react';
import { FormControl, FormControlLabel, Radio, RadioGroup, Button } from '@mui/material';

const Questionnaire = () => {
    const [answers, setAnswers] = useState({});

    const questions = [
        { id: 'q1', text: 'Is the sky blue?' },
        { id: 'q2', text: 'Do humans breathe oxygen?' },
        { id: 'q3', text: 'Is the Earth flat?' }
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
            <h2>Questionnaire</h2>
            <form onSubmit={handleSubmit}>
                <FormControl component="fieldset">
                    {questions.map(question => (
                        <div className="form-group" key={question.id}>
                            <label>{question.text}</label>
                            <RadioGroup name={question.id} value={answers[question.id]} onChange={handleChange}>
                                <FormControlLabel value="true" control={<Radio />} label="True" />
                                <FormControlLabel value="false" control={<Radio />} label="False" />
                            </RadioGroup>
                        </div>
                    ))}
                    <Button type="submit" variant="contained" color="primary">Submit</Button>
                </FormControl>
            </form>
        </div>
    );
};

export default Questionnaire;

