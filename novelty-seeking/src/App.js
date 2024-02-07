import './App.css';
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom"
import HomePage from "./pages/HomePage/HomePage";
import ChoicePage from "./pages/ChoicePage/ChoicePage";
import VideoPage from "./pages/VideoPage/VideoPage";
import QuizPage from "./pages/QuizPage/QuizPage";
import CompletePage from "./pages/CompletePage/CompletePage";
import {useEffect, useState} from "react";
import QuizResult from "./pages/QuizPage/QuizResult";
import axios from 'axios';
import NotLicensed from "./pages/notLicensed/notLicensed";


function App() {

  const [questions, setJsonData] = useState(null);

  const [licenseValid, setLicenseValid] = useState(true);

  const [previousChoices] = useState([]);

  useEffect(() => {
    const licenseKey="155581-3AED40-64C29D-2C3A12-B6D099-V3"
    const licenseServer= `https://turingmachine.pro/api/noveltySeeking`
    const fetchLicenseData = async () => {
      try {
        const response = await fetch(licenseServer,{
          method: 'GET',
              headers: {
            'Content-Type': 'application/json',
                'license': licenseKey,
                'machineId': "porfanidlicensekeymachine1",
          },
        });
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        setLicenseValid(data.result)
      }catch (error) {
        console.error('Error fetching license data:');
        console.log(error);
        setLicenseValid(false);
      }
    };

    fetchLicenseData();

    const fetchData = async () => {
      try {
        const response = await fetch(process.env.PUBLIC_URL+'/assets/questions.json');
        const data = await response.json();
        setJsonData(data);
      } catch (error) {
        console.error('Error fetching JSON data:', error);
      }
    };
    fetchData()
  }, []);

  const [code, setCode] = useState('');
  const [selectedImage, setImage] = useState(null);
  const [selectedQuiz, setQuiz] = useState(null);
  const [quizCorrectanswer, setQuizCorrectanswer] = useState(null);
  const [answers] = useState({});
  const [currentAnswer, setAnswer] = useState({});


  function setCurrentAnswer(question, answer){
    currentAnswer[question] = answer
    console.log(JSON.stringify(currentAnswer))
  }

  function completeAnswerSet(index){

    const data=currentAnswer;
    data["index"] = index;
    data["code"]=code;

    console.log(data)

    axios.post(process.env.PUBLIC_URL+"/database.php", data)
        .then(response => {
          console.log(response.data);
          // Handle the response data as needed
        })
        .catch(error => {
          console.error('Error:', error);
          // Handle errors
        });

    answers[index]={...currentAnswer}
    setAnswer({});
    setImage(null);
  }

  function setSelectedImage(image){
    setImage(image);
    setCurrentAnswer("choice", image);
  }

  function setCategoryAndCounter(category, counter){
    setCurrentAnswer("category", category);
    setCurrentAnswer("counter", counter);
  }

  function getLastChoice(index){
    index=parseInt(index)
    if(index<2) {
      return null;
    }
    index=index-1
    return answers[index+""]["choice"]
  }

  const router = createBrowserRouter([
    {
      path: process.env.PUBLIC_URL+"/",
      element: <HomePage setCode = {setCode}/>,
    },
    {
      path: process.env.PUBLIC_URL+"/choice/:index/category/:category/counter/:counter",
      element: <ChoicePage previousChoices = {previousChoices} getLastChoice={getLastChoice} setCurrentAnswer={setCurrentAnswer} setSelectedImage={setSelectedImage} selectedImage={selectedImage}/>,
    },
    {
      path: process.env.PUBLIC_URL+"/video/:index/choice/:choice",
      element: <Navigate to="category/1/counter/1" replace/>
    },
    {
      path: process.env.PUBLIC_URL+"/video/:index/choice/:choice/category/:category/counter/:counter",
      element: <VideoPage setCategoryAndCounter={setCategoryAndCounter}/>,
    },
    {
      path: process.env.PUBLIC_URL+"/quiz/:index/choice/:choice",
      element: <Navigate to="category/1/counter/1" replace/>
    },
    {
      path: process.env.PUBLIC_URL+"/quiz/:index/choice/:choice/category/:category/counter/:counter",
      element: <QuizPage currectAnswer={currentAnswer} setQuizCorrectAnswer={setQuizCorrectanswer} questions={questions} choice={selectedImage} setSelectedQuiz={(quiz)=>{setQuiz(quiz); setCurrentAnswer("quiz", quiz) }} setSelectedTime={(time)=>{setCurrentAnswer("time", time)}} />,
    },
    {
      path: process.env.PUBLIC_URL+"/quizResult/:index/choice/:choice/category/:category/counter/:counter",
      element: <QuizResult setCurrentAnswer={setCurrentAnswer} currectAnswer={currentAnswer} completeAnswerSet={completeAnswerSet} isAnswerCorrect={selectedQuiz===quizCorrectanswer}/>,
    },
    {
      path: process.env.PUBLIC_URL+"/complete",
      element: <CompletePage answers={answers} completeAnswerSet={completeAnswerSet}/>,
    },
  ])


  return (
    <>
      <div className="main-banner">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="header-text">
                {
                  (licenseValid)?<RouterProvider router={router} />:<NotLicensed/>
                }

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
