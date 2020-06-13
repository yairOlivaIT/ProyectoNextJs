import React , { useState , useEffect } from 'react';

const useValidacion = (stateInicial,validar,fn) => { //stateinicial,que es lo que vamos a validar->validar, funcion que se va a ejecutar cuando se haga submit por eso FN, porque vamos a usarlo para el login,crear cuenta, crear producto

    const [valores , guardaValores ] = useState(stateInicial); // lo que el usuario coloque en los diferentes inputs
    const [errores, guardaErrores ] = useState({});
    const [submitForm , guardarSubmitForm ] = useState(false); // Cuando el usuario envie el formulario este cambiaria a true

    //Cuando el submit pasa a true entonces hace useEffect
    useEffect(() => {
        if(submitForm){
           

            const noErrores = Object.keys(errores).length === 0; // una forma que tengo de revisar si un objeto esta vacio o no es con object.keys, si revisamos y el objeto es igual a 0 , el objeto esta vacio
            //Este const noErrores guarda un boolean true o false, si devuelve true se ejecuta el if
            if(noErrores){
                fn(); // fn = igual a la funcion que se ejecuta en el componente
            }

            guardarSubmitForm(false);
        }
    },[errores]);

    //Funcion que se ejecuta conforme el usuario escribe algo
    const handleChange = e => {
        guardaValores({
            ...valores,
            [e.target.name] : e.target.value
        })
    }

    //Funcion que se ejecuta cuando el usuario hace submit
    const handleSubmit = e => {
        e.preventDefault();
        const erroresValidacion = validar(valores);
        guardaErrores(erroresValidacion);
        guardarSubmitForm(true);
    }

    // Cuando se realiza el evento de blur , es decir cuando el usuario sale del input escribiendo se ejecuta
    const handleBlur = () => {
        const erroresValidacion = validar(valores);
        guardaErrores(erroresValidacion);
    }

    return {
        valores,
        errores,
        handleSubmit,
        handleChange,
        handleBlur        
    }
}
 
export default useValidacion;