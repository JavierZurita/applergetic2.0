import { useContext, useEffect, useState } from "react";
import HeaderRegister from "../../components/Header-register/HeaderRegister";
import axios from "axios";
import "./PaginasAlergias.scss";
import { Link } from "react-router-dom";
import { RegistroContext } from "../../shared/context/Registro.context";
import { UserContext } from "../../shared/context/User.context";


export default function PaginaAlergias() {
    
    const { contextData, setContextData } = useContext(RegistroContext);
    const { email, contactName, contactEmail, contactNumber, company, alergiasRegistro } = contextData;
    const {userData, setUserData} = useContext(UserContext);

    const [alergiasPorLetra, setAlergiasPorLetra] = useState("");
    const [alergias, setAlergias] = useState("");
    const [seleccionados, setSeleccionados] = useState([]);
    const [seleccInicial, setSeleccInicial] = useState([]);
    const [flechaSelected, setFlechaSelected] = useState(false);
    const [infoVisible, setInfoVisible] = useState({});

    useEffect(() => {
        console.log(userData);
        axios.get(`http://localhost:5000/alergias`).then(res => {
            
            const groupedAlergias = res.data.reduce((acc, curr) => {
                const inicial = curr.name.charAt(0).toUpperCase();
                if(!acc[inicial]){
                    acc[inicial] = [];
                }

                acc[inicial].push(curr);
                return acc;
            });


            Object.keys(groupedAlergias).forEach(key => {
                if (Array.isArray(groupedAlergias[key])) {
                    groupedAlergias[key].sort((a, b) => (a.name > b.name ? 1 : -1));
                }
            });
            setAlergiasPorLetra(Object.keys(groupedAlergias).filter(key => /^[A-Z]$/.test(key)));
            setAlergias(groupedAlergias);
            // console.log(groupedAlergias);
        })
        .catch(error => console.log(error));
    }, []);

    const handleAlergiaClick = (id, inicial, name) => {
        if (seleccionados.includes(id)) {
            setSeleccionados(seleccionados.filter(sel => sel !== id));
        } else {
            setSeleccionados([...seleccionados, id]);
        }

        if(seleccInicial.includes(name)){
            setSeleccInicial(seleccInicial.filter(sel => sel !== name));
        } else{
            setSeleccInicial([...seleccInicial, name]);
        }
        
        setContextData({...contextData, alergiasRegistro: seleccionados});
    }

    const handleFlechaClick = (key) => {
        setInfoVisible((prevState) => ({...prevState, [key]: !prevState[key]}));
        setFlechaSelected(!flechaSelected);
    };      
    
    return(
        <div className="pagina-alergias">
            <HeaderRegister />
            <div className="text">
               <h3>Ahora selecciona tus alergias e intolerancias.</h3>
                <p>Los elementos marcados serán identidicados en tus búsquedas como peligrosos para ti.</p> 
            </div>
            <div className="iniciales">
                {alergiasPorLetra && alergiasPorLetra.sort().map((key,index) => 
                    <div key={index} className={seleccInicial.some((sel) => sel.startsWith(key)) ? "selected iniciales__item" : "iniciales__item"}>
                        {key}
                    </div>
                )}
            </div>
            <div className="listado">
                {alergiasPorLetra && alergiasPorLetra.sort().map(key => (
                    <div key={key}>
                        <div className="alergias">
                            <p className={seleccInicial.some((sel) => sel.startsWith(key)) ? "selected iniciales__item" : "iniciales__item"}>{key}</p>
                            <button onClick={() => handleFlechaClick(key)} className={infoVisible[key] ? "alergias__flecha--invertida" : "alergias__flecha"}> ↓ </button>
                        </div>
                        <div className={infoVisible[key] ? "alergias__botones hidden" : "alergias__botones"} style={{ display: infoVisible[key] ? "none" : "flex" }}>
                           {alergias[key] && alergias[key].map(alergia => (
                            <div key={alergia._id} onClick={(e) =>handleAlergiaClick(alergia._id, key, alergia.name)} className={seleccionados.includes(alergia._id) ? 'opcion selected' : 'opcion'}>
                                {alergia.name}
                            </div>
                            ))} 
                        </div>
                    </div>
                ))}
            </div>
           <button className="guardar" onClick={() => handleAlergiaClick("")}><Link to="/PaginaConfirmarAlergias"> Guardar </Link></button>
        </div>
    )
}
