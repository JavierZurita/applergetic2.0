import { Link } from "react-router-dom";
import "./PaginaCorfirmarAlergias.scss";
import { useContext, useEffect } from "react";
import { RegistroContext } from "../../shared/context/Registro.context";

export default function PaginaConfirmarAlergias() {
    
    const { contextData, setContextData } = useContext(RegistroContext);
    const { contactName, contactEmail, contactNumber, company, alergiasRegistro } = contextData;

    useEffect(() => {
        console.log(contextData.alergiasRegistro);
    },[])

    const handleClick = (item) => {
        console.log(item);
    }
    const handleAñadir = () =>{
        
    }
    return(
        <div className="paginaConfirmarAlergias">
            <div>
              <h3>Confirma tu selección.</h3>
                <p>A continuación te resumimos los alimentos registrados como peligrosos para ti.</p>
            </div>
            <div>
                <p>Marca para deseleccionar o añadir uno nuevo</p>
                {contextData.alergiasRegistro.map((item, index) => 
                    <div onClick={(e) => handleClick(item)} key={index}>{item}</div>
                ) }
                <div onClick={() => handleAñadir()}>+ Añadir alergias</div>
            </div>
            <button className="confirmar"><Link to="/PaginaConfirmarAlergias"> CONFIRMAR </Link></button>
        </div>
    )
}