import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import "./PaginaRegistro.scss";
import axios from 'axios';
import { useContext } from "react";
import { RegistroContext } from "../../shared/context/Registro.context";
import { EmailContext } from "../../shared/context/Email.context";

function Registro() {
  const { register, handleSubmit, formState: { errors } } = useForm();    
  const navigate = useNavigate();
  const registroContext = useContext(RegistroContext);
  const {emailContext, setEmailContext} = useContext(EmailContext);

    const onSubmit = formData => {
        console.log(formData);

      if (Object.keys(errors).length === 0) {
        axios.post('http://localhost:5000/user/register', formData).then(res => {
            console.log("registrao");
            setEmailContext(formData.email);
            navigate('/PaginaContacto');
        })
        .catch(error => {
          console.error('Error en el registro', error);
        });
      }
    }

  return (
    <div className="paginaRegistro"> 
      <Link to="/">Volver a Home</Link>
      <h3>Dinos quién eres.</h3>
      <div className="campo">
        <img className="imagen" src="https://res.cloudinary.com/dw11t6pjw/image/upload/v1679473514/cld-sample.jpg" alt="Foto de perfil" />
        <input type="file" id="fotoInput" name="foto" accept="image/*" style={{ display: "none" }} />
      </div>
      <div className="register__body">
        <form className="register__form" onSubmit={handleSubmit(onSubmit)}>
        <input className='register__txt' id="name" placeholder='Nombre completo' {...register("name",{required: true})}/>
        <input className='register__txt' id="email" placeholder='Dirección e.mail' {...register("email",{required: true})}/>
        <input className='register__txt' id="number" placeholder='Móvil' {...register("number",{required: true})}/>
        <input className='register__txt' id="password" placeholder='Password' type="password" {...register("password",{required: true , pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{4,12}$/ })}/>
        <button className="guardar"> Guardar perfil</button>
      </form>
      </div>
    </div>
  );
}

export default Registro;
