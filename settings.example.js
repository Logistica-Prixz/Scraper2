module.exports = () => {
    return {
        mongo: {
            //For more information about connection string in mongo go to https://docs.mongodb.com/manual/reference/connection-string/
            url: 'mongodb://<user>:<password>@<url>:<port>,<replica_url>:<replica_port>/<database>?<options>'
        }
    };
};