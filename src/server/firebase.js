import app from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const config = {
    apiKey: "AIzaSyCe-hWmRgpEzrNa4kY50t08t3tX0j9gbuE",
    authDomain: "rsadminbusiness.firebaseapp.com",
    databaseURL: "https://rsadminbusiness.firebaseio.com",
    projectId: "rsadminbusiness",
    storageBucket: "rsadminbusiness.appspot.com",
    messagingSenderId: "878227974242",
    appId: "1:878227974242:web:d6251211b3fd2e618b493b",
    measurementId: "G-6H6Q8HTEQK"
};

class Firebase {

    constructor() {
        app.initializeApp(config);
        this.db = app.firestore();
        this.auth = app.auth();
        this.storage = app.storage();

        this.storage.ref().constructor.prototype.guardarDocumentos = function (documentos) {
            var ref = this;
            return Promise.all(documentos.map(function (file) {
                return ref.child(file.alias).put(file).then(snapshot => {
                    return ref.child(file.alias).getDownloadURL();
                })
            }))
        }

    }

    estaIniciado() {
        return new Promise(resolve => {
            this.auth.onAuthStateChanged(resolve)
        })
    }

    guardarDocumento = (nombreDoc, documento) => this.storage.ref().child(nombreDoc).put(documento);

    devolverDocumento = (documentUrl) => this.storage.ref().child(documentUrl).getDownloadURL();

    guardarDocumentos = (documentos) => this.storage.ref().guardarDocumentos(documentos);

}

export default Firebase;

