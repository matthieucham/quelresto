module.exports = {
  login : function(client) {
    client.waitForElementVisible('.modal-dialog', 2000).elements('css selector', '.modal-dialog input, .modal-dialog button',
        function(result) {
          client.elementIdValue(result.value[0].ELEMENT, 'sepamail');
          client.elementIdValue(result.value[1].ELEMENT, 'lyra2015');
          client.elementIdClick(result.value[2].ELEMENT);
        }).waitForElementNotVisible('.modal-dialog', 5000);

  },

  checkAuthCookie : function(client) {
    client.url(client.launch_url).deleteCookies(function() {
      this.login(client);

      client.pause(2000).getCookie('authToken', function(result) {
        client.assert.notEqual(result, null);
        client.assert.equal(result.name, 'authToken');
        client.assert.notEqual(result.value, null);
      });
    }.bind(this));
  },

  getUUID : function() {
    var ts = String(new Date().getTime() + Math.floor((Math.random() * 100) + 1)), i = 0, uuid = '';

    for (i = 0; i < ts.length; i += 2) {
      uuid += Number(ts.substr(i, 2)).toString(36);
    }
    return uuid;
  },

  before : function(cb) {
    cb();
  },

  beforeEach : function(browser, cb) {
    cb();
  },

  after : function(cb) {
    cb();
  },

  afterEach : function(browser, cb) {
    cb();
  },

  reporter : function(results, cb) {
    cb();
  }
};
