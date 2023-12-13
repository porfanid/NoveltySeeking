import Header from "../../GeneralComponents/Header";
import image1 from "./images/1.jpg";
import image2 from "./images/2.jpg";
import image4 from "./images/3.jpg";
import image3 from "./images/4.jpg";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";

function ChoicePage(props){
    const navigate = useNavigate();

    let { index } = useParams();
    const previousChoice=props.getLastChoice(index)

    useEffect(() => {
        const choices=["Ocean", "City", "Animals", "Space"];
        if (previousChoice !== null) {
            const isEqualToPrevious = (value) => {
                return value !== previousChoice
            }
            const randomArray = choices.filter(isEqualToPrevious)
            const randomIndex = Math.floor(Math.random() * randomArray.length);
            props.setSelectedImage(randomArray[randomIndex])
            navigate(process.env.PUBLIC_URL + `/video/` + index)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return(
        <>
            <Header/>
            <h2>Welcome</h2>
            <p>{props.selectedImage ? (<>Έχετε επιλέξει: {props.selectedImage}</>):(<>Παρακαλώ επιλέξτε μια εικόνα από τις ακόλουθες</>)}</p>
            <div className={"center mx-auto text-center"}>
                <div className={"d-flex flex-row flex-wrap justify-content-center"}>
                    <div className={"col-md-4 p-3"}>
                        <img
                            name={"Ocean"}
                            src={image1}
                            alt={"Ocean"}
                            style={{ border: props.selectedImage === 'Ocean' ? '10px solid red' : 'none' }}
                            onClick={() => props.setSelectedImage("Ocean")}
                        />
                    </div>
                    <div className={"col-md-4 p-3"}>
                        <img
                            name={"City"}
                            src={image2} alt={"City"}
                            style={{ border: props.selectedImage === 'City' ? '10px solid red' : 'none' }}
                            onClick={() => props.setSelectedImage("City")}
                        />
                    </div>
                </div>
                <div className={"d-flex flex-row flex-wrap justify-content-center"}>
                    <div className={"col-md-4 p-3"}>
                        <img
                            name={"Animals"}
                            src={image3}
                            alt={"Animals"}
                            onClick={() => props.setSelectedImage("Animals")}
                            style={{ border: props.selectedImage === 'Animals' ? '10px solid red' : 'none' }}
                        />
                    </div>
                    <div className={"col-md-4 p-3"}>
                        <img name={"Space"}
                             src={image4}
                             alt={"Space"}
                             onClick={() => props.setSelectedImage("Space")}
                             style={{ border: props.selectedImage === 'Space' ? '10px solid red' : 'none' }}
                        />
                    </div>
                </div>
            </div>


            <div className="buttons">
                <div className="big-border-button">
                    <NavLink className="active" to={process.env.PUBLIC_URL+`/video/`+index}>
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

export default ChoicePage
