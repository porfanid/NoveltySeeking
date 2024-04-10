import React, {useEffect, useState} from 'react';
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
                {isLoading&& (
                    <div className={"img-fluid"}
                         style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                        <div className="loadingio-spinner-spinner-w2t6013t4v">
                            <div className="ldio-e1jr8bcoslt">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                )}
                <video
                    muted={true}
                    preload="auto"
                    className={"img-fluid"}
                    autoPlay={true}
                    onEnded={props.end}
                    onError={console.error}
                    onLoadedData={handleVideoLoaded}
                    controls={false}
                >
                    <source src={ process.env.PUBLIC_URL + `/assets/videos/${choice}/${category}/output${counter}.mp4`}
                            type="video/mp4"/>
                    Your browser does not support the video tag.
                </video>
            </div>
        </>
    )
}
