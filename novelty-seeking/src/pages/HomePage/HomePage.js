import React, { useEffect, useState } from "react";
import Header from "../../GeneralComponents/Header";
import { useNavigate } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/material/Button";
import {Form} from "react-bootstrap";

function HomePage(props) {
    const navigate = useNavigate();

    const [selectedDate, setSelectedDate] = useState(null);
    const [gender, setGender] = useState(null);
    const [code, setCode] = useState(null);
    const [port, setPort] = useState(null);
    const [portOpened, setPortOpened] = useState(false);

    const isSerialSupported = () => {
        return 'serial' in navigator && typeof navigator.serial.requestPort === 'function';
    };

    const requestPort = async () => {
        try {
            let temp_port = port;
            if (!temp_port) {
                temp_port = await navigator.serial.requestPort();
                setPort(temp_port);
            }
            if (!portOpened && temp_port && temp_port.readable && temp_port.writable) {
                // Port is already open, set portOpened to true
                setPortOpened(true);
                setPort(temp_port);
            } else {
                // Open the port if it's not already opened
                await temp_port.open({ baudRate: 9600 });
                setPortOpened(true);
            }
            return temp_port;
        } catch (err) {
            console.error("Error opening serial port:", err);
            if (port) {
                await port.close();
                setPort(null);
                setPortOpened(false);
            }
        }
    };

    const writeDataToSerialPort = async (data) => {
        try {
            const port = await requestPort();
            if (port) {
                const writer = port.writable.getWriter();
                await writer.write(data);
                console.log("Data written to serial port:", data);
                writer.releaseLock();
            }
        } catch (error) {
            console.error("Error writing data to serial port:", error);
        }
    };

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
                                    <button
                                        className="main-button"
                                        onClick={() => {
                                            if (!(code && selectedDate && gender)) {
                                                alert("Παρακαλώ συμπληρώστε όλα τα πεδία!");
                                                return;
                                            }
                                            props.publishUser(gender, selectedDate);
                                            navigate(`${process.env.PUBLIC_URL}/choice/1/category/1/counter/1`);
                                        }}
                                    >
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
