import Header from "../../GeneralComponents/Header";
import image1 from "./images/1.jpg";
import image2 from "./images/2.jpg";
import image4 from "./images/3.jpg";
import image3 from "./images/4.jpg";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import {
    first_choice_has_button,
    get_time_for_entire_quiz,
    random_choices,
    remove_all_previous_values_from_choices
} from "../../assets/settings";

function ChoicePage(props){
    const navigate = useNavigate();

    let { index,category} = useParams();



    index=parseInt(index);
    const previousChoice=props.getLastChoice(index)

    useEffect(() => {
        if(get_time_for_entire_quiz) {
            props.setStartTime(Date.now());
        }
        if(index>1) {
            let isDifferentFromPrevious = (value) => {
                if(remove_all_previous_values_from_choices){
                    return !props.previousChoices.includes(value);
                }else{
                    return value!==previousChoice;
                }
            }
            const randomArray = random_choices.filter(isDifferentFromPrevious)
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
            <h2>Παρακαλώ επιλέξτε μια εικόνα</h2>
            <div className={"center mx-auto text-center"}>
                <div className={"d-flex flex-row flex-wrap justify-content-center"}>
                    <div className={"col-md-4 p-3"}>
                        <img
                            name={"Ocean"}
                            src={image1}
                            alt={"Ocean"}
                            style={{ border: props.selectedImage === 'Ocean' ? '10px solid red' : 'none' }}
                            onClick={() => {
                                props.setSelectedImage("Ocean")
                                if(!first_choice_has_button){
                                    navigate(process.env.PUBLIC_URL+`/video/`+index+"/choice/Ocean")
                                }
                            }}
                            width={"640px"}
                            height={"240px"}
                        />
                    </div>
                    <div className={"col-md-4 p-3"}>
                        <img
                            name={"City"}
                            src={image2} alt={"City"}
                            style={{ border: props.selectedImage === 'City' ? '10px solid red' : 'none' }}
                            onClick={() => {
                                props.setSelectedImage("City");
                                if(!first_choice_has_button){
                                    navigate(process.env.PUBLIC_URL+`/video/`+index+"/choice/City")
                                }
                            }}
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
                            onClick={() => {
                                props.setSelectedImage("Animals")
                                if(!first_choice_has_button){
                                    navigate(process.env.PUBLIC_URL+`/video/`+index+"/choice/Animals")
                                }
                            }}
                            style={{ border: props.selectedImage === 'Animals' ? '10px solid red' : 'none' }}
                            width={"640px"}
                            height={"240px"}
                        />
                    </div>
                    <div className={"col-md-4 p-3"}>
                        <img name={"Space"}
                             src={image4}
                             alt={"Space"}
                             onClick={() => {
                                 props.setSelectedImage("Space")
                                 if(!first_choice_has_button){
                                     navigate(process.env.PUBLIC_URL+`/video/`+index+"/choice/Space")
                                 }
                             }}
                             style={{ border: props.selectedImage === 'Space' ? '10px solid red' : 'none' }}
                             width={"640px"}
                             height={"240px"}
                        />
                    </div>
                </div>
            </div>


            <div className="buttons">
                {(first_choice_has_button)?
                <div className="big-border-button">
                    <NavLink className="active" to={process.env.PUBLIC_URL+`/video/`+index+"/choice/"+props.selectedImage}>
                        Επόμενη Σελίδα
                    </NavLink>
                </div>:null
                }
                {/*<div className="icon-button">
                    <a href="https://youtube.com/templatemo" target="_blank" rel={"noreferrer"}><i className="fa fa-play"></i> Watch Our Video Now</a>
                </div>
                */}
            </div>
        </>
    )
}

export default ChoicePage
