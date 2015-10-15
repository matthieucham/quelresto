var React = require('react/addons');
var isFunction = require('webuiutils/src/sub/CommonUtilsMod.js').isFunction;

var Navigation = require('react-router').Navigation;

var ReactBootstrap = require('react-bootstrap');
var Button = ReactBootstrap.Button;

/**
 * ButtonTo component : Link on a component
 */
var ButtonTo = React.createClass({
  mixins: [Navigation],

  handleClick: function () {
    if (isFunction(this.props.handleClick)) {
      this.props.handleClick();
    }

    this.transitionTo(this.props.to, this.props.params);
  },

  render: function () {
    return (
      <Button {...this.props} onClick={this.handleClick}>
        {this.props.children}
      </Button>
    );
  }
});

module.exports = ButtonTo;