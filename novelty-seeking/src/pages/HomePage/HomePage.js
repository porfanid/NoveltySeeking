import Header from "../../GeneralComponents/Header";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {correct_password, otp_secret, show_auth, use_otp} from "../../assets/settings";
import * as OTPAuth from "otpauth";

function HomePage(props) {

    const [password, setPassword]=useState("");
    const navigate = useNavigate();

    const handleCodeChange = (e) => {
        props.setCode(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };


    const validate_otp = (token)=> {
        let totp = new OTPAuth.TOTP({
            issuer: "codevoweb.com",
            label: "CodevoWeb",
            algorithm: "SHA1",
            digits: 6,
            secret: otp_secret,
        });
        let delta = totp.validate({token, window: 1});
        return delta!==null;
    }


    const validate_password = (password)=>{
        return password=== correct_password;
    }

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
                        {(show_auth) ? <div className="col-md-2">
                        </div>:null}
                        <div className="col-md-4">
                            {(show_auth) ? <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="Κωδικός αίθουσας"
                                       onChange={handlePasswordChange} required={true}/>
                            </div> : null}
                        </div>
                        <div className="col-md-4">
                            {/* Input field for entering a code with limited length */}
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="Προσωπικός κωδικός"
                                       onChange={handleCodeChange} required={true}/>
                            </div>
                        </div>
                        <div className={(show_auth)?"col-md-2":"col-md-4"}>
                        </div>
                    </div>

                    <div className="buttons">
                    <div className="big-border-button">
                            <button className="main-button" onClick={()=>{
                                if(show_auth){
                                    let auth_function = null;
                                    if(use_otp){
                                        auth_function = validate_otp;
                                    }else{
                                        auth_function = validate_password;
                                    }

                                    if(!auth_function(password)){
                                        alert("wrong password. Please try again.");
                                        return;
                                    }
                                }
                                navigate(`${process.env.PUBLIC_URL}/choice/1/category/1/counter/1`)
                            }}>
                                Ξεκινήστε τις ερωτήσεις
                            </button>
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
