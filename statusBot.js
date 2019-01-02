const Discord = require("discord.js");
const client = new Discord.Client();
var statustring = "No signal";
var request = require('request');

var url = 'http://query.fakaheda.eu/82.208.17.109:27107.feed';


function update() {
  request(url, function(err, response, body) {
      if(err) {
          console.log(err);
          //return message.reply('Error getting Minecraft server status...');
      }
    //  body = JSON.parse(body);
	console.log(body);
      var status = 'Server offline';
      if(body["status"]=="Online") {
        if(body["players"]>=body["stots"]){
            client.user.setStatus('idle')
            .catch(console.error);
        }else{
            client.user.setStatus('online')
            .catch(console.error);
        }
		
        status = ' ' + body["players"] + ' / ' + body["slots"];
      } else {
        client.user.setStatus('dnd')
        //.then(console.log)
        .catch(console.error);

      }
      client.user.setActivity(status, { type: 'PLAYING' })
      .then(presence => console.log(status))
      .catch(console.error);
  });

}
client.on("ready", () => {
  console.log("Server Status Bot - I am ready!");
  client.setInterval(update,30000);
});

/*client.on("message", (message) => {
  if (message.content.startsWith("ping")) {
    message.channel.send("pong!");
    update();
  }
}
);*/

client.login(process.env.BOT_TOKEN);