const fs = require('../utils/fileUtil.js');

/*
TODO
change .gitignore, add temp folder
*/

class CoreInit {
    static initialize() {
        var path = '../temp';
        var folder = '';
        var fullPath = '';
        var fileName = '';
        var data = null;
        var obj = {};
        
        //temp directory
        fs.createDirectory(path);

        //log
        folder = '/logs';
        fullPath = path + folder;
        fs.createDirectory(fullPath);
        fileName = '{0}_logs.txt';
        fileName = fileName.split('{0}').join(new Date().toDate());
        fs.createFile(fullPath, fileName);

        //dump
        folder = '/dump';
        fullPath = path + folder;
        fs.createDirectory(fullPath);
        //reaction json
        fileName = 'reactions.json';
        obj = {
            reactions: []
        };
        data = JSON.stringify(obj);
        fs.createFile(fullPath, fileName, data);
    }
}

module.exports = CoreInit;