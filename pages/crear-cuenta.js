import React , {useState} from 'react';
import Layout from '../components/layout/Layout';
import Router from 'next/router';
import { css } from '@emotion/core';
import { Formulario , Campo , InputSubmit , Error } from '../components/ui/Formulario';


import firebase from '../firebase';

//validaciones 
import useValidacion from '../hooks/useValidacion';
import valirdarCrearCuenta from '../validacion/validarCrearCuenta';

const STATE_INICIAL = {
    nombre: '',
    email: '',
    password: ''
}

const CrearCuenta = () => {

    const [ error, guardaError ] =  useState(false);


    const {valores,errores,handleSubmit,handleChange,handleBlur} = useValidacion(STATE_INICIAL,valirdarCrearCuenta,crearCuenta)

    const { nombre , email , password } = valores;

    async function crearCuenta(){
        //Como estamos usando async await en firebase tenemos que administrar el error aca tambien y usar el async
        try {
            await firebase.registrar(nombre,email,password); //creamos la cuenta en firebase 
            Router.push('/');  
        } catch (error) {
            console.error('Hubo un error al crear un usuario', error.message);
            guardaError(error.message); //este error.message es de firebase como devuelve la respuesta del error
        }
    }

    return ( 
        <div>
            <Layout>
                <>
                    <h1
                        css={css`
                            text-align: center;
                            margin-top: 5rem;
                        `}
                        >Crear Cuenta</h1>

                    <Formulario
                        onSubmit={handleSubmit}
                        noValidate
                    >
                        <Campo>
                            <label htmlFor="nombre">Nombre</label>
                            <input 
                                type="text"
                                id="nombre"
                                placeholder="Tu nombre"
                                name="nombre"
                                value={nombre}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Campo>
                        {errores.nombre && <Error>{errores.nombre}</Error>} {/* se puede poner los errores asi tambien */}

                        <Campo>
                            <label htmlFor="email">Email</label>
                            <input 
                                type="email"
                                id="email"
                                placeholder="Tu email"
                                name="email"
                                value={email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Campo>
                        {errores.email && <Error>{errores.email}</Error>}
    
                        <Campo>
                            <label htmlFor="password">Password</label>
                            <input 
                                type="password"
                                id="password"
                                placeholder="Tu password"
                                name="password"
                                value={password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                />
                        </Campo>
                        {errores.password && <Error>{errores.password}</Error>}

                        {error && <Error>{error}</Error>}

                        <InputSubmit 
                            type="submit"
                            value="Crear Cuenta"
                        />
                    </Formulario>
                </>
            </Layout>
        </div>
    );
}
 
export default CrearCuenta;