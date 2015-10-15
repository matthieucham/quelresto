var React          = require('react/addons'),
    ReactBootstrap = require('react-bootstrap'),
    State          = require('react-router').State,
    Button         = ReactBootstrap.Button,
    Modal          = ReactBootstrap.Modal,
    Filter         = require('sepamail-common').Filter,
    Table          = require('sepamail-common').Table,
    UserLine       = require('./UserLine.jsx'),
    UsersMixin     = require('./UsersMixin.js'),
    SearchUserModal;

SearchUserModal = React.createClass({

    mixins: [UsersMixin, State],

    getInitialState: function () {
        return {
            isModalOpen: false
        };
    },

    componentWillMount: function () {
        this._api.apiArgs = [this.getParams().creditorId];

        EventBus.on('toggleSearchUserModal', this.toggleModal);
    },

    componentWillUnmount: function () {
        delete this._api.apiArgs;
        EventBus.off('toggleSearchUserModal', this.toggleModal);
    },

    toggleModal: function () {
        this.setState({ isModalOpen: !this.state.isModalOpen });
    },

    handleClickLine: function (row) {
        EventBus.emit('userClicked', row);
        this.toggleModal();
    },

    render: function () {
        return (
            <Modal show={this.state.isModalOpen} onHide={this.toggleModal} bsSize="large" animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Rechercher un utilisateur</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Filter config={this.state.filterConfig}/>
                    <Table headers={this._headers} templateLineClass={UserLine} infiniteScroll={this._api} filterConfig={this.state.filterConfig}
                           handleClickLine={this.handleClickLine}/>
                </Modal.Body>

                <Modal.Footer>
                    <Button id='btn-cancel' onClick={this.toggleModal}>Fermer</Button>
                </Modal.Footer>
            </Modal>
        );
    }
});

module.exports = SearchUserModal;
