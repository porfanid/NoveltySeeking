import Header from "../../GeneralComponents/Header";
import {NavLink} from "react-router-dom";

function HomePage(props) {

    const handleCodeChange = (e) => {
        props.setCode(e.target.value);
    };

    return (
        <>
            <Header />
            <div className="hero-section">
                <div className="overlay"></div>
                <div className="container">
                    <h2>Enter a world of <em>Photos</em> &amp; Amazing <em>Awards</em></h2>
                    <p>SnapX Photography is a professional website template with 5 different HTML pages for maximum customizations. It is free for commercial usage. This Bootstrap v5.1.3 CSS layout is provided by TemplateMo Free CSS Templates.</p>

                    {/* Input field for entering a code */}
                    <div className="row">
                        <div className="col-md-4">
                        </div>
                        <div className="col-md-4">
                            {/* Input field for entering a code with limited length */}
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="Enter your code" onChange={handleCodeChange} required={true}/>
                            </div>
                        </div>
                        <div className="col-md-4">
                        </div>
                    </div>

                    <div className="buttons">
                        <div className="big-border-button">
                            <NavLink className="active" to={`${process.env.PUBLIC_URL}/choice/1/category/1/counter/1`}>
                                Ξεκινήστε τις ερωτήσεις
                            </NavLink>
                        </div>
                        <div className="icon-button">
                            <a href="https://youtube.com/templatemo" target="_blank" rel={"noreferrer"}><i className="fa fa-play"></i> Watch Our Video Now</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomePage
