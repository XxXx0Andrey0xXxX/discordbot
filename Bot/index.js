const Discord = require('discord.js')
const fs = require('fs') // подключаем fs к файлу
const client = new Discord.Client()
const config = require('./config.json')
const fetch = require('node-fetch')
client.commands = new Discord.Collection() // создаём коллекцию для команд

fs.readdir('./commands', (err, files) => { // чтение файлов в папке commands
    if (err) console.log(err)

    let jsfile = files.filter(f => f.split('.').pop() === 'js') // файлы не имеющие расширение .js игнорируются
    if (jsfile.length <= 0) return console.log('Команды не найдены!') // если нет ни одного файла с расширением .js

    console.log(`Загружено ${jsfile.length} команд`)
    jsfile.forEach((f, i) => { // добавляем каждый файл в коллекцию команд
        let props = require(`./commands/${f}`)
        client.commands.set(props.help.name, props)
    })
})
client.on('message', message => {
    let prefix = config.prefix
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    let messageArray = message.content.split(' ') // разделение пробелами
    let command = messageArray[0] // команда после префикса
    let args = messageArray.slice(1) // аргументы после команды

    let command_file = client.commands.get(command.slice(prefix.length)) // получение команды из коллекции
    if (command_file) command_file.run(client, message, args, prefix)
})

client.on('ready', () =>{ 
    console.log(`Ссылка: https://discord.com/api/oauth2/authorize?client_id=945241947918975026&permissions=8&scope=bot`)
    console.log(`Привет! ${client.user.tag} запустился!`)
    client.user.setPresence({
        status: 'online',
        activity: {
            type: 'WATCHING',
            name: '*help',
        },
    });
})

client.login("OTQ1MjQxOTQ3OTE4OTc1MDI2.YhNTKg.NaCO0MxrNmPew8IG48Kda-M7GLM")