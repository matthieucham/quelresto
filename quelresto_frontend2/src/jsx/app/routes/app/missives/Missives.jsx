var React             = require('react/addons'),
    ReactBootstrap    = require('react-bootstrap'),
    SepamailCommon    = require('sepamail-common'),
    State             = require('react-router').State,

    Grid              = ReactBootstrap.Grid,
    Row               = ReactBootstrap.Row,
    Col               = ReactBootstrap.Col,

    PageContainer     = SepamailCommon.PageContainer,
    Filter            = SepamailCommon.Filter,
    Table             = SepamailCommon.Table,
    UtilsMixin        = SepamailCommon.UtilsMixin,

    missives          = require('@missives.js'),
    MissiveStateMixin = require('@MissiveStateMixin'),

    NavigationMenu    = require('./NavigationMenu.jsx'),
    MissiveLine       = require('./MissiveLine.jsx'),

    Page;

Page = React.createClass({

    mixins: [
        React.addons.LinkedStateMixin,
        UtilsMixin,
        MissiveStateMixin,
        State
    ],

    getInitialState: function () {
        return {
            loadedRowCount:   0,
            totalRowCount:    0,
            paymentsSelected: [],
            selectable:       {
                selectedRows: []
            },
            filterConfig:     {
                selectedFilters: [],
                groupBy:         [],
                orderBy:         [],
                filters:         [
                    {
                        id: 'filterReference',
                        label: 'filter.labelReference',
                        key: 'title',
                        glyph: 'file',
                        type: 'equals'
                    },
                    {
                        id: 'filterName',
                        label: 'filter.labelName',
                        key: 'creditor.name',
                        glyph: 'file',
                        type: 'equals'
                    },
                    {
                        id: 'filterType',
                        label: 'filter.labelType',
                        key: 'messageType',
                        glyph: 'file',
                        type: 'list',
                        listDatas: [
                            { label: Messages.getMsg('filter.labelTypeRubis'), value: 'RUBIS_PAYMENT_GROUPED_REQUEST' },
                            { label: Messages.getMsg('filter.labelTypeDiamond'), value: 'DIAMOND_VERIFICATION_REQUEST' }
                        ]
                    },
                    {
                        id: 'filterState',
                        label: 'filter.labelState',
                        key: 'state',
                        glyph: 'file',
                        type: 'list',
                        listDatas: this.getFilters()
                    },
                    {
                        label: 'filter.labelDateSend',
                        key:   'date',
                        glyph: 'calendar',
                        type:  'range',
                        rules: [{ type: 'date' }]
                    }
                ],
                groups:          []
            }
        };
    },

    setParamFilter: function () {
        if (!this.getParams().filterLabel || !this.getParams().topFilter) {
            return;
        }

        var params      = this.getParams(),
            filterLabel = params.filterLabel,
            filterValue = params.topFilter,
            label       = UtilsMixin.ucfirst(filterLabel),
            value       = filterValue;

        if (filterLabel === 'type') {
            filterLabel = 'messageType';
            value = filterValue === 'rubis' ? 'RUBIS_PAYMENT_GROUPED_REQUEST' : 'DIAMOND_VERIFICATION_REQUEST';
        }
        else if (filterLabel === 'state') {
            filterLabel = 'state';
            value = filterValue !== 'error' ? filterValue : this.missiveStates.PERMANENT_FAIL;

            filterValue === 'error' && this.state.filterConfig.selectedFilters.push({
                label: Messages.getMsg('filter.label' + label) + ' = ' + Messages.getMsg('filter.labelTemporaryFail'),
                key:   filterLabel,
                value: this.missiveStates.TEMPORARY_FAIL
            });

            filterValue = filterValue !== 'error' ? filterValue : Messages.getMsg('filter.labelPermanentFail');
        }

        this.state.filterConfig.selectedFilters.push({
            label: Messages.getMsg('filter.label' + label) + ' = ' + UtilsMixin.ucfirst(filterValue),
            key:   filterLabel,
            value: value
        });
    },

    componentWillMount: function () {
        this.setParamFilter();

        EventBus.on('missivesPageLoaded', this.missivesPageLoadedListener);
        EventBus.on('tableLineSelected', this.tableLineSelectedListener);
    },

    componentWillUnmount: function () {
        EventBus.off('missivesPageLoaded', this.missivesPageLoadedListener);
        EventBus.off('tableLineSelected', this.tableLineSelectedListener);
    },

    missivesPageLoadedListener: function (rowCount) {
        this.setState({
            loadedRowCount: this.state.loadedRowCount + rowCount.loadedRowCount,
            totalRowCount:  rowCount.totalRowCount
        });
    },

    tableLineSelectedListener: function () {
        this.setState({ selectable: this.state.selectable });
    },

    _headers: [
        { label: '' },
        { label: Messages.getMsg('missives.tableTitle') },
        { label: Messages.getMsg('missives.tableDDRNumber') },
        { label: '' }
    ],

    _api: {
        api:         missives,
        apiFunction: 'getAllWithPaginate'
    },

    render: function () {
        return (
            <PageContainer title='missives.title'
                           navigation={<NavigationMenu />}
                           filter={<Filter config={this.state.filterConfig} />}>
                <Grid fluid id="missives">
                    <Row>
                        <Col md={12}>
                            <Table headers={this._headers} templateLineClass={MissiveLine}
                                   infiniteScroll={this._api} selectable={this.state.selectable}
                                   filterConfig={this.state.filterConfig}/>
                        </Col>
                    </Row>
                    <Row className="table-footer">
                        <Col md={6}>
                            {this.state.loadedRowCount} remises chargées sur {this.state.totalRowCount}
                        </Col>
                        <Col md={6} className="text-right">
                            {this.state.selectable.selectedRows.length} remise(s) sélectionnée(s)
                        </Col>
                    </Row>
                </Grid>
            </PageContainer>
        );
    }

});

module.exports = Page;
