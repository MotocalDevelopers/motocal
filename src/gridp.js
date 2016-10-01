var React = require('react');
var ReactDOM = require('react-dom');

var ColP = React.createClass({
    propTypes: {
        lg: React.PropTypes.string,
        slg: React.PropTypes.string,
        md: React.PropTypes.string,
        smd: React.PropTypes.string,
        sm: React.PropTypes.string,
        ssm: React.PropTypes.string,
        xs: React.PropTypes.string,
        sxs: React.PropTypes.string,
    },
    componentDidMount: function() {
        window.addEventListener("resize", this.handleResize)
    },
    componentWillUnmount: function() {
        window.removeEventListener("resize", this.handleResize)
    },
    handleResize: function(e) {
        this.forceUpdate();
    },
    getDefaultProps: function() {
        return {
            sxs: 12,
        };
    },
    render: function() {
        var size = 12; // default
        var width = 0;
        var values = {
            "sxs": this.props.sxs,
            "xs": this.props.xs,
            "ssm": this.props.ssm,
            "sm": this.props.sm,
            "smd": this.props.smd,
            "md": this.props.md,
            "slg": this.props.slg,
            "lg": this.props.lg,
        };
        // inherit from smaller values if undefined
        if(values["xs"] == undefined) {
            values["xs"] = values["sxs"]
        }
        if(values["ssm"] == undefined) {
            values["ssm"] = values["xs"]
        }
        if(values["sm"] == undefined) {
            values["sm"] = values["ssm"]
        }
        if(values["smd"] == undefined) {
            values["smd"] = values["sm"]
        }
        if(values["md"] == undefined) {
            values["md"] = values["smd"]
        }
        if(values["slg"] == undefined) {
            values["slg"] = values["md"]
        }
        if(values["lg"] == undefined) {
            values["lg"] = values["slg"]
        }

        var myDiv = ReactDOM.findDOMNode(this.refs.colp)
        if(myDiv != null) width = myDiv.parentNode.getBoundingClientRect().width

        if(width <= 320) {
            size = values["sxs"]
        } else if(width <= 480) {
            size = values["xs"]
        } else if(width <= 624) {
            size = values["ssm"]
        } else if(width <= 768) {
            size = values["sm"]
        } else if(width <= 896) {
            size = values["smd"]
        } else if(width <= 1024) {
            size = values["md"]
        } else if(width <= 1232) {
            size = values["slg"]
        } else {
            size = values["lg"]
        }

        var style = (100.0 * size/12.0).toString() + "%"
        return (
            <div ref="colp" className={this.props.className} style={{"width": style, "float": "left"}}>
                {this.props.children}
            </div>
        );
    }
})

module.exports.ColP = ColP
