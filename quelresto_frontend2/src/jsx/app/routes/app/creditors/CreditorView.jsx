var React        = require('react/addons'),
    Router       = require('react-router'),

    State        = Router.State,
    Navigation   = Router.Navigation,

    // AppUrls      = require('@appUrls'),
    ButtonAction = require('sepamail-common').ButtonAction,
    CreditorForm = require('./CreditorForm.jsx'),

    Page;

Page = React.createClass({
    mixins: [State, Navigation],

    editCreditor: function () {
        // this.transitionTo(AppUrls.DEBTOR_UPDATE.name, { id: this.getParams().id });
    },

    getActionButtons: function () {
        var buttonList = [
            // <ButtonAction id='btn-update' entity='btnModify' className="btn btn-default" glyphicon='pencil' handleClick={this.editCreditor} />,
            <ButtonAction entity="btnBackToList" className="btn btn-default" glyphicon="list"   action="goToCreditors" />
        ];

        return buttonList;
    },

    render: function () {
        return (
            <CreditorForm view actionButtons={this.getActionButtons()} />
        );
    }
});

module.exports = Page;
