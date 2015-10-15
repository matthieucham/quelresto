var React          = require('react/addons'),
    Sidebar        = require('sepamail-common').Sidebar,
    ReactBootstrap = require('react-bootstrap'),
    ReactRouter    = require('react-router'),

    State          = ReactRouter.State,
    Link           = ReactRouter.Link,
    Accordion      = ReactBootstrap.Accordion,
    Panel          = ReactBootstrap.Panel,

    AppRoutes      = require('@appUrls.js'),
    getMsg         = Messages.getMsg,

    SidebarSection;

SidebarSection = React.createClass({
    mixins: [State],

    getDefaultActiveKeyFromCurrentRouteName: function () {
        if (this.isActive(AppRoutes.MISSIVES.name) || this.isActive(AppRoutes.TOP_FILTERED_MISSIVES.name)) {
            return '1';
        }

        if (this.isActive(AppRoutes.CREDITORS.name) || this.isActive(AppRoutes.TOP_FILTERED_CREDITORS.name)) {
            return '2';
        }

        if (this.isActive(AppRoutes.USERS.name) || this.isActive(AppRoutes.TOP_FILTERED_USERS.name)) {
            return '3';
        }

        return '0';
    },

    /*<div className='navigation row'>
     <div className='col-md-6'><i className='fa fa-times'></i></div>
     <div className='col-md-6 text-right'>
     <i className='fa fa-cog'></i>
     <i className='fa fa-sign-out'></i>
     </div>
     </div>*/

    render: function () {
        return (
            <Sidebar subtitle="Pilotage" fakeUserName="BNP user1">
                <Accordion defaultActiveKey={this.getDefaultActiveKeyFromCurrentRouteName()}>
                    <Panel header={getMsg('menuMissives')} eventKey='1'>
                        <ul className="nav nav-pills nav-stacked">
                            <li>
                                <Link to={AppRoutes.MISSIVES.name}>
                                    <i className="fa fa-tags"></i><Entity entity='menuMissivesAll'/>
                                </Link>
                            </li>
                            <li>
                                <Link to={AppRoutes.TOP_FILTERED_MISSIVES.name} params={ { filterLabel: 'state', topFilter: 'error' } }>
                                    <i className="fa fa-times"></i><Entity entity='menuMissivesError'/>
                                </Link>
                            </li>
                            <li>
                                <Link to={AppRoutes.TOP_FILTERED_MISSIVES.name} params={ { filterLabel: 'type', topFilter: 'rubis' } } className='rubis'>
                                    <i></i><Entity entity='menuMissivesRubis'/>
                                </Link>
                            </li>
                            <li>
                                <Link to={AppRoutes.TOP_FILTERED_MISSIVES.name} params={ { filterLabel: 'type', topFilter: 'diamond' } } className='diamond'>
                                    <i className="fa fa-diamond"></i><Entity entity='menuMissivesDiamond'/>
                                </Link>
                            </li>
                        </ul>
                    </Panel>
                    <Panel header={getMsg('menuCreditors')} eventKey='2'>
                        <ul className="nav nav-pills nav-stacked">
                            <li>
                                <Link to={AppRoutes.CREDITORS.name}>
                                    <i className="fa fa-users"></i><Entity entity='menuCreditorsAll'/>
                                </Link>
                            </li>
                        </ul>
                    </Panel>
                    <Panel header={getMsg('menuUsers')} eventKey='3'>
                        <ul className="nav nav-pills nav-stacked">
                            <li>
                                <Link to={AppRoutes.USERS.name}>
                                    <i className="fa fa-users"></i><Entity entity='menuUsersAll'/>
                                </Link>
                            </li>
                            {/*<li>
                             <Link to={AppRoutes.TOP_FILTERED_USERS.name} params={ { topFilter: 'inactive' } }>
                             <i className="fa fa-user-times"></i><Entity entity='menuUsersInactives'/>
                             </Link>
                             </li>*/}
                        </ul>
                    </Panel>
                </Accordion>
            </Sidebar>
        );
    }
});

module.exports = SidebarSection;
