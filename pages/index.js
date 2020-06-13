import React from 'react'
import Layout from '../components/layout/Layout';
import DetallesProductos from '../components/layout/DetallesProducto';
import useProductos from '../hooks/useProductos';

const Home = () => {

  const { productos } = useProductos('creado');

  return (
        <div className="container">
          <Layout>
            <div className="listado-productos">
              <div className="contenedor">
                <ul className="bg-white">
                  {productos.map(producto => (
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
      )
            
      {/* de esta forma le decimos que vamos a colocar css , esta es la forma  que nos da next tambien podemos agregar styled components*/}
      {/* <style jsx>{`
          h1 {
            color: red;
          }      
      `}</style> */}

}

export default Home
