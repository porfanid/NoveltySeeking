import Header from "../../GeneralComponents/Header";
import {NavLink} from "react-router-dom";

function QuizPage(props){

    const question = "Ποια είναι η χαρακτηριστική ιδιότητα του σχεδίου του τριχώματος της καμήλας; ";
    const answer1="Ρίγες"
    const answer2="";

    return(
        <>
            <Header/>
            <h2>Enter a world of <em>Photos</em> &amp; Amazing <em>Awards</em></h2>
            <p>SnapX Photography is a professional website template with 5 different HTML pages for maximum customizations. It is free for commercial usage. This Bootstrap v5.1.3 CSS layout is provided by TemplateMo Free CSS Templates.</p>

            <div className="buttons">
                <NavLink className="active" to={"/quiz"}>
                    Επόμενη Σελίδα
                </NavLink>
                <div className="icon-button">
                    <a href="https://youtube.com/templatemo" target="_blank" rel={"noreferrer"}><i className="fa fa-play"></i> Watch Our Video Now</a>
                </div>
            </div>
        </>
    )
}

export default QuizPage
