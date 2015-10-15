module.exports = {

    url: function() {
        return this.api.launchUrl + 'missives';
    },

    elements: {},

    commands: [
        {
            checkLineType: function(text) {
                var client = this.api;
                var typeClasses = text === 'RUBIS_PAYMENT_GROUPED_REQUEST' ? 'typeRUBIS' : 'typeDIAMOND';

                client.pause(1500)
                    .elements('css selector', '.table tbody tr', function(result) {
                        result.value.map(function(v, k) {
                            client.elementIdElement(v.ELEMENT, 'css selector', '.fa-diamond', function(res) {
                                if (res.status === 0) {
                                    client.elementIdAttribute(res.value.ELEMENT, 'class', function(elm) {
                                        this.assert.ok(elm.value.indexOf(typeClasses) !== -1, 'Text '+ text +' checked !');
                                    });
                                }
                            });
                        });
                    });

                return this;
            },
            
            checkLineState: function(status) {
                var client = this.api;

                client.pause(1500)
                    .elements('css selector', '.table tbody tr', function(result) {
                        result.value.map(function(v, k) {
                            client.elementIdElement(v.ELEMENT, 'css selector', '.icon-state', function(elm) {
                                if (elm.status === 0) {
                                    client.elementIdAttribute(elm.value.ELEMENT, 'class', function(res) {
                                        this.assert.ok(res.value.indexOf(status.toLowerCase()) !== -1, 'Status '+ status +' checked !');
                                    });
                                }
                            });
                        });
                    });

                return this;
            }
        }
    ]
};