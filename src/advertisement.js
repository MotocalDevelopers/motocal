var React = require('react');
var ReactDOM = require('react-dom');
var intl = require('./translate.js')

var AdsenseAdvertisement = React.createClass({
    showUpAdsense: function() {
        var adsense = document.getElementById("adsense-original-div-" + this.props.type);
        adsense.className = '';
        ReactDOM.findDOMNode(this.refs["adsense-space"]).appendChild(adsense);
    },
    componentDidMount: function() {
        this.showUpAdsense();
    },
    render: function() {
        return (
            <div style={{width: "100%"}}>
                <div ref="adsense-space"></div>
            </div>
        );
    },
});

module.exports.AdsenseAdvertisement = AdsenseAdvertisement;
