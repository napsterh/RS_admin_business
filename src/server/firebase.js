import app from 'firebase/app';
import 'firebase/firestore';

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
    constructor(){
        app.initializeApp(config);
        this.db = app.firestore();
    }
}

export default Firebase;

