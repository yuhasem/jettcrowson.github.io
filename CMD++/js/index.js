/**
TODO List:
- See the README
**/
//All game values and functions will be stored here.
var CMD = {
  //The currency variables
  money: 0,
  increment: 1,
  autoIncrement: 0,
  historyBufferEnabled: true,
  historyBuffer: [],
  historyBufferCurrentIdx: -1,
  historyLastDirection: null,
  unit: "byte",
  dataShow: 0,
  b: 1023,
  //This will help us keep track of the time between ticks
  lastTick: Date.now(),
  //Creates a new line in the CMD
  respond: function(text) {
    //Add a new table row, used as a line in the CMD
    $("#responses").append("<tr class='response'><td class='response'>> " +
      text + "</td></tr>");
  },
  gameLoop: setInterval(function() {
	var newTick = Date.now();
	//deltaSeconds is how much time has passed since we were last in this function
	var deltaSeconds = (newTick - CMD.lastTick) / 1000;
    CMD.addData(CMD.autoIncrement * deltaSeconds);
	//Reset the last tick time
	CMD.lastTick = newTick;
  }, 100),
  //When the user enters a command, this is run to check if they typed anything, and if they did, submit it to CMD.runCommand().
  command: function() {
    if ($("#input").val() !== "") {
      //Submit the command
      var command = $("#input").val();
      CMD.runCommand(command);
      // Add command to history
      if (CMD.historyBufferEnabled) {
        CMD.historyBuffer.unshift(command);
        if (CMD.historyBuffer.length > 10) { // Ensure we have a circular history
          CMD.historyBuffer.pop();
        }
      }
      //Reset the imput field
      $("#input").val("");
    }
  },
  //Check if the command exists, and if it does, run it.
  runCommand: function(commandToRun) {
    //REMEMBER: ALWAYS ADD YOUR COMMANDS TO THE COMMANDLIST ARRAY AND THE COMMAND OBJECT
    //Break away args
    if (commandToRun.indexOf(" ") !== -1 && commandToRun[commandToRun.indexOf(
      " ") + 1] === undefined) {
      CMD.respond("Command not found.");
      console.log("Command not found.");
    } else {
      //Seperate the command and the argument
      var commandAndArgs = commandToRun.split(" ");
      //Check if it exists
      if (CMD.commandList.indexOf(commandAndArgs[0]) === -1) {
        CMD.respond("Command not found.");
      } else {
        console.log(commandAndArgs);
        for (var i = 0; i < CMD.commandList.length; i++) {
          //Check if command exists and is unlocked
          if (commandAndArgs[0] === CMD.commandList[i] && CMD.commandUnlocked[i] ===
            true) {
            CMD.commands[commandAndArgs[0]](commandAndArgs[1]);
            //If the command DOES exist, but is not unlocked
          } else if (commandAndArgs[0] === CMD.commandList[i] && CMD.commandUnlocked[
            i] === false) {
            CMD.respond("Command not found.");
          }
        }
      }
    }
  },
  //Update the data count
  update: function() {
    $("#dataCount").html(CMD.formatBytes(CMD.b));
    $("#moneyCount").html("$" + CMD.money);
  },
  //Convert bytes->->kb->mb->gb->etc
  formatBytes: function(bytes,decimals) {
   if(bytes == 0) return '0 Byte';
   var k = 1024;
   var dm = decimals + 1 || 3;
   var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
   var i = Math.floor(Math.log(bytes) / Math.log(k));
   return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];

  },
  //Add data
  addData: function(amount) {
    CMD.b += amount;
    CMD.update();
  },
  //Add money
  addMoney: function(amount) {
    CMD.money += amount;
    CMD.update();
  },
  //LIST ALL COMMANDS HERE, OTHERWISE THEY WILL RETURN AS NOT EXISTING
  commandList: ["help", "mineData", "save", "autoMine", "sellData", "buyData", "buyCommand"],
  //SET EACH FUNCTION TO WHETHER IT IS UNLOCKED
  commandUnlocked: [true, true, true, false, false, false, true],
  //Command object stores all game functions, not the actual engine functions
  commands: {
    help: function(toHelp) {
      //Check if help was passed with an argument or not. If it was, do the command specific help, otherwise do the command list generic help.
      if(toHelp!==undefined){
        switch(toHelp){
          case "help":
            CMD.respond(toHelp+": Gives list of commands or specific instructions for commands.");
            CMD.respond("To use: help, help [command]");
          break;
          case "mineData":
            CMD.respond(toHelp+": Increments data by your increment amount. The default is 1 byte.");
            CMD.respond("To use: mineData");
          break;
          case "save":
            CMD.respond(toHelp+": Saves files to your browser so you can load the game.");
            CMD.respond("To use: save");
          break;
          case "autoMine":
            CMD.respond(toHelp+": Every second, increments your data by the auto increment amount. Default is 1 byte per second.");
            CMD.respond("To use: autoMine");
          break;
          case "sellData":
            CMD.respond(toHelp+": Converts data to money. The conversion is 1 byte for $1, but the data deteriorates during transfer.");
            CMD.respond("To use: sellData [amount]");
          break;
          case "buyData":
            CMD.respond(toHelp+": Converts money to data. The conversion is 1 byte for $2.");
            CMD.respond("To use: buyData [amount]");
          break;
          case "buyCommand":
            var listOfAvailable = [];
            CMD.respond(toHelp+": Purchases and unlocks a command.");
            for(var b=0; b<CMD.commands.goals[0].length;b++){
              if(CMD.commands.goals[2][b]===false){
                listOfAvailable.push(CMD.commands.goals[0][b] + ": "+(CMD.formatBytes(CMD.commands.goals[1][b])));
              }
            }
            CMD.respond("Available commands: "+listOfAvailable.join(
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"));
            CMD.respond("To use: buyCommand [command]");
          break;
          default:
            CMD.respond("Command not found or no help is available. Type 'help' with no arguments to see a list of commands.");
        }
      }else{
      CMD.respond("########################################");
      CMD.respond("List of commands:");
      var availableCommands = [];
      //Only view commands that are available under the CMD.commandUnlocked array
      for (var r = 0; r < CMD.commandList.length; r++) {
        if (CMD.commandUnlocked[r] === true) {
          availableCommands.push(CMD.commandList[r]);
        }
      }
      CMD.respond(availableCommands.join(
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"));
      CMD.respond(" ");
      CMD.respond("For specific command help type, 'help [command]'");
      CMD.respond("########################################");
    }
    },
      //list commands to buy in corresponding spots of the three arrays
    goals: [
    ["autoMine", "buyData", "sellData"],
    [20, 150, 250],
    [false, false, false]],

    buyCommand: function(toBuy) {
    if(toBuy!==undefined){
      //Make sure that the command exists
      if(CMD.commands.goals[0].indexOf(toBuy)!==-1){
        //Make sure it hasn't been unlocked already
        if(CMD.commands.goals[2][CMD.commands.goals[0].indexOf(toBuy)]!==true){
          //Make sure we have enough byes to buy its
          if (CMD.commands.goals[1][CMD.commands.goals[0].indexOf(toBuy)] <= CMD.b){
            //Unlock the command under the CMD.commandUnlocked array
            CMD.commandUnlocked[CMD.commandList.indexOf(toBuy)]=true;
            //Unlock the command so you can't buy it multiple times
            CMD.commands.goals[2][CMD.commands.goals[0].indexOf(toBuy)]=true;
            //Spend data on unlocking this command
            CMD.b-=CMD.commands.goals[1][CMD.commands.goals[0].indexOf(toBuy)];
            CMD.respond("Command unlocked: "+toBuy);
          } else {
            CMD.respond("Not enough data to purchase command '" + toBuy + "'.");
          }
        }else{
          CMD.respond("Command already unlocked.");
        }
      }else{
        CMD.respond("Command not found for purchase.");
      }
    }else{
      CMD.respond("Please enter a command to buy, or type, 'help buyCommand' to see available commands.");
    }
  },
    //Amount mined is determined by the CMD.increment variable. Default is 1
    mineData: function() {
      CMD.respond("Data mined.");
      CMD.addData(CMD.increment);
    },
    //Set CMD.autoIncrement to the amount needed
    autoMine: function() {
      CMD.autoIncrement = 1;
      CMD.respond("Automatic mining begining at a rate of "+CMD.autoIncrement+" byte per second.");
    },
    //Buy data with money. Data cost $2 per 1 data
    buyData: function(amountToBuy) {
      //For some reason the amount to buy was turning into a string, so I added Number() to convert it back
      Number(amountToBuy);
      if (amountToBuy !== undefined) {
        //1 byte cost $2
        var cost = amountToBuy * 2;
        if (CMD.money >= cost && typeof amountToBuy !== "number") {
          CMD.money -= cost;
          CMD.b += Number(amountToBuy);
          CMD.respond("" + amountToBuy + " data bought with $" + cost + ".");
        } else {
          CMD.respond("You do not have enough money.");
        }
      } else {
        CMD.respond("Argument needed. Try: " + "buyData [amount]");
      }
    },
    //Sell data. Data is 1:$1 with money but deteriorates randomly (see var loss below)
    sellData: function(amount) {
      if (amount !== undefined) {
        Number(amount);
        //You must sell at least 100, and you must have enough to sell
        if (CMD.b >= amount && CMD.b >= 100 && typeof amount !== "number") {
          //Here is where we deteriorate the data. Too much? 
          var loss = Math.floor(Math.random() * 15 + 10);
          console.log(loss);
          //Apply the loss to the total money received
          var transfer = Math.round(amount * (1 - loss / 100));
          CMD.money += transfer;
          CMD.b = CMD.b - amount;
          //No idea what data integrity is but it sounded right.
          CMD.respond(loss + "% data integrity lost in transfer. Data sold: " +
            amount + ". Money gained: $" + transfer + ".");
        } else {
          CMD.respond(
            "You must sell at least 100 data. Please make sure you have 100 data."
          );
        }
      } else {
        CMD.respond("Argument needed. Try: " + "sellData [amount]");
      }
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
    CMD.historyBufferCurrentIdx = -1; // Reset history index
    $('#cmdWindow').scrollTop($('#cmdWindow')[0].scrollHeight);
  }
});
//Make the console act more like a real one by adding the arrow key up goes to the last command.
$('#input').keyup(function(e) {
    if (CMD.historyBufferEnabled && (e.which == 38 || e.which == 40)) { // Handling command history
      var iCurrentBufferSize = CMD.historyBuffer.length;
      var sSelectedCommand = '';
      if (e.which == 38) { // up = previous cmd in history
        CMD.historyBufferCurrentIdx++;
        if (CMD.historyBufferCurrentIdx > iCurrentBufferSize) CMD.historyBufferCurrentIdx =
          0;
        sSelectedCommand = CMD.historyBuffer[CMD.historyBufferCurrentIdx];
        CMD.historyLastDirection = 'up';
      }
      if (e.which == 40) { // down = next cmd in history
        CMD.historyBufferCurrentIdx--;
        if (CMD.historyBufferCurrentIdx < 0) {
          CMD.historyBufferCurrentIdx = -1; // Should empty the prompt
          sSelectedCommand = '';
        } else {
          sSelectedCommand = CMD.historyBuffer[CMD.historyBufferCurrentIdx];
        }
        CMD.historyLastDirection = 'down';
      }
      $('#input').val(sSelectedCommand);
    }
  })
  //Called when the user first enters the page. 
$(document).ready(function() {
  CMD.respond("Welcome to CMD++");
  CMD.respond("Your goal here is to mine data.");
  CMD.respond("Type 'help' to get started.");
});
