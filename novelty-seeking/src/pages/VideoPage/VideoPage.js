import Header from "../../GeneralComponents/Header";
import {NavLink, useParams} from "react-router-dom";

function VideoPage(props){
    let { index } = useParams();


    return(<>
        <>
            <Header/>
            <h2>Welcome</h2>
            <p>Παρακαλώ παρακολουθήστε το παρακάτω video {props.video}</p>

            <video className={"img-fluid"} controls>
                <source src={process.env.PUBLIC_URL+`/assets/videos/${props.video}/${index}.mp4`} type="video/mp4"/>
                    Your browser does not support the video tag.
            </video>


            <div className="buttons">
                <div className="big-border-button">
                    <NavLink className="active" to={process.env.PUBLIC_URL+"/quiz/"+index}>
                        Επόμενη Σελίδα
                    </NavLink>
                </div>
                <div className="icon-button">
                    <a href="https://youtube.com/templatemo" target="_blank" rel={"noreferrer"}><i className="fa fa-play"></i> Watch Our Video Now</a>
                </div>
            </div>
        </>
    </>)

}

export default VideoPage
