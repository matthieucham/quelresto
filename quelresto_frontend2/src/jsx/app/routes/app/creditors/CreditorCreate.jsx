var React        = require('react/addons'),
    Navigation   = require('react-router').Navigation,
    notify       = require('sepamail-common').notify,

    ButtonAction = require('sepamail-common').ButtonAction,
    AppUrls      = require('@appUrls'),
    creditors    = require('@creditors'),

    bankRegex    = require('webuibusinessutils/src/technical/regexpCollection.js').banking,
    regIban      = new RegExp(bankRegex.basic.IBAN),

    CreditorForm = require('./CreditorForm.jsx'),
    Page;

Page = React.createClass({
    mixins: [Navigation],

    _backToCreditorList: function () {
        this.transitionTo(AppUrls.CREDITORS.name);
    },

    create: function (creditorState) {
        var errorQxban = false,
            rubisOffer = true,
            defaultAccount,
            creditor = $.extend(true, {}, creditorState);

        creditor.offerList.map(function(offer) {
            if (offer.active) {
                creditor.creditorOffers.push({ offer: { type: offer.type } });
            }

            if (offer.type === 'RUBIS' && !offer.active) {
                creditor.company.accounts = [];
                rubisOffer = false;
            }
        });
        creditor.offerList && delete creditor.offerList;

        creditor.company.accounts.map(function (account) {
            account.defaultAccount && (defaultAccount = account);

            errorQxban || (errorQxban = !regIban.test(account.iban));

            return account;
        });

        if (creditor.company.accounts.length > 0 && defaultAccount || !rubisOffer) {
            if (!errorQxban) {
                creditor.name && (creditor.company.name = creditor.name);
                creditors.create(creditor).errManThen(this._backToCreditorList);
            }
            else {
                notify.error('creditorCreate.notifyAccountQxban');
            }
        }
        else {
            notify.error('creditorCreate.notifyAccountDefault');
        }
    },

    render: function () {
        return <CreditorForm create actionButtons={[<ButtonAction id="btn-submit" onClickWithState={this.create} entity='btnCreate' glyphicon='ok' />]}/>;
    }
});

module.exports = Page;
