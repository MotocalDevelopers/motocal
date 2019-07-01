"use strict";
const React = require('react');
const {Menu, MenuItem} = require('react-bootstrap-typeahead');
const DefaultTypeahead = require('react-bootstrap-typeahead').Typeahead;
const {InputGroup} = require('react-bootstrap');
const PropTypes = require('prop-types').PropTypes;

class Typeahead extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: props.value.toString()
        };
        this.defaultTypeahead = React.createRef();
    }

    handleOnFocus() {
        this.setState({text: this.props.value.toString()});
        this.defaultTypeahead.current.getInput().select();
        if (this.props.onFocus) {
            this.props.onFocus();
        }
    }

    handleOnBlur() {
        if (this.props.onBlur) {
            this.props.onBlur();
        }
    }

    handleOnChange() {
        this.props.onChange();
    }

    renderMenu(results, menuProps) {
            return (
                <Menu {...menuProps}>
                    {
                        results.map(
                            (result, index) => (
                                <MenuItem option={result.id || result} position={index}
                                          className={(this.props.value === result) ? "active" : ""}>
                                    {result.label || result}
                                </MenuItem>
                            )
                        )
                    }
                </Menu>
            )
    }

    filterResults(option, props) {
        return true;
    }

    onMenuToggle() {
        return;
    }

    render() {
        let typeahead = "";
        if (this.props.value && this.props.options && this.props.stat && this.props.onChange) {
            typeahead = <DefaultTypeahead
                id={this.props.stat}
                selected={[this.props.value]}
                onFocus={this.handleOnFocus.bind(this)}
                onBlur={this.handleOnBlur.bind(this)}
                onChange={this.handleOnChange.bind(this)}
                renderMenu={this.renderMenu.bind(this)}
                onMenuToggle={this.onMenuToggle.bind(this)}
                filterBy={this.filterResults.bind(this)}
                ref={this.defaultTypeahead}
                options={this.props.options}/>
        }

        let addOn = "";
        if (this.props.addon) {
            addOn = <InputGroup.Addon>{this.props.addon}</InputGroup.Addon>
        }

        return <InputGroup>
                {typeahead}
                {addOn}
            </InputGroup>
    }
}

Typeahead.propTypes = {
    value: PropTypes.any.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    stat: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    type: PropTypes.oneOf(['text', 'number']),
    min: PropTypes.number,
    max: PropTypes.number,
    addon: PropTypes.string
};

Typeahead.defaultProps = {
    type: 'number',
    min: -100,
    max: 1000
};

module.exports.Typeahead = Typeahead;