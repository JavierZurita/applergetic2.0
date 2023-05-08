import { UserContext } from "../../shared/context/User.context";
import "./PaginaDiario.scss";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function PaginaDiario() {

    const {userData, setUserData} = useContext(UserContext);
    const [arrayProductos, setArrayProductos] = useState([]);
    
    // useEffect(()=>{
    //     const array = [];
    //     let info = []
    //     // console.log(userData.diario);
    //     if(userData.diario){
    //         for (const producto of userData.diario) {
    //             axios.get(`http://localhost:5000/productos/${producto}`).then(res => {
    //                 array.push(res.data);
    //                 setArrayProductos(array);
    //             })
    //     console.log(array);                
    //     }}
    // },[userData.diario]);

    useEffect(() => {
        console.log(userData);
        const fetchProducts = () => {
          const array = [];
    
          if (userData.diario) {
            const promises = userData.diario.map((producto) =>
              axios.get(`http://localhost:5000/productos/${producto}`).then((res) => res.data)
            );
    
            Promise.all(promises).then((productData) => {
              array.push(...productData);
              setArrayProductos(array);
            });
          }
        };
    
        fetchProducts();
      }, [userData.diario]);

    const handleDelete = (index) => {
        setArrayProductos((prevArray) => {
          const newArray = [...prevArray];
          newArray.splice(index, 1);
          return newArray;
        });
      };

      const handleClick = () => {
        
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
                        <p>Aqui van las notas del producto</p>
                    </div>
                    <div className="productos__item--botones">
                        {/* <img src="" alt="" />
                        <img src="" alt="" /> */}
                        <div onClick={() => handleDelete(index)}>borrar</div>
                        <div>edit</div>
                    </div>
                </article>
            )}
            </section>
            <button className="guardar"><Link to="/PaginaHome" onClick={() =>handleClick()}> Guardar </Link></button>
        </div>
    )
}