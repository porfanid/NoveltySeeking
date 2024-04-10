//TODO:  Change the DD/MM/YYYY
import Header from "../../GeneralComponents/Header";
import {useNavigate} from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from '@mui/material/Button';
import {useState} from "react";

function HomePage(props) {
    const navigate = useNavigate();

    const [selectedDate, setSelectedDate] = useState(null);
    const [gender, setGender] = useState(null);

    const handleCodeChange = (e) => {
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
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            value={selectedDate} // Pass the selected date as a value
                                            onChange={handleDateChange} // Handle date change event
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
                                        props.publishUser(gender, selectedDate);
                                        console.log(process.env.NODE_ENV)
                                        if(false) {
                                            navigate(`${process.env.PUBLIC_URL}/questionnaire`)
                                        }else{
                                            navigate(`${process.env.PUBLIC_URL}/choice/1/category/1/counter/1`)
                                        }
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
