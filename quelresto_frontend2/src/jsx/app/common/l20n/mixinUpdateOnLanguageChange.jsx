var changeLanguageEventName = 'ctx:ready';

/**
 * Mixin to update a component when the language changes
 */
module.exports = {
    /**
     * Trick to reload the component : set a state to an empty object, so that it is not overwritten, and set a callback
     * to forceupdate the component.
     */
    reloadComponent: function () {
        this.setState({}, function () {
            // To check if necessary
            this.forceUpdate();
        });
    },

    componentWillMount: function () {
        ReactBootstrap.Dispatcher.on(
            changeLanguageEventName,
            this.reloadComponent
        );
    },

    componentWillUnmount: function () {
        ReactBootstrap.Dispatcher.off(
            changeLanguageEventName,
            this.reloadComponent
        );
    }
};
