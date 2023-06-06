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

// sitater index.html

 let sitater = [];


async function updateSitater () {

    const querySnapshot = await getDocs(collection(db, "Sitater"))
        querySnapshot.forEach((doc) => {
                sitater.push(doc._document.data.value.mapValue.fields)
            })
}


updateSitater()


const HTMLsitat = document.getElementById('sitat')
const HTMLforfatter = document.getElementById('forfatter')

function randomSitat () {
    const randomIndex = Math.floor(Math.random() * sitater.length);
    const randomSitat = sitater[randomIndex];

    HTMLsitat.innerHTML = randomSitat.sitat.stringValue;
    HTMLforfatter.innerHTML = randomSitat.forfatter.stringValue
}

setTimeout(randomSitat, 2000)

// innlogget sideoverskrift
const middleTXT = document.getElementById('middleTXT')

setTimeout(()=>{
    if(getAuth().currentUser != null){
    middleTXT.innerHTML = 'SitatSiden - ' + getAuth().currentUser.email;
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

// logut

const logout = async () => {
    await signOut(auth);
    location.reload();
}

logoutBTN.addEventListener('click',logout)

// laster animasjon index.html

loadAnimation()




function loadAnimation () {
HTMLsitat.innerHTML = 'loading'
HTMLforfatter.innerHTML = 'loading'
setTimeout(()=>{
    HTMLsitat.innerHTML = 'loading.'
    HTMLforfatter.innerHTML = 'loading.'
},250)
setTimeout(()=>{
    HTMLsitat.innerHTML = 'loading..'
    HTMLforfatter.innerHTML = 'loading..'
},500)
setTimeout(()=>{
    HTMLsitat.innerHTML = 'loading...'
    HTMLforfatter.innerHTML = 'loading...'
},750)
setTimeout(()=>{
    HTMLsitat.innerHTML = 'loading'
    HTMLforfatter.innerHTML = 'loading'
},1000)
setTimeout(()=>{
    HTMLsitat.innerHTML = 'loading.'
    HTMLforfatter.innerHTML = 'loading.'
},1250)
setTimeout(()=>{
    HTMLsitat.innerHTML = 'loading..'
    HTMLforfatter.innerHTML = 'loading..'
},1500)
setTimeout(()=>{
    HTMLsitat.innerHTML = 'loading...'
    HTMLforfatter.innerHTML = 'loading...'
},1750)
}