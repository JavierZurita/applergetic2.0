import React, { useState } from 'react';
import {AiOutlineRight } from 'react-icons/ai';
import "./PantallaBienvenida.scss"

export default function PantallaBienvenida() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { image: "./img/gallery/gallery1.png", text: "!Bienvenido a Applergic! Escanea el codigo de barras de tu producto y Applergic te dira si es apto para ti."},
    { image: "./img/gallery/gallery2.png", text: "Lleva tu Diario de compras y actividades."},
    { image: "./img/gallery/gallery3.png", text: "En caso de emergencia nos pondremos en contacto con la persona que nos digas."},
    { image: "./img/gallery/gallery4.png", text: "Viaja a donde quieras. Tendras a tu disposicion un traductor off-line y tu informe de alergias e intolerantes traducido al idioma local."}
  ];

  const previousSlide = () => {
    window.history.pushState(null, "", "/PaginaLogin");
    window.history.go();
  };

  const nextSlide = () => {
    if (currentSlide === slides.length - 1) {
      window.history.pushState(null, "", "/PaginaLogin");
      window.history.go();
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const SlideDots = () => {
    return (
      <div className="slide-dots">
        {slides.map((slide, index) => (
          <span
            key={index}
            className={currentSlide === index ? "dot active-dot" : "dot"}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className='PaginaBienvenida'>
      <div className='title'>
        <img className="imglogo" src="./img/logo.png" alt="APPlergic" />
        <span className='tittle'>Applergic</span>
      </div>
      <div className="slide">
        <img className="photo" src={slides[currentSlide].image} alt="slideshow" />
        <p className="sub">{slides[currentSlide].text} </p>
      </div>
      <SlideDots />
      <div className='buttons'>
        <button className="Skip" onClick={previousSlide}>Saltar</button>
        <button className="Next" onClick={nextSlide}>Siguiente<AiOutlineRight/></button>
      </div>
    </div>
  );
}
