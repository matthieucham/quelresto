var React = require('react/addons'); // eslint-disable-line
var AppRoutes = require('../../js/common/appRoutes');
var ReactRouter = require('react-router');
var Route = ReactRouter.Route;

var renderNormalRoute = function (route, key) {
    return <Route name={route.name} path={route.url} handler={route.handler} key={'route-' + key}/>;
};

var renderNestedRoutes = function (route, key) {
    return (
        <Route name={route.name} path={route.url} handler={route.handler} key={'route-' + key}>
            {Object.keys(route.routes).map(function (index) {
                var nestedRoute = route.routes[index];
                nestedRoute.url = route.url + nestedRoute.url;
                return renderNormalRoute(nestedRoute);
            })}
        </Route>
    );
};

/* ROUTES */
module.exports = (
    <Route name={AppRoutes.BASE.name} path={AppRoutes.BASE.url} handler={AppRoutes.BASE.handler}>
        {Object.keys(AppRoutes.ROUTES).map(
            function (key) {
                var route = AppRoutes.ROUTES[key];
                return (route.routes ? renderNestedRoutes : renderNormalRoute).call(null, route, key);
            }
        )}
    </Route>
);
