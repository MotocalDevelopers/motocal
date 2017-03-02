var React = require('react');
var intl = require('./translate.js')

var Advertisement = React.createClass({
    render: function() {
        return (
            <div style={{width: "100%", overflow: "hidden"}}>
              <a target="_blank" href="http://www.amazon.co.jp/registry/wishlist/1BWHTN1R6SMDI/ref=cm_sw_r_tw_ws_x_85dUybS1Q824K">{intl.translate("応援テキスト", this.props.locale)}</a>
            </div>
        );
    },
});

module.exports = Advertisement;
