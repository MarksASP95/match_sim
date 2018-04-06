function Country(gk,ms,ds,os,ad){
    ds = ds + ms/2;
    os = os + ms/2;

    ad = 1 - ad;
    this.gk = gk;
    this.ms = Math.round(ms*ad);
    this.ds = Math.round(ds*ad);
    this.os = Math.round(os*ad);
}

var germany = new Country(90,85,86,86,0.2);
var spain = new Country(73,72,70,76,0.2);

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
        if(att > def){
            //console.log(att + " vs " + def);
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
        //console.log("GOAL");
        ball == -1 ? score.team1++ : score.team2++;
    }

    do{

        if(action(Math.random()*attTeam.ms, Math.random()*defTeam.ms)){
            if(action(Math.random()*attTeam.os, Math.random()*defTeam.ds)){
                if(action(Math.random()*attTeam.os*0.6, Math.random()*defTeam.gk)){
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
    console.log(score);
}

let sims = 1000;
for(let i = 0; i<=sims;i++){
    simulate(germany,spain);
}
console.log("Team 1: " + wins1*100/sims + '%\nTeam 2: ' + wins2*100/sims + '%\nDraws: ' + draws*100/sims + '%');
console.log("Average score: Team 1: " + total1/sims + " Team2: " + total2/sims);
