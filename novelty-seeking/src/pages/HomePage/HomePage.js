import Header from "../../GeneralComponents/Header";
import {NavLink} from "react-router-dom";

function HomePage(){
    return(
        <>
            <Header/>
            <h2>Enter a world of <em>Photos</em> &amp; Amazing <em>Awards</em></h2>
            <p>SnapX Photography is a professional website template with 5 different HTML pages for maximum customizations. It is free for commercial usage. This Bootstrap v5.1.3 CSS layout is provided by TemplateMo Free CSS Templates.</p>
            <div className="buttons">
                <div className="big-border-button">
                    <NavLink className="active" to={process.env.PUBLIC_URL+"/choice/1/category/1/counter/1"}>
                        Ξεκινήστε τις ερωτήσεις
                    </NavLink>
                </div>
                <div className="icon-button">
                    <a href="https://youtube.com/templatemo" target="_blank" rel={"noreferrer"}><i className="fa fa-play"></i> Watch Our Video Now</a>
                </div>
            </div>
        </>
    )
}

export default HomePage
