export default function validarCrearCuenta(valores){

    let errores  = {};

    // validar el nombre del usuario
    if(!valores.nombre) {
        errores.nombre = "El Nombre es obligatorio";
    }

    //validar email
    if(!valores.email){
        errores.email = "El Email es obligatorio";
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(valores.email)){//usamos la expresion regular para validar que es un email , al termino de la i agregamos .test() para pasarle el valor que queremos revisar
        errores.email = "Email no válido";
    }

    //validar password
    if(!valores.password){
        errores.password = "El Password es obligatorio";
    }else if( valores.password.length < 6){ // esto se debe a que firebase te pide que tenga al menos 6 caracteres
        errores.password = "El Password debe ser de al menos 6 caracteres";
    }

    return errores;
}