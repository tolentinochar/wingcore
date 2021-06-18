var fs = require('fs');
var os = require("os");

class FileUtil {
    static createDirectory(path) {
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path);
        }
    }
    static createFile(path, fileName, data = null) {
        this.createDirectory(path);
        var fullPath = path + '/' + fileName;
        fs.stat(fullPath, function (e, stat) {
            if (e == null) {
                //file exists
            }
            else if (e.code === 'ENOENT') {
                if (data == null) {
                    data = new Date().toDateTime() + ' Log Created' + os.EOL;
                }
                fs.writeFile(fullPath, data, 'utf8', function (e) {
                    if (e) {
                        throw e;
                    }
                });
            } else {
                throw e;
            }
        });
    }

    static write(path, fileName, data = null) {
        this.createFile(path, fileName);
        var fullPath = path + '/' + fileName;
        if (data != null) {
            data += os.EOL;
        }
        fs.appendFile(fullPath, data, 'utf8', function (e) {
            if (e) {
                throw e;
            }
        });
    }
}

module.exports = FileUtil;