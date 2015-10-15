var React          = require('react/addons'),
    ReactBootstrap = require('react-bootstrap'),
    ReactRouter    = require('react-router'),
    Link           = ReactRouter.Link,
    Glyphicon      = ReactBootstrap.Glyphicon,

    AppUrls        = require('@appUrls'),

    NavigationMenu;

NavigationMenu = React.createClass({

    render: function () {
        return (
            <div>
                <Link id='btn-create-creditor' className='btn btn-success' to={AppUrls.CREDITOR_CREATE.name}>
                    <Glyphicon glyph="plus"/> <Entity entity='btnCreate'/>
                </Link>
            </div>
        );
    }

});

module.exports = NavigationMenu;
