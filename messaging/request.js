const regexComma = ''.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
const regexSpace = ''.match(/(?:[^\s"]+|"[^"]*")+/g);

class Request {
    setRequest(client, message, commandPrefix) {
        this._client = client;
        this._message = message;
        const sanitizedMessageContent = this._message.content.sanitize();
        this._messageContent = sanitizedMessageContent;
        this._mentionContent = sanitizedMessageContent
            .replace('?', '')
            .replace('!', '')
            .replace(',', '');
        //split args using space, respecting double quotes
        var args = sanitizedMessageContent.slice(commandPrefix.length).trim().match(/(?:[^\s"]+|"[^"]*")+/g);
        this._command = args.shift().toLowerCase();

        //remove enclosing double quotes from args
        if (args != null && args.find(x => x.indexOf("\"") > -1) != null) {
            for (var i = 0; i < args.length; i++) {
                var f = args[i].slice(0, 1);
                var l = args[i].slice(-1);
                if (f == "\"" && l == "\"") {
                    args[i] = args[i].slice(1, -1);
                }
            }
        }

        this._args = args;
    }

    get client() { return this._client; }
    get message() { return this._message; }
    get messageContent() { return this._messageContent; }
    get mentionContent() { return this._mentionContent; }
    get command() { return this._command; }
    get args() { return this._args; }
}

module.exports = Request;