/**
TODO List:
- 
**/
//All game values and functions will be stored here.
var CMD = {
  //The currency variables
  "data": 0,
  "money": 0,
  //Creates a new line in the CMD
  "respond": function(text) {
    //Add a new table row, used as a line in the CMD
    $("#responses").append("<tr class='response'><td class='response'>> " + text + "</td></tr>");
  },
  //Gets rid of all of the responses
  "clear": function() {
    $("#responses").remove();
  },
  //When the user enters a command, this is run to check if they typed anything, and if they did, submit it to CMD.runCommand().
  "command": function() {
    if ($("#input").val() != "") {
      //Submit the command
      CMD.runCommand($("#input").val());
      $("#input").val("");
    }
  },
  //Check if the command exists, and if it does, run it.
  "runCommand": function(commandToRun) {
    CMD.respond(commandToRun);
  }
};
//Check if the Enter key was pressed
$(document).keypress(function(e) {
  if (e.which == 13) {
    CMD.command();
  }
});
//Called when the user first enters the page. 
$(document).ready(function() {
  CMD.respond("Welcome to CMD++");
  CMD.respond("Your goal here is to mine data.");
});