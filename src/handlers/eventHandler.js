const path = require('path');
const getAllFiles = require('../utils/getFile');

module.exports = (client) => {
    const eventFolders = getAllFiles(path.join(__dirname, '..', 'events'), true); // массив папок из директории events

    for (const eventFolder of eventFolders) { // перебор папок из массива директорий  
        const eventFiles = getAllFiles(eventFolder); // получение массива файлов из директории 
        eventFiles.sort((a,b) => a > b); // сортировка файлов по алфавиту

        const eventName = eventFolder.split('\\').pop(); // массив имен файлов 

        /*асинхронная функция, которая вызывается, когда клиент получает указанное событие. 
        Она принимает один аргумент arg, который может быть любым объектом*/
        client.on(eventName, async(arg) => {
            for (const eventFile of eventFiles) {
                const eventFunction = require(eventFile); // функция, которая импортируется из файла обработчика события
                await eventFunction(client, arg); // вызов функции обработчика события, которая принимает клиента и аргумент, связанный с событием
            }
        });
    }
};