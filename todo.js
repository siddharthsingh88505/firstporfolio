
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-app.js";
import { getAuth} from "https://www.gstatic.com/firebasejs/9.6.4/firebase-auth.js";
import { getDatabase, get, child, set, ref, onValue,update} from "https://www.gstatic.com/firebasejs/9.6.4/firebase-database.js";
const firebaseApp = initializeApp({
    apiKey: "AIzaSyBRuNsbM2ucUvcTR-UqbX9jUDIIOFk-nfs",
    authDomain: "pehla-firebase-app.firebaseapp.com",
    projectId: "pehla-firebase-app",
    storageBucket: "pehla-firebase-app.appspot.com",
    messagingSenderId: "1067895150995",
    appId: "1:1067895150995:web:5cc25024ef224e86b33066"
});

const auth = getAuth(firebaseApp);
const db = getDatabase(firebaseApp);
let id = setInterval(()=>{
    if(!localStorage.id){
        location.replace('Loginfeature.html');
    }
},0);
get(child(ref(db),localStorage.id+"/active/")).then((snapshot)=>{
        if(snapshot.exists()){
          let temp = snapshot.val().active;
          for(let x=temp.length-1;x>=0;x--){
              if(temp[x]){
              document.querySelector('.items-container').innerHTML+=`<div class="todo-items">
              <div class="todo-check-mark">
                  <div class="check">
  
                  </div>
              </div>
              <div class="todo-text">
                  ${temp[x]}
              </div>
          </div>`
              }
          }
          addAll(); 
        }
});

let inputText = document.querySelector('form input');
inputText.addEventListener('keydown',(e)=>{
    
    if(e.key==="Enter"){
        e.preventDefault();
        document.querySelector('.check').style.backgroundImage='url("icon-check.svg"),linear-gradient(to right bottom,white 6%,rgb(58, 72, 133),rgb(47, 63, 63),rgb(9, 48, 48))';
        document.querySelector('.check').style.backgroundRepeat="no-repeat";
        document.querySelector('.check').style.backgroundSize="contain";
        if(inputText.value.trim()){
            setTimeout(()=>{
                getData();
            },100)        
        }
    }
    
}) 
function getData(){
get(child(ref(db),localStorage.id+"/active/")).then((snapshot)=>{
    if(snapshot.exists()){
        document.querySelector('.check').style.backgroundImage='url("icon-check.svg"),linear-gradient(to right bottom,white 6%,rgb(58, 72, 133),rgb(47, 63, 63),rgb(9, 48, 48))';
        document.querySelector('.check').style.backgroundRepeat="no-repeat";
        document.querySelector('.check').style.backgroundSize="contain";
      let temp = snapshot.val().active;
      if(!temp.includes(inputText.value)){
      temp.push(inputText.value.trim());
      let updatedValue = temp;
      store(updatedValue);
      document.querySelector('.check').style.backgroundImage=""
      }

    }
    else{
        store([inputText.value.trim()])
    }
  }).catch(error=>{
      console.log(error);
  })
}

function store(value){
set(ref(db,localStorage.id+"/active/"),{
    active:value  
  }).then(()=>{
    inputText.value="";
    console.log('Submitted SuccessFully');
    onValue(ref(db,localStorage.id+"/active/"),snapshot=>{
        setContainer();
      });
    
        
  }).catch((error)=>{
    console.log(error.code);
  })
}
function setContainer(){
    get(child(ref(db),localStorage.id+"/active/")).then((snapshot)=>{
        if(snapshot.exists()){
          let temp = snapshot.val().active;
          let newInnerHtml=""
          for(let x=temp.length-1;x>=0;x--){
              if(temp[x]){
              newInnerHtml+=`<div class="todo-items">
              <div class="todo-check-mark">
                  <div class="check">
  
                  </div>
              </div>
              <div class="todo-text">
                  ${temp[x]}
              </div>
              </div>`
              }
          }   
          document.querySelector('.items-container').innerHTML=newInnerHtml;
          addAll();
        }
        else{
            document.querySelector('.items-container').innerHTML=""; 
        }
})
}

function addAll(){
    let todoItems = document.getElementsByClassName('todo-items');
    let circle = document.querySelectorAll('.todo-items .check');
    for(let c=0;c<todoItems.length;c++){
        circle[c].addEventListener('click',()=>{
            circle[c].style.backgroundImage='url("icon-check.svg"),linear-gradient(to right bottom,white 6%,rgb(58, 72, 133),rgb(47, 63, 63),rgb(9, 48, 48))';
            circle[c].style.backgroundRepeat='no-repeat';
            circle[c].style.backgroundSize='contain';
            setTimeout(()=>{
                let item = todoItems[c].querySelector('.todo-text').innerText;
                get(child(ref(db),localStorage.id+"/active/")).then((snapshot)=>{
                    if(snapshot.exists()){
                      let temp = snapshot.val().active;
                      let index = temp.indexOf(item);
                      console.log(item)
                      console.log(temp)
                      console.log(index)
                      console.log(temp[index])
                      //Onclick we need to transfer the particular item into completed array
                      completed(item);
                      
                      console.log(item)
                      //Noe we need to update active array
                      let newTemp=[];
                      for(let x of temp){
                          if(x!==item){
                              newTemp.push(x);
                          }
                      }
                      update(ref(db,localStorage.id+"/active/"),{
                          active:newTemp
                    })
                      //Now update the item container
                      onValue(ref(db,localStorage.id+"/active/"),snapshot=>{
                        setContainer();
                      });
                
                    }
                  }).catch(error=>{
                      console.log(error);
                  })
            },100)
               
        })
    }

function completed(value){
    get(child(ref(db),localStorage.id+"/completed/")).then((snapshot)=>{
        if(snapshot.exists()){
            if(snapshot.val().completed){
          let temp = snapshot.val().completed;
          temp.push(value);
          set(ref(db,localStorage.id+"/completed/"),{
            completed:temp 
          });
        }
        else{
            set(ref(db,localStorage.id+"/completed/"),{
                completed:[value] 
            });
        }
        }
        else{
            set(ref(db,localStorage.id+"/completed/"),{
                completed:[value] 
            });
        }
        
    })
    
}

function setContainerCompleted(){
    get(child(ref(db),localStorage.id+"/completed/")).then((snapshot)=>{
        if(snapshot.exists()){
          let temp = snapshot.val().completed;
          let circle = document.querySelectorAll('.todo-items .check')
          let newInnerHtml=""
          for(let x=temp.length-1;x>=0;x--){
              if(temp[x]){
              newInnerHtml+=`<div class="todo-items">
              <div class="todo-check-mark">
                  <div class="check setCompleted">
  
                  </div>
              </div>
              <div class="todo-text">
                  ${temp[x]}
              </div>
              </div>`
              }
          }   
          document.querySelector('.items-container').innerHTML=newInnerHtml;
          tickes()
        }
    })
}
function tickes(){
    let tick = document.getElementsByClassName('setCompleted');
    for(let x of tick){
        x.style.backgroundImage='url("icon-check.svg"),linear-gradient(to right bottom,white 6%,rgb(58, 72, 133),rgb(47, 63, 63),rgb(9, 48, 48))';
        x.style.backgroundRepeat='no-repeat';
        x.style.backgroundSize='contain';
    }
}

document.getElementsByClassName('completed')[0].addEventListener('click',()=>{
    document.getElementsByClassName('active')[0].style.color="rgb(184, 180, 180)";
    document.getElementsByClassName('completed')[0].color="red";
    document.getElementsByClassName('clearCompleted')[0].color="rgb(184, 180, 180)";
    setContainerCompleted();
})

function clearCompleted(){
    update(ref(db,localStorage.id+"/completed/"),{
        completed:""
      })
      onValue(ref(db,localStorage.id+"/completed/"),snapshot=>{
            setContainer();
        });
}

document.getElementsByClassName('clearCompleted')[0].addEventListener('click',()=>{
    clearCompleted();
    document.getElementsByClassName('active')[0].style.color="rgb(184, 180, 180)";
    document.getElementsByClassName('completed')[0].style.color="rgb(184, 180, 180)";
    document.getElementsByClassName('clearCompleted')[0].style.color="red";
    setTimeout(()=>{
        document.getElementsByClassName('active')[0].style.color="red";
        document.getElementsByClassName('completed')[0].style.color="rgb(184, 180, 180)";
        document.getElementsByClassName('clearCompleted')[0].style.color="rgb(184, 180, 180)";
    },100)
})

document.getElementsByClassName('active')[0].addEventListener('click',()=>{
    setContainer();
    document.getElementsByClassName('active')[0].style.color="red";
    document.getElementsByClassName('completed')[0].style.color="rgb(184, 180, 180)";
    document.getElementsByClassName('clearCompleted')[0].style.color="rgb(184, 180, 180)";
})
}
