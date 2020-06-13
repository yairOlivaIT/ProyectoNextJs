import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import firebaseConfig from './config';


//Creamos clase para tener los diferentes metodos para los usuarios, asi como una instancia
class Firebase {
    constructor(){ //el constructor va ejecutar la inicializacion de la app
       if(!app.apps.length){
            app.initializeApp(firebaseConfig)
        }
        //de esta forma habilitamos la autentificacion
        this.auth = app.auth();
        this.db = app.firestore();
        this.storage = app.storage();        
    }

    //Registra un usuario
    async registrar(nombre,email,password){
        const nuevoUsuario = await this.auth.createUserWithEmailAndPassword(email,password); //registra el nuevo usuario
    
        return await nuevoUsuario.user.updateProfile({
            //del perfil del usuario queremos que actulizes el displayname es decir el nombre del usuario, lo crea y al mismo tiempo lo va a actualizar
            displayName : nombre
        })
    }


    //Inicia Sesion del usuario
    async login(email,password){
        return this.auth.signInWithEmailAndPassword(email,password);
    }

    //Cierra la sesion del usuario
    async cerrarSesion(){
        await this.auth.signOut();
    }
}

const firebase = new Firebase();

export default firebase;
  