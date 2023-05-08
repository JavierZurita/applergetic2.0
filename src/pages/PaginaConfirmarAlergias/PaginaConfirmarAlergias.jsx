import { Link } from "react-router-dom";
import "./PaginaCorfirmarAlergias.scss";
import { useContext, useEffect } from "react";
import { RegistroContext } from "../../shared/context/Registro.context";
import { useState } from "react";

export default function PaginaConfirmarAlergias() {
    
    const { contextData, setContextData } = useContext(RegistroContext);
    const [seleccionados, setSeleccionados] = useState([]);

    useEffect(() => {
        setSeleccionados(contextData.alergiasRegistro);
        console.log(seleccionados);
    },[])

    const handleClick = (item) => {
        console.log(item);
        console.log(seleccionados);
        if (seleccionados.includes(item)) {
            const updatedSeleccionados = seleccionados.filter((selectedItem) => selectedItem !== item);
            setSeleccionados(updatedSeleccionados);
          } else {
            const updatedSeleccionados = [...seleccionados, item];
            setSeleccionados(updatedSeleccionados);
          }
    }
    const handleAñadir = () =>{
        
    }
    const handleSubmit = () =>{
        setContextData(prevData => ({ ...prevData, alergiasRegistro: seleccionados }));

    }
    return(
        <div className="paginaConfirmarAlergias">
              <h3>Confirma tu selección.</h3>
              <p>A continuación te resumimos los alimentos registrados como peligrosos para ti.</p>
            <>
                <div className="listado">
                    <p>Marca para deseleccionar o añadir uno nuevo</p>
                    {contextData.alergiasRegistro.map((item, index) => 
                        <div onClick={(e) => handleClick(item)} className={seleccionados.includes(item) ? 'opcion selected' : 'opcion'} key={index}>{item}</div>
                    ) }
                    <div onClick={() => handleAñadir()} className="opcion">Añadir alergias</div>
                </div>
            </>
            <button className="confirmar" onClick={handleSubmit}><Link to="/PaginaConfirmarAlergias"> CONFIRMAR </Link></button>
        </div>
    )
}