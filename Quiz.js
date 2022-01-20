//Getting all the necessary elements
let questionNum = document.getElementById('questionNum');
let spanNum = document.getElementById('spanNum');
let timer = document.getElementById('timer');
let question = document.getElementById('question');
let option1 = document.getElementById('optionOne');
let option2 = document.getElementById('optionTwo');
let option3 = document.getElementById('optionThree');
let nextBtn = document.getElementById('nextBtn');
// let prevBtn = document.getElementById('prevBtn');
let start = document.getElementById('start')


//Creating a question array
let quesArray = ["Who is Prime minister of India ?","What is the Name of National flag of India ?"]

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

function prevQues(){
    console.log(questionCount)
    if(questionCount>0){
       
    }
}

changeQues();

nextBtn.addEventListener('click',()=>{
    changeQues();
 
})

// prevBtn.addEventListener('click',()=>{
//     timer.innerText="";
//     prevQues();
 
// })

start.addEventListener('click',(e)=>{
    document.getElementById('hidingContainer').style.display="none";
})
start.addEventListener('mouseover',()=>{
    start.style.backgroundColor=`rgb(4, 146, 4)`
})
start.addEventListener('mouseout',()=>{
    start.style.backgroundColor=`rgb(51, 27, 50)`;
})
var id;
start.addEventListener('click',()=>{
    id=setInterval(() => {
        timer.innerHTML=`${counter}`;
        if(counter===15){
            changeQues();
            counter=0;
        }
        counter++;
    }, 1000);
})
option1.addEventListener('click',()=>{
    result=result+5;
    changeQues();
    
});
option2.addEventListener('click',changeQues);
option3.addEventListener('click',changeQues);

option2.addEventListener('click',changeQues);
option3.addEventListener('click',changeQues);
function hideOnEnd(){
    clearInterval(id);
    let c =document.getElementById('container');
    c.style.background=`orange`
    c.innerHTML=`<h1>Completed</h1><div id="enjoy">&#127881;</div><div id='score'>Score =>${result}</div>`;
    let num = Number(`${window.getComputedStyle(c).width}`)
    document.getElementById('enjoy').style.fontSize="18vh"
    document.getElementById('enjoy').style.textAlign='center'
    
}
