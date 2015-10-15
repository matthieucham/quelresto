var React      = require('react/addons'),

    CreditorLine;

CreditorLine = React.createClass({

    render: function () {
        return (
            <tr key={this.props.index} onClick={this.props.handleClick && this.props.handleClick.bind(null, this.props.row)}>
                <td>
                    {this.props.row.name}
                </td>
                <td className='siret'>
                    {this.props.row.company.siret}
                </td>
                <td>
                    {this.props.row.company.accounts.map(function(account, key) {
                        return <div key={key}>{account.iban} {account.defaultAccount && <i className='fa fa-star text-success'></i>}</div>;
                    })}
                </td>
            </tr>
        );
    }

});

module.exports = CreditorLine;
