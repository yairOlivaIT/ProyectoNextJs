import React , {useState} from 'react';
import Layout from '../components/layout/Layout';
import Router from 'next/router';
import { css } from '@emotion/core';
import { Formulario , Campo , InputSubmit , Error } from '../components/ui/Formulario';

import firebase from '../firebase';

//validaciones 
import useValidacion from '../hooks/useValidacion';
import validarIniciarSesion from '../validacion/valirdarIniciarSesion';


const STATE_INICIAL = {
    email: '',
    password: ''
}


const Login = () => {

    const [ error, guardaError ] =  useState(false);


    const {valores,errores,handleSubmit,handleChange,handleBlur} = useValidacion(STATE_INICIAL,validarIniciarSesion,iniciarSesion)

    const { email , password } = valores;

    async function iniciarSesion(){
        try {
            await firebase.login(email,password);
            Router.push('/');
        } catch (error) {
            console.error('Hubo un error al crear un usuario', error.message);
            guardaError(error.message);
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
                        >Iniciar Sesión</h1>

                    <Formulario
                        onSubmit={handleSubmit}
                        noValidate
                    >
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
                            value="Iniciar Sesión"
                        />
                    </Formulario>
                </>
            </Layout>
        </div>
    );
}
 
export default Login;