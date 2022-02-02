
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
        if(inputText.value.trim()){
        getData();        
        }
    }
    
})
function getData(){
get(child(ref(db),localStorage.id+"/active/")).then((snapshot)=>{
    if(snapshot.exists()){
      let temp = snapshot.val().active;
      if(!temp.includes(inputText.value)){
      temp.push(inputText.value.trim());
      let updatedValue = temp;
      store(updatedValue);
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
    for(let x of todoItems){
        let circle = document.querySelectorAll('.todo-items .check')
        for(let y of circle){
        y.addEventListener('click',()=>{
            setTimeout(()=>{
              y.style.backgroundColor="linear-gradient(to right bottom,cyan,white,red)"
                let item = x.querySelector('.todo-text').innerText;
            get(child(ref(db),localStorage.id+"/active/")).then((snapshot)=>{
                if(snapshot.exists()){
                  let temp = snapshot.val().active;
                  let index = temp.indexOf(item);
                  console.log(index)
                  //Onclick we need to transfer the particular item into completed array
                  completed(temp[index]);
                  

                  //Noe we need to update active array
                  let newTemp=[];
                  for(let x=0;x<temp.length;x++){
                      if(x===index){
                          continue;
                      }
                      else if(x===index && x==0){
                        if(temp[x]){
                            newTemp.push(temp[x]);
                        }
                      }
                      else{
                          if(temp[x]){
                              newTemp.push(temp[x]);
                          }
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
            },200)
            

        })
    }
    }
}

function completed(value){
    get(child(ref(db),localStorage.id+"/completed/")).then((snapshot)=>{
        console.log("yess")
        if(snapshot.exists()){
            console.log('first')
            if(snapshot.val().completed){
                console.log('second')
          let temp = snapshot.val().completed;
          temp.push(value);
          set(ref(db,localStorage.id+"/completed/"),{
            completed:temp 
          });
        }else{
            set(ref(db,localStorage.id+"/completed/"),{
                completed:[value] 
            });
        }
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
          
        }
    })
}

document.getElementsByClassName('completed')[0].addEventListener('click',()=>{
    document.getElementsByClassName('active').style.color="rgb(184, 180, 180)";
    document.getElementsByClassName('completed').color="red";
    document.getElementsByClassName('clearCompleted').color="rgb(184, 180, 180)";
    setContainerCompleted();
})

function clearCompleted(){
    set(ref(db,localStorage.id+"/completed/"),{
        completed:""
      }).then(()=>{
        inputText.value="";
        console.log('Submitted SuccessFully');
        onValue(ref(db,localStorage.id+"/"),snapshot=>{
            setContainerCompleted();
          });
        
            
      })
}

document.getElementsByClassName('clearCompleted')[0].addEventListener('click',()=>{
    clearCompleted();
    document.getElementsByClassName('active').style.color="rgb(184, 180, 180)";
    document.getElementsByClassName('completed').color="rgb(184, 180, 180)";
    document.getElementsByClassName('clearCompleted').color="red";
})

document.getElementsByClassName('active')[0].addEventListener('click',()=>{
    setContainer();
    document.getElementsByClassName('active').style.color="red";
    document.getElementsByClassName('completed').color="rgb(184, 180, 180)";
    document.getElementsByClassName('clearCompleted').color="rgb(184, 180, 180)";
})