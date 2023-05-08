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
