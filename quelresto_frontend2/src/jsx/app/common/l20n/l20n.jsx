var intlData = require('../../../../js/common/locales/fr-FR/intlData');

var Messages = require('sepamail-common').Messages(intlData);
var Entity = require('sepamail-common').Entity(Messages.locales);

window.Entity = Entity;
window.Messages = Messages;
