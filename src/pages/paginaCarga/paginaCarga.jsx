import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import './PaginaCarga.scss';

export default function PaginaCarga() {
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setRedirect(true);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  return redirect ? (
    <Navigate to="/PantallaBienvenida" />
  ) : (
    <div className="paginaCarga">
      <h1>APPlergic</h1>
      <h2>Mi guia alimentaria</h2>
      <div className='logoDiv'>
        <img src="./img/portada.png" alt="APPlergic" />
      </div>
    </div>
  );
}
