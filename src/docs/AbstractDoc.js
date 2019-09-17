const puppeteer = require('puppeteer');
const EventEmitter = require('events');

//const SanPabloProduct = require('../products/SanPabloProduct');

module.exports = class AbstractDoc extends EventEmitter {
    _content;
    _loadtime;
    _ean;
    constructor(ean) {
        super();
        this.setMaxListeners(1000);
        this._ean = ean;
        (async() => {
            await this.init();
            this.emit('ready', this._content);
        })();
        return this;
    }
    async init() {
        var browser = await puppeteer.launch({ headless: true });
        this.page = await browser.newPage();
        var time1 = (new Date()).getTime();
        await this.page.goto(await this.docUrl, { waitUntil: 'networkidle2' });
        var time2 = (new Date()).getTime();
        this._content = await this.page.content();
        this._loadtime = (time2 - time1) / 1000;
        console.log("-[ Load time: ", this._loadtime, "]-");
        await browser.close();
        return this._content;
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