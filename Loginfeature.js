//Importing sdk and initializing the app

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.6.4/firebase-auth.js";
import { getDatabase, set, ref} from "https://www.gstatic.com/firebasejs/9.6.4/firebase-database.js";

const firebaseApp = initializeApp({
    apiKey: "AIzaSyBRuNsbM2ucUvcTR-UqbX9jUDIIOFk-nfs",
    authDomain: "pehla-firebase-app.firebaseapp.com",
    projectId: "pehla-firebase-app",
    storageBucket: "pehla-firebase-app.appspot.com",
    messagingSenderId: "1067895150995",
    appId: "1:1067895150995:web:5cc25024ef224e86b33066"
});


//Hiding the all content of index.html
const auth = getAuth(firebaseApp);
const db = getDatabase(firebaseApp);


//Getting rerences of all the buttons
const signIn = document.getElementsByClassName('btn')[0];
const signInGoogleOne = document.getElementsByClassName('btn')[1];
const joinNow = document.querySelector('#Container1 div');
const signUp = document.getElementsByClassName('btn')[2];
const signInGoogleTwo = document.getElementsByClassName('btn')[3];
console.log(joinNow);
//Click listener on join now for signing up
joinNow.addEventListener('click',()=>{
    document.querySelector('#Container1').style.display="none";
    document.getElementById('Container0').style.display="none"
    document.getElementById('signUpContainer').style.display="flex";
});

//Phone number validate 

/*---------Sign up functionality--------*/

function signUpUser(){
    var email = document.querySelector('#signUpContainer>input:nth-child(5)').value;
    var password = document.querySelector('input:nth-child(6)').value;
    var name = document.querySelector('#signUpContainer>input:nth-child(3)').value;
    var phoneNumber = document.querySelector('#signUpContainer>input:nth-child(4)').value;
    //Creating user with email and password
    const pattern = /^([6-9][0-9]{9})$/;
    const emailValidate = /^([a-zA-Z0-9/.-]+)@([a-zA-Z0-9/.-]+).([a-zA-Z]{2,20})(.[a-zA-Z])?$/;
    const nameValidate = /[a-zA-Z]{4,30}/;
  
    if(email && password && name && phoneNumber){
      if(navigator.onLine){
        document.querySelector('#signUpContainer>p').style.display="none";
        if(pattern.test(phoneNumber) && phoneNumber.toString().length===10 && emailValidate.test(email) && nameValidate.test(name)){
        createUserWithEmailAndPassword(auth, email, password).then((user) => {
        // Signed in 
        set(ref(db,"users/"+user.user.uid+"/"),{
            Name:name,
            Contact:phoneNumber,
            Email:email.toLowerCase(),
            Password:password
          }).then(()=>{
              setTimeout(()=>{
                  document.querySelector('#Container1').style.display="flex";
                  document.getElementById('Container0').style.display="flex";
                  document.getElementById('signUpContainer').style.display="none";
              },200)
            
          })
        }).catch((error) => {
            const errorCode = error.code;
             document.querySelector('#signUpContainer>p').style.display="block";
             document.querySelector('#signUpContainer>p').innerHTML=`&#9888; &nbsp; ${errorCode.slice(5)}`;
         });
        }
         else{
          document.querySelector('#signUpContainer>p').style.display="block";
          document.querySelector('#signUpContainer>p').innerHTML=`&#9888; &nbsp; Invalid Email or Phone Number or Name`;
         }
        }
        else{
          document.querySelector('#signUpContainer>p').style.display='block';
          document.querySelector('#signUpContainer>p').innerHTML=`&#9888; &nbsp; Please, check your connection`;
        }
     }
    else{
        document.querySelector('#signUpContainer>p').style.display='block';
        document.querySelector('#signUpContainer>p').innerHTML=`&#9888; &nbsp; Please, provide below details`;
    }
}
const listOfInput = document.getElementsByTagName('input');
for(let x of listOfInput){
   x.addEventListener('keypress',()=>{
    document.querySelector('#signUpContainer>p').style.display="none";
    document.querySelector('#Container0>p').style.display="none";
    })
    x.addEventListener('mouseenter',()=>{
      document.querySelector('#Container0 .inputEye div>i').style.top='50%';
      document.querySelector('#signUpContainer .inputEye div>i').style.top='50%';
    }) 
    x.addEventListener('mouseout',()=>{
      document.querySelector('#Container0 .inputEye div>i').style.top='55%';
      document.querySelector('#signUpContainer .inputEye div>i').style.top='55%';
    }) 
}

const listOfBtn = document.getElementsByClassName('btn');
for(let y of listOfBtn){
    y.addEventListener('mouseover',()=>{
        y.style.backgroundColor=`rgb(59, 71, 122)`;
        y.style.color='wheat';
        y.style.transition="0.6s";
    })
    y.addEventListener('mouseout',()=>{
        y.style.backgroundColor=`rgb(66, 117, 184)`;
        y.style.color='black';
    })
}


//Adding listener for sign up
signUp.addEventListener('click',()=>{signUpUser()})

/* ------Sign in functionality ------*/

signIn.addEventListener('click',()=>{
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    const p=/^([a-zA-Z0-9/.-]+)@([a-zA-Z0-9/.-]+).([a-zA-Z]{2,20})(.[a-zA-Z])?$/;
    if(email && password){
      if((p.test(email))){
        if(navigator.onLine){
      loginUser(email,password);
        }
        else{
          document.querySelector('#Container0>p').style.display='block';
            document.querySelector('#Container0>p').innerHTML=`&#9888; &nbsp; Please, check your connection`;
        }
      }
      else{
        document.querySelector('#Container0>p').style.display='block';
            document.querySelector('#Container0>p').innerHTML=`&#9888; &nbsp; Invalid email`;
      }
    }
    else{
        document.querySelector('#Container0>p').style.display='block';
        document.querySelector('#Container0>p').innerHTML=`&#9888; &nbsp; Please, provide below details`;
      }
    
})
function loginUser(email,password){
    document.querySelector('#Container0>p').style.display="none";
    if(navigator.onLine){
    signInWithEmailAndPassword(auth, email, password)
  .then((user) => {
    // Signed in 
    localStorage.setItem('id',user.user.uid);
    location.href='index.html';   
    
  })
  .catch((error) => {
    document.querySelector('#Container0>p').innerHTML=`&#9888; &nbsp;User not found`;
    document.querySelector("#Container0>p").style.display='block';
  });
}
else{
  document.querySelector('#Container0>p').innerHTML=`&#9888; &nbsp;Please, check your connection`;
  document.querySelector("#Container0>p").style.display='block';

}
}

/*---Sign in with Goggle functionality---*/



import { GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult, signOut } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-auth.js";

const provider = new GoogleAuthProvider(firebaseApp);
var EMAIL;
signInGoogleOne.addEventListener('click',()=>{
    //for pop-up
    if(navigator.onLine){
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    localStorage.setItem('id',user.uid);
    location.href='index.html';
    
      store(user.uid,user.displayName,user.email);
        document.querySelector('#Container1').style.display="none";
        document.querySelector('#Container0').id="welcome";
        document.getElementById('welcome').innerHTML="Welcome, "+user.displayName;

    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error); 
    document.querySelector('#Container0>p').style.display="block";
    document.querySelector('#Container0>p').innerHTML=`&#9888; &nbsp; ${errorCode.slice(5)}`;
    // ...
  });
}
else{
  document.querySelector('#Container0>p').style.display="block";
    document.querySelector('#Container0>p').innerHTML=`&#9888; &nbsp; Please, check your connection`;
}

})

signInGoogleTwo.addEventListener('click',()=>{
    //for pop-up
   signInWithPopup(auth, provider)
   .then((result) => {
       //This gives you a Google Access Token. You can use it to access the Google API.
     const credential = GoogleAuthProvider.credentialFromResult(result);
     const token = credential.accessToken;
     // The signed-in user info.
     const user = result.user;
     
     if(user.emailVerified){
      localStorage.setItem('id',user.uid);
      location.href='index.html';
      store(user.uid,user.displayName,user.email);
         EMAIL=user.uid;
         document.querySelector('#Container1').style.display="none";
         document.querySelector('#signUpContainer').id="welcome";
         document.getElementById('welcome').innerHTML="Welcome, "+user.displayName;
     }
     // ...
   }).catch((error) => {
     // Handle Errors here.
     const errorCode = error.code;
     const errorMessage = error.message;
     // The email of the user's account used.
     const email = error.email;
     // The AuthCredential type that was used.
     const credential = GoogleAuthProvider.credentialFromError(error);
     document.querySelector('#signUpContainer>p').style.display="block";
    document.querySelector('#signUpContainer>p').innerHTML=`&#9888; &nbsp; ${errorCode.slice(5)}`;
     // ...
   });

});

function store(user,name,email,contact="",password=""){
  set(ref(db,"users/"+user+"/"),{
    Name:name,
    Email:email.toLowerCase(),
    Contact:contact,
    Password:password
  })
}

let eye = document.querySelectorAll('.inputEye div>i');
for(let x of eye){
  x.addEventListener('click',()=>{
    if(document.querySelector('#signUpContainer .inputEye input').type==="password" || document.querySelector('#Container0 .inputEye input').type==="password"){
      document.querySelector('#signUpContainer .inputEye input').type="text";
      document.querySelector('#Container0 .inputEye input').type="text";
    }
    else{
      document.querySelector('#signUpContainer .inputEye input').type="password";
      document.querySelector('#Container0 .inputEye input').type="password"
    }
  })
}