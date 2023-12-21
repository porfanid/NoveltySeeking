import Header from "../../GeneralComponents/Header";
import {NavLink, useParams} from "react-router-dom";
import {useEffect} from "react";

function VideoPage(props){
    let { index, choice, category, counter } = useParams();

    useEffect(() => {
        props.setCategoryAndCounter(category, counter);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return(
        <>
            <Header/>
            <h2>Welcome</h2>
            <p>Παρακαλώ παρακολουθήστε το παρακάτω video</p>

            <video className={"img-fluid"} autoPlay={true}>
                <source src={process.env.PUBLIC_URL+`/assets/videos/${choice}/${category}/${counter}.mp4`} type="video/mp4"/>
                Your browser does not support the video tag.
            </video>


            <div className="buttons">
                <div className="big-border-button">
                    <NavLink className="active" to={process.env.PUBLIC_URL+"/quiz/"+index+"/choice/"+choice+"/category/"+category+"/counter/"+counter}>
                        Επόμενη Σελίδα
                    </NavLink>
                </div>
                <div className="icon-button">
                    <a href="https://youtube.com/templatemo" target="_blank" rel={"noreferrer"}><i className="fa fa-play"></i> Watch Our Video Now</a>
                </div>
            </div>
        </>
    )

}

export default VideoPage
