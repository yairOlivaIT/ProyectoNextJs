import React , { useState } from 'react';
import styled from '@emotion/styled';
import {css} from '@emotion/core';
import Router from 'next/router';

const InputText = styled.input`
    border: 1px solid var(--gris3);
    padding: 1rem 0rem 1rem 1rem;
    min-width: 300px;
`;

const InputSubmit = styled.button`
    height: 3.95rem;
    width: 4rem;
    display: block;
    background-size: 4rem;
    background-image: url('/static/img/buscar.png');
    background-repeat: no-repeat;
    position: absolute;
    right: 0rem;
    top: 1px;
    background-color: white;
    border: none;
    border-right: 1px solid var(--gris3);
    border-bottom: 1px solid var(--gris3);
    text-indent: -9999px;
    &:hover{
        cursor: pointer;
    }
`;

const Buscar = () => {

    const [ busqueda , guardarBusqueda ] = useState('');

    const buscarProducto = e => {
        e.preventDefault();
         
        if(busqueda.trim() === '') return;

        //De esta forma lo paso a otro componente
        // redireccionar a /buscar
        Router.push({
            pathname: '/buscar',
            query: { q : busqueda } //q de query , se pasa q lo que el usuario busque, y busqueda es lo que escribe el usuario en el input
        })

    }
    return ( 
        <form
            css={css`
                position: relative;
            `}
            onSubmit={buscarProducto}
        >
            <InputText 
                type="text"
                placeholder="Buscar Productos"
                onChange={e => guardarBusqueda(e.target.value) }
            />

            <InputSubmit type="submit">Buscar</InputSubmit>
        </form>
    );
}
 
export default Buscar;