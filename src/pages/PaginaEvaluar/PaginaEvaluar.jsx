
import { useState } from 'react';
import Funcionalidad from './Funcionalidad';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import "./PaginaEvaluar.scss";

export default function PaginaEvaluar({onClose}) {
  const [rating, setRating] = useState(0);

  function handleRatingChange(newRating) {
    setRating(newRating);
  }

  return (
    <div className='Pagina_Evaluar'>
    <div className='volver_login'>
<Link to="/PaginaLogin"> <AiOutlineArrowLeft/> Volver </Link>
</div>
   <div >
            <img class="logo" src="./img/portada.png" alt="APPlergetic"/>
        </div>
        <div className='estrellas'>
      <h3 className='letra'>¡Gracias por usar Applergic!</h3>
      <h3 className='letra'> Por favor, evalua tu experiencia. </h3>
      <div  className='puntuacion'>
      <Funcionalidad rating={rating} onChange={handleRatingChange} />
      </div>
</div>
      <Link to="/PaginaLogin"> Enviar sugerencia </Link>
    </div>
  );
}

