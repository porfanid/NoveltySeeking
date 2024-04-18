//TODO:  Change the DD/MM/YYYY
import Header from "../../GeneralComponents/Header";
import {useNavigate} from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from '@mui/material/Button';
import {useEffect, useState} from "react";
import {baudrate} from "../../assets/settings";
import openSerialPort from "../../assets/Arduino";

function HomePage(props) {
    const navigate = useNavigate();

    const [selectedDate, setSelectedDate] = useState(null);
    const [gender, setGender] = useState(null);
    const [code, setCode] = useState(null);

    const [port, setPort] = useState(null);

    useEffect(() => {
        setPort(openSerialPort())
    }, []);

    const handleCodeChange = (e) => {
        setCode(e.target.value);
        props.setCode(e.target.value);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleGenderSelect = (selectedGender) => {
        console.log(selectedGender)
        setGender(selectedGender);
    };

    return (
        <>
            <Header />
            <div className="hero-section align-items-center justify-content-center">

                <h2>Εισάγετε τον <em>Προσωπικό σας Κωδικό</em></h2>
                <p/>
                <div className="container d-flex align-items-center justify-content-center">

                    <div className="row">
                        <div className="col-md-12">

                            {/* Input field for entering a code */}
                            <div className="row">
                                <div className="col-md-12 mb-5">
                                    {/* Input field for entering a code with limited length */}
                                    <div className="input-group mb-2">
                                        <input type="text" className="form-control" placeholder="Προσωπικός κωδικός"
                                               onChange={handleCodeChange} required={true}/>
                                    </div>
                                </div>
                            </div>


                            <div className="row">
                                <div className="col-md-12 mb-5">
                                    <h3 className={"text-dark-emphasis"}>Ημερομηνία Γέννησης:</h3><br></br>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            id="birthday"
                                            value={selectedDate}
                                            onChange={handleDateChange}
                                            format="DD/MM/YYYY"
                                        />
                                    </LocalizationProvider>
                                </div>
                            </div>


                            <div className="row">
                                <div className="col-md-12 mb-5">
                                    {/* Input field for entering a code with limited length */}
                                    <Button
                                        variant="contained"
                                        style={{
                                            backgroundColor: gender === 'female' ? '#ff00ff' : '#440044',
                                            color: '#fff',
                                            marginRight: '10px'
                                        }} // Pink color for Female
                                        onClick={() => handleGenderSelect('female')}
                                        className={"active"}
                                    >
                                        Κοριτσι
                                    </Button>
                                    <Button
                                        variant="contained"
                                        style={{
                                            backgroundColor: gender === 'male' ? '#0000ff' : '#000055',
                                            color: '#fff'
                                        }} // Blue color for Male
                                        onClick={() => handleGenderSelect('male')}
                                        className={"active"}
                                    >
                                        Αγορι
                                    </Button>
                                </div>
                            </div>

                            <div className="buttons">
                                <div className="bigborder-button">
                                    <button className="main-button" onClick={() => {
                                        requestPort();
                                        if (!(code && selectedDate && gender)) {
                                            alert("Παρακαλώ συμπληρώστε όλα τα πεδία!");
                                            return;
                                        }
                                        props.publishUser(gender, selectedDate);
                                        console.log(process.env.NODE_ENV)

                                        navigate(`${process.env.PUBLIC_URL}/choice/1/category/1/counter/1`)

                                    }}>
                                        Ξεκινήστε τις Ερωτήσεις
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomePage
