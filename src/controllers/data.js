const { MongoClient, ObjectId } = require('mongodb');
const { EventEmitter } = require('events');

class File extends EventEmitter {
    _id;
    _title;
    _author;
    _desc;
    _settings = {
        sanPablo: false,
        fragua: false,
        farmaListo: false,
        delAhorro: false,
        withDescription: false,
        getSugestedPrice: false
    };
    _url;
    _status;
    _asked;
    _generated;
    _downloaded;
    _conn
    constructor({ id, title, author, description, settings }, connectionSettings) {
        super();
        this._conn = connectionSettings;
        if (id) {
            this._id = id;
            this._collectData();
            return;
        }
        //Create File document in the database and start generate the file
        this._title = res.title;
        this._author = res.author;
        this._desc = res.desc;
        this._settings = res.settings;
        this._url = res.url;
        this._status = res.status;

    }
    async save() {
        var mongo = await MongoClient.connect(this._conn.mongo.url, { useNewUrlParser: true, useUnifiedTopology: true, retryWrites: false });
        var db = await mongo.db('prixz');
        var files = db.collection(this._conn.mongo.filesCollection);
        var that = this;
        files.insertOne({
            title: this._title,
            author: this._author,
            desc: this._desc,
            settings: this._settings,
            url: this._url,
            status: this._status
        }, async(err, res) => {
            if (err) {
                throw err;
                return;
            }
            that._id = res.ops[0]._id;

            this.emit("save", res);
        });
    }
    async _collectData() {
        var mongo = await MongoClient.connect(this._conn.mongo.url, { useNewUrlParser: true, useUnifiedTopology: true, retryWrites: false });
        var db = await mongo.db('prixz');
        var files = db.collection(this._conn.mongo.filesCollection);
        var that = this;
        files.findOne({ _id: ObjectId(this._id) }, function(err, res) {
            if (err) {
                that.emit("error", err);
                return;
            }
            if (!res) {
                that.emit("error", "No results");
                return;
            }
            console.log("File RES::", res);

            that._id = res._id;
            that._title = res.title;
            that._author = new User({ id: res.author }, that._conn);
            that._desc = res.desc;
            that._settings = res.settings;
            that._url = res.url;
            that._status = res.status;
            that._asked = res.asked;
            that._generated = res.generated;
            that._downloaded = res.downloaded;

            that.emit("load", res);
        });
    }
    getRawData() {
        return {};
    }
    get id() {
        return this._id;
    }
    get title() {
        return this._title;
    }
    get author() {
        return this._author;
    }
    get description() {
        return this._desc;
    }
    get url() {
        return this._url;
    }
    get status() {
        return this._status; //FileStatus
    }
    get asked() {
        return new Date(this._asked);
    }
    get generated() {
        return new Date(this._generated);
    }
    get downloaded() {
        return new Date(this._downloaded);
    }
}
class User extends EventEmitter {
    _id;
    _name;
    _lastname;
    _lastname2;
    _email;
    _permissions;
    _avatar;
    _created;
    _modified;
    _conn;
    constructor({ id, name, lastname, lastname2, email, permissions, avatar }, connectionSettings) {
        super();
        this._conn = connectionSettings;
        if (id) {
            this._id = id;
            this._collectData();
            return;
        }
        this._name = name;
        this._lastname = lastname;
        this._lastname2 = lastname2;
        this._email = email;
        this._permissions = permissions;
        this._avatar = avatar;
        this.save();

    }
    async save() {
        var mongo = await MongoClient.connect(this._conn.mongo.url, { useNewUrlParser: true, useUnifiedTopology: true, retryWrites: false });
        var db = await mongo.db('prixz');
        var files = db.collection(this._conn.mongo.usersCollection);
        var that = this;
        this._created = new Date();
        this._modified = new Date();
        files.insertOne({
            name: that._name,
            lastname: that._lastname,
            lastname2: that._lastname2,
            email: that._email,
            permissions: that._permissions,
            avatar: that._avatar,
            created: that._created,
            modified: that._modified
        }, async(err, res) => {
            if (err) {
                throw err;
                return;
            }
            that._id = res.ops[0]._id;

            that.emit("save", res);
        });
    }

    async _collectData() {
        console.log("Collecting Author data");

        var mongo = await MongoClient.connect(this._conn.mongo.url, { useNewUrlParser: true, useUnifiedTopology: true, retryWrites: false });
        var db = await mongo.db('prixz');
        var files = db.collection(this._conn.mongo.usersCollection);
        var that = this;
        files.findOne({ _id: ObjectId(this._id) }, function(err, res) {
            if (err) {
                that.emit("error", err);
                return;
            }
            if (!res) {
                that.emit("error", "No results");
                return;
            }
            console.log("User RES::", res);

            that._name = res.name;
            that._lastname = res.lastname;
            that._lastname2 = res.lastname2;
            that._email = res.email;
            that._permissions = res.permissions;
            that._avatar = res.avatar;
            that._created = res.created;
            that._modified = res.modified;

            that.emit("load", res);
        });
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    get lastname() {
        return this._lastname;
    }
    get lastname2() {
        return this._lastname2;
    }
    get email() {
        return this._email;
    }
    get permissions() {
        return this._permissions;
    }
    get avatar() {
        return this._avatar;
    }
    get created() {
        return this._created;
    }
    get modified() {
        return this._modified;
    }

}
class Query {
    constructor(settings) {
        this._settings = settings;
    }
    async createUser({ name, lastname, lastname2, email, permissions, avatar }) {
        var that = this;
        return new Promise(async(resolve, reject) => {
            var user = new User({ name, lastname, lastname2, email, permissions, avatar }, that._settings);
            user.on('save', res => {
                console.log("ID:::", user.id, user.name, res.ops);

                resolve(user);
            });
        });

    }
    async getUser({ id }) {
        var that = this;
        return new Promise(async(resolve, reject) => {
            var file = new User({ id: id }, that._settings);
            file.on('load', res => resolve(file));
            file.on('error', err => reject(err));
        });
    }
    getUsers({ authorId, createdBetween, generatedBetween, downloadedBetween }) {
        console.log("Query::getUsers");
    }
    async getFile({ id }) {
        var that = this;
        return new Promise((resolve, reject) => {
            var file = new File({ id }, that._settings);
            file.on('load', res => resolve(file));
            file.on('error', err => reject(err));
        });
    }
    getFiles({ authorId, createdBetween, generatedBetween, downloadedBetween }) {
        console.log("Query::getFiles");
    }
}
exports.File = File;
exports.Query = Query;
exports.User = User;