/*
 * This is a simple example of a questionnaire component that uses React hooks to manage state.
 * It displays the questions to the users, but from the 18th question onwards, it also asks the user to select their class.
 */
import React, {useState} from 'react';
import { FormControl, FormControlLabel, Radio, RadioGroup, Button } from '@mui/material';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

const Questionnaire = (props) => {
    const [answers, setAnswers] = useState({});
    const navigate = useNavigate();
    const { t, i18n} = useTranslation("common");

    const questions = t("jtci-questions", { returnObjects: true })

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

        let missingAnswers = requiredQuestionIds.filter(id => !answeredQuestionIds.includes(id)).map(value => value - 18);

        if (missingAnswers.length > 0) {
            // If there are unanswered questions, display an error message or handle accordingly
            alert(t("you-havent-answered-questions")+`: `+missingAnswers.join(", "));
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
                "answer": answer,
                "lang": i18n.language,
                "token": process.env.VALID_TOKEN
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

    const renderGradeOptions = (schoolLevel) => {
        const {start, end} = getGradeLimits(schoolLevel)
        var list = [];
        for (var i = start; i <= end; i++) {
            list.push(i);
        }
        return list;
    };

    const getGradeLimits = (schoolLevel) => {
        return t(`gradeLimits.${schoolLevel}`,{returnObjects: true});
    };

    const getSchoolLevel = (classNumber) => {
        if (classNumber.startsWith('1')) {
            return 'primary';
        } else if (classNumber.startsWith('2')) {
            return 'secondary';
        } else if (classNumber.startsWith('3')) {
            return 'highSchool';
        }
        return '';
    };
    return (
        <>
            <div className="d-flex flex-row">
                <div className="flex-column-reverse flex-fill d-flex justify-content-center">
                    <h2>{t("questionnaire")}</h2>
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


            <div className="container mt-5 mb-5">


                <div className="row justify-content-center">
                    <div className={"card col-7"}>

                        <div className={"card-body"} dangerouslySetInnerHTML={{__html:t("questionnaire-intro")}}>

                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-8">
                        <div className="">
                            <div className="">
                                <form onSubmit={handleSubmit}>
                                    <FormControl component="fieldset">
                                        <div className="card form-group p-3">
                                            {/* Primary School Classes */}
                                            <label><b>{t('class')}:</b></label>
                                            <hr/>
                                            <RadioGroup>
                                                <div className="row">
                                                    <div
                                                        className="col-auto justify-content-center">{t('classLabels.primary', {returnObjects: true})}</div>
                                                    {Object.entries(t('classValues.primary', {returnObjects: true})).map(([key, value]) => (
                                                        <div className="col-auto" key={key}>
                                                            <FormControlLabel value={key}
                                                                              control={<Radio color="primary"/>}
                                                                              onChange={handleClassChange}
                                                                              label={value}/>
                                                        </div>
                                                    ))}
                                                </div>

                                                <hr/>
                                                {/* Secondary School Classes */}
                                                <div className="row">
                                                    <div
                                                        className="col-auto">{t('classLabels.secondary', {returnObjects: true})}</div>
                                                    {Object.entries(t('classValues.secondary', {returnObjects: true})).map(([key, value]) => (
                                                        <div className="col-auto" key={key}>
                                                            <FormControlLabel value={key}
                                                                              control={<Radio color="primary"/>}
                                                                              onChange={handleClassChange}
                                                                              label={value}/>
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* High School Classes (Optional) */}
                                                {t('classLabels.highSchool') && (
                                                    <>
                                                        <hr/>
                                                        <div className="row">
                                                            <div
                                                                className="col-auto">{t('classLabels.highSchool', {returnObjects: true})}</div>
                                                            {Object.entries(t('classValues.highSchool', {returnObjects: true})).map(([key, value]) => (
                                                                <div className="col-auto" key={key}>
                                                                    <FormControlLabel value={key}
                                                                                      control={<Radio color="primary"/>}
                                                                                      onChange={handleClassChange}
                                                                                      label={value}/>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </>
                                                )}
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
                                                                      label={"0 - " + t("no")}/>
                                                    <FormControlLabel value="1" control={<Radio color="primary"/>}
                                                                      label={"1 - " + t("probably-no")}/>
                                                    <FormControlLabel value="2" control={<Radio color="primary"/>}
                                                                      label={"2 - " + t("partially")}/>
                                                    <FormControlLabel value="3" control={<Radio color="primary"/>}
                                                                      label={"3 - " + t("probably-yes")}/>
                                                    <FormControlLabel value="4" control={<Radio color="primary"/>}
                                                                      label={"4 - " + t("yes")}/>
                                                </RadioGroup>
                                            </div>
                                        ) : null)}

                                        {/*TODO: implement this globally*/}
                                        <div className="card form-group p-3" key={questions.length + 1}>
                                            <div className={"card-header-pills"}>
                                                <b>{(questions.length - 16)} - {t('select-grade')}</b>
                                            </div>
                                            <hr/>
                                            {selectedClass && (
                                                <div className={"card-body"}>
                                                    <RadioGroup
                                                        name={(questions.length + 1).toString()}
                                                        value={answers.hasOwnProperty(questions.length + 1) ? answers[questions.length + 1] : "undefined"}
                                                        onChange={handleChange}
                                                        className="radio-group"
                                                    >
                                                        <div className={"row"}>
                                                            <div className={"col-3"}
                                                                 style={{border: "2px solid black"}}>
                                                                <b>{t(`classLabels.${getSchoolLevel(selectedClass.toString())}`)}</b></div>
                                                            {renderGradeOptions(getSchoolLevel(selectedClass.toString())).map(grade => (
                                                                <div className={"col-2"}
                                                                     style={{border: "1px solid black"}} key={grade}>
                                                                    <FormControlLabel value={grade}
                                                                                      control={<Radio color="primary"/>}
                                                                                      label={grade}/>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </RadioGroup>
                                                </div>
                                            )}
                                        </div>

                                        {/*END TODO*/}
                                        <div className="card form-group p-3" key={questions.length + 3}>
                                            <label><b>{questions.length - 15} -
                                                {t("text-understanding")}:
                                            </b></label>
                                            <hr/>
                                            <RadioGroup
                                                name={(questions.length + 3).toString()}
                                                value={(answers.hasOwnProperty(questions.length + 3)) ? answers[questions.length + 3] : "undefined"}
                                                onChange={handleChange}
                                                className={"radio-group"}
                                            >
                                                <FormControlLabel value="0"
                                                                  control={<Radio color="primary"/>}
                                                                  label={t("not-good")}/>
                                                <FormControlLabel value="1"
                                                                  control={<Radio color="primary"/>}
                                                                  label={t("so-and-so")}/>
                                                <FormControlLabel value="2"
                                                                  control={<Radio color="primary"/>}
                                                                  label={t("very-good")}/>
                                                <FormControlLabel value="3"
                                                                  control={<Radio color="primary"/>}
                                                                  label={t("excellent")}/>
                                            </RadioGroup>
                                        </div>


                                        <Button className="m-4 mb-5" type="submit" variant="contained"
                                                color="primary">{t("submit")}</Button>
                                        <div className={"mb-5"}></div>
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

