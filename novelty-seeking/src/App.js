import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import HomePage from "./pages/HomePage/HomePage";
import ChoicePage from "./pages/ChoicePage/ChoicePage";
import VideoPage from "./pages/VideoPage/VideoPage";
import QuizPage from "./pages/QuizPage/QuizPage";


import video from "./assets/videos/qwerty.mp4";
import {useState} from "react";

function getVideoSource(selectedImage){
  return video;
}

function App() {

  const [selectedImage, setSelectedImage] = useState(null);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/choice",
      element: <ChoicePage setSelectedImage={setSelectedImage} selectedImage={selectedImage}/>,
    },
    {
      path: "/video",
      element: <VideoPage video={getVideoSource(selectedImage)}/>,
    },
    {
      path: "/quiz",
      element: <QuizPage />,
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
