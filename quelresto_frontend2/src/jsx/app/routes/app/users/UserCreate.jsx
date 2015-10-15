var React         = require('react/addons'),
    Navigation    = require('react-router').Navigation,

    ButtonAction  = require('sepamail-common').ButtonAction,
    AppUrls       = require('@appUrls'),
    users         = require('@users'),
    CancelOkModal = require('sepamail-common').CancelOkModal,

    UserForm      = require('./UserForm.jsx'),
    Page;

Page = React.createClass({
    mixins: [Navigation],

    getInitialState: function () {
        return {
            btnEntity: 'btnCreate',
            modal:     { isOpen: false }
        };
    },

    createButtonHandler: function (user) {
        this.user = user;

        if (user.userExists) {
            return this.createUser();
        }
        else {
            // Confirm mail will be sent
            this.setState({ modal: { isOpen: true } });
        }

    },

    createUser: function () {
        return users.create(this.user).errManThen(function () {
            if (this.user.creditorUuid) {
                this.transitionTo(AppUrls.CREDITOR_VIEW.name, { id: this.user.creditorUuid });
            }
            else {
                this.transitionTo(AppUrls.USERS.name);
            }
        }.bind(this));
    },

    onUserLoad: function (userExists) {
        this.setState({ btnEntity: userExists ? 'btnAssociate' : 'btnCreate' });
    },

    closeModal: function () {
        this.setState({ modal: { isOpen: false } });
    },

    render: function () {
        return (
            <div>
                <UserForm create onUserLoad={this.onUserLoad} actionButtons={[
                <ButtonAction id="btn-submit" onClickWithState={this.createButtonHandler} entity={this.state.btnEntity} glyphicon='ok' />
            ]}></UserForm>

                <CancelOkModal show={this.state.modal.isOpen} onHide={this.closeModal} onOk={this.createUser}
                               title={Messages.getMsg('modal.titleConfirm')}
                               body={Messages.getMsg('modal.passwordWillBeSent',
                                       {
                                           user: this.user && this.user.lastName + ' ' + this.user.firstName,
                                           mail: this.user && this.user.email
                                       }
                                   )
                               }/>
            </div>
        );
    }
});

module.exports = Page;
