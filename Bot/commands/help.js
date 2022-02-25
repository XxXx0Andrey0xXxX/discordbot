const Discord = module.require("discord.js");
const fetch = require('node-fetch')
const fs = require("fs");

module.exports.run = async (client,message,args) => {

	if (!message.mentions.users.size) { // если написано !help - то мы пишем эмбэд
		const embed = new Discord.MessageEmbed()
			.setTitle(`Ну это типо тестовая команда`)
			.setFooter('You`r Botⓒ 2022')
		return message.channel.send(embed);

		return embed
	};
	message.channel.send(WastedList);
	return
};
module.exports.help = {
    name: "help"
};