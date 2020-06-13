import React , { useEffect , useState } from 'react';
import Layout from '../components/layout/Layout';
import { useRouter } from 'next/router';
import DetallesProductos from '../components/layout/DetallesProducto';
import useProductos from '../hooks/useProductos';

const Buscar = () => {

    //De estar forma lo leo desde otro componente
    const router = useRouter();
    const { query: { q }} = router;

    // Todos los productos
    const { productos } = useProductos('creado');
    const [ resultado , guardarResultado ] = useState([]);

    useEffect(() => {
        if(q){
            const busqueda = q.toLowerCase();
            // este filter toma todos el arreglo de PRODUCTOS, itera en cada uno de ellos, accede a cada producto y como los productos vienen en objeto ,accede al nombre lo convierte en minuscula y despues revisamos con el includes si este incluye la busqueda ( osea si es igual a la busqueda ) entonces lo agrega al filtro. includes es un metodo nuevo de string 
            const filtro = productos.filter(producto => {
                return(
                    producto.nombre.toLowerCase().includes(busqueda) ||
                    producto.descripcion.toLowerCase().includes(busqueda) 
                )
            });
            guardarResultado(filtro);
        }
    }, [ q , productos ]);

    return ( 
        <div>
           <Layout>
            <div className="listado-productos">
              <div className="contenedor">
                <ul className="bg-white">
                  {resultado.map(producto => (
                    <DetallesProductos
                      key={producto.id}
                      producto={producto}                    
                    />
                  ))}
                </ul>
              </div>
            </div>
          </Layout>
        </div>
    );
}
 
export default Buscar;