var React = require('react');
var ReactDOM = require('react-dom');
var PropTypes = require('prop-types');
var CreateClass = require('create-react-class');

var ColP = CreateClass({
    propTypes: {
        lg: PropTypes.number,
        slg: PropTypes.number,
        md: PropTypes.number,
        smd: PropTypes.number,
        sm: PropTypes.number,
        ssm: PropTypes.number,
        xs: PropTypes.number,
        sxs: PropTypes.number,
    },
    getInitialState: function(){
        return {
            width: 0,
        }
    },
    updateWidth: function() {
        var width = 0
        var myDiv = ReactDOM.findDOMNode(this.refs.colp)
        if(myDiv != null) width = myDiv.parentNode.getBoundingClientRect().width
        if(width != 0) {
            this.setState({width: width})
        }
    },
    componentDidMount: function() {
        window.addEventListener("resize", this.handleResize)
        this.updateWidth();
    },
    componentWillUnmount: function() {
        window.removeEventListener("resize", this.handleResize)
    },
    handleResize: function(e) {
        this.updateWidth();
    },
    getDefaultProps: function() {
        return {
            sxs: 12,
        };
    },
    render: function() {
        var size = 12; // default
        var width = this.state.width;
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
