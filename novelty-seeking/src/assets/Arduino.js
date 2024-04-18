import {baudrate} from "./settings";

const requestPort = async () => {
    try {
        // if no port is passed to this function,
        if (port == null) {
            // pop up window to select port:
            setPort(await navigator.serial.requestPort());
        } else {
            // open the port that was passed:
            this.port = port;
        }
        // set port settings and open it:
        // TODO: make port settings configurable
        // from calling script:
        await this.port.open({ baudRate: 9600 });
        // start the listenForSerial function:
        this.serialReadPromise = this.listenForSerial();

    } catch (err) {
        // if there's an error opening the port:
        console.error("There was an error opening the serial port:", err);
    }
};


const openSerialPort = async () => {
    const port = await requestPort();
    if (port) {
        try {
            await port.open({ baudRate: baudrate }); // Ορίστε το ρυθμό baud σύμφωνα με τις απαιτήσεις σας
            console.log('Serial port opened:', port);
            return port;
        } catch (error) {
            console.error('Error opening serial port:', error);
            return null;
        }
    }
    return null;
};

export default openSerialPort;