import React ,  { useState , useContext } from 'react';
import Layout from '../components/layout/Layout';
import Router , { useRouter } from 'next/router';
import FileUploader from 'react-firebase-file-uploader';
import { css } from '@emotion/core';
import { Formulario , Campo , InputSubmit , Error } from '../components/ui/Formulario';

import { FirebaseContext } from '../firebase';
import ErrorPagina from '../components/layout/ErrorPagina';

//validaciones 
import useValidacion from '../hooks/useValidacion';
import validarCrearProducto from '../validacion/validarCrearProducto';

const STATE_INICIAL = {
    nombre: '',
    empresa: '',
    //imagen:'',
    url: '',
    descripcion: ''
}

const NuevoProducto = () => {

    //state de las imagenes 
    const [ nombreImagen , guardarNombreImagen ] = useState('');
    const [ subiendo , guardarSubiendo ] = useState(false);
    const [ progreso , guardarProgreso ] = useState(0);
    const [ urlImagen , guardarUrlImagen ] = useState('');


    const [ error, guardaError ] =  useState(false);

    const {valores,errores,handleSubmit,handleChange,handleBlur} = useValidacion(STATE_INICIAL,validarCrearProducto,crearProducto)

    const { nombre , empresa , imagen , url , descripcion } = valores;

    // hook de routing para redireccionar
    const router = useRouter();

    //context con las  operaciones crud de firebase
    const { usuario , firebase } = useContext(FirebaseContext);

    

    async function crearProducto(){
       
        // si el usuario no esta autenticado llevar al login
        if(!usuario){
            return router.push('/login');
        }
        //crear el objeto de nuevo producto
        const producto = {
            nombre,
            empresa,
            url,
            urlImagen,
            descripcion,
            votos: 0,
            comentarios: [],
            creado: Date.now(),
            creador:{
                id: usuario.uid,
                nombre: usuario.displayName 
            },
            haVotado: []
        }

        //insertarlo en la base de datos
        firebase.db.collection('productos').add(producto);

        return router.push('/');
    }
   
    const handleUploadStart = () => { 
        guardarProgreso(0);
        guardarSubiendo(true);
    };
    
    const handleProgress = progreso => guardarProgreso({ progreso });
    
    const handleUploadError = error => {
        guardarSubiendo(error);
        console.error(error);
    };

    const handleUploadSuccess =  nombre => {
      guardarProgreso(100);
      guardarSubiendo(false);
      guardarNombreImagen(nombre); 
      firebase
        .storage
        .ref("productos")
        .child(nombre)
        .getDownloadURL()
        .then(url => {
            console.log(url);
            guardarUrlImagen(url);
        });
    };



    return ( 
        <div>
            <Layout>
                {!usuario ? <ErrorPagina /> :  (
                    <>
                    <h1
                        css={css`
                            text-align: center;
                            margin-top: 5rem;
                        `}
                        >Nuevo Producto</h1>

                    <Formulario
                        onSubmit={handleSubmit}
                        noValidate
                    >
                        <fieldset>
                            <legend>Información General</legend>
                            <Campo>
                                <label htmlFor="nombre">Nombre</label>
                                <input 
                                    type="text"
                                    id="nombre"
                                    placeholder="Nombre del Producto"
                                    name="nombre"
                                    value={nombre}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Campo>
                            {errores.nombre && <Error>{errores.nombre}</Error>} {/* se puede poner los errores asi tambien */}

                            <Campo>
                                <label htmlFor="empresa">Empresa</label>
                                <input 
                                    type="text"
                                    id="empresa"
                                    placeholder="Nombre Empresa o Compañia"
                                    name="empresa"
                                    value={empresa}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Campo>
                            {errores.empresa && <Error>{errores.empresa}</Error>} {/* se puede poner los errores asi tambien */}

                            <Campo>
                                <label htmlFor="imagen">Imagen</label>
                                <FileUploader 
                                    accept="imagen/*"
                                    id="imagen"
                                    name="imagen"
                                    randomizeFilename
                                    storageRef={firebase.storage.ref("productos")}
                                    onUploadStart={handleUploadStart}
                                    onUploadError={handleUploadError}
                                    onUploadSuccess={handleUploadSuccess}
                                    onProgress={handleProgress}
                                />
                            </Campo>
                        
                            <Campo>
                                <label htmlFor="url">URL</label>
                                <input 
                                    type="url"
                                    id="url"
                                    placeholder="URL de tu producto"
                                    name="url"
                                    value={url}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Campo>
                            {errores.url && <Error>{errores.url}</Error>} {/* se puede poner los errores asi tambien */}
                        </fieldset>
                        
                        <fieldset>
                            <legend>Sobre tu Producto</legend>

                            <Campo>
                                <label htmlFor="descripcion">Descripción</label>
                                <textarea
                                    type="text"
                                    id="descripcion"
                                    name="descripcion"
                                    value={descripcion}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </Campo>
                            {errores.descripcion && <Error>{errores.descripcion}</Error>} {/* se puede poner los errores asi tambien */}
                        
                        </fieldset>
                        {error && <Error>{error}</Error>}

                        <InputSubmit 
                            type="submit"
                            value="Crear Producto"
                        />
                    </Formulario>
                    </>
                )}
            </Layout>
        </div>
    );
}
 
export default NuevoProducto;