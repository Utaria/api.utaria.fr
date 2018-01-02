const request = require('request');

function Jenkins(config) {
    this.config = {
        jenkins: {
            https: false,
            host: "localhost",
            user: "root",
            token: ""
        }
    };

    this.config = config;
    this.endpointUrl = this.generateEndpointUrl();
    this.crumbField = null;
    this.crumb = null;

    this.getCrumb();
}

Jenkins.prototype = {

    getCrumb: function() {
        const self = this;

        request(this.endpointUrl + "crumbIssuer/api/json", function(error, response, body) {
            if (error || !response || response.statusCode !== 200)
                throw new Error("Impossible de récupérer la clé de sécurité Jenkins !");

            const data = JSON.parse(body);
            self.crumbField = data.crumbRequestField;
            self.crumb = data.crumb;
        });
    },

    getLastArtifactPathOf(job, module, callback) {
        const apiPath = this.endpointUrl + "job/" + job + "/" + module + "/lastCompletedBuild/";
        const headers = [];

        headers[this.crumbField] = this.crumb;

        request(apiPath + "api/json", { headers: headers }, function(error, response, body) {
            if (error || !response || response.statusCode !== 200) {
                callback("Cannot retrieve informations about Jenkins module " + job + "/" + module + "!", null);
            } else {
                const data = JSON.parse(body);

                if (data.artifacts == null || data.artifacts.length === 0) {
                    callback("Last artifact of module " + job + "/" + module + " cannot be retrieved!", null);
                } else {
                    const artifact = data.artifacts[0];

                    callback(null, apiPath + "artifact/" + artifact.relativePath);
                }
            }
        });
    },

    generateEndpointUrl() {
        const protocol = (this.config.https) ? "https" : "http";
        return protocol + '://' + this.config.user + ':' + this.config.token + '@' + this.config.host + "/";
    }

};

module.exports = Jenkins;