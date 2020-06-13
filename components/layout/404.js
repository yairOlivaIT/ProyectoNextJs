import React , { useEffect } from 'react';
import { css } from '@emotion/core';
import Router , { useRouter } from 'next/router';

const Error404 = () => {
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
        >Producto no existente</h1>   
    );
}
 
export default Error404;