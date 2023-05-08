
import { useState } from 'react';
import Funcionalidad from './Funcionalidad';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import "./PaginaEvaluar.scss";

export default function PaginaEvaluar({onClose}) {
  const [rating, setRating] = useState(0);

  function handleRatingChange(newRating) {
    setRating(newRating);
  }

  return (
    <div className='Pagina_Evaluar'>
<button className="close_button" onClick={onClose}>
          <AiOutlineCloseCircle />
        </button>
   <div >
            <img class="logo" src="./img/portada.png" alt="APPlergetic"/>
        </div>
      <h3 className='letra'>¡Gracias por usar Applergic!</h3>
      <h3 className='letra'> Por favor, evalua tu experiencia. </h3>
      <Funcionalidad rating={rating} onChange={handleRatingChange} />
      <a href="kk"><h4>Enviar sugerencia</h4></a>
    </div>
  );
}

