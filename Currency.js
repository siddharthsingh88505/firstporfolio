//Creating Asynchronous function to fetch the data from exchangerates 

let a= async function d(frm,to){
    let c = await fetch('http://api.exchangeratesapi.io/v1/latest?access_key=d1ce3887a88c8d702068974db8248127')
    return await c.json()
    }
     
    
    let amount,frm,to,output;
    function calculate(){
        amount=document.getElementById('amount').value;
        output=document.getElementById('output');
        frm=document.getElementById('fromCurrency').value;
        to=document.getElementById('toCurrency').value;
        output.style.zIndex="3";
        //Calling async function and displaying data to user
        a(frm,to).then(value=>{
            return value.rates}).then(data=>{
                if((data[to]/data[frm]).toString().length===1){
                    output.value=`${(amount*(data[to]/data[frm])).toFixed(2)}`;
                    console.log(data[to]);
                }
                else{
                output.value=`${amount*(data[to]/data[frm]).toFixed(2)}`;
                console.log(data[to]);
                }
            })
    }
    
    //Targeting button elements
    let convertBtn = document.getElementsByTagName('button')[0];
    convertBtn.addEventListener('click',()=>{
        //Checking user's browser is connected to internet or not
        if(navigator.onLine){
            if(document.getElementById('amount').value){
                document.getElementById('output').value="...";       
                calculate();
            }
            else{
                document.getElementById('error').innerHTML="&excl; Please provide Amount Value"
            }
        }
        else{
            document.getElementById('error').innerHTML='&excl; Please check your connection';
        }
    })
    //Adding eventlistener to amount box
    document.getElementById('amount').addEventListener('keyup',(e)=>{
        if(e.key==="Enter"){
            //Checking users internet connection
        if(navigator.onLine){
            if(document.getElementById('amount').value){
                document.getElementById('output').value="...";       
                calculate();
            }
            else{
                document.getElementById('error').innerHTML="&excl; Please provide Amount Value"
            }
            
        }
        else{
            document.getElementById('error').innerHTML="&excl; Please check your connection";
        }
    }
    })
    
    //Adding event listener to amount box for hiding error box
    document.getElementById('amount').addEventListener('keydown',()=>{
        document.getElementById('error').innerHTML=""
    })