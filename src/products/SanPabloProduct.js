const cheerio = require('cheerio');

module.exports = class SanPabloProduct {
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
        if (this.$) {
            var el = cheerio.text(this.$('.item-prize')).trim();
            var match = el.match(/[-+]?[0-9]*\.?[0-9]+/g);
            if (match) {
                return parseFloat(match[0]);
            }
        }
        return 999999;

    }
}