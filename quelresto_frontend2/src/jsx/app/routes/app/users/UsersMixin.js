var users = require('@users'),
    UsersMixin;

UsersMixin = {
    getInitialState: function () {
        return {
            loadedRowCount:   0,
            totalRowCount:    0,
            filterConfig:     {
                selectedFilters: [],
                groupBy:         [],
                orderBy:         [],
                filters:         [
                    {
                        id: 'filterGender',
                        label: 'filter.labelGender',
                        key: 'gender',
                        glyph: 'user', type: 'list',
                        listDatas: [
                            { label: Messages.getMsg('filter.labelFemale'), value: 'FEMALE' },
                            { label: Messages.getMsg('filter.labelMale'), value: 'MALE' }
                        ]
                    },
                    { id: 'filterLastname', label: 'filter.labelLastname', key: 'lastName', glyph: 'user', type: 'equals' },
                    { id: 'filterFirstname', label: 'filter.labelFirstname', key: 'firstName', glyph: 'user', type: 'equals' },
                    { id: 'filterLogin', label: 'filter.labelLogin', key: 'login', glyph: 'user', type: 'equals' },
                    { id: 'filterEmail', label: 'filter.labelEmail', key: 'email', glyph: 'user', type: 'equals' }
                ],
                groups:          []
            }
        };
    },

    _headers: [
        { label: Messages.getMsg('users.tableTitle') },
        { label: Messages.getMsg('users.tableEmail') },
        { label: Messages.getMsg('users.tableLastLogin') }
    ],

    _api: {
        api:         users,
        apiFunction: 'getAllWithPaginate'
    }
};

module.exports = UsersMixin;
