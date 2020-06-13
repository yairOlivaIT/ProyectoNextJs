import React , { useEffect } from 'react';
import { css } from '@emotion/core';
import Router , { useRouter } from 'next/router';

const ErrorPagina = () => {
    const router = useRouter();

    useEffect(() => {
        const redireccionando = ()=>{
            setTimeout(()=>{
                router.push('/');
            },2000);
        };
        redireccionando();
    },[])
    
    
    return (
        <h1
            css={css`
                margin-top: 5rem;
                text-align: center;
            `}
        >No se puede mostrar</h1>
               
    );
}
 
export default ErrorPagina;