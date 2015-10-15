var React             = require('react/addons'),
    Navigation        = require('react-router').Navigation,
    UtilsMixin        = require('sepamail-common').UtilsMixin,
    MissiveStateMixin = require('@MissiveStateMixin'),

    MissiveLine;

MissiveLine = React.createClass({

    mixins: [UtilsMixin, Navigation, MissiveStateMixin],

    render: function () {
        var requestEntity = 'missives.' + (this.props.row.type === 'RUBIS' ? 'paymentRequest' : 'remittanceRequest');
        this.props.row.nbOfMissives > 1 && (requestEntity += 's');

        return (
            <tr key={this.props.index}>
                <td className='item-selectable'>
                    <input type='checkbox' className='selectable' name={'checkbox' + this.props.index} value={this.props.index} onChange={this.props.selectLineCallback}
                           checked={this.props.row.checked}/>
                </td>
                <td className="text-center">
                    <img src={'/imgs/' + (this.props.row.type === 'RUBIS' ? 'rubis' : 'diamond') + '.png'} height="40" />
                </td>
                <td>
                    <strong>{this.props.row.name}</strong>
                </td>
                <td>
                    <strong>{this.props.row.nbOfMissives}</strong> <Entity entity={requestEntity}/><br />
                    Émise le <strong>{this.formatISODateString(this.props.row.emissionDate, true)}</strong> par <strong>{this.props.row.emitter}</strong>
                </td>
                <td className="item-status">{this.getGlyphicon(this.props.row.state)}</td>
            </tr>
        );
    }
});

module.exports = MissiveLine;
