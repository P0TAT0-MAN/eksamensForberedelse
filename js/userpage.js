// firebase

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";
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
const middleTXT = document.getElementById('middleTXT')

const authChecker = () => {
    if(getAuth().currentUser != null){
        page.style.display='block'
        middleTXT.innerHTML = '<a href="../index.html">SitatSiden - ' + getAuth().currentUser.email;+'</a>'
    } else {
        window.open('../index.html', '_self')
    }
}

setTimeout(authChecker, 2000);





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

let oppdaterSitat = '';

const forfatter = document.getElementById('newSitatForfatter');
const sitat = document.getElementById('newSitatSitat');
const knapp = document.getElementById('newSitatBTN');
const errorMSG = document.getElementById('errorP');

async function createSitat () {
    if(getAuth().currentUser != null){
    if(sitat.value.length > 0 && forfatter.value.length > 0){
    if(oppdaterSitat === ''){
    await addDoc(collection(db, 'Sitater'),{
        bruker: getAuth().currentUser.email,
        forfatter: forfatter.value,
        sitat: "''" + sitat.value + "''"
});
sitat.value='';
forfatter.value='';
} else {
    await setDoc(doc(db, 'Sitater', oppdaterSitat),{
        bruker: getAuth().currentUser.email,
        forfatter: forfatter.value,
        sitat: "''" + sitat.value + "''" 
    })
    sitat.value='';
    forfatter.value='';
    oppdaterSitat = '';
}
} else {
    errorMSG.style.display='block';
}
}
}

knapp.addEventListener('click', createSitat)

// logut

const logout = async () => {
    await signOut(auth);
    window.open('../index.html','_self')
}

logoutBTN.addEventListener('click',logout)

// sitater + sitat id

let sitater = [];


async function updateSitater () {
let sitatCounter = 0
    const querySnapshot = await getDocs(collection(db, "Sitater"))
        querySnapshot.forEach((doc) => {
                sitater.push(doc._document.data.value.mapValue.fields)
                sitater[sitatCounter].id=doc.id
                sitatCounter++
            })
            sitatSifter()
}


updateSitater()

// brukers sitater

let brukersSitater = [];

function sitatSifter () {
    console.log(sitater);

    sitater.forEach((sitat) => {
        if(sitat.bruker.stringValue === getAuth().currentUser.email){
            brukersSitater.push(sitat)
        }
    })
    console.log(brukersSitater);

    sitatPrinter()
}



// sitat printer

const ulElement = document.getElementById('brukersSitatliste'); // Get the reference to the <ul> element


function sitatPrinter(){
    brukersSitater.forEach((sitat) => {
// Create a new <li> element
const liElement = document.createElement('li');
liElement.className = 'brukerSitat';
liElement.id = sitat.id;

// Create and append the <p> elements with the text content
const sitatParagraph = document.createElement('p');
sitatParagraph.textContent = 'sitat: ' + sitat.sitat.stringValue;
sitatParagraph.id = sitat.id;
liElement.appendChild(sitatParagraph);

const forfatterParagraph = document.createElement('p');
forfatterParagraph.textContent = 'forfatter: ' + sitat.forfatter.stringValue;
forfatterParagraph.id = sitat.id;
liElement.appendChild(forfatterParagraph);

// Append the <li> element to the <ul> element
ulElement.appendChild(liElement);

let eventId = document.getElementById(sitat.id)

eventId.addEventListener('click',sitatBytter)
})
}

// sitat utbytter

function sitatBytter (e) {
    let clickedSitat = [];

    brukersSitater.forEach((sitat) => {
        if(sitat.id === e.target.id){
            clickedSitat.push(sitat)
            console.log(sitat);
        }
    })

    sitat.value = clickedSitat[0].sitat.stringValue;
    forfatter.value = clickedSitat[0].forfatter.stringValue;
    oppdaterSitat = clickedSitat[0].id

    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Optionally, you can specify smooth scrolling behavior
      });
}