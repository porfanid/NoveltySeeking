/*
 *   This page is being used to display a small video (about 20 seconds) to the user
 *  before the question
 * This, along with the QuizPage.js, is the main part of the app and are displayed 7 times to the user unless chosen otherwise in the app configuration
 */
import {NavLink, useParams, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {delay_quiz_page,show_countdown, show_next_button_to_video} from "../../assets/settings";
import "./countdown.css";
import VideoComponent from "./VideoComponent";
import {useTranslation} from "react-i18next";

function VideoPage(props){
    const navigate = useNavigate();
    const [videoFinished, setVideoFinished] = useState(false);
    const [countdown, setCountdown] = useState(delay_quiz_page/1000);
    const { t} = useTranslation("common");
    const [title, setTitle] = useState("");


    let { index, choice, category, counter } = useParams();

    useEffect(() => {
        props.setCategoryAndCounter(category, counter);
        const titles = t("video-title", { returnObjects: true});
        setTitle(titles[choice]);
    }, []);

    return (
        <>
            <h2>{/*Video {index} από τα {number_of_questions}: */}{title}</h2>

            {(show_countdown && !show_next_button_to_video) ? (!videoFinished) ? (
                <div className="row">
                    <div className="col-1"></div>
                    <div className="col-10">
                        <VideoComponent end={() => {
                            setVideoFinished(true);
                            if (!show_next_button_to_video) {
                                const intervalId = setInterval(() => {
                                    setCountdown(prevCountdown => prevCountdown - 1);
                                }, 1000);

                                const next_page = process.env.PUBLIC_URL + "/quiz/" + index + "/choice/" + choice + "/category/" + category + "/counter/" + counter;

                                setTimeout(() => {
                                    clearInterval(intervalId);
                                    // Navigate to the new page after the delay
                                    navigate(next_page);
                                }, delay_quiz_page);
                            }
                        }} />
                    </div>
                </div>
            ) : (
                <div className="row">
                    <div className="col-4"></div>
                    <div className="card bg-dark col-4">
                        <div className="card_body">
                            <div className="countdown_section">
                                <div id="seconds" className="value">{countdown}</div>
                                <div className="countdown_label">{t("seconds")}</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-4"></div>
                </div>
            ) : (
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-1"></div>
                    <div className="col-10">
                        <VideoComponent end={() => {
                            setVideoFinished(true);
                            if (!show_next_button_to_video) {
                                const next_page = process.env.PUBLIC_URL + "/quiz/" + index + "/choice/" + choice + "/category/" + category + "/counter/" + counter;
                                setTimeout(() => {
                                    // Navigate to the new page after the delay
                                    navigate(next_page);
                                }, delay_quiz_page);
                            }
                        }}/>
                    </div>
                    <div className="col-1"></div>
                </div>
            )}

            <div className="buttons">
                {show_next_button_to_video && (
                    <div className="big-border-button">
                        {videoFinished ? (
                            <NavLink className="disabled" to={process.env.PUBLIC_URL + "/quiz/" + index + "/choice/" + choice + "/category/" + category + "/counter/" + counter}>
                                Επόμενη Σελίδα
                            </NavLink>
                        ) : null}
                    </div>
                )}
            </div>
        </>
    )

}

export default VideoPage
