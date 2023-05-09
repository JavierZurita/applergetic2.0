import "./HeaderRegister.scss";
import {useNavigate,} from 'react-router-dom';
export default function HeaderRegister(){
  
        const navigate = useNavigate();
    return (<div className="HeaderRegister">
        <button  className="Button_volver" onClick={() => navigate(-1)}>Volver</button>
        </div>
    )
} 