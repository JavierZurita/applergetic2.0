import { Link, useNavigate } from "react-router-dom";
import "./PaginaCorfirmarAlergias.scss";
import { useContext, useEffect } from "react";
import { RegistroContext } from "../../shared/context/Registro.context";
import { useState } from "react";
import { EmailContext } from "../../shared/context/Email.context";
import axios from "axios";
const mongoose = require('mongoose');

export default function PaginaConfirmarAlergias() {
    
    const { contextData, setContextData } = useContext(RegistroContext);
    const [seleccionados, setSeleccionados] = useState([]);
    const [nombresAlergias, setNombresAlergias] = useState([]);
    const navigate = useNavigate();
    const {emailContext, setEmailContext} = useContext(EmailContext);

    useEffect(() => {
        const array = [];
        // console.log("----------");
        // console.log(contextData.alergiasRegistro);
        // console.log("----------");
        setSeleccionados(contextData.alergiasRegistro);
        // console.log(seleccionados);
            try {
                axios.get("http://localhost:5000/alergias", {
                params: {
                  ids: contextData.alergiasRegistro
                }
              }).then( res => {
                // console.log("contextData.alergiasRegistro: ");
                // console.log(contextData.alergiasRegistro);
                for (const codigo of contextData.alergiasRegistro) {
                    // console.log(res.data);
                    for (const alergia of res.data) {
                        if(codigo === alergia._id){
                            console.log(alergia.name);
                            array.push(alergia.name);
                        }
                    }
                }
                console.log(array);
                setNombresAlergias(array);
              })
            } catch (error) {
              console.log(error);
            }
            
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
         // FALTA AXIOS
         try {
            
            axios.get(`http://localhost:5000/user/email/${emailContext}`).then(res => {
                console.log(res.data.user._id);
                const id = res.data.user._id
                const updatedAlergias = {
                    alergias: seleccionados.map(item =>new mongoose.Types.ObjectId(item))
                }
                axios.put(`http://localhost:5000/user/${id}`, updatedAlergias).then(res => {
                    console.log("actualizado");
                    console.log(res.data);
                    navigate('/PaginaHome');
                })
            })

         } catch (error) {
            console.log(error);
         }
    }
    return(
        <div className="paginaConfirmarAlergias">
              <h3>Confirma tu selección.</h3>
              <p>A continuación te resumimos los alimentos registrados como peligrosos para ti.</p>
            <>
                <div className="listado">
                    <p>Marca para deseleccionar o añadir uno nuevo</p>
                    {nombresAlergias.map((item, index) => 
                        <div onClick={(e) => handleClick(item)} className={seleccionados.includes(item) ? 'opcion' : 'opcion selected'} key={index}>{item}</div>
                    ) }
                    <div onClick={() => handleAñadir()} className="opcion">Añadir alergias</div>
                </div>
            </>
            <button className="confirmar" onClick={handleSubmit}><Link to="/PaginaConfirmarAlergias"> CONFIRMAR </Link></button>
        </div>
    )
}