var React          = require('react/addons'),
    ReactBootstrap = require('react-bootstrap'),
    SepamailCommon = require('sepamail-common'),

    Panel          = ReactBootstrap.Panel,

    InputOrSpan    = SepamailCommon.InputOrSpan,
    UtilsMixin     = SepamailCommon.UtilsMixin,
    OfferList;

OfferList = React.createClass({

    getInitialState: function () {
        return {
            activeKey: -1,
            offers: this.props.offers
        };
    },

    componentWillReceiveProps: function (nextProps) {
        this.setState({ offers: nextProps.offers });
    },

    toggleOffer: function (offer, i) {
        this.setState(function (prevState) {
            var offers = prevState.offers;
            offers[i].active = !offers[i].active;
            return { offers: offers };
        });
    },

    onSelect: function (e, activeKey) {
        e.preventDefault();
        if (!this.props.edit && this.state.offers[activeKey] && this.state.offers[activeKey].active &&
            !!this.props.offerContents[this.state.offers[activeKey].type]) {
            this.setState({ activeKey: this.state.activeKey !== activeKey ? activeKey : -1 });
        }
    },

    render: function () {
        return (
            <Panel id='offerList' className='panel-accordion' header={<Entity entity='creditorCreate.panelOffers'/>}>
                {this.state.offers && this.state.offers.map(function (offer, i) {
                    var props          = { collapsible: true },
                        header,
                        activationDate = offer.activationDate || new Date();
                    this.props.edit && (props.expanded = !!this.props.offerContents[offer.type] && offer.active);
                    !this.props.edit && !offer.active && (props.expanded = false);

                        header = <div className={!this.props.edit && !offer.active && 'no-fa'}>
                            {!this.props.edit && offer.active && !!this.props.offerContents[offer.type] &&
                                <i className={this.state.activeKey === i ? 'fa fa-minus-square-o' : 'fa fa-plus-square-o'}/>}
                            <Entity entity={'offers.'+ offer.type} />
                            <div className='panel-heading-checkbox'>
                                <InputOrSpan type="checkbox" edit={this.props.edit}
                                         data-on-text={Messages.getMsg('yes')} data-on-color="success"
                                         data-off-text={Messages.getMsg('no')} data-off-color="danger"
                                         label={offer.active && Messages.getMsg('creditorCreate.activatedAt') +' '+ UtilsMixin.formatISODateString(activationDate)}
                                         id={'offer'+ i}
                                         name={'offer'+ i}
                                         onChange={this.toggleOffer.bind(null, offer, i)}
                                         checked={offer.active}/>
                        </div>
                    </div>;

                        return (<Panel key={i} eventKey={i} header={header} {...props} onSelect={this.onSelect}>
                        {this.props.offerContents[offer.type]}
                    </Panel>);
                }.bind(this))}
            </Panel>
        );
    }

});

module.exports = OfferList;
