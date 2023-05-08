
import React, { useState, useEffect, useRef, useContext } from 'react';
import Quagga from 'quagga';
import { Navigate } from 'react-router-dom';
import {CodebarContext} from '../../shared/context/Codebar.context';
import './PaginaEscaneo.scss';

const PaginaEscaneo = ({ history }) => {
  const {setCodebar} = useContext(CodebarContext);
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
=======
import React, { useState } from 'react';
import { BarcodeScanner } from 'react-barcode-scanner';

export default function PaginaEscaneo() {
  const [barcode, setBarcode] = useState('');
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);

  const handleScan = (result) => {
    setBarcode(result);
    setScanning(false);
    setScanned(true);
  };

  const startScanning = () => {
    setScanning(true);
    setScanned(false);
  };


  return (
    <div>
      <h1>Escanea tu producto</h1>
      {scanned && <p>Código de barras leído correctamente: {barcode}</p>}
      {scanning ? (
        <div>
          <p>Escaneando...</p>
          <BarcodeScanner onDetected={handleScan} />
        </div>
      ) : (
        <button onClick={startScanning}>Escanear código de barras</button>
      )}
    </div>
  );
}
