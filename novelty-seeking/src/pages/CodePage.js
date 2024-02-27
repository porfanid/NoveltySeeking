import Header from "../GeneralComponents/Header";
import {correct_password, otp_secret, show_auth, use_otp} from "../assets/settings";
import * as OTPAuth from "otpauth";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const CodePage = ()=>{


    const [password, setPassword]=useState("");
    const navigate = useNavigate();

    const validate_otp = (token)=> {
        let totp = new OTPAuth.TOTP({
            issuer: "exploringthebrain.gr",
            label: "NoveltySeeking",
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

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    return (
        <>
            <Header />
            <div className="hero-section">
                <div className="overlay"></div>
                <div className="container">
                    <h2>Εισάγετε τον κωδικό της <em>αίθουσας</em></h2>

                    {/* Input field for entering a code */}
                    <div className="row">
                        <div className="col-md-3 mt-5 mb-5"/>

                        <div className="col-md-6 mt-5 mb-5">
                            {(show_auth) ? <div className="input-group mt-5">
                                <input type="password" className="form-control" placeholder="Κωδικός αίθουσας"
                                       onChange={handlePasswordChange} required={true}/>
                            </div> : null}
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
                                navigate(`${process.env.PUBLIC_URL}/user_code`)
                            }}>
                                Επόμενο βήμα
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CodePage;
