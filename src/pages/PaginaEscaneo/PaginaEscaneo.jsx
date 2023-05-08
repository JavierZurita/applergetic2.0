import React, { useState, useEffect, useRef } from 'react';
import Quagga from 'quagga';
import { Navigate } from 'react-router-dom';
import './PaginaEscaneo.scss';

const PaginaEscaneo = ({ history }) => {
  const scannerContainer = useRef(null);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    Quagga.init({
      inputStream: {
        name: 'Live',
        type: 'LiveStream',
        target: scannerContainer.current
      },
      decoder: {
        readers: ['ean_reader']
      }
    }, function (err) {
      if (err) {
        console.log(err);
        return;
      }
      console.log('QuaggaJS ready to start.');
      Quagga.start();
    });

    Quagga.onDetected((data) => {
      console.log(data); // data son los datos del código de barras
      setRedirect(true);
    });

    return () => {
      Quagga.stop();
    }
  }, []);

  if (redirect) {
    return <Navigate to='/PaginaProductoEscaneado' />;
  }

  return (
    <div className='escanerDiv'>
      <div className='escanerTituloDiv'><h4><strong>Escaneando...</strong></h4></div>
      <div className='escanerTextoDiv'><p>Tan solo tienes que centrar el <strong>código de barras</strong> del producto en el recuadro</p></div>
      <div className='lectorDiv' ref={scannerContainer} id="barcode-scanner"></div>
      <div className='botonesDiv'>
        <button className='escanerBotonseleccionado' type="button">
          <img className='imgBotonEscaner' src="./img/codigobarras.png" alt="codigo de barras" />
        </button>
        <button className='escanerBoton' type="button">
          <img className='imgBotonEscaner' src="./img/QR.png" alt="codigo QR" />
        </button>
        <button className='escanerBoton' type="button">
          <img className='imgBotonEscaner' src="./img/nfc.png" alt="NFC" />
        </button>
      </div>
    </div>
  );
}

export default PaginaEscaneo;
