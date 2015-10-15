var React          = require('react/addons'),
    ReactBootstrap = require('react-bootstrap'),
    Router         = require('react-router'),
    SepamailCommon = require('sepamail-common'),

    State          = Router.State,
    Navigation     = Router.Navigation,

    Grid           = ReactBootstrap.Grid,
    Row            = ReactBootstrap.Row,
    Col            = ReactBootstrap.Col,

    PageContainer  = SepamailCommon.PageContainer,
    Filter         = SepamailCommon.Filter,
    Table          = SepamailCommon.Table,
    UtilsMixin     = SepamailCommon.UtilsMixin,

    AppUrls        = require('@appUrls'),

    NavigationMenu = require('./NavigationMenu.jsx'),
    CreditorLine   = require('./CreditorLine.jsx'),
    CreditorsMixin = require('./CreditorsMixin'),

    Page;

Page = React.createClass({

    mixins: [
        React.addons.LinkedStateMixin,
        UtilsMixin,
        CreditorsMixin,
        State,
        Navigation
    ],

    getInitialState: function () {
        return {};
    },

    setParamFilter: function () {
        var requestCategory = this.getParams().topFilter;
        if (!requestCategory) {
            return;
        }

        var value = requestCategory.toUpperCase(),
            label = value;

        this.state.filterConfig.selectedFilters.push({
            label: Messages.getMsg('filter.labelType') + ' = ' + label,
            key:   'state',
            value: value
        });
    },

    componentWillMount: function () {
        this.setParamFilter();

        EventBus.on('creditorsPageLoaded', this.creditorsPageLoaded);
    },

    componentWillUnmount: function () {
        EventBus.off('creditorsPageLoaded', this.creditorsPageLoaded);
    },

    creditorsPageLoaded: function (rowCount, replace) {
        var state = {
            totalRowCount: rowCount.totalRowCount
        };

        if (replace) {
            state.loadedRowCount = rowCount.loadedRowCount;
        }
        else {
            state.loadedRowCount = this.state.loadedRowCount + rowCount.loadedRowCount;
        }

        this.setState(state);
    },

    handleClickLine: function (row) {
        this.transitionTo(AppUrls.CREDITOR_VIEW.name, { id: row.uuid });
    },

    render: function () {
        return (
            <PageContainer title='creditors.title'
                           navigation={<NavigationMenu />}
                           filter={<Filter config={this.state.filterConfig} />}>
                <Grid fluid id="creditors">
                    <Row>
                        <Col md={12}>
                            <Table headers={this._headers} templateLineClass={CreditorLine}
                                   infiniteScroll={this._api}
                                   filterConfig={this.state.filterConfig} handleClickLine={this.handleClickLine}/>
                        </Col>
                    </Row>
                    <Row className="table-footer">
                        <Col md={12}>
                            {Messages.getMsg('creditors.loadedCreditors', {
                                loadedRowCount: this.state.loadedRowCount,
                                totalRowCount:  this.state.totalRowCount
                            })}
                        </Col>
                    </Row>
                </Grid>
            </PageContainer>
        );
    }

});

module.exports = Page;
