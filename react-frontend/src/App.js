import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

//components
  import LandPage from './components/pages/landpage/LandPage';
  import MainLogin from './components/pages/mainlogin/MainLogin'
  import MainFeatures from './components/pages/mainFeatures/MainFeatures'
  import SignIn from './components/layout/login/SignIn'
  import SignUp from './components/layout/login/SignUp'
  import CriarOuLogar from "./components/layout/login/CriarOuLogar";
//


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandPage />}/>
        <Route path="/mainfeatures" element={<MainFeatures />}/>

        <Route path="/login" element={<MainLogin />} >
          <Route index element = {<CriarOuLogar/>}/>
          <Route path="signin" element={<SignIn />}/>
          <Route path="signup" element={<SignUp />}/>
        </Route>
        
      </Routes>
    </Router>
  )
}

export default App;

