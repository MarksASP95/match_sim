function Country(gk,ms,ds,os,ad){
    ds = ds + ms/2;
    os = os + ms/2;

    ad = 1 - ad;
    this.gk = gk;
    this.ms = Math.round(ms*ad);
    this.ds = Math.round(ds*ad);
    this.os = Math.round(os*ad);
}

var germany = new Country(90,86,87,87,0.2);
var spain = new Country(88,86,87,86,0.2);

console.log(germany);
console.log(spain);

var randomNumber = Math.round(Math.random());
var ball = randomNumber == 0 ? -1 : 1;

var score = {
    team1:0,
    team2:0
}

function simulate(team1, team2, ball, minute){
    var attTeam, defTeam;
    if(ball == -1){
        attTeam = team1;
        defTeam = team2;
    }else{attTeam = team2; defTeam = team1}

    function action(att, def){
        return new Promise(function(resolve,reject){
            if(att > def){
                resolve();
            }
        });
    }

    function goal(){
        ball == -1 ? score.team1++ : score.team2++;
    }

    action(Math.random()*attTeam.ms, Math.random()*defTeam.ms)
    .then(action(Math.random()*attTeam.os, Math.random()*defTeam.ds))
    .then(action(Math.random()*attTeam.os*0.6, Math.random()*defTeam.gk))
    .then(goal());

    if(minute == 90){
        simulate(team1,team2,ball*-1,minute++);
    }
    
}