const Discord = require("discord.js");
const client = new Discord.Client();
var statustring = "No signal";
var request = require('request');
var servername = 'ForFriends | TTT';
var url = 'http://query.fakaheda.eu/82.208.17.109:27107.feed';


function update() {
  request(url, function(err, response, body) {
      if(err) {
          console.log(err);
          //return message.reply('Error getting Minecraft server status...');
      }
	  body = JSON.parse(body);

      var status = 'Žádné informace';
	   
      if(body["status"]=="Online") {
		status = ' ' + body["players"] + ' / ' + body["slots"];
        if(body["players"]>=body["stots"]){
            client.user.setStatus('idle')
            .catch(console.error);
        }else{
            client.user.setStatus('online')
            .catch(console.error);
        }
	  client.user.setActivity(status, { type: 'PLAYING' })
       .catch(console.error);
	   
	  } else if((body["status"]=="Offline")||(body["status"]=="Pause")) {
		  status = 'Server Offline';
		  client.user.setActivity(status, { type: null })
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
  client.setInterval(update,3000);
});

/*client.on("message", (message) => {
  if (message.content.startsWith("ping")) {
    message.channel.send("pong!");
    update();
  }
}
);*/

client.login(process.env.BOT_TOKEN);