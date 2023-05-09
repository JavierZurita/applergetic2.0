import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { CodebarContext } from '../../shared/context/Codebar.context';
import './PaginaProductoEscaneado.scss'
import { EmailContext } from '../../shared/context/Email.context';


export default function PaginaProductoEscaneado() {
  const { codebar } = useContext(CodebarContext);
  const {emailContext} = useContext(EmailContext);
  const [datosProducto, setdatosProducto] = useState({});
  const [datosUsuario, setDatosUsuario] = useState({});
  const [imgVisible, setImagenVisible] = useState();

let mensajeApto ="";


useEffect(()=> {
  getdatosProducto()
  getDatosUsuario()

  if(datosProducto.alergias === datosUsuario){
    mensajeApto = "Este producto no es apto para ti";
    setImagenVisible(false)
  }
  else{
    mensajeApto = "Este producto si es apto para ti";
    setImagenVisible(true)
  }


},[])
 
  console.log(emailContext);
  const getdatosProducto = () => {
    console.log(codebar);
    axios.get(`http://localhost:5000/productos/barcode/${codebar}`)
      .then(response => {
        const producto = response.data;

        setdatosProducto({
          mensajeApto: mensajeApto,
          image: producto.image,
          name: producto.name,
          ingredientes: producto.ingredientes.join(', '),
          marca: producto.marca,
          alergias: producto.alergias
        });
      })
      .catch(error => {
        console.error(error);
        setdatosProducto({
          mensajeApto: 'No se ha encontrado el producto',
        });
      });
  };
  const getDatosUsuario = () => {
    axios.get(`http://localhost:5000/user/email/${emailContext}`)
      .then(response => {
        const usuario = response.data.user.alergias;
        console.log(usuario);

        setDatosUsuario({
          usuario
        })
      })
  }

  return (
    <div className="productoEscaneadoDiv">
      <div className="TituloResutadoDiv">
        <h4>Aquí tienes el resultado.</h4>
      </div>
      <div className="valoracionDiv">
        {datosProducto && datosProducto.mensajeApto}
      </div>
      <div className="productoDiv">
        {imgVisible && <img className="imgDelantera" src='./img/verde.png' alt='checkverde'/>}
        {!imgVisible && <img className="imgDeantera" src='./img/rojo.png' alt='checkrojo'/>}

        {datosProducto && <img className="imgTrasera" src={datosProducto.image} alt="Producto" />}
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
      <a href="/PaginaEscaneo">
      <button className="boton-volver">Volver</button>
      </a>
      </div>
    </div>
  );
}

