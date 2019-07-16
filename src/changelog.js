'use strict';

var React = require('react');
var PropTypes = require('prop-types');
var {Button} = require('react-bootstrap');

/**
 * Container for ChangeLog
 *
 */
 class ChangeLog extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            length: props.length,
        };

        this.handleClick = this.handleClick.bind(this);
    }

    /**
     * Increment length count for showing more children.
     */
    handleClick() {
        const {props: {children, start, step}, state: {length}} = this;

        this.setState({
            length: Math.min(children.length, length+step),
        });
    }

    /**
     * Renders the top {step} nodes and show-more button.
     */
    render() {
        const {state: {length},
               props: {start, step, className, buttonText, children}} = this;
        const text = buttonText.replace('{step}', step);

        return [
            <ul key={"changelog-ul"} {...(className ? {className: className} : {})}>
                {children.slice(start, length)}
            </ul>,
            <Button key={"changelog-button"} variant="link" onClick={this.handleClick}
                 {...(length >= children.length ? {disabled: 'true'} : {})}>
                {text}
            </Button>
        ];
    }
}


ChangeLog.propTypes = {
    start: PropTypes.number,
    step: PropTypes.number,
    length: PropTypes.number,
    buttonText: PropTypes.string,
    className: PropTypes.string,
};

ChangeLog.defaultProps = {
    start: 0,
    step: 5,
    length: 5,
    buttonText: 'Show more',
};

module.exports = ChangeLog;