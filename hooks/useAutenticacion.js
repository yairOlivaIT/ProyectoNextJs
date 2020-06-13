import React , { useState , useEffect } from 'react';
import firebase from '../firebase';

function useAutenticacion(){

    const [ usuarioAutenticado , guardarUsuarioAutenticado ] = useState(null);

    // Detecta si alguien inicia sesion y guarda la sesion automaticamente ya que va a estar en el provider, si inicia sesion firebase hace todo por nosotros de guardarr la sesion del usuario con el firebase.auth.on.....    
    useEffect(() => {
        const  unSuscribe = firebase.auth.onAuthStateChanged(usuario => {
            if( usuario ){ //si hay un usuario o si cambia el state del usuario
                guardarUsuarioAutenticado(usuario);//si hay un usuario autenticado,vamos a pasar este hook y le pasamos el usuario
            } else {
                guardarUsuarioAutenticado(null); 
            }
        });
        return () => unSuscribe(); //Retorna un arrowFunction que es el unSuscribe
    }, []);

    //Retornamos el usuario autenticado para cuando utilize este hook tenga toda la informacion del usuario autenticado para saber si se autentico con firebase o no pudo
    return usuarioAutenticado;

}

export default useAutenticacion;