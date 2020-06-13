import React from 'react';
import Header from './Header';
import  { Global , css } from '@emotion/core';
import Head from 'next/head';

const Layout = props => {
    return (  
        <>
            {/* Estilos globales que se aplican a toda la aplicacion */}
            <Global 
                //Custom Properties son entidades definidas por autores CSS que contienen valores específicos que se pueden volver a utilizar en un documento.
                styles={css`
                /* lo registro en el selector de root */
                    :root {
                        --gris: #3d3d3d;
                        --gris2:  #6f6f6f;
                        --gris3: #e1e1e1;
                        --naranja: #DA552F;
                    }

                    html {
                        font-size: 62.5%;
                        box-sizing: border-box;
                    }
                    *, *:before, *:after{
                        box-sizing: inherit;
                    }
                    body {
                        font-size: 1.6rem; /* es igual a 16px */
                        line-height: 1.5;
                        font-family: 'PT Sans',sans-serif;
                    }
                    h1, h2, h3 {
                        margin: 0 0 2rem 0;
                        line-height: 1.5;
                    }
                    h1 , h2 {
                        font-family: 'Roboto', serif;
                        font-weight: 700;
                    }
                    h3 {
                        font-family: 'PT Sans',sans-serif;
                    }
                    ul {
                        list-style: none;
                        margin: 0;
                        padding: 0;
                    }
                    a {
                        text-decoration: none;
                    }
                    img{
                        max-width: 100%;/*esto es para hacer todas las imagenes responsive por eso el max-width */
                    }
                `}
            />
            {/* este es el contenido como la informacion meta lo que iria antes del body dentro del head */}
            <Head>
                
                <title>Product Hunt Firebase y Next.js</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha256-l85OmPOjvil/SOvVt3HnSSjzF1TUMyT9eV0c2BzEGzU=" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&family=Roboto:wght@400;700&display=swap" rel="stylesheet" />
                <link href="/static/css/app.css" rel="stylesheet" />
            </Head>
            <Header />

            <main>
                {props.children}
            </main>
        </>
    );
}
 
export default Layout;