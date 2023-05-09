
import { Link } from 'react-router-dom';
import "./PaginaFinRegistro.scss"
import HeaderRegister from '../../components/Header-register/HeaderRegister';

export default function PaginaFinRegistro() {


    return(<div className='PaginaFinRegistro'>
      <div class='volver_alergia'>
  <div>
  <HeaderRegister></HeaderRegister>
  </div>
  <p>4 de 4</p>
  <div >
    <Link to="/PaginaHome">X</Link>
  </div>
</div>
        <div>
        <img class="mano" src="./img/gallery/mano.png" alt="APPlergetic" />
        </div>
        <div>
            <h4 className='text_registro'>Hemos terminado, ya puedes escanear tu primer producto.</h4>
        </div>

        <button className="button_producto"><Link to="/PaginaEscaneo">
       Escanea un producto  </Link>
        </button>
        </div>
    )
}