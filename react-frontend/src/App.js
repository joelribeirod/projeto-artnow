import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

//components
  import LandPage from './components/pages/landpage/LandPage';
  import MainLogin from './components/pages/mainlogin/MainLogin'
  import MainFeatures from './components/pages/mainFeatures/MainFeatures'
//


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandPage />}/>
        <Route path="/login" element={<MainLogin />}/>
        <Route path="/mainfeatures" element={<MainFeatures />}/>
      </Routes>
    </Router>
  )
}

export default App;

