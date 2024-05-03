import Header from "../../GeneralComponents/Header";
import { useNavigate } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from '@mui/material/Button';
import {useEffect, useState} from "react";
import {baudrate} from "../../assets/settings";

function HomePage(props) {
    const navigate = useNavigate();

    const [selectedDate, setSelectedDate] = useState(null);
    const [gender, setGender] = useState(null);
    const [code, setCode] = useState(null);
    const [port, setPort] = useState(null);
    const [portOpened, setPortOpened] = useState(false);

    const [port, setPort] = useState(null);


    const requestPort = async () => {
        let temp_port
        try {
            // if no port is passed to this function,
            if (port == null) {
                temp_port = await navigator.serial.requestPort();
                // pop up window to select port:
                setPort(temp_port);
            } else {
                // open the port that was passed:
                temp_port = port;
            }
            // set port settings and open it:
            // TODO: make port settings configurable
            // from calling script:
            await temp_port.open({ baudRate: 9600 });
            // start the listenForSerial function:
            //this.serialReadPromise = this.listenForSerial();
            return temp_port;
        } catch (err) {
            // if there's an error opening the port:
            if(temp_port) {
                await temp_port.close();
            }
            console.error("There was an error opening the serial port:", err);
        }
    };


    const writeDataToSerialPort = async (data) => {
        let port;
        try {
            // Open the serial port
            port = await requestPort();

            if (port) {
                // Get the writable stream writer from the port
                const writer = port.writable.getWriter();

                try {
                    // Write data to the serial port
                    await writer.write(data);
                    console.log('Data written to serial port:', data);
                } finally {
                    // Release the writer's lock
                    writer.releaseLock();
                }
            }
        } catch (error) {
            console.error('Error writing data to serial port:', error);
        } finally {
            // Close the serial port
            if (port!=null) {
                await port.close();
                console.log('Serial port closed.');
            }else{
                console.log('Serial port was not opened.');
                console.log(port)
            }
        }
    };

    useEffect(() => {

    }, []);

    const handleCodeChange = (e) => {
        setCode(e.target.value);
        props.setCode(e.target.value);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleGenderSelect = (selectedGender) => {
        setGender(selectedGender);
    };

    const toggleSerialPort = () => {
        if (portOpened) {
            port.close();
            setPortOpened(false);
            setPort(null);
        } else {
            requestPort();
        }
    };

    return (
        <>
            <Header />
            <div className="hero-section align-items-center justify-content-center">
                <h2>Εισάγετε τον <em>Προσωπικό σας Κωδικό</em></h2>
                <div className="container d-flex align-items-center justify-content-center">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-md-12 mb-5">
                                    <div className="input-group mb-2">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Προσωπικός κωδικός"
                                            onChange={handleCodeChange}
                                            required={true}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12 mb-5">
                                    <h3 className={"text-dark-emphasis"}>Ημερομηνία Γέννησης:</h3><br />
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
                                    <Button
                                        variant="contained"
                                        style={{
                                            backgroundColor: gender === "female" ? "#ff00ff" : "#440044",
                                            color: "#fff",
                                            marginRight: "10px"
                                        }}
                                        onClick={() => handleGenderSelect("female")}
                                    >
                                        Κορίτσι
                                    </Button>
                                    <Button
                                        variant="contained"
                                        style={{
                                            backgroundColor: gender === "male" ? "#0000ff" : "#000055",
                                            color: "#fff"
                                        }}
                                        onClick={() => handleGenderSelect("male")}
                                    >
                                        Αγόρι
                                    </Button>
                                </div>
                            </div>

                            {(isSerialSupported())&&
                            <div className="row">
                                <div className="col-md-12 mb-5">
                                    <Form.Check
                                        type="switch"
                                        id="custom-switch"
                                        label="Χρήση Serial Port"
                                        checked={portOpened}
                                        onChange={toggleSerialPort}
                                    />
                                </div>
                            </div>
                            }
                            <div className="buttons">
                                <div className="bigborder-button">
                                    <button className="main-button" onClick={() => {
                                        writeDataToSerialPort("a")
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

export default HomePage;
