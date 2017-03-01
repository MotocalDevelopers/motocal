var React = require('react');
var intl = require('./translate.js')

var Advertisement = React.createClass({
    render: function() {
        return (
            <div style={{width: "100%", overflow: "hidden"}}>
              <a href="http://www.amazon.co.jp">{intl.translate("応援テキスト", this.props.locale)}</a>
            </div>
        );
    },
});

module.exports = Advertisement;
