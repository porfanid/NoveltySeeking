import Header from "../../GeneralComponents/Header";
import {NavLink, useParams, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {delay_quiz_page, show_countdown, show_next_button_to_video} from "../../assets/settings";
import "./countdown.css";

function VideoPage(props){
    let { index, choice, category, counter } = useParams();
    const navigate = useNavigate();
    const [videoFinished, setVideoFinished] = useState(false);
    const [countdown, setCountdown] = useState(delay_quiz_page/1000);

    useEffect(() => {
        props.setCategoryAndCounter(category, counter);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Header />
            <h2>Παρακαλώ παρακολουθήστε το παρακάτω video</h2>

            {(show_countdown && !show_next_button_to_video) ? (!videoFinished) ? (

                    <div className="row">
                        <div className="col-1"></div>
                        <div className="col-10">



                <video
                    muted={true}
                    preload="auto"
                    className={"img-fluid"}
                    autoPlay={true}

                    onEnded={() => {
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
                    }}>
                                <source src={process.env.PUBLIC_URL + `/assets/videos/${choice}/${category}/${counter}.mp4`}
                                        type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
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
                            <video className="img-fluid" autoPlay={true} muted={true} preload={"auto"} onEnded={() => {
                                setVideoFinished(true);
                                if (!show_next_button_to_video) {
                                    const next_page = process.env.PUBLIC_URL + "/quiz/" + index + "/choice/" + choice + "/category/" + category + "/counter/" + counter;
                                    const timeoutId = setTimeout(() => {
                                        // Navigate to the new page after the delay
                                        navigate(next_page);
                                    }, delay_quiz_page);

                                }
                            }}>
                                <source
                                    src={process.env.PUBLIC_URL + `/assets/videos/${choice}/${category}/${counter}.mp4`}
                                    type="video/mp4"/>
                                Your browser does not support the video tag.
                            </video>
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
