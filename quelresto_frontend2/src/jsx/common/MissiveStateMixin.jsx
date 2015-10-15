var React          = require('react/addons'), // eslint-disable-line
    ReactBootstrap = require('react-bootstrap'),
    Glyphicon      = ReactBootstrap.Glyphicon,

    MissiveStateMixin;

MissiveStateMixin = {

    missiveStates: {
        PENDING:               'PENDING',
        WAITING_FOR_SIGNATURE: 'WAITING_FOR_SIGNATURE',
        SIGNED:                'SIGNED',
        SENT:                  'SENT',
        PREPARED:              'PREPARED',
        STORED:                'STORED',
        TEMPORARY_FAIL:        'TEMPORARY_FAIL',
        PERMANENT_FAIL:        'PERMANENT_FAIL'
    },

    statesLabel: {
        PENDING:               'MissiveStates.PENDING',
        WAITING_FOR_SIGNATURE: 'MissiveStates.WAITING_FOR_SIGNATURE',
        SIGNED:                'MissiveStates.SIGNED',
        SENT:                  'MissiveStates.SENT',
        PREPARED:              'MissiveStates.PREPARED',
        STORED:                'MissiveStates.STORED',
        TEMPORARY_FAIL:        'MissiveStates.TEMPORARY_FAIL',
        PERMANENT_FAIL:        'MissiveStates.PERMANENT_FAIL'
    },

    isMissiveState: function (search, state) {
        return search === state;
    },

    get: function () {
        return this.missiveStates;
    },

    getFilters: function () {
        var filters = [];
        for (var key in this.missiveStates) {
            filters.push({ label: Messages.getMsg(this.statesLabel[key]), value: this.missiveStates[key] });
        }
        return filters;
    },

    getGlyphicon: function (state) {
        var className = 'icon-state ' + state.toLowerCase(),
            glyphicon;
        switch (state) {
            case this.missiveStates.WAITING_FOR_SIGNATURE:
                glyphicon = <Glyphicon className={className +' text-primary'} glyph='file' title={this.missiveStates.WAITING_FOR_SIGNATURE}/>;
                break;
            case this.missiveStates.SIGNED:
                glyphicon = <Glyphicon className={className +' text-success'} glyph='file' title={this.missiveStates.SIGNED}/>;
                break;
            case this.missiveStates.SENT:
                glyphicon = <Glyphicon className={className +' text-success'} glyph='send' title={this.missiveStates.SENT}/>;
                break;
            case this.missiveStates.PENDING:
                glyphicon = <i className={'fa fa-clock-o text-primary '+ className} title={this.missiveStates.PENDING}></i>;
                break;
            case this.missiveStates.PREPARED:
                glyphicon = <Glyphicon className={className} glyph='file' title={this.missiveStates.PREPARED}/>;
                break;
            case this.missiveStates.STORED:
                glyphicon = <Glyphicon className={className} glyph='file' title={this.missiveStates.STORED}/>;
                break;
            case this.missiveStates.TEMPORARY_FAIL:
                glyphicon = <Glyphicon className={className +' text-danger'} glyph='exclamation-sign' title={this.missiveStates.TEMPORARY_FAIL}/>;
                break;
            case this.missiveStates.PERMANENT_FAIL:
                glyphicon = <Glyphicon className={className +' text-danger'} glyph='exclamation-sign' title={this.missiveStates.PERMANENT_FAIL}/>;
                break;
            default:
                glyphicon = state;
        }

        return glyphicon;
    },

    getSelect: function () {
        var options = [];
        for (var i = 0; i < this.missiveStates.length; i++) {
            options.push(<option value={this.missiveStates[i]}>{this.missiveStates[i]}</option>);
        }

        return (
            <select name='missiveState'>
                {options}
            </select>
        );
    }

};

module.exports = MissiveStateMixin;
