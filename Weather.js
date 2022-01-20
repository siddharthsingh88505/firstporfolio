//Function for fetching api
        function getData(value){
        fetch(' http://api.weatherapi.com/v1/current.json?q='+value+'&key=7543739a6fb342af993112945220401').then(
            res=>{
                if(res.ok){
                    return res.json();
                    console.log(res.ok)
                }
                else{
                    throw Error("Error Occured")
                }
            }
            ).then(
                value=>{
                    cityName.style.display="block";
        date.style.display="block";
        temp.style.display="block";
        text.style.display="block";
        wind.style.display="block";
        humidity.style.display="block"
        
                    cityName.innerHTML=`<i class="fas fa-map-marker-alt"></i>&nbsp;${value.location.name},${value.location.country}`;
                    date.innerHTML=`${value.location.localtime}`;
                    temp.innerHTML=`${value.current.temp_c}&#176;C`;
                    humidity.innerHTML=`Humidity: ${value.current.humidity}%`
                    wind.innerHTML=`Wind: ${value.current.wind_kph}km/h`;
                    text.innerHTML=`${value.current.condition.text}`;
                }
                ).catch(
                value=>{
                    if(navigator.onLine===true){
                    hideAll();
                    temp.style.display="block";
                    temp.innerHTML=`Try again`;
                    
                    }
                    else{
                        temp.style.display="block";
                        temp.innerText=`Network error`; 
                    }
                }
                )            
        }

        let inputName = document.getElementById('inputName');
        let temp = document.getElementById('temp');
        let cityName = document.getElementById('cityName');
        let date = document.getElementById('date');
        let humWind = document.getElementById('humWind');
        let humidity=document.getElementById('humidity');
        let wind=document.getElementById('wind')

        function hideAll(){
        cityName.style.display="none";
        date.style.display="none";
        temp.style.display="none";
        text.style.display="none";
        humidity.style.display="none";
        wind.style.display="none";
        }
        hideAll();
    
        inputName.addEventListener('keydown',(e)=>{
            if(e.key==="Enter" && inputName.value.trim()!=""){
        
                getData(inputName.value.trim());
                temp.innerHTML="Loading...";
                date.innerHTML="Loading...";
                cityName.innerHTML="Loading...";
                humidity.innerText="Loading...";
                wind.innerText="Loading...";
            }
        

        })