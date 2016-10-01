var React = require('react');
var ReactDOM = require('react-dom');

var ColP = React.createClass({
    propTypes: {
        lg: React.PropTypes.string,
        md: React.PropTypes.string,
        sm: React.PropTypes.string,
        xs: React.PropTypes.string,
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
            xs: 12,
        };
    },
    render: function() {
        var size = 12; // default
        var width = 0;
        var values = {
            "xs": this.props.xs,
            "sm": this.props.sm,
            "md": this.props.md,
            "lg": this.props.lg,
        };
        // inherit from smaller values if undefined
        if(values["sm"] == undefined) {
            values["sm"] = values["xs"]
        }
        if(values["md"] == undefined) {
            values["md"] = values["sm"]
        }
        if(values["lg"] == undefined) {
            values["lg"] = values["md"]
        }

        var myDiv = ReactDOM.findDOMNode(this.refs.colp)
        if(myDiv != null) width = myDiv.parentNode.getBoundingClientRect().width

        if(width <= 480) {
            // xs
            size = values["xs"]
        } else if(width <= 768) {
            // sm
            size = values["sm"]
        } else if(width <= 1024) {
            // md
            size = values["md"]
        } else {
            // lg
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
