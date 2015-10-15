/**
 * Mixin to register entities changes in the page.
 * Extend the 'default' behavior of <code>Entity</code> component.
 */
var MixinUpdateEntity = {
    /**
     * Unregister and register a new event on the entity if the state is not initialized yet
     * @param nextProps {object} Contains the new entity to display
     * @override
     */
    componentWillReceiveProps: function (nextProps) {
        if (this.state.entity !== nextProps.entity && this.state.entity !== '') {
            // Remove the listener on the handler
            ReactBootstrap.Dispatcher.off('ctx:' + this.props.entity, this.handler);
            ReactBootstrap.Dispatcher.on('ctx:' + nextProps.entity, this.handler);

            this.setState({ entity: Messages.getMsg(nextProps.entity, nextProps.data) });
        }
    }
};

module.exports = MixinUpdateEntity;
