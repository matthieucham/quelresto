var React          = require('react/addons'),
    ReactBootstrap = require('react-bootstrap'),
    SepamailCommon = require('sepamail-common'),
    State          = require('react-router').State,

    Grid           = ReactBootstrap.Grid,
    Row            = ReactBootstrap.Row,
    Col            = ReactBootstrap.Col,

    PageContainer  = SepamailCommon.PageContainer,
    Filter         = SepamailCommon.Filter,
    Table          = SepamailCommon.Table,
    CancelOkModal  = SepamailCommon.CancelOkModal,
    LoaderSpinner  = SepamailCommon.LoaderSpinner,
    UtilsMixin     = SepamailCommon.UtilsMixin,
    notify         = SepamailCommon.notify,

    NavigationMenu = require('./NavigationMenu.jsx'),
    UserLine       = require('./UserLine.jsx'),
    UsersMixin     = require('./UsersMixin.js'),
    api            = require('@api.js'),
    users          = require('@users.js'),

    Page;

Page = React.createClass({

    mixins: [
        React.addons.LinkedStateMixin,
        UtilsMixin,
        UsersMixin,
        State
    ],

    getInitialState: function () {
        return {
            modal: {
                initUserPassword:     {
                    isOpen:    false,
                    isLoading: false
                },
                toggleUserActivation: {
                    isOpen:    false,
                    isLoading: false
                },
                user:                 null
            }
        };
    },

    setParamFilter: function () {
        var requestCategory = this.getParams().topFilter;
        if (!requestCategory) {
            return;
        }

        var value = requestCategory.toUpperCase();

        this.state.filterConfig.selectedFilters.push({
            label: Messages.getMsg('filter.labelType') + ' = ' + value,
            key:   'state',
            value: value
        });
    },

    componentWillMount: function () {
        this._headers.push({ label: '' });

        this.setParamFilter();

        EventBus.on('usersPageLoaded', this.usersPageLoadListener);

        EventBus.on('openInitPasswordModal', this.openInitPasswordModal);
        EventBus.on('openToggleUserActivationModal', this.openToggleUserActivationModal);
    },

    componentWillUnmount: function () {
        EventBus.off('usersPageLoaded', this.usersPageLoadListener);

        EventBus.off('openInitPasswordModal', this.openInitPasswordModal);
        EventBus.off('openToggleUserActivationModal', this.openToggleUserActivationModal);
    },

    usersPageLoadListener: function (rowCount) {
        this.setState({
            loadedRowCount: this.state.loadedRowCount + rowCount.loadedRowCount,
            totalRowCount:  rowCount.totalRowCount
        });
    },

    toggleUserActivation: function () {
        this.setState(function (prevState) {
            var modal = prevState.modal.toggleUserActivation;
            modal.isLoading = true;
            return modal;
        }, function () {
            var user      = this.state.modal.user,
                newStatus = user.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
            users.update(user.uuid, { status: newStatus })
                .errManThen(function () {
                    this.setState(function (prevState) {
                        var userState = prevState.modal.user;
                        userState.status = newStatus;
                        return userState;
                    }, function () {
                        notify.success(newStatus === 'ACTIVE' ? 'users.notifyUserActivated' : 'users.notifyUserDeactivated');
                    });
                }.bind(this))
                .complete(this.closeModal.bind(this, 'toggleUserActivation'));
        }.bind(this));
    },

    openToggleUserActivationModal: function (user) {
        this.setState(function (prevState) {
            var modal = prevState.modal;

            modal.toggleUserActivation.isOpen = true;
            modal.user = user;
            return modal;
        });
    },

    openInitPasswordModal: function (user) {
        this.setState(function (prevState) {
            var modal = prevState.modal;

            modal.initUserPassword.isOpen = true;
            modal.user = user;
            return modal;
        });
    },

    closeModal: function (modalId) {
        this.setState(function (prevState) {
            var modal = prevState.modal;
            modal[modalId].isOpen = modal[modalId].isLoading = false;
            modal.user = null;
            return modal;
        });
    },

    initUserPassword: function () {
        this.setState(function (prevState) {
            var modal = prevState.modal.initUserPassword;
            modal.isLoading = true;
            return modal;
        }, function () {
            api.all('users/' + this.state.modal.user.uuid + '/password').post({})
                .errManThen(function () {
                    notify.success(Messages.getMsg('users.notifyPasswordChanged'));
                })
                .complete(this.closeModal.bind(this, 'initUserPassword'));
        }.bind(this));
    },

    render: function () {
        return (
            <PageContainer title='users.title'
                           navigation={<NavigationMenu />}
                           filter={<Filter config={this.state.filterConfig} />}>
                <Grid fluid id="users">
                    <Row>
                        <Col md={12}>
                            <Table headers={this._headers} templateLineClass={UserLine} lineProps={{actionMenu: true}}
                                   infiniteScroll={this._api} filterConfig={this.state.filterConfig}/>

                            <CancelOkModal show={this.state.modal.initUserPassword.isOpen} onHide={this.closeModal.bind(null, 'initUserPassword')}
                                           onOk={this.initUserPassword}
                                           title={Messages.getMsg('modal.titleConfirm')}
                                           body={this.state.modal.isLoading ? <div className="text-center"><LoaderSpinner /></div> :
                                                    Messages.getMsg('modal.initPassword',
                                                   {
                                                       user: this.state.modal.user && this.state.modal.user.lastName + ' ' + this.state.modal.user.firstName,
                                                       mail: this.state.modal.user && this.state.modal.user.email
                                                   }
                                               )
                                           }/>

                            <CancelOkModal show={this.state.modal.toggleUserActivation.isOpen} onHide={this.closeModal.bind(null, 'toggleUserActivation')}
                                           onOk={this.toggleUserActivation}
                                           title={Messages.getMsg('modal.titleConfirm')}
                                           body={this.state.modal.isLoading ? <div className="text-center"><LoaderSpinner /></div> :
                                                    Messages.getMsg(this.state.modal.user &&
                                                        this.state.modal.user.status === 'ACTIVE' ? 'modal.deactivateUser' : 'modal.activateUser',
                                                   {
                                                       user: this.state.modal.user && this.state.modal.user.lastName + ' ' + this.state.modal.user.firstName
                                                   }
                                               )
                                           }/>
                        </Col>
                    </Row>
                    <Row className="table-footer">
                        <Col md={12}>
                            {this.state.loadedRowCount} utilisateurs chargés sur {this.state.totalRowCount}
                        </Col>
                    </Row>
                </Grid>
            </PageContainer>
        );
    }

});

module.exports = Page;
