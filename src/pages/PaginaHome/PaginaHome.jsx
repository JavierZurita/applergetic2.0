import "./Paginahome.scss";
import {AiOutlineBarcode } from 'react-icons/ai';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import { HiLifebuoy} from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import ModalMenu from "../../components/ModalMenu/ModalMenu";
import Navbar from "../../components/Navbar/Navbar";


export default function PaginaHome() {
  return (
    <div className="Pagina_home">
      <div>
      <ModalMenu></ModalMenu>
        <img className="logo" src="./img/portada.png" alt="APPlergetic" />
      </div>
      <div>
        <h4 className="nombre">Applergic</h4>
      </div>
      <div className="texto_nombre">
        <p>Mi guía alimentaria</p>
      </div>
        <button className="button_escaner"><Link to="/PaginaEscaneo">
          <AiOutlineBarcode /> Escanear  </Link>
        </button>
      <div className="texto">
        <p>Escanea un nuevo producto.</p>
      </div>
        <button className="button_lupa">  <Link to="/">
          <HiOutlineMagnifyingGlass /> Buscar  </Link>
        </button>
      <div className="texto">
        <p className="texto">Busca un comercio o restaurante para ti.</p>
      </div>
          <button className="button_life"><Link to="/">
            <HiLifebuoy/> S.O.S  </Link>
          </button>
      <div className="texto">
        <p>¿Necesitas ayuda urgente? contactanos con emergencias.</p>
      </div>
      <div className="navbar">
<Navbar></Navbar>
      </div>
    </div>
  );
}