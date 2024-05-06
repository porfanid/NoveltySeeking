import './App.css';
import {createBrowserRouter, Navigate, RouterProvider, useParams} from "react-router-dom"
import PersonalInfo from "./pages/PersonalInfo/PersonalInfo";
import ChoicePage from "./pages/ChoicePage/ChoicePage";
import VideoPage from "./pages/VideoPage/VideoPage";
import QuizPage from "./pages/QuizPage/QuizPage";
import QuizCompletePage from "./pages/QuizPage/QuizCompletePage/QuizCompletePage";
import {useEffect, useState} from "react";
import QuizResult from "./pages/QuizPage/QuizResult";
import axios from 'axios';
import NotLicensed from "./pages/notLicensed/notLicensed";
import CodePage from "./pages/CodePage";
import Questionaire from "./pages/questionaire/questionaire";
import QuizAndQuestionnaireCompletePage from "./pages/QuizAndQuestionnaireCompletePage/QuizAndQuestionnaireCompletePage"
import {useTranslation} from "react-i18next";

function App(props) {
  const [licenseValid, setLicenseValid] = useState(true);
  const [previousChoices] = useState([]);
  const [startTime, setStartTime] = useState(Date.now());

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
  }, []);

  const [code, setCode] = useState('');
  const [selectedImage, setImage] = useState(null);
  const [selectedQuiz, setQuiz] = useState(null);
  const [quizCorrectanswer, setQuizCorrectanswer] = useState(null);
  const [answers, setAnswers] = useState({});
  const [currentAnswer, setAnswer] = useState({});
  const { t, i18n} = useTranslation("common");

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
      'year_of_birth':JSON.stringify(year_of_birth),
      'token': process.env.REACT_APP_VALID_TOKEN
    };
    axios.post(process.env.PUBLIC_URL+"/user.php", data)
        .then(response => {
          console.log(response.data);
          // Handle the response data as needed
        })
        .catch(error => {
          //TODO: Remove the comment
          //alert('Error:'+ error);
          // Handle errors
        });
  }

  function completeAnswerSet(index){

    const data=currentAnswer;
    data["index"] = index;
    data["code"]=code;
    data["token"]=process.env.REACT_APP_VALID_TOKEN;
    data["lang"] = i18n.language;

    console.log(data);

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
      path:process.env.PUBLIC_URL+"/user_code",element: (enteredPassword)?<PersonalInfo publishUser={publishUser} code={code} setCode = {setCode}/>:<Navigate to= {process.env.PUBLIC_URL+"/"} state={{ previous: process.env.PUBLIC_URL+"/user_code" }} replace/>,
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
      path:process.env.PUBLIC_URL+"/quiz/:index/choice/:choice/category/:category/counter/:counter",element: (enteredPassword)?<QuizPage code={code} currectAnswer={currentAnswer} setQuizCorrectAnswer={setQuizCorrectanswer} choice={selectedImage} setSelectedQuiz={(quiz)=>{setQuiz(quiz); setCurrentAnswer("quiz", quiz) }} startTime={startTime} setSelectedTime={(time)=>{setCurrentAnswer("date", time)}} />:<Navigate  to= {process.env.PUBLIC_URL+"/"} state={{ previous: process.env.PUBLIC_URL+`/quiz/${useParams().index}/category/${useParams().category}/counter/${useParams().counter}` }} replace/>,
    },
    {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      path:process.env.PUBLIC_URL+"/quizResult/:index/choice/:choice/category/:category/counter/:counter",element: (enteredPassword)?<QuizResult code={code} setCurrentAnswer={setCurrentAnswer} currectAnswer={currentAnswer} completeAnswerSet={completeAnswerSet} isAnswerCorrect={selectedQuiz===quizCorrectanswer}/>:<Navigate  to= {process.env.PUBLIC_URL+"/"} state={{ previous: process.env.PUBLIC_URL+`/quizResult/${useParams().index}/category/${useParams().category}/counter/${useParams().counter}` }} replace/>,
    },
    {
      path:process.env.PUBLIC_URL+"/quizComplete",element: (enteredPassword)?<QuizCompletePage code={code} resetAnswers={resetAnswers} answers={answers} completeAnswerSet={completeAnswerSet}/>:<Navigate  to= {process.env.PUBLIC_URL+"/"} state={{ previous: process.env.PUBLIC_URL+"/quizComplete" }} replace/>,
    },{
      path:process.env.PUBLIC_URL+"/Complete",element: (enteredPassword)?<QuizAndQuestionnaireCompletePage/>:<Navigate to= {process.env.PUBLIC_URL+"/"} state={{ previous: process.env.PUBLIC_URL+"/complete" }} replace/>,
    },
  ])


  return (
    <>
      <div className="main-banner">
          <div className="row">
            <div className="col-lg-12">
              <div className="m-auto">
                {
                  (licenseValid) ? <RouterProvider router={router}/> : <NotLicensed/>
                }
              </div>
            </div>
          </div>

        <footer
            className="text-center text-lg-start text-white d-flex footer"
            style={{backgroundColor: "#3e4551"}}
        >
          <div className="container">
            <div className="row">
              <div className="col-12 text-center">
                <div className="mb-3">
                  {t('madeBy')} <a href={"https://pavlos.orfanidis.net.gr"} className="text-white">{t('pavlos')}</a>
                </div>
                <div className="mb-3">
                  {t("direction")+" "+t("male-article")+" "}
                  <a href={"https://www.linkedin.com/in/konstantinos-tsamis-669638a3/"} className="text-white">{t("konstantinos-tsamis")}</a>,{" "+t("female-article")+" "}
                  <a href={"https://www.linkedin.com/in/alexandra-pliakopanou/"} className="text-white">{t("alexandra-pliakopanou")}</a> {t("and")+" "+t("male-article")+" "}
                  <a href={"#"} className="text-white">{t("christos-bozidis")}</a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
