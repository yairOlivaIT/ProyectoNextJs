import App from 'next/app'; //esta App es la principal
import firebase , {FirebaseContext} from '../firebase';
import useAutenticacion from '../hooks/useAutenticacion';

const MyApp = props => {

    const usuario = useAutenticacion();
    
    const {Component , pageProps } = props; //viene de next esto, componente es el componente actual,y los props son las paginas

    return(
        <FirebaseContext.Provider
            value={{
                firebase,
                usuario //con esto lo hago disponible en el context, y con esto va estar disponible en todos los componentes
            }}
        >
            <Component {...pageProps} />
        </FirebaseContext.Provider>
    )
}

export default MyApp;