/**
TODO List:
- Add different amounts of data depending on your upgrades
**/

//All game values and functions will be stored here.
var CMD = {
  //The currency variables
  data: 0,
  money: 0,
  //Creates a new line in the CMD
  respond: function(text) {
    //Add a new table row, used as a line in the CMD
    $("#responses").append("<tr class='response'><td class='response'>> " + text + "</td></tr>");
  },
  //Gets rid of all of the responses
  clear: function() {
    $("#responses").remove();
  },
  //When the user enters a command, this is run to check if they typed anything, and if they did, submit it to CMD.runCommand().
  command: function() {
    if ($("#input").val() != "") {
      //Submit the command
      CMD.runCommand($("#input").val());
      //Reset the imput field
      $("#input").val("");
    }
  },
  //Check if the command exists, and if it does, run it.
  runCommand: function(commandToRun) {

    //REMEMBER: ALWAYS ADD YOUR COMMANDS TO THE COMMANDLIST ARRAY AND THE COMMAND OBJECT
    if (CMD.commandList.indexOf(commandToRun) === -1) {
      CMD.respond("Command not found.");
    } else {
      for (var i = 0; i < CMD.commandList.length; i++) {
        //Check if command exists
        if (commandToRun === CMD.commandList[i]) {
          CMD.commands[commandToRun]();
        }

      }
    }

  },
  //LIST ALL COMMANDS HERE, OTHERWISE THEY WILL RETURN AS NOT EXISTING
  commandList: ["help", "mineData", "save"],
  //Command object stores all game functions, not the actual engine functions
  commands: {
    help: function() {
      CMD.respond("########################################");
      CMD.respond("List of commands:");
      CMD.respond(CMD.commandList.join("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"));
      CMD.respond("########################################");
    },
    mineData: function() {
      CMD.respond("Data mined.");
    },
    save: function() {
      CMD.respond("TODO add save function");
    }
  }
};
//Check if the Enter key was pressed
$(document).keypress(function(e) {
  if (e.which == 13) {
    CMD.command();
    $('#cmdWindow').scrollTop($('#cmdWindow')[0].scrollHeight);
  }
});
//Called when the user first enters the page. 
$(document).ready(function() {
  CMD.respond("Welcome to CMD++");
  CMD.respond("Your goal here is to mine data.");
  CMD.respond("Type 'help' to get started.");
});
