import { useState } from 'react';
import "./PaginaContacto.scss";
import { useForm } from 'react-hook-form';
import { RegistroContext } from '../../shared/context/Registro.context';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { EmailContext } from '../../shared/context/Email.context';

export default function PaginaContacto() {
  const registroContext = useContext(RegistroContext);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const {emailContext, setEmailContext} = useContext(EmailContext);

  const onSubmit = (formData) => {
    console.log("EMAILCONTEXT: ",emailContext);
    const email = emailContext;
    console.log(formData);
    axios.get(`http://localhost:5000/user/email/${email}`,formData).then(res => {
      console.log(res.data.user._id);
      const id = res.data.user._id
      axios.put(`http://localhost:5000/user/${id}`, formData).then(res => {
        console.log("actualizado");
        console.log(res.data);
        navigate('/PaginaAlergias');
      })
    })
  };
  return (
    <div>
        <button className="Vol" onClick={() => {navigate('/PaginaRegistro')}}>  &gt; Volver </button>
        <p>2 de 4</p>
        <div className='Htext'>
            <h1 className='Title'>Vamos a añadir tu contacto en caso de emergencia.</h1>
            <p className='Sub'>Nos pondremos en contacto con tu persona de confianza y/o compañia deseguros en caso de emergencia. </p>
        </div>
        <form className="Fromu" onSubmit={handleSubmit(onSubmit)}>
        <input className="bimput" placeholder='Nombre completo de tu contacto' type="text" name="NombreContacto"{...register("contactName", { required: true })} />
        {errors.NombreContacto && <span>Este campo es obligatorio</span>}
        <input className="bimput" placeholder='Direccion e-mail' type="email" name="emailContacto"{...register("contactEmail", { required: true })} />
        {errors.emailContacto && <span>Este campo es obligatorio</span>}
        <input className="bimput" placeholder='Movil' type="number" name="MovilContacto" {...register("contactNumber", { required: true })} />
        {errors.MovilContacto && <span>Este campo es obligatorio</span>}
        <input className="bimput" placeholder='Compañia de Seguros / N· Poliza' type="text" name="NPoliza" {...register("company", { required: true })} />
        {errors.NPoliza && <span>Este campo es obligatorio</span>}
        <button className={`Save`} type="submit" >Guardar emergencias</button>
      </form>
        <button className="Skipe" > Registrare mi contacto en otro momento </button>
    </div>
  );
}