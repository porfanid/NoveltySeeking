import Header from "../../GeneralComponents/Header";
import image1 from "./images/1.jpg";
import image2 from "./images/2.jpg";
import image4 from "./images/3.jpg";
import image3 from "./images/4.jpg";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import {remove_all_previous_values} from "../../assets/settings";

function ChoicePage(props){
    const navigate = useNavigate();

    let { index,category} = useParams();



    index=parseInt(index);
    const previousChoice=props.getLastChoice(index)

    useEffect(() => {
        const choices=["Ocean", "City", "Animals", "Space"];
        if(index>1) {
            let isDifferentFromPrevious = (value) => {
                if(remove_all_previous_values){
                    return !props.previousChoices.includes(value);
                }else{
                    return value!==previousChoice;
                }
            }
            const randomArray = choices.filter(isDifferentFromPrevious)
            console.log("Hello")
            console.log("random available values: "+randomArray);
            console.log("Previous Choices: "+props.previousChoices);
            const randomIndex = Math.floor(Math.random() * randomArray.length);
            props.setSelectedImage(randomArray[randomIndex])
            props.previousChoices.push(randomArray[randomIndex]);
            navigate(process.env.PUBLIC_URL + `/video/` + index+"/choice/"+randomArray[randomIndex]+"/category/"+category+"/counter/1")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[index])

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
                            width={"640px"}
                            height={"240px"}
                        />
                    </div>
                    <div className={"col-md-4 p-3"}>
                        <img
                            name={"City"}
                            src={image2} alt={"City"}
                            style={{ border: props.selectedImage === 'City' ? '10px solid red' : 'none' }}
                            onClick={() => props.setSelectedImage("City")}
                            width={"640px"}
                            height={"240px"}
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
                            width={"640px"}
                            height={"240px"}
                        />
                    </div>
                    <div className={"col-md-4 p-3"}>
                        <img name={"Space"}
                             src={image4}
                             alt={"Space"}
                             onClick={() => props.setSelectedImage("Space")}
                             style={{ border: props.selectedImage === 'Space' ? '10px solid red' : 'none' }}
                             width={"640px"}
                             height={"240px"}
                        />
                    </div>
                </div>
            </div>


            <div className="buttons">
                <div className="big-border-button">
                    <NavLink className="active" to={process.env.PUBLIC_URL+`/video/`+index+"/choice/"+props.selectedImage}>
                        Επόμενη Σελίδα
                    </NavLink>
                </div>
                {/*<div className="icon-button">
                    <a href="https://youtube.com/templatemo" target="_blank" rel={"noreferrer"}><i className="fa fa-play"></i> Watch Our Video Now</a>
                </div>
                */}
            </div>
        </>
    )
}

export default ChoicePage
