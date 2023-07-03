
const firebaseConfig = {
    apiKey: "AIzaSyA9-wjc1_HwvdFi8G4dk8HI9vBXbGbjojc",
    authDomain: "registroweb-406d1.firebaseapp.com",
    projectId: "registroweb-406d1",
    storageBucket: "registroweb-406d1.appspot.com",
    messagingSenderId: "804614674752",
    appId: "1:804614674752:web:223dbf8bfc99d06ef342a5"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = firebase.auth();

//LLamando elementos de html o del DOM
let btnRegistrar = document.getElementById('btnRegistrar');
let btnIngresar = document.getElementById('btnIngresar');
let contenidoDeLaWeb = document.getElementById("contenidoDeLaWeb");
let formulario = document.getElementById('formulario');
let btnCerrarSesion = document.getElementById('btnCerrarSesion');
let btnGoogle = document.getElementById('btnGoogle');
//Funcion Registrar
btnRegistrar.addEventListener('click',()=>{
    let email = document.getElementById("txtEmail").value;
    let password = document.getElementById("txtPassword").value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    console.log("Inicio de sesión correcto");
    contenidoDeLaWeb.classList.replace('ocultar','mostrar');
    formulario.classList.replace('mostrar','ocultar');
    var user = userCredential.user;
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage);
    // ..
  });
})

//Funcion ingresar Ingresar
btnIngresar.addEventListener('click',()=>{
  let email = document.getElementById("txtEmail").value;
    let password = document.getElementById("txtPassword").value;
console.log("tu email es" + email + "y tu password es" + password);
cargaJSON ();
firebase.auth().signInWithEmailAndPassword(email, password)
.then((userCredential) => {
  // Signed in
  console.log("Inicio de sesión correcto");
    contenidoDeLaWeb.classList.replace('ocultar','mostrar');
    formulario.classList.replace('mostrar','ocultar');
  var user = userCredential.user;
  console.log("Inicio sesion correctamente")
  // ...
})
.catch((error) => {
  var errorCode = error.code;
  var errorMessage = error.message;
  console.log(errorMessage);
}); 
})
//Funcion Cerrar Sesion
btnCerrarSesion.addEventListener('click',()=>{
  firebase.auth().signOut().then(() => {
    contenidoDeLaWeb.classList.replace('mostrar','ocultar');
    formulario.classList.replace('ocultar','mostrar');
    console.log("Cierre de sesion correcto");
  }).catch((error) => {
    console.log("Error con el cierre de Sesion");
  });
})
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    
    var uid = user.uid;
    contenidoDeLaWeb.classList.replace('ocultar','mostrar');
    formulario.classList.replace('mostrar','ocultar');
    // ...
  } else {
    contenidoDeLaWeb.classList.replace('mostrar','ocultar');
    formulario.classList.replace('ocultar','mostrar');
    // User is signed out
   
  }
});
//Funcion Login  con Google
btnGoogle.addEventListener('click',()=>{
  var provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
   
    var credential = result.credential;
    console.log("Inicio sesion con google")
    
      // ...
  }).catch((error) => {
    
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
    console.log("Error de login con google")
    // ...
  });
})

function cargaJSON (){
  fetch('data.json')
  .then(function(res){
    return res.json();
  })
  .then((data) =>{
    let html = '';
    data.forEach((productos)=>{
      html +=`
      <table class="ahora">
      <div class="producto">
    <p> ${productos.marca} </p>
     <img src="${productos.img}"  class="imgProducto">
     <strong> ${productos.precio} </strong>
     
     </div>  
     </table>
     `;
    })
  document.getElementById('resultado').innerHTML=html;
  })
  
    }

