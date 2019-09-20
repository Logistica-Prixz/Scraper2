const EventEmitter = require('events');

module.exports = class AbstractDoc extends EventEmitter {
    _content = "No content";
    _loadtime;
    _ean;
    constructor(ean) {
        super();
        this.setMaxListeners(1000);
        this._ean = ean;
        (async() => {
            this._content = await this.init();
            this.emit('ready', this._content);
        })();
        return this;
    }
    async init() {
        return new Promise(async(resolve, reject) => {
            // select http or https module, depending on reqested url
            const url = await this.docUrl;
            const lib = url.startsWith('https') ? require('https') : require('http');
            const request = lib.get(url, (response) => {
                if (response.statusCode < 200 || response.statusCode > 299) {
                    reject(new Error('Failed to load page, status code: ' + response.statusCode));
                }
                const body = [];
                response.on('data', (chunk) => body.push(chunk));
                this._content = body.join('');
                response.on('end', () => resolve(body.join('')));
            });
            request.on('error', (err) => reject(err))
        });
    }
    get content() {
        return this._content;
    }
    get price() {
        throw new Error("Abstract Method AbstractDoc.price() , implement a child class to use it");
        return null

    }
    get loadtime() {
        return this._loadtime;
    }
    get ean() {
        return this._ean;
    }
    get docUrl() {
        throw new Error("Abstract Method AbstractDoc.docUrl , implement a child class to use it");
        return null
    }
}