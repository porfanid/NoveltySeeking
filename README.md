# NoveltySeeking

### Explore whether you are a novelty seeker with us.

Come to us and through advanced techniques we can determine whether or not you are a **Novelty Seeker.** You can contact us and we will arrange a series of tests for that.

This code is the app in the second step:

1. Watch a short movie
2. Complete the small videos part:
   1. Put on the encephalograph.
   2. Visit the webpage on [Exploring The Brain](https://exploringthebrain.gr/novelty_seeking/) (When you go to the webpage the encephalograph will be start recording automatically)
   3. Watch some videos and answer a question based on each video you watched.
   4. Complete the questionaire that comes after the video in the same webpage.
3. Drawing: You will draw a small image that will be acessed by some tachers at the arts department of our university.

This experiment was advised by professor [Konstantinos Tsamis](https://med.uoi.gr/index.php?option=com_content&view=article&id=736:konstantinos-tsamis-2&catid=26&lang=en&Itemid=101) in the [Medical school](https://www.med.uoi.gr/) of the [University of Ioannina](https://www.uoi.gr/).

### Equipment that you will need

While this is a website that can be hosted on a simple web server, it uses the webserial api to contact the Arduino(described later) and use the encephalograph automatically. **Unfortunately** not all browsers support this api. Which means that you will have to use a suitable browser.(Google Chrome for example supports it).

Arduino

Encephalograph

### Coding

1. The app stores the data in a mysql database. You can initialize a database of your own by editing the .env file in the `novelty-seeking/public` folder

```
DB_HOST=localhost
DB_DATABASE=db
DB_USERNAME=user
DB_PASSWORD=passwd
```

2) You need to create the following tables in the database so that the data can be saved without errors:
   ```
   CREATE TABLE `answer` (
     `code` int NOT NULL,
     `id` int NOT NULL,
     `choice` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL,
     `category` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL,
     `counter` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL,
     `quiz` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL,
     `date` varchar(250) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL,
     PRIMARY KEY (`code`,`id`)
   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;


   CREATE TABLE `questioner` (
     `code` int NOT NULL,
     `id` int NOT NULL,
     `answer` int NOT NULL,
     PRIMARY KEY (`code`,`id`)
   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


   CREATE TABLE `user` (
     `code` int NOT NULL,
     `year_of_birth` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
     `sex` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
     PRIMARY KEY (`code`)
   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
   ```
3) The website connects itself(using the webserial api) to an arduino that does the job of the start switch to the encephalograph. This means that you will need to compile and run on your arduino the `SerialCallResponseASCII.ino` file found in the encephalograph folder.
4) You will have to figure out where the pins that act as the switch in your encephalograph are. (You will have to use the pinout model for each encephalograph. It is not the same.) If it is 5V input, then you are good as it is.
   1) you will need jumper cables to connect the arduino to the encephalograph
   2) If you need 3.3V input, I have included a fritzin design that shows the schematics for a circuit that gets 5V as input and outputs 3.3V, so you will need the apropriate resistors and cables to create the circuit and connect it to the encephalograph
5) And please remember that you will need 2 USB ports for this to work. One for he arduino to control the encephalograph, and another for the encephalograph to send the data to the computer.
6) When you are done getting your data, you need to go to the `GetData/download.py` file and update the credentials to the database in the main function to the ones you used in th .env file.
7) If there is something wrong with the databse, you can run the `restore_data.py` file to fix it
