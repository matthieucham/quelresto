var LinkedStateRadioGroupMixin = {
    radioGroup: function (key) {
        return {
            valueLink: function (value) {
                return {
                    value:         this.state[key] === value,
                    requestChange: function () {
                        var s = {};
                        s[key] = value;
                        this.setState(s);
                    }.bind(this)
                };
            }.bind(this)
        };
    }
};

module.exports = LinkedStateRadioGroupMixin;
