/*
 * This component is the first page of the application
 * where the user enters his personal details
 * (code, birthdate,etc)
 * and selects whether he wants to use the serial port
 */
import { useNavigate } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from '@mui/material/Button';
import {useEffect, useState} from "react";
import {Form} from "react-bootstrap";
import {baudrate} from "../../assets/settings";
import {useTranslation} from "react-i18next";

function PersonalInfo(props) {
    const navigate = useNavigate();

    const [selectedDate, setSelectedDate] = useState(null);
    const [gender, setGender] = useState(null);
    const [code, setCode] = useState(null);
    const [portOpened, setPortOpened] = useState(false);

    const [port, setPort] = useState(null);
    const { t} = useTranslation("common");

    const isSerialSupported = () => {
        //return false;
        return 'serial' in navigator && typeof navigator.serial.requestPort === 'function';
    };


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
            await temp_port.open({ baudRate: baudrate });
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
            <div className="hero-section align-items-center justify-content-center">
                <h2 className={"mb-4"} dangerouslySetInnerHTML={{__html:t("enter-personal-code")}}></h2>
                <div className="container d-flex align-items-center justify-content-center">
                    <div className="col-md-9">


                        <div className="row">
                            <div className="col-md-6 mb-2 d-flex align-items-center">
                                <span className="h3 text-white">{t("personal-code")}:</span>
                            </div>
                            <div className="col-md-3 mb-2 d-flex align-items-center">
                                <div className="flex-grow-1">
                                    <input
                                        type="text"
                                        id="personal-code"
                                        className="form-control"
                                        placeholder={t("personal-code")}
                                        onChange={handleCodeChange}
                                        required={true}
                                    />
                                </div>
                            </div>
                        </div>

                        <hr className={"text-white"}/>

                        <div className="row">
                            <div className="h3 col-md-12 mb-2 d-flex align-items-center">
                                <span className="text-white">{t("birthdate")}:</span>
                                <div className="flex-grow-1">
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
                        </div>

                        <hr className={"text-white"}/>
                        <div className="row">
                            <div
                                className="col-md-12 mb-2 d-flex align-items-center">
                                <h3 className="text-white">{t("sex")}:</h3>
                                <div className={"flex-grow-1"}>
                                    <Button
                                        variant="contained"
                                        style={{
                                            backgroundColor: gender === "female" ? "#ff00ff" : "#440044",
                                            color: "#fff",
                                            marginRight: "10px"
                                        }}
                                        onClick={() => handleGenderSelect("female")}
                                    >
                                        {t("female")}
                                    </Button>
                                    <Button
                                        variant="contained"
                                        style={{
                                            backgroundColor: gender === "male" ? "#0000ff" : "#000055",
                                            color: "#fff"
                                        }}
                                        onClick={() => handleGenderSelect("male")}
                                    >
                                        {t("male")}
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <hr className={"text-white"}/>


                        <div className="buttons mb-3">
                            <div className="row">
                                {(isSerialSupported()) &&
                                    <div className="col-md-4 mb-0 d-flex justify-content-start align-items-start">
                                        <input
                                            type="checkbox"
                                            className={`btn-check ${portOpened ? 'btn-outline-primary' : 'btn-secondary'}`}
                                            id="btn-check-outlined"
                                            autoComplete="off"
                                            checked={portOpened}
                                            onChange={toggleSerialPort}
                                        />
                                        <label
                                            className={`btn ${portOpened ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                                            htmlFor="btn-check-outlined"
                                        >
                                            {portOpened ? t("encephalograph-connected") : t("connect-encephalograph")}
                                        </label>
                                    </div>}
                                <div
                                    className={`d-flex justify-content-center align-items-center ${(isSerialSupported()) ? 'col-md-8' : 'col-md-12'}`}>
                                    <div className="bigborder-button">
                                        <button className="main-button" onClick={() => {
                                            if (portOpened) {
                                                writeDataToSerialPort("a").then(r => {
                                                })
                                            }
                                            if (!(code && selectedDate && gender)) {
                                                alert(t("fill-all-fields"));
                                                return;
                                            }
                                            props.publishUser(gender, selectedDate);
                                            props.setStartTime();
                                            console.log(process.env.NODE_ENV)

                                            navigate(`${process.env.PUBLIC_URL}/choice/1/category/1/counter/1`)
                                        }}>
                                            {t("begin-questions")}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default PersonalInfo;
