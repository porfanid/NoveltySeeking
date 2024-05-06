/**
 * @author Pavlos Orfanidis
 * @version 1.0.0
 * Simple page that displays the 4 first options.
 * The user can choose any of them and the process with the videos will start
 */
import image1 from "./images/1.jpg";
import image2 from "./images/2.jpg";
import image4 from "./images/3.jpg";
import image3 from "./images/4.jpg";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import {
    first_choice_has_button,
    is_next_option_random,
    random_choices,
    remove_all_previous_values_from_choices
} from "../../assets/settings";
import {useTranslation} from "react-i18next";

function ChoicePage(props){
    const navigate = useNavigate();

    let { index,category} = useParams();
    const { t} = useTranslation("common");



    index=parseInt(index);
    const previousChoice=props.getLastChoice(index)

    const handleImageClick = (imageName) => {
        props.setSelectedImage(imageName);
        if (!first_choice_has_button) {
            navigate(`${process.env.PUBLIC_URL}/video/${index}/choice/${imageName}`);
        }
    };

    useEffect(() => {
        if(index>1) {
            if(is_next_option_random) {
                let isDifferentFromPrevious = (value) => {
                    if (remove_all_previous_values_from_choices) {
                        return !props.previousChoices.includes(value);
                    } else {
                        return value !== previousChoice;
                    }
                }
                const randomArray = random_choices.filter(isDifferentFromPrevious)
                const randomIndex = Math.floor(Math.random() * randomArray.length);
                props.setSelectedImage(randomArray[randomIndex])
                props.previousChoices.push(randomArray[randomIndex]);
                navigate(process.env.PUBLIC_URL + `/video/` + index+"/choice/"+randomArray[randomIndex]+"/category/"+category+"/counter/1")
            }else{
                props.setStartTime();
                navigate(process.env.PUBLIC_URL + `/video/` + index+"/choice/"+random_choices[index-2]+"/category/"+category+"/counter/1")
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[index])

    return(
        <>
            <h2 className="mt-0 text-center">{t("choose-category")}</h2>
            <div className="d-flex justify-content-center mb-5">
                <div className="row">
                    <div className="col-md-6 mb-3 d-flex justify-content-center">
                        <img
                            name="Ocean"
                            src={image1}
                            alt="Ocean"
                            className={`category-image ${props.selectedImage === 'Ocean' ? 'selected' : ''}`}
                            onClick={() => handleImageClick('Ocean')}
                            style={{ width: 'auto', maxHeight: '33vh' }} // Adjust the max-height as needed
                        />
                    </div>
                    <div className="col-md-6 mb-3 d-flex justify-content-center">
                        <img
                            name="City"
                            src={image2}
                            alt="City"
                            className={`category-image ${props.selectedImage === 'City' ? 'selected' : ''}`}
                            onClick={() => handleImageClick('City')}
                            style={{ width: 'auto', maxHeight: '33vh' }} // Adjust the max-height as needed
                        />
                    </div>
                    <div className="col-md-6 mb-3 d-flex justify-content-center">
                        <img
                            name="Animals"
                            src={image3}
                            alt="Animals"
                            className={`category-image ${props.selectedImage === 'Animals' ? 'selected' : ''}`}
                            onClick={() => handleImageClick('Animals')}
                            style={{ width: 'auto', maxHeight: '33vh' }} // Adjust the max-height as needed
                        />
                    </div>
                    <div className="col-md-6 mb-3 d-flex justify-content-center">
                        <img
                            name="Space"
                            src={image4}
                            alt="Space"
                            className={`category-image ${props.selectedImage === 'Space' ? 'selected' : ''}`}
                            onClick={() => handleImageClick('Space')}
                            style={{ width: 'auto', maxHeight: '33vh' }} // Adjust the max-height as needed
                        />
                    </div>
                </div>
            </div>

            <div className="buttons d-flex justify-content-center mb-5">
                {first_choice_has_button &&
                    <div className="big-border-button">
                        <NavLink className="active" to={`${process.env.PUBLIC_URL}/video/${index}/choice/${props.selectedImage}`}>
                            Επόμενη Σελίδα
                        </NavLink>
                    </div>
                }
            </div>
        </>


    )
}

export default ChoicePage
