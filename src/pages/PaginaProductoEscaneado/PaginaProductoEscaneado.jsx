import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { CodebarContext } from '../../shared/context/Codebar.context';
import './PaginaProductoEscaneado.scss'
import { EmailContext } from '../../shared/context/Email.context';
import { Link, useNavigate } from 'react-router-dom';
import "./PaginaProductoEscaneado.scss";
import { DiarioContext } from '../../shared/context/Diario.context';

export default function PaginaProductoEscaneado() {
  const { codebar } = useContext(CodebarContext);
  const {emailContext} = useContext(EmailContext);
  const {diarioContext, setDiarioContext} = useContext(DiarioContext);
  const [datosProducto, setdatosProducto] = useState({});
  const [datosUsuario, setDatosUsuario] = useState({});
  const [cargandoDatos, setCargandoDatos] = useState(false);
  const [imgVisible, setImagenVisible] = useState();
  const navigate = useNavigate();
  let mensajeApto = "";

  useEffect(()=> {
    console.log("ContextDairio:");
    console.log(diarioContext);
    let cont = 0;
    getdatosProducto();
    getDatosUsuario();

      if(datosProducto.alergias){
        setDiarioContext([...diarioContext, datosProducto]);
        for (const alergiaProd of datosProducto.alergias) {
          if(datosUsuario.includes(alergiaProd)){
            console.log("incluye: ",alergiaProd);
            cont++;
          }
        }
        if(cont > 0){
          mensajeApto= "Este producto no es apto para ti";
          setImagenVisible(false);
        } else {
          mensajeApto ="Este producto es apto para ti";
          setImagenVisible(true);
        }
      }
  },[cargandoDatos])
 
  // console.log(emailContext);
  const getdatosProducto = () => {
    // console.log(codebar);
     
    axios.get(`http://localhost:5000/productos/barcode/${codebar}`)
      .then(response => {
        const producto = response.data;

        // console.log(response.data.alergias);
        // console.log(producto);
        const copiaProducto = ({
          mensajeApto: mensajeApto,
          id: producto._id,
          image: producto.image,
          name: producto.name,
          ingredientes: producto.ingredientes.join(', '),
          alergias: producto.alergias,
          marca: producto.marca
        });
        setdatosProducto(copiaProducto);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const getDatosUsuario = () => {
    const arrayAlergias = [];
    axios.get(`http://localhost:5000/user/email/${emailContext}`)
      .then(response => {
        const usuario = response.data.user.alergias;
        // console.log(usuario);
        for(const al of usuario){
          arrayAlergias.push(al._id)
        }
        // console.log(arrayAlergias);
        setDatosUsuario(arrayAlergias);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(()=>{
        setCargandoDatos(true);
      })
  }

  return (
    <div className="productoEscaneadoDiv">
      <div className="volverDiv">
        <div onClick={()=> {navigate('/PaginaHome')}}>X</div>
      </div>
      <div className="TituloResutadoDiv">
        <h4>Aquí tienes el resultado.</h4>
      </div>
      <div className="valoracionDiv">
        {datosProducto && datosProducto.mensajeApto}
      </div>
      <div className="productoDiv">
        {imgVisible && <img className='imgDelantera' src="./img/verde.png" alt='imgTrasera'/>}
        {!imgVisible && <img className='imgDelantera' src="./img/rojo.png" alt='imgTrasera'/>}
        {datosProducto && <img className='imgTrasera' src={datosProducto.image} alt="Producto" />}
      </div>
      <div className="nombreProductoDiv">
        {datosProducto && datosProducto.name}
      </div>
      <div className="marcaProductoDiv">
        {datosProducto && datosProducto.marca}
      </div>
      <div className="ingredientesProductoDiv">
        {datosProducto && datosProducto.ingredientes}
      </div>
      <div className='botonEscaneoDiv'>
    <button className="boton-volver"><Link to="/PaginaEscaneo">Escanear otro producto</Link></button>
    </div>
    </div>
  );
}

