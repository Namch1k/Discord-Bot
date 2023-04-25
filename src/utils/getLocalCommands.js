const path = require('path');
const getAllFile = require('./getFile');

module.exports = (exceptions = []) => {
    let localCommands = []; // массив локальных команд 

    const commandCategories = getAllFile(path.join(__dirname, '..', 'commands'), true); // массив путей к категориям команд 

    for (const commandCategory of commandCategories) { // перебор категорий из массива путей
        const commandFiles = getAllFile(commandCategory); // массив файлов из категорий 

        for(const commandFile of commandFiles) { // получение файла из массива файлов
            const commandObject = require (commandFile); // подключение модуля команды, которая передает объект

            /*есть ли свойство name содержится в exceptions, то команда пропускается, 
            и управление передается на следующую итерацию цикла с помощью оператора continue.*/
            if(exceptions.includes(commandObject.name)) {  
                continue;
            }
            
            localCommands.push(commandObject) //добавляем команду в массив команд 
        }
    }
    return localCommands;
}