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

        request(apiPath + "api/json", this.getHeaders(), function(error, response, body) {
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

    getPluginYmlOf(job, pluginName, callback) {
        // On récupère le chemin du YAML suivant la structure des plugins UTARIA ...
        const path = this.endpointUrl + "job/" + job + "/ws/" + pluginName + "/src/main/resources/plugin.yml";

        request(path, this.getHeaders(), function(error, response, body) {
            if (error || !response || response.statusCode !== 200) {
                // ... et sinon on test avec un format de plugin classique.
                const path2 = this.endpointUrl + "job/" + job + "/ws/src/main/resources/plugin.yml";

                request(path2, this.getHeaders(), function(error2, response2, body2) {
                    if (error2 || !response2 || response2.statusCode !== 200) {
                        callback("Cannot retrieve plugin Yml for plugin " + job + ":" + pluginName + "!", null);
                    } else {
                        callback(null, body2);
                    }
                });
            } else {
                callback(null, body);
            }
        });
    },

    generateEndpointUrl() {
        const protocol = (this.config.https) ? "https" : "http";
        return protocol + '://' + this.config.user + ':' + this.config.token + '@' + this.config.host + "/";
    },

    getHeaders() {
        const headers = [];

        headers[this.crumbField] = this.crumb;
        return { headers: headers };
    }

};

module.exports = Jenkins;