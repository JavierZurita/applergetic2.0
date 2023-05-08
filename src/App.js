
import './App.css';
import { Link } from "react-router-dom"
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import PaginaAlergias from './pages/PaginaAlergias/PaginasAlergias';
import PaginaCarga from './pages/paginaCarga/paginaCarga';
import PaginaConfirmarAlergias from './pages/PaginaConfirmarAlergias/PaginaConfirmarAlergias';
import PaginaContacto from './pages/PaginaContacto/PaginaContacto';
import PaginaDiario from './pages/PaginaDiario/PaginaDiario';
import PaginaEscaneo from './pages/PaginaEscaneo/PaginaEscaneo';
import PaginaEvaluar from './pages/PaginaEvaluar/PaginaEvaluar';
import PaginaFavoritos from './pages/PaginaFavoritos/PaginaFavoritos';
import PaginaFinRegistro from './pages/PaginaFinRegistro/PaginaFinRegistro';
import PaginaHome from './pages/PaginaHome/PaginaHome';
import PaginaProductoEscaneado from './pages/PaginaProductoEscaneado/PaginaProductoEscaneado';
import PaginaInicio from './pages/PaginaInicio/PaginaInicio';
import PaginaRegistro from './pages/PaginaRegistro/PaginaRegistro';
import PantallaBienvenida from './pages/PantallaBienvenida/PantallaBienvenida';
import PaginaLogin from './pages/paginaLogin/paginaLogin'
import { RegistroContext } from './shared/context/Registro.context';
import { useState } from 'react';
import { JwtContext } from './shared/context/Jwt.context';
import { UserContext } from './shared/context/User.context';

import { CodebarContext } from './shared/context/Codebar.context';


import { EmailContext } from './shared/context/Email.context';



function App() {

  const [contextData, setContextData] = useState({
    contactName: '',
    contactEmail: '',
    contactNumber: '',
    company: '',
    alergiasRegistro: []
  });
  const [jwt, setJwt] = useState(localStorage.getItem('token') || null);
  const [newUser,setUser] = useState({});
  const [userData, setUserData] = useState({});

  const [codebar, setCodebar] = useState({});

  const [emailContext, setEmailContext] = useState({});


  return (
    <div className="App">
      <header className="App-header">
      <JwtContext.Provider value={{ jwt, setJwt , newUser, setUser }} >
      <UserContext.Provider value={{userData, setUserData}}>
      <RegistroContext.Provider value={{ contextData, setContextData }}>

      <CodebarContext.Provider value={{ codebar, setCodebar }}>

      <EmailContext.Provider value={{emailContext, setEmailContext}}>

      <Router>
        {/* <div className='enlaces'>
          <Link to="/PaginaAlergias" className='lin'>{('PaginaAlergias')}</Link>
          <Link to="/PaginaCarga" className='lin'>{('PaginaCarga')}</Link>
          <Link to="/PaginaConfirmarAlergias" className='lin'>{('PaginaConfirmarAlergias')}</Link>
          <Link to="/PaginaContacto" className='lin'>{('PaginaContacto')}</Link>
          <Link to="/PaginaDiario" className='lin'>{('PaginaDiario')}</Link>
          <Link to="/PaginaEscaneo" className='lin'>{('PaginaEscaneo')}</Link>
          <Link to="/PaginaEvaluar" className='lin'>{('PaginaEvaluar')}</Link>
          <Link to="/PaginaFavoritos" className='lin'>{('PaginaFavoritos')}</Link>
          <Link to="/PaginaFinRegistro" className='lin'>{('PaginaFinRegistro')}</Link>
          <Link to="/PaginaHome" className='lin'>{('PaginaHome')}</Link>
          <Link to="/PaginaInicio" className='lin'>{('PaginaInicio')}</Link>
          <Link to="/PaginaProductoEscaneado" className='lin'>{('PaginaProductoEscaneado')}</Link>
          <Link to="/PaginaRegistro" className='lin'>{('PaginaRegistro')}</Link>
          <Link to="/PantallaBienvenida" className='lin'>{('PantallaBienvenida')}</Link>
          <Link to="/PaginaLogin" className='lin'>{('PaginaLogin')}</Link>
        </div> */}
       
          <Routes>
            <Route path="PaginaAlergias" element={<PaginaAlergias />} />
            <Route path="" element={<PaginaCarga />} />
            <Route path="PaginaConfirmarAlergias" element={<PaginaConfirmarAlergias />} />
            <Route path="PaginaDiario" element={<PaginaDiario />} />
            <Route path="PaginaEscaneo" element={<PaginaEscaneo />} />
            <Route path="PaginaContacto" element={<PaginaContacto />} />
            <Route path="PaginaEvaluar" element={<PaginaEvaluar />} />
            <Route path="PaginaFavoritos" element={<PaginaFavoritos />} />
            <Route path="PaginaFinRegistro" element={<PaginaFinRegistro />} />
            <Route path="PaginaHome" element={<PaginaHome />} />
            <Route path="PaginaInicio" element={<PaginaInicio />} />
            <Route path="PaginaProductoEscaneado" element={<PaginaProductoEscaneado />} />
            <Route path="PaginaRegistro" element={<PaginaRegistro />} />
            <Route path="PantallaBienvenida" element={<PantallaBienvenida />} />
            <Route path="PaginaLogin" element={<PaginaLogin />} />
          </Routes>


        </Router>

        </CodebarContext.Provider>

      </EmailContext.Provider>

      </RegistroContext.Provider>
      </UserContext.Provider>
      </JwtContext.Provider>
      
      </header>
    </div>
  );
}

export default App;
