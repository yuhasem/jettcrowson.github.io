/**
TODO List:
- Add different amounts of data depending on your upgrades
**/

//All game values and functions will be stored here.
var CMD = {
  //The currency variables
  data: 0,
  money: 0,
  increment: 1,
  autoIncrement: 0,
  //Creates a new line in the CMD
  respond: function(text) {
    //Add a new table row, used as a line in the CMD
    $("#responses").append("<tr class='response'><td class='response'>> " + text + "</td></tr>");
  },
  gameLoop: setInterval(function(){
    CMD.checkGoal();
    CMD.addData(CMD.autoIncrement);
}, 1000),
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
        //Check if command exists and is unlocked
        if (commandToRun === CMD.commandList[i] && CMD.commandUnlocked[i] === true) {
          CMD.commands[commandToRun]();
          //If the command DOES exist, but is not unlocked
        } else if (commandToRun === CMD.commandList[i] && CMD.commandUnlocked[i] === false) {
          CMD.respond("Command not found.");
        }

      }
    }

  },
  //Update the data count
  update: function() {
    $("#dataCount").html(CMD.data);
  },
  //Add data
  addData: function(amount) {
    CMD.data += amount;
    CMD.update();
  },
  goals:[[20],["autoMine"],[false]],
  checkGoal: function(){
    for(var w=0;w<CMD.goals[0].length;w++){
      if(CMD.data>=CMD.goals[0][w]&&CMD.goals[2][w]===false){
        CMD.commandUnlocked[CMD.commandList.indexOf(CMD.goals[1][w])]=true;
        CMD.goals[2][w]=true;
        CMD.respond("Command unlocked: "+CMD.goals[1][w]);
      }
    }
  },
  //LIST ALL COMMANDS HERE, OTHERWISE THEY WILL RETURN AS NOT EXISTING
  commandList: ["help", "mineData", "save", "autoMine"],
  //SET EACH FUNCTION TO WHETHER IT IS UNLOCKED
  commandUnlocked: [true, true, true, false],
  //Command object stores all game functions, not the actual engine functions
  commands: {
    help: function() {
      CMD.respond("########################################");
      CMD.respond("List of commands:");
      var availableCommands = [];
      for (var r = 0; r < CMD.commandList.length; r++) {
        if (CMD.commandUnlocked[r] === true) {
          availableCommands.push(CMD.commandList[r]);
        }
      }
      CMD.respond(availableCommands.join("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"));
      CMD.respond("########################################");
    },
    mineData: function() {
      CMD.respond("Data mined.");
      CMD.addData(CMD.increment);
    },
    autoMine: function(){
      CMD.autoIncrement=1;
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
