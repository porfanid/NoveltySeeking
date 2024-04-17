import './App.css';
import {createBrowserRouter, Navigate, RouterProvider, useParams} from "react-router-dom"
import HomePage from "./pages/HomePage/HomePage";
import ChoicePage from "./pages/ChoicePage/ChoicePage";
import VideoPage from "./pages/VideoPage/VideoPage";
import QuizPage from "./pages/QuizPage/QuizPage";
import QuizCompletePage from "./pages/QuizPage/CompletePage/CompletePage";
import {useEffect, useState} from "react";
import QuizResult from "./pages/QuizPage/QuizResult";
import axios from 'axios';
import NotLicensed from "./pages/notLicensed/notLicensed";
import CodePage from "./pages/CodePage";
import Questionaire from "./pages/questionaire/questionaire";
import CompletePage from "./pages/CompletePage/CompletePage"

function App() {

  const [questions, setJsonData] = useState(null);
  const [licenseValid, setLicenseValid] = useState(true);
  const [previousChoices] = useState([]);
  const [startTime, setStartTime] = useState(Date.now());
  const [totalDuration, setTotalDuration] =  useState(0);

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
  const [answers, setAnswers] = useState({});
  const [currentAnswer, setAnswer] = useState({});

  const [enteredPassword, hasEnteredPassword] = useState(false);


  function resetAnswers(){
    setAnswers({});
  }

  function setCurrentAnswer(question, answer){
    currentAnswer[question] = answer
    console.log(JSON.stringify(currentAnswer))
  }

  function publishUser(sex, year_of_birth){
    const data = {
      'code': code,
      'sex': sex,
      'year_of_birth':JSON.stringify(year_of_birth)
    };
    axios.post(process.env.PUBLIC_URL+"/user.php", data)
        .then(response => {
          console.log(response.data);
          // Handle the response data as needed
        })
        .catch(error => {
          alert('Error:'+ error);
          // Handle errors
        });
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
          alert('Error:'+ error);
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
      path:process.env.PUBLIC_URL+"/",element: (!enteredPassword)?<CodePage hasEnteredPassword={hasEnteredPassword}/>:<Navigate  to= {process.env.PUBLIC_URL+"/user_code"} state={{ previous: process.env.PUBLIC_URL+"/" }} replace/>,
    },
    {
      path:process.env.PUBLIC_URL+"/user_code",element: (enteredPassword)?<HomePage publishUser={publishUser} code={code} setCode = {setCode}/>:<Navigate  to= {process.env.PUBLIC_URL+"/"} state={{ previous: process.env.PUBLIC_URL+"/user_code" }} replace/>,
    },{
      path:process.env.PUBLIC_URL+"/questionnaire",element: (enteredPassword)?<Questionaire code={code}/>:<Navigate  to= {process.env.PUBLIC_URL+"/"} state={{ previous: process.env.PUBLIC_URL+"/questionnaire" }} replace/>,
    },
    {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      path:process.env.PUBLIC_URL+"/choice/:index/category/:category/counter/:counter",element: (enteredPassword)?<ChoicePage setStartTime={()=>{setStartTime(Date.now())}} code={code} previousChoices = {previousChoices} getLastChoice={getLastChoice} setCurrentAnswer={setCurrentAnswer} setSelectedImage={setSelectedImage} selectedImage={selectedImage}/>:<Navigate  to= {process.env.PUBLIC_URL+"/"} state={{ previous: process.env.PUBLIC_URL+`/choice/${useParams().index}/category/${useParams().category}/counter/${useParams().counter}` }} replace/>,
    },
    {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      path:process.env.PUBLIC_URL+"/video/:index/choice/:choice",element: (enteredPassword)?<Navigate to="category/1/counter/1" replace/>:<Navigate  to= {process.env.PUBLIC_URL+"/"} state={{ previous: process.env.PUBLIC_URL+`/video/${useParams().index}/choice/${useParams().choice}` }} replace/>
    },
    {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      path:process.env.PUBLIC_URL+"/video/:index/choice/:choice/category/:category/counter/:counter",element: (enteredPassword)?<VideoPage code={code} setCategoryAndCounter={setCategoryAndCounter}/>:<Navigate  to= {process.env.PUBLIC_URL+"/"} state={{ previous: process.env.PUBLIC_URL+`/video/${useParams().index}/category/${useParams().category}/counter/${useParams().counter}` }} replace/>,
    },
    {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      path:process.env.PUBLIC_URL+"/quiz/:index/choice/:choice",element: (enteredPassword)?<Navigate code={code} to="category/1/counter/1" replace/>:<Navigate  to= {process.env.PUBLIC_URL+"/"} state={{ previous: process.env.PUBLIC_URL+`/quiz/${useParams().index}/choice/${useParams().choice}` }} replace/>
    },
    {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      path:process.env.PUBLIC_URL+"/quiz/:index/choice/:choice/category/:category/counter/:counter",element: (enteredPassword)?<QuizPage code={code} currectAnswer={currentAnswer} setQuizCorrectAnswer={setQuizCorrectanswer} questions={questions} choice={selectedImage} setSelectedQuiz={(quiz)=>{setQuiz(quiz); setCurrentAnswer("quiz", quiz) }} startTime={startTime} setSelectedTime={(time)=>{setCurrentAnswer("date", time)}} />:<Navigate  to= {process.env.PUBLIC_URL+"/"} state={{ previous: process.env.PUBLIC_URL+`/quiz/${useParams().index}/category/${useParams().category}/counter/${useParams().counter}` }} replace/>,
    },
    {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      path:process.env.PUBLIC_URL+"/quizResult/:index/choice/:choice/category/:category/counter/:counter",element: (enteredPassword)?<QuizResult code={code} setCurrentAnswer={setCurrentAnswer} currectAnswer={currentAnswer} completeAnswerSet={completeAnswerSet} isAnswerCorrect={selectedQuiz===quizCorrectanswer}/>:<Navigate  to= {process.env.PUBLIC_URL+"/"} state={{ previous: process.env.PUBLIC_URL+`/quizResult/${useParams().index}/category/${useParams().category}/counter/${useParams().counter}` }} replace/>,
    },
    {
      path:process.env.PUBLIC_URL+"/quizComplete",element: (enteredPassword)?<QuizCompletePage code={code} resetAnswers={resetAnswers} totalDuration = {(endTime)=>setTotalDuration((endTime - startTime) / 1000)} answers={answers} completeAnswerSet={completeAnswerSet}/>:<Navigate  to= {process.env.PUBLIC_URL+"/"} state={{ previous: process.env.PUBLIC_URL+"/complete" }} replace/>,
    },{
      path:process.env.PUBLIC_URL+"/Complete",element: (enteredPassword)?<CompletePage/>:<Navigate  to= {process.env.PUBLIC_URL+"/"} state={{ previous: process.env.PUBLIC_URL+"/complete" }} replace/>,
    },
  ])


  return (
    <>
      <div className="main-banner">
        <div className="">
          <div className="row">
            <div className="col-lg-12">
              <div className="m-auto">
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
