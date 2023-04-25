module.exports = async (client, guildID) => {
    let applicationCommands;

    if(guildID) { // проверяем, задан ли идентификатор сервера
        const guild = await client.guilds.fetch(guildID);// получаем объект сервера по его идентификатору
        applicationCommands = guild.commands;  // получаем список команд для указанного сервера
    } else {
        applicationCommands = await client.application.commands; // получаем список команд для глобального приложения
    }

    await applicationCommands.fetch(); // получаем список "slash" команд с помощью метода fetch()

    return applicationCommands;
}