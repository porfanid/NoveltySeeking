import Header from "../../GeneralComponents/Header";
import {useNavigate} from "react-router-dom";

export default function CompletePage(){
    const navigate = useNavigate();
    return(
        <>
            <Header/>
            <h2>Ευχαριστούμε</h2>
            <p>
                <h3 className={"text-white"}>Σε ευχαριστούμε που απάντησες στις ερωτήσεις μας.</h3>
            </p>
            <div className={"center mx-auto text-center"}>
                <div className={"d-flex flex-row flex-wrap justify-content-center"}>
                    <div className={"col-md-4 p-3"}>
                        <h5 className={"text-white"}>Το τεστ ολοκληρώθηκε.</h5>
                    </div>
                </div>
                <div className={"d-flex flex-row flex-wrap justify-content-center"}>
                    <div className={"col-md-4 p-3"}>
                        <h5 className={"text-white"}>Καλή συνέχεια</h5>
                    </div>
                </div>
            </div>

            <div className="buttons">
                <div className="big-border-button">
                    <button className="main-button" onClick={() => {
                        navigate(`${process.env.PUBLIC_URL}/user_code`);
                    }}>
                        Πίσω στην Αρχή
                    </button>
                </div>
                <div className="icon-button">
                </div>
            </div>

        </>
    )
}
