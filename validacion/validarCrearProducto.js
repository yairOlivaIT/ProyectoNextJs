export default function validarCrearProducto(valores){

    let errores  = {};

    // validar el nombre del usuario
    if(!valores.nombre) {
        errores.nombre = "El Nombre es obligatorio";
    }

   // validar el nombre de la empresa
    if(!valores.empresa) {
        errores.empresa = "El Nombre de la Empresa es obligatorio";
    }

   // validar imagen

   // validar url
    if(!valores.url) {
        errores.url = "La url del producto es obligatoria";
    }else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url)){
        errores.url = "Url mal formateada o no válida";
    }
   // validar descripcion
    if(!valores.descripcion){
        errores.descripcion = "Agrega una descripción de tu producto"; 
    }
    return errores;
}