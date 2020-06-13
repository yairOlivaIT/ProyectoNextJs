import React , { useState , useEffect , useContext } from 'react';
import { FirebaseContext } from '../firebase';

const useProductos = orden => { //Orden viene hacer para que vaya ordenado por cantidad de votos por eso ORDEN = VOTOS
    const [ productos , guardarProductos ] = useState([]);

    const { firebase } = useContext(FirebaseContext);
  
    useEffect(() => {
        const obtenerProductos = () => {
        //que coleccion queremos traernos por eso la de productos, que traiga los resultados ordenados lo mas nuevos primeros, todo esto es escribir lo que queremos traer
        firebase.db.collection('productos').orderBy(orden, 'desc').onSnapshot(manejarSnapshot);
        }
        obtenerProductos();
    }, []);

    function manejarSnapshot(snapshot){
        //pero es el snapshot el que realmente accede a los datos
        const productos = snapshot.docs.map( doc => {
        return{
            id: doc.id, //requerimos un id
            ...doc.data() //y una copia y accedemos a los datos del documento es decir nombre,descripcion etc 
        }
    });

    guardarProductos(productos);
  }

  return {
        productos
  }
}

export default useProductos;