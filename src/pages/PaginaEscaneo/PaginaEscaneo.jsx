
import React, { useState, useEffect, useRef, useContext } from 'react';
import Quagga from 'quagga';
import { Navigate, useNavigate } from 'react-router-dom';
import {CodebarContext} from '../../shared/context/Codebar.context';
import './PaginaEscaneo.scss';
import { EmailContext } from '../../shared/context/Email.context';

const PaginaEscaneo = ({ history }) => {
  const navigate = useNavigate();
  const {setCodebar} = useContext(CodebarContext);
  const scannerContainer = useRef(null);
  const [redirect, setRedirect] = useState(false);
  const {emailContext} = useContext(EmailContext);
  useEffect(() => {
      console.log(emailContext);
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
        Quagga.start();
      });

      Quagga.onDetected((data) => {
        console.log(data.codeResult.code); // data son los datos del código de barras
        setRedirect(true);
        setCodebar(data.codeResult.code)
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
    <div>
      <div className="volverDiv">
        <img className="cerrar" src="./img/x.png" alt="X" onClick={()=> {navigate('/PaginaHome')}} />
      </div>
    </div>
      
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