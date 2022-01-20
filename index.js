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
    }
},2500);

let toggleBtn = document.getElementsByClassName('togglebtn')[0];
let count = 0;
toggleBtn.addEventListener('click',()=>{
    if(count===0){
        toggleBtn.innerHTML="&times;";
        count++;
    }
    else{
        toggleBtn.innerHTML="&#8801;";
        count--;
    }
})

let img = document.getElementsByTagName('img')[0];
img.addEventListener('hover',()=>{
    console.log('hobver')
})