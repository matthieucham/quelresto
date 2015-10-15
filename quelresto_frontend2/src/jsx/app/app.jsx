require('./common/l20n/l20n.jsx');

var React        = require('react/addons'),
    Router       = require('react-router'), // or var Router = ReactRouter; in browsers
    RouteHandler = Router.RouteHandler,
    State        = Router.State,
    Sidebar      = require('./common/sidebar/sidebar.jsx'),
    App;

App = React.createClass({

    mixins: [State],

    getHandlerKey: function () {
        var routes = this.getRoutes();
        var key = this.getRoutes()[routes.length - 1].name;

        var id = this.getParams().topFilter;
        if (id) {
            key += '-' + id;
        }
        return key;
    },

    render: function () {
        return (
            <div id='full-container'>
                <Sidebar />

                <div id='body-container' className='container-fluid'>
                    <RouteHandler key={this.getHandlerKey()}/>
                </div>
            </div>
        );
    }
});

module.exports = App;
