// firebase

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, doc } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";



const firebaseConfig = {
  apiKey: "AIzaSyBphQPVMpDqdIMADBWx804mcJKk7PI2zI0",
  authDomain: "eksamensforberedelse-1e980.firebaseapp.com",
  projectId: "eksamensforberedelse-1e980",
  storageBucket: "eksamensforberedelse-1e980.appspot.com",
  messagingSenderId: "494517550704",
  appId: "1:494517550704:web:0065ed8db1e85768073eb5"
};



const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)

const page = document.getElementById('securityWrapper')

setTimeout(() => {
    if(getAuth().currentUser != null){
        page.style.display='block'
    }
}, 2000);

// innlogget sideoverskrift
const middleTXT = document.getElementById('middleTXT')

setTimeout(()=>{
    if(getAuth().currentUser != null){
    middleTXT.innerHTML = '<a href="../index.html">SitatSiden - ' + getAuth().currentUser.email;+'</a>'
    }
}, 2000)

// logut sjekk

const logoutBTN = document.getElementById('logoutBTN')
const loginBTN = document.getElementById('loginBTN')

setTimeout(()=>{
    if(getAuth().currentUser != null){
    loginBTN.style.display='none'
    logoutBTN.style.display='block'
    }
}, 2000)

// lag nytt sitat

const forfatter = document.getElementById('newSitatForfatter');
const sitat = document.getElementById('newSitatSitat');
const knapp = document.getElementById('newSitatBTN');

async function createSitat () {
    if(sitat.value.length > 0 && forfatter.value.length > 0){
    await addDoc(collection(db, 'Sitater'),{
        bruker: getAuth().currentUser.email,
        forfatter: forfatter.value,
        sitat: "''" + sitat.value + "''"
    });
}
}

knapp.addEventListener('click', createSitat)

// logut

const logout = async () => {
    await signOut(auth);
    window.open('../index.html','_self')
}

logoutBTN.addEventListener('click',logout)