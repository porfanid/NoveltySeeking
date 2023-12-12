import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import HomePage from "./pages/HomePage/HomePage";
import ChoicePage from "./pages/ChoicePage/ChoicePage";
import VideoPage from "./pages/VideoPage/VideoPage";
import QuizPage from "./pages/QuizPage/QuizPage";
import CompletePage from "./pages/CompletePage/CompletePage";
import {useEffect, useState} from "react";
import QuizResult from "./pages/QuizPage/QuizResult";


function App() {

  const [questions, setJsonData] = useState(null);

  useEffect(() => {
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

  const [selectedImage, setImage] = useState(null);
  const [selectedQuiz, setQuiz] = useState(null);
  const [quizCorrectanswer, setQuizCorrectanswer] = useState(null);
  const [answers, setAnswers] = useState({});
  const [currentAnswer, setAnswer] = useState({});
  function setCurrentAnswer(question, answer){
    currentAnswer[question] = answer
    console.log("Answer has been registered");
    console.log(JSON.stringify(currentAnswer))
  }

  function completeAnswerSet(index){
    answers[index]={...currentAnswer}
    setAnswer({});
    setImage(null)
  }

  function setSelectedImage(image){
    setImage(image);
    setCurrentAnswer("choice", image);
  }


  const router = createBrowserRouter([
    {
      path: process.env.PUBLIC_URL+"/",
      element: <HomePage />,
    },
    {
      path: process.env.PUBLIC_URL+"/choice/:index",
      element: <ChoicePage setCurrentAnswer={setCurrentAnswer} setSelectedImage={setSelectedImage} selectedImage={selectedImage}/>,
    },
    {
      path: process.env.PUBLIC_URL+"/video/:index",
      element: <VideoPage video={selectedImage}/>,
    },
    {
      path: process.env.PUBLIC_URL+"/quiz/:index",
      element: <QuizPage currectAnswer={currentAnswer} setQuizCorrectAnswer={setQuizCorrectanswer} questions={questions} choice={selectedImage} setSelectedQuiz={(quiz)=>{setQuiz(quiz); setCurrentAnswer("quiz", quiz) }} />,
    },
    {
      path: process.env.PUBLIC_URL+"/quizResult/:index",
      element: <QuizResult currectAnswer={currentAnswer} completeAnswerSet={completeAnswerSet} isAnswerCorrect={selectedQuiz===quizCorrectanswer}/>,
    },
    {
      path: process.env.PUBLIC_URL+"/complete",
      element: <CompletePage answers = {answers} completeAnswerSet={completeAnswerSet}/>,
    },
  ])


  return (
    <>
      <div className="main-banner">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="header-text">
                <RouterProvider router={router} />
              </div>

            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default App;
