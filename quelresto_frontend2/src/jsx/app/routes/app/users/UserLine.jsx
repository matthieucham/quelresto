var React              = require('react/addons'),
    UtilsMixin         = require('sepamail-common').UtilsMixin,
    ButtonThreeStripes = require('sepamail-common').ButtonThreeStripes,
    ButtonAction       = require('sepamail-common').ButtonAction,
    MenuItem           = require('react-bootstrap').MenuItem,
    UserLine;

UserLine = React.createClass({

    initUserPassword: function (e) {
        e.preventDefault();
        EventBus.emit('openInitPasswordModal', this.props.row);
    },

    toggleUserActivation: function (e) {
        e.preventDefault();
        EventBus.emit('openToggleUserActivationModal', this.props.row);
    },

    render: function () {
        var entity = this.props.row.gender === 'MALE' ? 'civility.mr' : 'civility.mme';
        return (
            <tr key={this.props.index} onClick={this.props.handleClick && this.props.handleClick.bind(null, this.props.row)}>
                <td>
                    <span className='text-bold'><Entity entity={entity}/> {this.props.row.lastName + ' ' + this.props.row.firstName}</span><br />
                    {this.props.row.login}
                </td>
                <td>
                    {this.props.row.email}
                </td>
                <td>
                    {!this.props.row.lastLoginDate && Messages.getMsg('users.tableNoLogin')}
                    {this.props.row.lastLoginDate && UtilsMixin.formatISODateString(this.props.row.lastLoginDate)}
                </td>
                {this.props.actionMenu &&
                <td className="text-right">
                    {this.props.row.status === 'ACTIVE'
                        ?
                        <ButtonThreeStripes pullRight>
                            <MenuItem eventKey="1" onClick={this.initUserPassword}><i className="fa fa-recycle text-success"/> Réinitialiser le mot de passe</MenuItem>
                            <MenuItem eventKey="2" onClick={this.toggleUserActivation}><i className="fa fa-ban text-danger"/> Désactiver</MenuItem>
                        </ButtonThreeStripes>
                        :
                        <ButtonAction fontawesome="check" entity="Activer" onClick={this.toggleUserActivation}/>}
                </td >
                }
            </tr>
        );
    }
});

module.exports = UserLine;
