import { FaStar } from 'react-icons/fa';
import "./PaginaEvaluar.scss";

export default function Funcionalidad({ rating, onChange,  }) {
    const stars = Array.from({ length: 5 }, (_, index) => (
        <FaStar
          key={index}
          color={index < rating ? '#ffc107' : '#e4e5e9'}
          size={index < rating ? '2em' : '2em'}
          onClick={() => onChange(index + 1)}
          style={{ marginRight: '1rem' }}
          
        />
      ));
    
      return(  
    <div className='starts'>{stars}</div>)
    }
