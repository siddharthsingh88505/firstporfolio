let id = setInterval(()=>{
    if(!localStorage.id){
        location.href='Loginfeature.html';
    }
},10);

let myText =
["Developer!","Designer!","Programmer!","Freelancer!"];
let myE = document.querySelector('main>section:first-child div:last-child')
let x=0
function typeWriter(param){
    let y=0
    let id2 = setInterval(()=>{
        myE.innerHTML=`${myE.innerHTML+param[y]}`;
        y++;
        if(y===param.length){
            clearInterval(id2);
        }
    },100)
    
}
let id1 = setInterval(()=>{
    myE.innerHTML="";
    typeWriter(myText[x])
    x++;
    if(x===myText.length){
        x=0;
        myE.innerHTML="";
    }
},2500);

let toggleBtn = document.getElementsByClassName('togglebtn')[0];
let toggleContainer = document.getElementById('last');
let a = document.querySelectorAll('#last a');
for(let x of a){
x.addEventListener('click',()=>{
    toggleBtn.innerHTML="&#8801;";
    toggleContainer.style.display="none"; 
})
}
let count = 0;
toggleBtn.addEventListener('click',()=>{
    if(count===0){
        toggleBtn.innerHTML="&times;";
        toggleContainer.style.display="flex";
        count++;
    }
    else{
        toggleBtn.innerHTML="&#8801;";
        toggleContainer.style.display="none";
        count--;
    }
})
document.getElementById('logout').addEventListener('click',()=>{
    if(localStorage.getItem('id')){
        localStorage.removeItem('id');

    }
})