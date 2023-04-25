const fs = require('fs');
const path = require('path');

module.exports = (directory, folderOnly = false) => {
    let fileNames = []; // Создаем пустой массив для имен файлов

    const files = fs.readdirSync(directory, { withFileTypes: true}); // Получаем список файлов в директории

    for (const file of files) { // Итерируемся по списку файлов
        const filePath = path.join(directory, file.name); // Получаем полный путь к файлу

        if(folderOnly) { // Если задан параметр 'folderOnly', добавляем только директории в список файлов
            if(file.isDirectory()) { 
                fileNames.push(filePath)
            }
        } else { // Иначе добавляем все файлы в список
            if(file.isFile()) {
                fileNames.push(filePath)
            }
        }
    }

    return fileNames; // Возвращаем массив имен файлов
};