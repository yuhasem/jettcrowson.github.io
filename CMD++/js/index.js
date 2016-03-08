$(document).ready(function(){
  respond("Welcome to CMD++");
  respond("Your goal here is to mine data.");
  checkForSave();
});
function checkForSave(){
  respond("Checking for save...");
//TODO: CHECK FOR SAVE
  respond("No save found. Starting new game...");
  newGame();
}
function newGame(){
  respond("Initializing database",500);
  respond("Firing up",1000);
  respond("Pinging servers",2000);
  respond("Configuring OS",3000);
  respond("Ready",3250);
  respond("Clearing",4000);
  clear();
}
function respond(text, delay){
    setTimeout(function(){
    $("#responses").append("<tr><td>> "+text+"</td></tr>");
}, delay);
  
}