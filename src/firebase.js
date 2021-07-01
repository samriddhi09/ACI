import firebase from 'firebase/app';
import "firebase/auth";
import 'firebase/storage';
import 'firebase/firestore';

const app = firebase.initializeApp({
    apiKey: "AIzaSyCn37YfCl2_TanbuIYRS7RRFRqoMu_R5Nc",
    authDomain: "project-a-63c0f.firebaseapp.com" ,
    databaseURL: "https://project-a-63c0f-default-rtdb.firebaseio.com",
    projectId: "project-a-63c0f",
    storageBucket: "project-a-63c0f.appspot.com",
    messagingSenderId: "362358173358" ,
    appId: "1:362358173358:web:796c00124aa9e19f16073f",
    measurementId: "G-BFDHX81MTJ"

});

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();

export {projectFirestore,projectStorage};
export const auth = app.auth();
export default app;
