const Discord = require("discord.js");
const client = new Discord.Client();
var statustring = "No signal";
var request = require('request');
var servername = '[CS:GO]ForFriends|TTT';
var url = 'http://query.fakaheda.eu/82.208.17.109:27107.feed';
var stav = 0;



function update() {
  request(url, function(err, response, body) {
      if(err) {
          console.log(err);
          //return message.reply('Error getting Minecraft server status...');
      }
	  body = JSON.parse(body);

      var status = 'Žádné informace';
	   
      if(body["status"]=="Online") {
		if(body["players"]>=body["stots"]){
            client.user.setStatus('idle')
            .catch(console.error);
        }else{
            client.user.setStatus('online')
            .catch(console.error);
        }
		if (stav=2) {
			status = ' ' + body["players"] + ' / ' + body["slots"];
			stav=0;
		} else {
			status = ' ' + body["map"];
			stav=stav+1;
		}

		client.user.setActivity(status , { type: "PLAYING"})
         .catch(console.error);
	   
	  } else if((body["status"]=="Offline")||(body["status"]=="Pause")) {
		  status = 'Server Offline';
		  client.user.setActivity(status)
           .catch(console.error);
	      client.user.setStatus('dnd')
           .catch(console.error);
		   
	  } else {
		  client.user.setActivity(status)
           .catch(console.error);
	      client.user.setStatus('dnd')
           .catch(console.error);
	  }
		
       
  });

}
client.on("ready", () => {
  console.log("Server Status Bot - I am ready!");
  client.setInterval(update,6000);
});

/*client.on("message", (message) => {
  if (message.content.startsWith("ping")) {
    message.channel.send("pong!");
    update();
  }
}
);*/

client.login(process.env.BOT_TOKEN);