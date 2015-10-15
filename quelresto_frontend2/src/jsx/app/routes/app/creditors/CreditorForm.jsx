var React           = require('react/addons'),
    ReactBootstrap  = require('react-bootstrap'),
    ReactRouter     = require('react-router'),
    SepamailCommon  = require('sepamail-common'),

    Panel           = ReactBootstrap.Panel,
    Grid            = ReactBootstrap.Grid,
    Row             = ReactBootstrap.Row,
    Col             = ReactBootstrap.Col,
    ButtonToolbar   = ReactBootstrap.ButtonToolbar,

    Navigation      = ReactRouter.Navigation,
    State           = ReactRouter.State,

    PageContainer   = SepamailCommon.PageContainer,
    InputOrSpan     = SepamailCommon.InputOrSpan,
    AccountList     = SepamailCommon.AccountList,
    UtilsMixin      = SepamailCommon.UtilsMixin,
    ValidationMixin = SepamailCommon.ValidationMixin,

    AppUrls         = require('@appUrls'),
    creditors       = require('@creditors'),
    offers          = require('@offers'),
    UserList        = require('./UserList.jsx'),
    OfferList       = require('./OfferList.jsx'),

    CreditorForm;

CreditorForm = React.createClass({
    mixins: [
        UtilsMixin,
        ValidationMixin,
        React.addons.LinkedStateMixin,
        Navigation,
        State
    ],

    getInitialState: function () {
        return {
            status:             'ACTIVE',
            name:               '',
            email:              '',
            company:            {
                address:  '',
                // icqx: 'QX45FRZBNP0014',
                icqx:     '',
                // siret: '434 075 719 00048',
                siret:    '',
                accounts: [{
                    reference:      'Principal',
                    // iban: 'QX58CCBPFRPPTLSJK4WFMEY1NX4YMZXDVH',
                    iban:           '',
                    defaultAccount: true
                }]
            },
            ebicsConfiguration: {},
            acls:               [],
            creditorOffers:     [],
            offerList:          []
        };
    },

    componentDidMount: function () {
        offers.getAll().errManThen(function(response) {
            response = response().data;
            this.setState(function(previousState) {
                var creditorOffers = previousState.offerList;

                response.map(function(offer) {
                    creditorOffers.push({
                        type:   offer.type,
                        active: false
                    });
                });

                return { offerList: creditorOffers };
            }, function() {
                if (!this.props.create) {
                    creditors.get(this.getParams().id).errManThen(function (data) {
                        var data = data().data;

                        data.creditorOffers && data.creditorOffers.map(function(creditorOffer) {
                            for (var i = 0; i < this.state.offerList.length; i++) {
                                if (this.state.offerList[i].type === creditorOffer.offer.type) {
                                    this.state.offerList[i].active = true;
                                    this.state.offerList[i].activationDate = creditorOffer.activationDate;
                                }
                            }
                        }.bind(this));
                        this.setState(data);
                    }.bind(this));
                }
            });
        }.bind(this));

        if (this.props.create || this.props.update) {
            this.initValidation('newCreditor', {
                name:    {
                    required: 'creditorCreate.errorName'
                },
                address: {
                    required: 'creditorCreate.errorAddress'
                },
                siret:   {
                    required: 'creditorCreate.errorSiret'
                },
                icqx:    {
                    required: 'creditorCreate.errorICQX'
                },
                email:   {
                    required: 'creditorCreate.errorMailRequired',
                    email:    'creditorCreate.errorMail'
                },
                contractReference:    {
                    required: 'creditorCreate.errorReference'
                },
                contractQxban:    {
                    required: 'creditorCreate.errorQxban'
                }
            });
        }
    },

    goToCreditors: function () {
        this.transitionTo(AppUrls.CREDITORS.name);
    },

    render: function () {
        var  offerContents = {
            'RUBIS': <AccountList className='panel-child' edit={this.props.create || this.props.update} defaultAccount={true}
                                  accounts={this.state.company.accounts} accountState={['reference', 'iban']}/>
        };

        return (
            <PageContainer title='creditorCreate.title'>
                <form className='form-horizontal' id='newCreditor'>
                    <Panel header={<Entity entity='creditorCreate.panelCreditor'/>}>
                        <Grid fluid>
                            <Row>
                                <Col md={6}>
                                    <InputOrSpan edit={this.props.create} label={<Entity entity='creditorCreate.labelName' />} required
                                                 name='name' valueLink={this.linkState('name')}/>
                                </Col>
                                <Col md={6}>
                                    <InputOrSpan edit={this.props.create} label={<Entity entity='creditorCreate.labelSiren' />} required
                                                 name='siret' onChange={this.linkDeepState} value={this.state.company.siret}
                                                 data-state-path='company.siret'/>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <InputOrSpan edit={this.props.create} type='textarea' label={<Entity entity='creditorCreate.labelAddress' />} required
                                                 name='address' onChange={this.linkDeepState} value={this.state.company.address}
                                                 data-state-path='company.address'/>
                                </Col>
                                <Col md={6}>
                                    <InputOrSpan edit={this.props.create} label={<Entity entity='creditorCreate.labelICQX' />} required
                                                 name='icqx' onChange={this.linkDeepState} value={this.state.company.icqx}
                                                 data-state-path='company.icqx'/>
                                    <InputOrSpan edit={this.props.create} label={<Entity entity='creditorCreate.labelEmail' />} required
                                                 name='email' valueLink={this.linkState('email')}/>
                                </Col>
                            </Row>
                        </Grid>
                    </Panel>

                    <Panel header={<Entity entity='creditorCreate.panelEbics'/>}>
                        <Row>
                            <Col md={4}>
                                <InputOrSpan edit={this.props.create} label={<Entity entity='creditorCreate.labelHostId' />} name='hostId'
                                             onChange={this.linkDeepState} value={this.state.ebicsConfiguration.hostId} data-state-path='ebicsConfiguration.hostId'/>
                            </Col>
                            <Col md={4}>
                                <InputOrSpan edit={this.props.create} label={<Entity entity='creditorCreate.labelPartnerId' />} name='partnerId'
                                             onChange={this.linkDeepState} value={this.state.ebicsConfiguration.partnerId}
                                             data-state-path='ebicsConfiguration.partnerId'/>
                            </Col>
                            <Col md={4}>
                                <InputOrSpan edit={this.props.create} label={<Entity entity='creditorCreate.labelUserId' />} name='userId'
                                             onChange={this.linkDeepState} value={this.state.ebicsConfiguration.userId} data-state-path='ebicsConfiguration.userId'/>
                            </Col>
                        </Row>
                    </Panel>

                    <OfferList edit={this.props.create || this.props.update} offers={this.state.offerList} offerContents={offerContents} />

                    {!this.props.create && this.state.uuid &&
                    <UserList creditorUUID={this.state.uuid} users={this.state.acls}/>
                    }

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

module.exports = CreditorForm;
