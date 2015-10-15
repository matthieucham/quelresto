var React          = require('react/addons'),
    ReactBootstrap = require('react-bootstrap'),
    ReactRouter    = require('react-router'),

    Navigation     = ReactRouter.Navigation,

    Button         = ReactBootstrap.Button,
    Col            = ReactBootstrap.Col,

    AppUrls        = require('@appUrls'),

    User,
    UserList;

User = React.createClass({

    getInitialState:  function () {
        return this.props.user;
    },

    componentWillReceiveProps: function (nextProps) {
        this.setState(nextProps.user);
    },

    onDelete: function (e) {
        e.preventDefault();
        this.props.onDelete(this.props.id);
    },

    render: function () {
        var entity = this.state.user.gender === 'MALE' ? 'civility.mr' : 'civility.mme';
        return (
            <div className="row user">
                <div className="col-md-4">
                    <span className='text-bold'><Entity entity={entity}/> {this.state.user.lastName +' '+ this.state.user.firstName}</span><br />
                    {this.state.user.status && <i title={Messages.getMsg('users.' + this.state.user.status.toLowerCase())}
                       className={'fa fa-' + (this.state.user.status === 'ACTIVE' ? 'check text-success' : 'ban text-danger')}/>} {this.state.user.login}
                </div>
                <div className="col-md-8">
                    {this.state.roles && this.state.roles.map(function(role, i) {
                            return (
                                <Col key={i} md={6}>
                                    {role.name}
                                </Col>
                                );
                        })
                    }
                </div>
                {/*<div className='col-md-2'>
                                    <Button onClick={this.onDelete}><Glyphicon glyph="trash"/></Button>
                                </div>*/}
            </div>
        );
    }

});

UserList = React.createClass({

    mixins: [
        Navigation
    ],

    getInitialState: function () {
        return { users: this.props.users };
    },

    componentWillReceiveProps: function (nextProps) {
        this.setState({ users: nextProps.users });
    },

    add: function (e) {
        e.preventDefault();
        this.transitionTo(AppUrls.USER_CREATE_WITH_CREDITOR.name, { creditorId: this.props.creditorUUID });
    },

    onDelete: function (index) {
        this.state.users.splice(index, 1);
        this.setState({ users: this.state.users });
    },

    render: function () {
        return (
            <div id='userList' className="panel panel-default">
                <div className="panel-heading">
                    <div className='pull-right'>
                        <Button id='add_user' className="btn btn-default btn-xs" onClick={this.add}>
                            <i className="fa fa-user-plus"></i>
                        </Button>
                    </div>
                    <div><Entity entity='creditorCreate.panelUsers'/></div>
                </div>
                <div className={'panel-body' + (this.state.users.length === 0 ? ' empty' : '')}>
                    { this.state.users && this.state.users.map(function (item, index) {
                        var props = {
                            id:       index,
                            key:      index,
                            onDelete: this.onDelete,
                            user:     item
                        };
                        this.state.users[index] = item;

                        return <User {...props} />;
                    }, this)}
                </div>
            </div>
        );
    }

});

module.exports = UserList;
