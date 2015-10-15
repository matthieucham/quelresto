var React = require('react/addons');
var ReactRouter = require('react-router')/*,
    api = require('@api.js'),
    payments  = require('@payments.js')*/;

// Browser compatibility
if (!window.Intl) {
    // polyfill for intl (IE < 11)
    window.Intl = require('intl');
}

window.EventBus = new EventEmitter2({ maxListeners: 20 });

(function () {
    // api.initAuth(); // mount auth token by this import
    // ! sessionStorage.getItem("creditor") && payments.getCreditor(function (creditor) {
    //     sessionStorage.setItem("creditor", JSON.stringify(creditor));
    // });

    /* Initializing touch events */
    React.initializeTouchEvents(true);

    var routes = require('./routes.jsx');

    var initializeRouter = function (Handler, state) {
        React.render(<Handler params={state.params} />, document.getElementById('app-container'), function () {
            // Remove the fading effect
            setTimeout(function () {
                $('body').removeClass('fade-out');
            }, 200);
        });
    };


    ReactRouter.run(routes, initializeRouter);
})();
