const {testServer} = require('../../../config.json'); 
const getLocalCommands = require('../../utils/getLocalCommands'); 
const getApplicationCommands = require('../../utils/getApplicationCommands'); 
const areCommandsDifferent = require('../../utils/areCommandsDifferent'); 

module.exports = async (client) => {
    try {
        const localCommands = getLocalCommands(); // получаем список локальных команд
        const applicationCommands = await getApplicationCommands(client, testServer); // получаем список команд приложения из Discord API

        for(const localCommand of localCommands) { // проходим по всем локальным командам
            const {name, description, options} = localCommand; // получаем название, описание и опции для текущей локальной команды

            const existingCommand = await applicationCommands.cache.find((cmd)=> cmd.name === name); // ищем уже существующую команду в списке команд приложения по ее названию

            if(existingCommand) { // если команда уже существует
                if(localCommand.deleted) { // и если локальная команда помечена как удаленная
                    await applicationCommands.deleted(existingCommand.id) // удаляем команду из списка команд приложения
                    console.log(`🗑️ Delete command ${name}`);
                    continue;
                }

                if(areCommandsDifferent(existingCommand, localCommand)) { // и если локальная и существующая команды отличаются
                    await applicationCommands.edit(existingCommand.id, 
                        {
                            description,
                            options
                        }); // редактируем существующую команду, обновляя ее описание и опции
                    console.log(`♻️ Edit command ${name}`)
                }
            } else { // если команда не существует
                if(localCommand.deleted){ // и если локальная команда помечена как удаленная
                    console.log(`➡️ Skipping registering command ${name} as it's set to delete`);
                    continue;
                }

                await applicationCommands.create( // создаем новую команду в списке команд приложения
                    {
                        name,
                        description,
                        options
                    }
                );
                
                console.log(`✅ Command ${name} was register`);
            }
        }

    } catch (error) { 
        console.log(`❌ There was ${error}`);
    }
}
