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
        const args = sanitizedMessageContent.slice(commandPrefix.length).trim().split(/ +/);
        this._command = args.shift().toLowerCase();
        this._args = args;
    }

    get client() { return this._client; }
    get message() { return this._message; }
    get messageContent() { return this._messageContent; }
    get mentionContent() {return this._mentionContent; }
    get command() { return this._command; }
    get args() { return this._args; }
}

module.exports = Request;