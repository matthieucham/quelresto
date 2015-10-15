var React                      = require('react/addons'),
    ReactBootstrap             = require('react-bootstrap'),
    ReactRouter                = require('react-router'),
    SepamailCommon             = require('sepamail-common'),

    State                      = ReactRouter.State,

    Panel                      = ReactBootstrap.Panel,
    Grid                       = ReactBootstrap.Grid,
    Row                        = ReactBootstrap.Row,
    Col                        = ReactBootstrap.Col,
    ButtonToolbar              = ReactBootstrap.ButtonToolbar,

    PageContainer              = SepamailCommon.PageContainer,
    InputOrSpan                = SepamailCommon.InputOrSpan,
    UtilsMixin                 = SepamailCommon.UtilsMixin,
    ValidationMixin            = SepamailCommon.ValidationMixin,
    SearchUserButton           = SepamailCommon.SearchUserButton,

    SearchUserModal            = require('./SearchUserModal.jsx'),

    LinkedStateRadioGroupMixin = require('@LinkedStateRadioGroupMixin.jsx'),
    creditors                  = require('@creditors'),
    users                      = require('@users'),
    roles                      = require('@roles'),
    CreditorAclList            = require('./CreditorAclList.jsx'),

    UserForm;

UserForm = React.createClass({
    mixins: [
        UtilsMixin,
        ValidationMixin,
        React.addons.LinkedStateMixin,
        LinkedStateRadioGroupMixin,
        State
    ],

    getInitialState: function () {
        return {
            userExists:         false,
            creditorUuid:       '',
            associatedCreditor: {},
            lastName:           '',
            firstName:          '',
            login:              '',
            email:              '',
            gender:             '',
            acls:               [],
            profileList:        []
        };
    },

    componentWillMount: function () {
        this.props.view || EventBus.on('userClicked', this.fillUser);
    },

    componentWillUnmount: function () {
        this.props.view || EventBus.off('userClicked', this.fillUser);
    },

    componentDidMount: function () {
        var creditorUuid = this.getParams().creditorId;
        if (creditorUuid) {
            creditors.get(creditorUuid).errManThen(function(response) {
                response = response().data;
                this.setState(function(previousState) {
                    var state = previousState;
                    state.creditorUuid = response.uuid;
                    state.associatedCreditor = response;
                    state.acls.push({
                        creditor: { uuid: response.uuid, name: response.name },
                        roles: [],
                        removable: false
                    });
                    return state;
                });
            }.bind(this));
        }

        roles.getAll().errManThen(function(response) {
            var profileList = [];
            response().data.map(function(profile, i) {
                profileList[profile.scope] = profileList[profile.scope] || [];
                profileList[profile.scope][i] = profile;
            });

            this.setState({ profileList: profileList });
        }.bind(this));

        if (this.props.create || this.props.update) {
            this.initValidation('newUser', {
                gender:  {
                    required: 'errorGender'
                },
                lastName:  {
                    required: 'userCreate.errorLastname'
                },
                firstName: {
                    required: 'userCreate.errorFirstname'
                },
                login:     {
                    required: 'userCreate.errorLogin'
                },
                email:     {
                    required: 'userCreate.errorMailRequired',
                    email:    'userCreate.errorMail'
                }
            });
        }
    },

    searchUser: function () {
        EventBus.emit('toggleSearchUserModal');
    },

    fillUser: function (selectedUser) {
        users.get(selectedUser.uuid).errManThen(function(response) {
            var user = response().data,
                acls = user.acls,
                aclCreditor = this.state.acls[0] || [],
                state;
            typeof user.acls !== 'undefined' && delete user.acls;

            state = $.extend(true, this.state, user);
            state.userExists = true;
            state.gender = user.gender || 'FEMALE';
            state.acls = [aclCreditor].concat(acls);

            this.setState(state, function() {
                if (typeof this.props.onUserLoad === 'function') {
                    this.props.onUserLoad(true);
                }
            });
        }.bind(this));
    },

    resetForm: function (e) {
        e.preventDefault();

        this.setState(function(previousState) {
            var state = this.getInitialState();
            delete state.creditorUuid;
            delete state.associatedCreditor;
            delete state.profileList;

            previousState.acls[0] && (state.acls = [previousState.acls[0]]);

            return state;
        }, function() {
            if (typeof this.props.onUserLoad === 'function') {
                this.props.onUserLoad(false);
            }
        });
    },

    render: function () {
        var genderGroup  = {
                MALE:   { label: 'civility.mr', value: 'MALE' },
                FEMALE: { label: 'civility.mme', value: 'FEMALE' }
            },
            genderStatic = genderGroup[this.state.gender] && Messages.getMsg(genderGroup[this.state.gender].label) || this.state.gender,
            gender       = this.radioGroup('gender');

        return (
            <PageContainer title='userCreate.title'>
                <form className='form-horizontal' id='newUser'>
                    <Panel header={<Entity entity='userCreate.panelUser'/>}>
                        <Grid fluid>
                            <Row>
                                <Col md={10}>
                                    <Col md={6}>
                                        <InputOrSpan type='radio' edit={(this.props.create || this.props.update) && !this.state.userExists} required
                                                     valueLink={this.linkState('gender')} label={<Entity entity='labelGender'/>}
                                                     className='form-input' name='gender' valueStatic={genderStatic}>
                                            {Object.keys(genderGroup).map(function (result, key) {
                                                return (
                                                    <input key={key} type='radio' name='gender'
                                                           checkedLink={gender.valueLink(genderGroup[result].value)}>
                                                        <Entity entity={genderGroup[result].label}/>
                                                    </input>
                                                );
                                            }, this)}
                                        </InputOrSpan>
                                    </Col>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={10}>
                                    <Row>
                                        <Col md={6}>
                                            <InputOrSpan edit={(this.props.create || this.props.update) && !this.state.userExists} required
                                                         label={<Entity entity='userCreate.labelLastname' />}
                                                         name='lastName' valueLink={this.linkState('lastName')}/>
                                        </Col>
                                        <Col md={6}>
                                            <InputOrSpan edit={(this.props.create || this.props.update) && !this.state.userExists} required
                                                         label={<Entity entity='userCreate.labelLogin' />}
                                                         name='login' valueLink={this.linkState('login')}/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <InputOrSpan edit={(this.props.create || this.props.update) && !this.state.userExists} required
                                                         label={<Entity entity='userCreate.labelFirstname' />}
                                                         name='firstName' valueLink={this.linkState('firstName')}/>
                                        </Col>
                                        <Col md={6}>
                                            <InputOrSpan edit={(this.props.create || this.props.update) && !this.state.userExists} required
                                                         label={<Entity entity='userCreate.labelEmail' />}
                                                         name='email' valueLink={this.linkState('email')}/>
                                        </Col>
                                    </Row>
                                </Col>
                                {this.props.create && this.state.creditorUuid &&
                                <Col md={2}>
                                    <SearchUserButton handleClick={this.searchUser}/>
                                    <a href='#' id='btn-reset' onClick={this.resetForm} className={this.state.userExists || 'opa-hidden'}>
                                        <i className='fa fa-remove'></i> <Entity entity='btnCancel'/>
                                    </a>
                                    <SearchUserModal />
                                </Col>
                                }
                            </Row>
                        </Grid>
                    </Panel>

                    <CreditorAclList edit={this.props.create || this.props.update} acls={this.state.acls} profileList={this.state.profileList} />

                    <Grid fluid>
                        <Row>
                            <Col md={12}>
                                <ButtonToolbar id="actionBar">
                                    {this.props.actionButtons.map(function (actionButton, key) {
                                        var props = { key: key };
                                        if (actionButton.props.action &&
                                            typeof this[actionButton.props.action] === 'function') {
                                            props.handleClick = this[actionButton.props.action];
                                        }

                                        if (actionButton.props.onClickWithState &&
                                            typeof actionButton.props.onClickWithState === 'function') {
                                            props.onClick = function () {
                                                this.formElm.valid() && actionButton.props.onClickWithState(this.state);
                                            }.bind(this);
                                        }

                                        return React.cloneElement(actionButton, props);
                                    }, this)}
                                </ButtonToolbar>
                            </Col>
                        </Row>
                    </Grid>
                </form>
            </PageContainer>
        );
    }
});

module.exports = UserForm;
