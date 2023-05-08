import { AiOutlineArrowLeft } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import "./PaginaFinRegistro.scss"

export default function PaginaFinRegistro() {


    return(<div className='PaginaFinRegistro'>
        <div className='volver_alergia'>
        <Link to="/PaginaLogin"> <AiOutlineArrowLeft/> Volver </Link>   <p> 4 de 4 </p>
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