var React = require('react');
var ReactDOM = require('react-dom');
var CreateClass = require('create-react-class');
var AdsenseAdvertisement = CreateClass({
    showUpAdsense: function() {
        var adsense = document.getElementById("adsense-original-div-" + this.props.type);
        adsense.className = '';
        ReactDOM.findDOMNode(this.refs["adsense-space-" + this.props.type]).appendChild(adsense);
    },
    componentDidMount: function() {
        this.showUpAdsense();
    },
    render: function() {
        return (
            <div ref={"adsense-space-" + this.props.type} style={{"display": "inline-block"}}></div>
        );
    },
});

module.exports.AdsenseAdvertisement = AdsenseAdvertisement;
