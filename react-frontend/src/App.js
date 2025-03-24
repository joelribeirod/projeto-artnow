import {Routes, Route } from "react-router-dom";
import './App.css';

//components
  import LandPage from './components/pages/landpage/LandPage';

  import MainLogin from './components/pages/mainlogin/MainLogin'
    import SignIn from './components/layout/login/SignIn'
    import SignUp from './components/layout/login/SignUp'
    import CriarOuLogar from "./components/layout/login/CriarOuLogar";

  import MainFeatures from './components/pages/mainFeatures/MainFeatures'
    import AdmProjetos from "./components/layout/features/AdmProjetos";
    import CriarCategorias from "./components/layout/features/CriarCategorias";
    import CriarPedidos from "./components/layout/features/CriarPedidos";
    import EditarPerfil from "./components/layout/features/EditarPerfil";
    import MeusPedidos from "./components/layout/features/MeusPedidos";
    import Projeto from "./components/layout/features/Projeto";
//


function App() {
  return (
    
      <Routes>
        <Route path="/" element={<LandPage />}/>
        <Route path="/mainfeatures" element={<MainFeatures />}>
          <Route index element = {<EditarPerfil/>}/>
          <Route path="criarpedidos" element={<CriarPedidos />}/>
          <Route path="meuspedidos" element={<MeusPedidos />}/>
          <Route path="admprojetos" element={<AdmProjetos />}/>
          <Route path="admprojetos/projeto/:id" element={<Projeto />}/>
          <Route path="criarcategorias" element={<CriarCategorias />}/>
        </Route>

        <Route path="/login" element={<MainLogin />} >
          <Route index element = {<CriarOuLogar/>}/>
          <Route path="signin" element={<SignIn />}/>
          <Route path="signup" element={<SignUp />}/>
        </Route>
        
      </Routes>
    
  )
}

export default App;

