/*
 * made the video part as a different component because I used a lot of parameters iin the video component
 */
import React, {useState} from 'react';
import { useParams } from "react-router-dom";
import "./loading.css";


export default function VideoComponent(props) {
    const [isLoading, setIsLoading] = useState(true);
    let { choice, category, counter } = useParams();

    const handleVideoLoaded = () => {
        setIsLoading(false);
    };

    return (
        <>
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                {isLoading && (
                    <div className="position-absolute top-50 start-50 translate-middle">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                )}
                <video
                    muted={true}
                    preload="auto"
                    className="img-fluid col-7"
                    autoPlay={true}
                    onEnded={props.end}
                    onError={console.error}
                    onLoadedData={handleVideoLoaded}
                    controls={false}
                >
                    <source src={process.env.PUBLIC_URL + `/assets/videos/${choice}/${category}/output${counter}.mp4`}
                            type="video/mp4"/>
                    Your browser does not support the video tag.
                </video>
            </div>
        </>
    )
}
