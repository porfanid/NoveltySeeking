import Header from "../../GeneralComponents/Header";
import {NavLink, useParams, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {delay_quiz_page, show_countdown, show_next_button_to_video} from "../../assets/settings";
import "./countdown.css";
import VideoComponent from "./VideoComponent";

function VideoPage(props){
    const navigate = useNavigate();
    const [videoFinished, setVideoFinished] = useState(false);
    const [countdown, setCountdown] = useState(delay_quiz_page/1000);


    const greek_translation={
        "Ocean": "Ωκεανός",
        "City":"Αρχιτεκτονική",
        "Animals":"Ζώα Αφρικής",
        "ANCIENT_CIVILIZATION":"Αρχαίοι Πολιτισμοί",
        "FOOD": "Μαγειρική",
        "FUTURISTIC_TRANSPORTATION": "Υπερσύγχρονα μέσα μεταφοράς",
        "LANDSCAPES": "Κλίματα",
        "MICROWORLD": "Μικρόκοσμος",
        "NATURE_BLOOMING": "Ανάπτυξη φυτών",
        "Space": "Διάστημα"
    }
    let { index, choice, category, counter } = useParams();

    useEffect(() => {
        props.setCategoryAndCounter(category, counter);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Header />
            <h2>{greek_translation[choice]}</h2>

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

                                const timeoutId = setTimeout(() => {
                                    clearInterval(intervalId);
                                    // Navigate to the new page after the delay
                                    navigate(next_page);
                                }, delay_quiz_page);

                            }
                        }} />

                        </div>
                    </div>
                ) : (<div className="row">
                    <div className="col-4"></div>
                    <div className="card bg-dark col-4">
                        <div className="card_body">
                            <div className="countdown_section">
                                <div id="seconds" className="value">{countdown}</div>
                                <div className="countdown_label">SECONDS</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-4"></div>
                </div>
            ):(
                    <div className="row d-flex justify-content-center align-content-center">
                        <div className="col-1"></div>
                        <div className="col-10">
                            <VideoComponent end={() => {
                                setVideoFinished(true);
                                if (!show_next_button_to_video) {
                                    const next_page = process.env.PUBLIC_URL + "/quiz/" + index + "/choice/" + choice + "/category/" + category + "/counter/" + counter;
                                    const timeoutId = setTimeout(() => {
                                        // Navigate to the new page after the delay
                                        navigate(next_page);
                                    }, delay_quiz_page);

                                }
                            }}/>
                        </div>
                        <div className="col-1"></div>
                    </div>
                )
            }


            <div className="buttons">
                {(show_next_button_to_video) ?
                    <div className="big-border-button">
                        {videoFinished ? (<NavLink className="disabled"
                                                   to={process.env.PUBLIC_URL + "/quiz/" + index + "/choice/" + choice + "/category/" + category + "/counter/" + counter}>
                            Επόμενη Σελίδα
                        </NavLink>) : null}
                    </div> : null
                }
            </div>
        </>
    )

}

export default VideoPage
