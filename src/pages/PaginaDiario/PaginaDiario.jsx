import { UserContext } from "../../shared/context/User.context";
import "./PaginaDiario.scss";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function PaginaDiario() {

    const {userData, setUserData} = useContext(UserContext);
    const [arrayProductos, setArrayProductos] = useState([]);
    const [visible, setVisible] = useState({});
    const [notas, setNotas] = useState({});

    useEffect(()=>{
        const array = [];
        // console.log(userData.diario);
        if(userData.diario){
          const inicialVisible = {};

            for (const producto of userData.diario) {
                axios.get(`http://localhost:5000/productos/${producto}`).then(res => {
                    array.push(res.data);
                    inicialVisible[array.length - 1] = true;
                    setArrayProductos([...array]);
                    setVisible(inicialVisible);
                })
            
            // console.log(array);                
        }}
    },[userData.diario]);

    // useEffect(() => {
    //     console.log(userData);
    //     const fetchProducts = () => {
    //       const array = [];
    
    //       if (userData.diario) {
    //         const promises = userData.diario.map((producto) =>
    //           axios.get(`http://localhost:5000/productos/${producto}`).then((res) => res.data)
    //         );
    
    //         Promise.all(promises).then((productData) => {
    //           array.push(...productData);
    //           setArrayProductos(array);
    //         });
    //       }
    //     };
    
    //     fetchProducts();
    //   }, [userData.diario]);
    const handleEdit = (index) => {
      console.log(index);
      console.log(visible);
      setVisible((visible) => ({...visible, [index]: !visible[index]}));

    }
    const handleSave = (nota, index) => {
      console.log(index);
      console.log(visible);
      setVisible((visible) => ({...visible, [index]: !visible[index]}));
      
      setNotas((notas) => ({...notas,[index]: nota }));
      console.log("nota guardada: ", nota);
    }
    const handleDelete = (index) => {
        setArrayProductos((prevArray) => {
          const newArray = [...prevArray];
          newArray.splice(index, 1);
          return newArray;
        });
      };

      const handleClick = () => {

      }
      const handleChange = (text, index) => {
        setNotas((notas) => ({...notas,[index]: text }));
      }

    return(
        <div className="paginaDiario">
            <h3 className="titulo">¿Incluimos la selección en tu diario?</h3>
            <p className="subtitulo">Añade tus comentarios para completar tu información.</p>
            <section className="productos">
            {arrayProductos.length >= 1 && arrayProductos.map((item,index) => 
                <article className="productos__item" key={index}>
                    <div className="productos__item--img">
                        <img src={item.image} alt={item.name}></img>
                    </div>
                    <div className="productos__item--text">
                        <p>{item.name}</p>
                        {visible[index] && <p className="notas">Notas: {notas[index]}</p>}
                        {!visible[index] && <input type="text" className="notas--input" onChange={(e) => handleChange(e.target.value, index)} />}
                    </div>
                    <div className="productos__item--botones">
                        {/* <img src="" alt="" />
                        <img src="" alt="" /> */}
                        <div onClick={() => handleDelete(index)}>borrar</div>
                        {visible[index] && <div onClick={()=>handleEdit(index)}>edit</div>}
                        {!visible[index] && <div onClick={()=>handleSave(notas[index], index)}>guardar</div>}
                    </div>
                </article>
            )}
            </section>
            <button className="guardar"><Link to="/PaginaHome" onClick={handleClick}> Guardar </Link></button>
        </div>
    )
}