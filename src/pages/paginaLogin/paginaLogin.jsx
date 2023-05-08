import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './PaginaLogin.scss';
import { JwtContext } from '../../shared/context/Jwt.context';
import { UserContext } from '../../shared/context/User.context';

const PaginaLogin = () => {
  
    const { register, handleSubmit } = useForm();
    const { setJwt,setUser } = useContext(JwtContext);
    const navigate = useNavigate();
    const {userData, setUserData} = useContext(UserContext);

    const onSubmit = formData => {
        // console.log("submit",formData);
        axios.post(`http://localhost:5000/user/login`, formData).then(res => {
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('user', JSON.stringify(res.data.user))
            setJwt(true);
            setUser(JSON.stringify(res.data.user));
            // console.log(res.data.userInfo);
            setUserData(res.data.userInfo);
            navigate('/PaginaDiario');
        })
    }

  return (
    <div className="paginaLogin">
      <div className="headerDiv">
        <img className="imgHead" src="./img/imgHead.png" alt="Inicio" />
        <div className="logoDiv">
          <img className="imgLogo" src="./img/logo.png" alt="APPlergic" />
          APPlergic
        </div>
      </div>
      <div className="bienvenidaTexto">
        <h3>¡Bienvenido de nuevo!</h3>
        <p>Por favor, introduce tus datos para continuar</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="formulario">
        <input type="text" name="email" placeholder="Dirección de email" {...register("email",{required: true})}/>
        <input type="password" name="password" placeholder="Contraseña" {...register("password",{required: true})}/>
        <button type="submit">Entrar</button>
      </form>
      <div className="olvidoDiv">
        ¿Olvidaste tu contraseña?
      </div>
      <div className="registro">
        <p>¿Nuevo en APPlergic?</p>
          <h3><Link to="/PaginaRegistro">crea tu cuenta aquí </Link></h3>
      </div>
    </div>
  );
};

export default PaginaLogin;
