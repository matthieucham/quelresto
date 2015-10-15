var React               = require('react/addons'),
    ReactBootstrap      = require('react-bootstrap'),
    SepamailCommon      = require('sepamail-common'),

    Col                 = ReactBootstrap.Col,
    Button              = ReactBootstrap.Button,
    Panel               = ReactBootstrap.Panel,
    Accordion           = ReactBootstrap.Accordion,

    InputOrSpan         = SepamailCommon.InputOrSpan,
    UtilsMixin          = SepamailCommon.UtilsMixin,
    SearchCreditorModal = require('./SearchCreditorModal.jsx'),
    CreditorAclList;

CreditorAclList = React.createClass({

    getInitialState: function () {
        return {
            activeKey: -1,
            acls: this.props.acls
        };
    },

    componentWillReceiveProps: function (nextProps) {
        this.setState({ acls: nextProps.acls });
    },

    componentWillMount: function () {
        EventBus.on('creditorClicked', this.addCreditor);
    },

    componentWillUnmount: function () {
        EventBus.off('creditorClicked', this.addCreditor);
    },

    add: function () {
        EventBus.emit('toggleSearchCreditorModal');
    },

    addCreditor: function (creditor) {
        var creditorUuids = this.state.acls.map(function(acl) {
            return acl.creditor.uuid;
        });

        if (creditorUuids.indexOf(creditor.uuid) === -1) {
            this.setState(function(previousState) {
                var state = previousState;
                state.acls.push({
                    creditor: { uuid: creditor.uuid, name: creditor.name },
                    roles: []
                });

                return state;
            });
        }
    },

    onSelect: function (activeKey) {
        this.setState({ activeKey: this.state.activeKey !== activeKey ? activeKey : -1 });
    },

    toggleRight: function (aclIndex, profile, e, isChecked) {
        if (!this.state.acls[aclIndex]) {
            return;
        }

        var index = this.state.acls[aclIndex].roles.indexOf(profile);

        this.setState(function(previousState) {
            var state = previousState;

            if (isChecked) {
                if (index === -1) {
                    state.acls[aclIndex].roles.push(profile);
                }
            }
            else {
                state.acls[aclIndex].roles.splice(index, 1);
            }

            return state;
        });
    },

    remove: function (index, e) {
        e.stopPropagation();
        e.preventDefault();

        this.setState(function(previousState) {
            var state = previousState;
            state.acls.splice(index, 1);
            return state;
        });
    },

    render: function () {
        var panelHeader = [
            <Entity key='1' entity='userCreate.panelCreditors'/>,
            <Button key='2' id='add_creditor' className="btn btn-default btn-xs pull-right" onClick={this.add}>
                <i className="fa fa-user-plus"></i>
            </Button>
        ];

        return (
            <Panel id='creditorList' className='panel-accordion' header={panelHeader}>
                <Accordion onSelect={this.onSelect}>
                    {this.state.acls && this.state.acls.map(function(acl, i) {
                        var header = [
                                <i key='1' className={this.state.activeKey === i ? 'fa fa-minus-square-o' : 'fa fa-plus-square-o'}/>,
                                <span key='2' className={typeof acl.removable !== 'undefined' && !acl.removable && 'text-bold'}>{acl.creditor.name}</span>
                            ],
                            inputPermissions = [],
                            j = 0;

                        if (typeof acl.removable === 'undefined' || acl.removable) {
                            header.push(<i key='3' className="fa fa-trash-o text-danger pull-right" onClick={this.remove.bind(this, i)}/>);
                        }

                        for (var scope in this.props.profileList) {
                            var permissions = this.props.profileList[scope].map(function(profile) {
                                var input = (<Col key={'rights'+ i +'-'+ j} md={6} className='switch-rights'>
                                            <InputOrSpan type="checkbox" edit={this.props.edit}
                                                         label={profile.name}
                                                         data-on-text={Messages.getMsg('yes')} data-on-color="success"
                                                         data-off-text={Messages.getMsg('no')} data-off-color="danger"
                                                         labelClassName='col-sm-8' wrapperClassName='col-md-4'
                                                         id={'rights'+ i +'-'+ j}
                                                         name={'rights'+ i +'-'+ j}
                                                         onChange={this.toggleRight.bind(null, i, profile)}
                                                         checked={UtilsMixin.indexOfObject(acl.roles, profile, 'uuid') !== -1}/>
                                        </Col>);
                                j++;
                                return input;
                            }.bind(this));

                            inputPermissions.push([
                                <div className='permission-title'>{Messages.getMsg('permissionScopes.'+ scope)}</div>,
                                <div className='row permissions'>{permissions}</div>
                            ]);
                        }


                        return (
                            <Panel key={i} eventKey={i} header={header} className={'creditor-'+ i}>
                                {inputPermissions}
                            </Panel>
                        );
                    }.bind(this))}
                </Accordion>

                <SearchCreditorModal />
            </Panel>
        );
    }

});

module.exports = CreditorAclList;