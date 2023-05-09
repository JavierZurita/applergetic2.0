
import { useState } from 'react';
import Funcionalidad from './Funcionalidad';
import { Link } from 'react-router-dom';
import "./PaginaEvaluar.scss";
import HeaderRegister from '../../components/Header-register/HeaderRegister';

export default function PaginaEvaluar({onClose}) {
  const [rating, setRating] = useState(0);

  function handleRatingChange(newRating) {
    setRating(newRating);
  }

  return (
    <div className='Pagina_Evaluar'>
  
<HeaderRegister></HeaderRegister>

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

