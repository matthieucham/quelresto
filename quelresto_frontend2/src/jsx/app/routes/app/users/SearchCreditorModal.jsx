var React          = require('react/addons'),
    ReactBootstrap = require('react-bootstrap'),
    Button         = ReactBootstrap.Button,
    Modal          = ReactBootstrap.Modal,
    Filter         = require('sepamail-common').Filter,
    Table          = require('sepamail-common').Table,
    CreditorLine   = require('@CreditorLine.jsx'),
    CreditorsMixin = require('@CreditorsMixin.js'),
    SearchCreditorModal;

SearchCreditorModal = React.createClass({

    mixins: [CreditorsMixin],

    getInitialState: function () {
        return {
            isModalOpen: false
        };
    },

    componentWillMount: function () {
        EventBus.on('toggleSearchCreditorModal', this.toggleModal);
    },

    componentWillUnmount: function () {
        EventBus.off('toggleSearchCreditorModal', this.toggleModal);
    },

    toggleModal: function () {
        this.setState({ isModalOpen: !this.state.isModalOpen });
    },

    handleClickLine: function (row) {
        EventBus.emit('creditorClicked', row);
        this.toggleModal();
    },

    render: function () {
        return (
            <Modal show={this.state.isModalOpen} onHide={this.toggleModal} bsSize="large" animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Rechercher un créancier</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Filter config={this.state.filterConfig}/>
                    <Table headers={this._headers} templateLineClass={CreditorLine} infiniteScroll={this._api} filterConfig={this.state.filterConfig}
                           handleClickLine={this.handleClickLine}/>
                </Modal.Body>

                <Modal.Footer>
                    <Button id='btn-cancel' onClick={this.toggleModal}>Fermer</Button>
                </Modal.Footer>
            </Modal>
        );
    }
});

module.exports = SearchCreditorModal;
