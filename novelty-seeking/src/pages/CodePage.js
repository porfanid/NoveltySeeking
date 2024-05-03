/*
 *First page where the user must enter a password to continue
 * If the password is correct, the user is redirected to the next page which is the page to enter his personal info
 */
import {correct_password, otp_secret, show_auth, use_otp} from "../assets/settings";
import * as OTPAuth from "otpauth";
import {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";

const CodePage = (props)=>{


    const [password, setPassword]=useState("");

    const [passwordCorrect, setPasswordCorrect]=useState(true);
    const navigate = useNavigate();
    const location = useLocation();

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
            <div className="hero-section">
                <div className="overlay"></div>
                <div className="container">
                    <h2>Εισάγετε τον κωδικό της <em>αίθουσας</em></h2>
                    {(!passwordCorrect)?
                    <div className="alert alert-warning" role="alert">
                        Λάθος κωδικός. Παρακαλώ ξαναπροσπαθήστε.
                    </div>:null
                    }
                    {/* Input field for entering a code */}
                    <div className="row justify-content-center">

                        <div className="col-md-6 mt-5 mb-5 justify-content-center centeredText">
                            {(show_auth) ? <div className="col-5 input-group mt-5">
                                <input type="password" className="justify-content-center form-control" placeholder="Κωδικός αίθουσας"
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
                                        setPasswordCorrect(false);
                                        return;
                                    }
                                }
                                props.hasEnteredPassword(true);
                                setPasswordCorrect(true);
                                if(location.state===null) {
                                    navigate(`${process.env.PUBLIC_URL}/user_code`);
                                }else{
                                    navigate(location.state.previous)
                                }
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
