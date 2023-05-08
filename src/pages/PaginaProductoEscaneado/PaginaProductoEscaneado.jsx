import React, { useContext, useState } from 'react';
import axios from 'axios';
import { CodebarContext } from '../../shared/context/Codebar.context';
import './PaginaProductoEscaneado.scss'

export default function PaginaProductoEscaneado() {
  const { codebar } = useContext(CodebarContext);
  const [datosProducto, setdatosProducto] = useState(null);

  const getdatosProducto = () => {
    console.log(codebar);
    axios.get(`http://localhost:5000/productos/barcode/${codebar}`)
      .then(response => {
        const producto = response.data;
        let mensajeApto = 'Este producto es apto para ti';

        for (const alergia of producto.alergias) {
          if (producto.ingredients.includes(alergia)) {
            mensajeApto = 'Este producto no es apto para ti';
            break;
          }
        }

        setdatosProducto({
          mensajeApto: mensajeApto,
          imagen: producto.imagen,
          nombre: producto.nombre,
          marca: producto.marca,
          ingredientes: producto.ingredientes.join(', '),
        });
      })
      .catch(error => {
        console.error(error);
        setdatosProducto({
          mensajeApto: 'No se ha encontrado el producto',
        });
      });
  };

  return (
    <div className="productoEscaneadoDiv">
      <div className="volverDiv">
        <a href="/PaginaEscaneo">&lt; Volver</a>
      </div>
      <div className="TituloResutadoDiv">
        <h4>Aquí tienes el resultado.</h4>
      </div>
      <div className="valoracionDiv">
        {datosProducto && datosProducto.mensajeApto}
      </div>
      <div className="productoDiv">
        {datosProducto && <img src={datosProducto.imagen} alt="Producto" />}
      </div>
      <div className="nombreProductoDiv">
        {datosProducto && datosProducto.nombre}
      </div>
      <div className="marcaProductoDiv">
        {datosProducto && datosProducto.marca}
      </div>
      <div className="ingredientesProductoDiv">
        {datosProducto && datosProducto.ingredientes}
      </div>
      <a href="/PaginaEscaneo">
      <button className="boton-volver">Volver</button>
      </a>
    </div>
  );
}

