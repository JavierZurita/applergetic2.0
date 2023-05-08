import { useState } from 'react';
import "./PaginaContacto.scss";

export default function PaginaContacto() {
  const [formData, setFormData] = useState({
    NombreContacto: '',
    emailContacto: '',
    MovilCantacto: '',
    NPoliza: ''
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormData({
      NombreContacto: '',
      emailContacto: '',
      MovilContacto: '',
      NPoliza: ''
    });
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }
  const Atras = () => {
    window.history.pushState(null, "", "/PaginaRegistro");
    window.history.go();
  };
  const Skip = () => {
    window.history.pushState(null, "", "/PaginaConfirmarAlergias");
    window.history.go();
  };

  const isDisabled = !(formData.NombreContacto && formData.emailContacto && formData.MovilContacto && formData.NPoliza);

  return (
    <div>
        <button className="Vol" onClick={Atras}>  &gt; Volver </button>
        <p>2 de 4</p>
        <div className='Htext'>
            <h1 className='Title'>Vamos a añadir tu contacto en caso de emergencia.</h1>
            <p className='Sub'>Nos pondremos en contacto con tu persona de confianza y/o compañia deseguros en caso de emergencia. </p>
        </div>
        <form className="Fromu" onSubmit={handleSubmit}>
        <input className="bimput" placeholder='Nombre completo de tu contacto' type="text" name="NombreContacto" value={formData.name} onChange={handleChange} />
        <br />
        <input className="bimput" placeholder='Direccion e-mail' type="email" name="emailContacto" value={formData.email} onChange={handleChange} />
        <br />
        <input className="bimput" placeholder='Movil' type="number" name="MovilContacto" value={formData.message} onChange={handleChange} />
        <br />
        <input className="bimput" placeholder='Compañia de Seguros / N· Poliza' type="text" name="NPoliza" value={formData.message} onChange={handleChange} />
        <br />
        <button className={`Save ${isDisabled ? 'disabled' : ''}`}  disabled={isDisabled} type="submit" onClick={Skip}>Guardar emergencias</button>
        </form>
        <button className="Skipe" onClick={Skip}> Registrare mi contacto en otro momento </button>
    </div>
  );
}