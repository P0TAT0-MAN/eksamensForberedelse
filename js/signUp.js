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
const password1Input = document.getElementById('password1');
const password2Input = document.getElementById('password2');
const signupBTN = document.getElementById('signup-btn');
const errorMSG = document.getElementById('errorP');

const createAccount = async () => {
    if(emailInput.value.length > 0 && password1Input.value.length > 0 && password2Input.value.length > 0){
    if(password1Input.value === password2Input.value){

    const signupEmail = emailInput.value;
    const signupPassword = password1Input.value
    
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
            window.open('./userpage.html', '_blank');
            window.open('../index.html', '_self');
        }
        catch(error){
            errorMSG.style.display='block';
        }

} else {
    errorMSG.style.display='block';
}
} else {
    errorMSG.style.display='block';
}
}

signupBTN.addEventListener('click', createAccount)