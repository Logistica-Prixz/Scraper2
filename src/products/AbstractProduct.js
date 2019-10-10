const cheerio = require('cheerio');
module.exports = class AbstractProduct {
    _cheerio = cheerio;
    _raw;
    constructor(raw) {
        this._raw = raw;
        if (raw) {
            this.$ = cheerio.load(raw);
        }
    }
    get html() {
        return this.$.html();
    }
    get price() {
        return 999999;

    }
}