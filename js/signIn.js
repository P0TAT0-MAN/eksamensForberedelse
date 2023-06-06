// firebase

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, doc } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";



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

// auth

const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginBTN = document.getElementById('loginBTN');

const loginEmailPassword = async () => {
    // legg til email login field i chinpokomon link til inputs i disse variabler
    const loginEmail = emailInput.value;
    const loginPassword = passwordInput.value;
    const userCredentials = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    console.log(userCredentials.user);
    console.log(getAuth().currentUser);
    window.open('./userpage.html','_blank')
    window.open('../index.html','_self')
}

loginBTN.addEventListener('click', loginEmailPassword)

setTimeout(()=>{
    console.log(getAuth().currentUser);
}, 5000)