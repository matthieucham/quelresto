var React        = require('react/addons'),
    ButtonAction = require('sepamail-common').ButtonAction,
    Navigation   = require('react-router').Navigation,
    ButtonCancel;

ButtonCancel = React.createClass({
    mixins: [Navigation],

    cancelRoute: function () {
        this.goBack() || this.transitionTo(this.props.fallbackRoute || '/');
    },

    render: function () {
        return (
            <ButtonAction entity="btnCancel" className="btn btn-danger btn-lg" glyphicon="remove"
                          onClick={this.cancelRoute} {...this.props} />
        );
    }
});

module.exports = ButtonCancel;
