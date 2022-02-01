let id1 = setInterval(()=>{
     if(!localStorage.id){
         location.replace('Loginfeature.html');
     }
 },0);
//Getting all the necessary elements
let questionNum = document.getElementById('questionNum');
let spanNum = document.getElementById('spanNum');
let timer = document.getElementById('timer');
let question = document.getElementById('question');
let option1 = document.getElementById('optionOne');
let option2 = document.getElementById('optionTwo');
let option3 = document.getElementById('optionThree');
let nextBtn = document.getElementById('nextBtn');

let start = document.getElementById('start')


//Creating a question array
let quesArray = ["Who is Prime minister of India ?","What is the Name of National flag of India ?","Who is Defence Minister of India?"]
let btnCount=0;
nextBtn.addEventListener('click',()=>{
    nextBtn.style.backgroundColor="green";
    setTimeout(()=>{
        nextBtn.style.backgroundColor="initial";
    },100)   
})
//Creating function for adding question to the question array
function addQues(ques){
    quesArray[quesArray.length]=ques;
}

//Creating a answer array
let ansArray =[["Narendra modi","Yogi aaditynath","Amit shah"]];

//Creating function for adding answers to the ansArray
function addAns(...ques){
    ansArray[ansArray.length]=ques;
}
addAns("Tiranga","Triman","Taiwaran");
addAns("Ram Nath Kovind","Raj Nath Singh","Amit Shah")

let answer = ["Narendra modi","Tiranga","Raj Nath Singh"]
//Result array
var result=0;


function showAll(){
    document.getElementById('container').innerHTML=`${question}`
}
//Creating function to change question and options

let questionCount = 0;
let counter=1;
function changeQues(){
    counter=1;
    
    if(questionCount<quesArray.length){
    questionNum.innerText=`#Question ${questionCount+1}/${quesArray.length}`;
    question.innerText=`${quesArray[questionCount]}`;
    option1.innerText=`${ansArray[questionCount][0]}`;
    option2.innerText=`${ansArray[questionCount][1]}`;
    option3.innerText=`${ansArray[questionCount][2]}`;
    questionCount++;
    }
    else{
        nextBtn.addEventListener('click',hideOnEnd());
        
    }
}


changeQues();

nextBtn.addEventListener('click',()=>{
    changeQues();
 
})


start.addEventListener('click',(e)=>{
    document.getElementById('hidingContainer').style.display="none";
})
start.addEventListener('mouseover',()=>{
    start.style.backgroundColor=`rgb(4, 146, 4)`
})
start.addEventListener('mouseout',()=>{
    start.style.backgroundColor=`rgb(51, 27, 50)`;
})

start.addEventListener('click',()=>{
    var id=setInterval(() => {
        timer.innerHTML=`${counter}`;
        if(counter===15){
            changeQues();
            counter=0;
        }
        counter++;
    }, 1000);
})

function search(n){
    for(let x of answer){
        if(n===x){
            return true;
        }
    }
}

option1.addEventListener('click',()=>{
    if(search(option1.innerText)){
        option1.style.borderColor="green";
        result=result+1;
        setTimeout(()=>{
        option1.style.borderColor="";
        changeQues();
        option1.style.backgroundColor="inherit";
        option1.style.color="white";
        },200);
    }
    else{
        option1.style.borderColor="red";
        setTimeout(() => {
        option1.style.borderColor="";
        changeQues();
        option1.style.backgroundColor="inherit";
        option1.style.color="white";
        }, 1000);
    }
    
});
option2.addEventListener('click',()=>{
    if(search(option2.innerText)){
        option2.style.borderColor="green";
        result=result+1;
        setTimeout(()=>{
        option2.style.borderColor="";
        changeQues();
        option2.style.backgroundColor="inherit";
        option2.style.color="white";
        },200);
    }
    else{
        option2.style.borderColor="red";
        setTimeout(() => {
        option2.style.borderColor="";
        changeQues();
        option2.style.backgroundColor="inherit";
        option2.style.color="white";
        }, 200);
    }
});
option3.addEventListener('click',()=>{
    if(search(option3.innerText)){
        option3.style.borderColor="green";
        result=result+1;
        setTimeout(()=>{
        option3.style.borderColor="";
        changeQues();
        option3.style.backgroundColor="inherit";
        option3.style.color="white";
        },200);
    }
    else{
        option3.style.borderColor="red";
        setTimeout(() => {
        option3.style.borderColor="";
        changeQues();
        option3.style.backgroundColor="initial";
        option3.style.color="white";
        }, 1000);
    }
});
function hideOnEnd(){
    clearInterval(id);
    let c =document.getElementById('container');
    c.style.background=`orange`
    c.innerHTML=`<h1>Completed</h1><div id="enjoy">&#127881;</div><div id='score'>Score =>${result}</div>`;
    let num = Number(`${window.getComputedStyle(c).width}`)
    document.getElementById('enjoy').style.fontSize="18vh"
    document.getElementById('enjoy').style.textAlign='center'
    
}
