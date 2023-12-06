import Header from "../../GeneralComponents/Header";
import {NavLink} from "react-router-dom";

function VideoPage(props){
    return(<>
        <>
            <Header/>
            <h2>Welcome</h2>
            <p>Παρακαλώ παρακολουθήστε το παρακάτω video</p>

            <video className={"img-fluid"} controls>
                <source src={props.video} type="video/mp4"/>
                    Your browser does not support the video tag.
            </video>


            <div className="buttons">
                <div className="big-border-button">
                    <NavLink className="active" to={"/quiz"}>
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
