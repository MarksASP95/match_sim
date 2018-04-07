function Country(os,ms,ds,gk,ad){
    ds = ds + ms/2;
    os = os + ms/2;

    ad = 1 - Math.random()*ad;
    this.gk = gk;
    this.ms = Math.round(ms*ad);
    this.ds = Math.round(ds*ad);
    this.os = Math.round(os*ad);
}

let countryList = ["Argentina","Australia","Belgium","Brazil","Colombia","Costa Rica","Croatia","Denmark","Egypt",
                   "England","France","Germany","Iceland","Iran","Japan","Korea Republic","Mexico","Morocco",
                   "Nigeria","Panama","Peru","Poland","Portugal","Russia","Saudi Arabia","Senegal","Serbia","Spain",
                   "Sweden","Switzerland","Tunisia","Uruguay"];

let argentina = new Country(88,81,80,80,0.2);
let australia = new Country(69,73,72,78,0.2);
let belgium = new Country(86,84,85,89,0.1);
let brazil = new Country(86,83,85,83,0.2);
let colombia = new Country(81,77,78,78,0.2);
let costarica = new Country(69,76,74,85,0.1);
let croatia = new Country(83,85,79,84,0.2);
let denmark = new Country(75,78,76,82,0.2);
let egypt = new Country(80,72,70,70,0.1);
let england = new Country(83,81,81,78,0.2);
let france = new Country(83,86,81,88,0.2);
let germany = new Country(86,85,86,92,0.2);
let iceland = new Country(73,75,70,67,0.2);
let iran = new Country(76,71,71,71,0.2);
let japan = new Country(83,78,76,74,0.2);
let korearepublic = new Country(84,78,72,74,0.2);
let mexico = new Country(79,79,76,77,0.2);
let morocco = new Country(79,78,75,75,0.2);
let nigeria = new Country(75,77,72,78,0.1);
let panama = new Country(66,69,69,68,0.3);
let peru = new Country(73,72,71,74,0.2);
let poland = new Country(82,75,79,83,0.2);
let portugal = new Country(85,82,80,83,0.1);
let russia = new Country(80,78,76,80,0.2);
let saudiarabia = new Country(73,73,72,70,0.2);
let senegal = new Country(82,79,79,74,0.1);
let serbia = new Country(75,81,81,75,0.1);
let spain = new Country(86,85,86,90,0.2);
let sweden = new Country(77,76,76,73,0.1);
let switzerland = new Country(75,77,78,82,0.2);
let tunisia = new Country(80,77,75,79,0.2);
let uruguay = new Country(86,76,79,81,0.1);

let optionTag = document.createElement("option");
let country1 = document.getElementById("country1");
let country2 = document.getElementById("country2");
for(let i = 0;i < countryList.length;i++){
    country1.appendChild(document.createElement("option"));
    country1.lastChild.innerHTML = countryList[i];
    country1.lastChild.value = countryList[i];
    country2.appendChild(document.createElement("option"));
    country2.lastChild.innerHTML = countryList[i];
    country2.lastChild.value = countryList[i];
}

var wins1 = wins2 = draws =  total1 = total2 = 0;

function simulate(team1, team2){

    var score = {
        team1:0,
        team2:0
    }

    let minute = 0;
    
    var randomNumber = Math.round(Math.random());

    var ball = randomNumber == 0 ? -1 : 1;

    var attTeam, defTeam;

    ballChange();

    function action(att, def){
        minute++;
        if(att + Math.random()*10 > def + + Math.random()*10){
            return true;
        }
        return false;
    }

    function ballChange(){
        
        if(ball == -1){
            attTeam = team1;
            defTeam = team2;
        }
        else{
            attTeam = team2; 
            defTeam = team1;
        }

    }

    function goal(){
        ball == -1 ? score.team1++ : score.team2++;
    }

    do{

        if(action(Math.random()*attTeam.ms, Math.random()*defTeam.ms)){
            if(action(Math.random()*attTeam.os*0.6, Math.random()*defTeam.ds)){
                if(action(Math.random()*attTeam.os*0.4, Math.random()*defTeam.gk)){
                    goal();
                    ballChange();
                    continue;
                }
            }
        }
        
        ball = ball*-1;
        ballChange();

    }while(minute<=90)
    
    if(score.team1 === score.team2){
        draws++;
    }
    else{ score.team1 > score.team2 ? wins1++: wins2++ }
    total1 += score.team1;
    total2 += score.team2;
}

document.getElementById("simulate").addEventListener("click", function(e){
    e.preventDefault();

    let team1 = document.getElementsByClassName("teams")[0].value;
    let team2 = document.getElementsByClassName("teams")[1].value;

    let input = new Promise(function(resolve,reject){
        if(team1 === "" || team2 === ""){
            reject();
        }
        else{
            document.getElementById("loading").style.opacity = 0;
            document.getElementById("loading").classList.remove("fade-in");
            document.getElementById("loading").style.opacity = 1;
            resolve();
        }
    });  

    input
    .then(()=>sim())
    .catch(()=>alert("Select a country"));
    
    function sim(){

        total1 = total2 = 0;

        let sims = 5;

        for(let i = 0; i<=sims;i++){
            simulate(eval(team1.toLowerCase().replace(" ","")),eval(team2.toLowerCase().replace(" ","")));
        }

        let scoreTeam1 = Math.round(total1/sims);
        let scoreTeam2 = Math.round(total2/sims);

        document.getElementById("loading").style.opacity = 0;
        document.getElementById("score").innerHTML = scoreTeam1 + " - " + scoreTeam2;
        if(scoreTeam1 == scoreTeam2){
            document.getElementById("winning-country").innerHTML = "Draw";
            document.getElementById("winner").innerHTML = "";
        }
        else{
            document.getElementById("winner").innerHTML = "Winner";
            document.getElementById("winning-country").innerHTML = (scoreTeam1 > scoreTeam2 ? team1 : team2);
        }
        document.getElementsByClassName("winner-container")[0].classList.add("fade-in");
    }
 
});
