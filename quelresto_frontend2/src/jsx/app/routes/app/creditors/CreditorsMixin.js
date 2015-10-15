var creditors = require('@creditors'),
    CreditorsMixin;

CreditorsMixin = {
    getInitialState: function () {
        return {
            loadedRowCount:   0,
            totalRowCount:    0,
            filterConfig:     {
                selectedFilters: [],
                groupBy:         [],
                orderBy:         [],
                filters:         [
                    { id:'filterName', label: 'filter.labelName', key: 'name', glyph: 'file', type: 'equals' },
                    { id:'filterSiret', label: 'filter.labelSiret', key: 'company.siret', glyph: 'file', type: 'equals' },
                    { label: 'filter.labelDateCreated', key: 'creationDate', glyph: 'calendar', type: 'range', rules: [{ type: 'date' }] }
                ],
                groups:          []
            }
        };
    },

    _headers: [
        { label: Messages.getMsg('creditors.tableTitle') },
        { label: Messages.getMsg('creditors.tableSiret') },
        { label: Messages.getMsg('creditors.tableQxban') }
    ],

    _api: {
        api:         creditors,
        apiFunction: 'getAllWithPaginate'
    }
};

module.exports = CreditorsMixin;
