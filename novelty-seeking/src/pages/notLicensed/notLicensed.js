import Header from "../../GeneralComponents/Header";
import {NavLink} from "react-router-dom";

function NotLicensed(){
    return(
        <>
            <div className="hero-section">
                <div className="overlay"></div>
                <div className="container">
                    <h2>Δημιουργήθηκε πρόβλημα</h2>
                    <p>Παρακαλώ επικοινωνήστε με τον προγραμματιστή της σελίδας για την επίλυσή του</p>


                    <div className="buttons">
                        <div className="big-border-button">

                        </div>
                        <div className="icon-button">
                            <a href="mailto:pavlos@orfanidis.net.gr" target="_blank" rel={"noreferrer"}><i className="fa fa-mail-bulk"></i>Παύλος Ορφανίδης</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NotLicensed
