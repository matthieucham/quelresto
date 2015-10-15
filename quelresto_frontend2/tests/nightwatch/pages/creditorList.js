module.exports = {

    url: function() {
        return this.api.launchUrl + 'creditors';
    },

    elements: {},

    commands: [
        {
            checkEmpty: function() {
                return this
                    .waitForElementPresent('@table', 1000)
                    .verify.urlEquals(this.url)
                    .waitForElementPresent('@firstLine', 1000)
                    .assert.cssClassPresent('@firstLine', 'no-data');
            },
            checkNotEmpty: function() {
                return this
                    .waitForElementPresent('@table', 1000)
                    .verify.urlEquals(this.url)
                    .waitForElementPresent('@firstLine', 1000)
                    .assert.cssClassNotPresent('@firstLine', 'no-data');
            },
            checkCreditor: function(uuid) {
                return this
                    .waitForElementPresent('@table', 1000)
                    .verify.urlEquals(this.url)
                    .assert.containsText('@table', uuid);
            }
        }
    ]
};