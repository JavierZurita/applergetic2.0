import { Link } from 'react-router-dom';
import { GiHamburgerMenu} from 'react-icons/gi';
import { BiUserCircle} from 'react-icons/bi';
import { AiOutlineStar} from 'react-icons/ai';
import { TfiAgenda} from 'react-icons/tfi';
import { BsShare} from 'react-icons/bs';
import { BsTranslate} from 'react-icons/bs';
import {IoNewspaperOutline } from 'react-icons/io5';
import {IoExitOutline } from 'react-icons/io5';
import ReactModal from 'react-modal';
import React, { useState } from 'react';
import "./ModalMenu.scss";



export default function ModalMenu() {
    const [open, setOpen] = useState(false);

    const openModal = () => {
      setOpen(true);
      document.body.classList.add("modal-open");
     
    };
  
    const closeModal = () => {
      setOpen(false);
      document.body.classList.remove("modal-open");
    };

    return (<div>
<div className="burger" onClick={() => openModal()}>
<GiHamburgerMenu />
</div>
<ReactModal className="modal" isOpen={open}>
<div>
<button className='cerrar' onClick={() => closeModal()} >X</button>
</div>
<div className='box'>
<ul className='deplegable'>
      <li><Link to="/Perfil"> <BiUserCircle /> Perfil </Link></li>
      <li><Link to="/PaginaFavoritos"> <AiOutlineStar /> Favorito </Link></li>
      <li><Link to="/PaginaDiario"> <TfiAgenda /> Diario </Link></li>
      <li><Link to="/Compartir"> <BsShare /> Compartir </Link></li>
      <li><Link to="/Traductor"> <BsTranslate /> Traductor </Link></li>
      <li><Link to="/Terminos"> <IoNewspaperOutline /> Terminos </Link></li>
      <li><Link to="/PaginaEvaluar"> <IoExitOutline /> Salir </Link></li>
  </ul>
  </div>
</ReactModal>
</div>)
}