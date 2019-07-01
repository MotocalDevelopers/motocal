"use strict";

const React = require('react');
const {Menu, MenuItem} = require('react-bootstrap-typeahead');
const DefaultTypeahead = require('react-bootstrap-typeahead').Typeahead;
const {InputGroup} = require('react-bootstrap');
const PropTypes = require('prop-types').PropTypes;

class Typeahead extends React.Component {
    constructor(props) {
        super(props);
        DefaultTypeahead.positionFixed = true;
        this.state = {
            text: props.value.toString()
        };
        this.defaultTypeahead = React.createRef();
    }

    handleOnFocus() {
        if (this.defaultTypeahead.current) {
            this.setState({text: this.props.value.toString()});
            this.updateActiveItem(this.props.stat, this.props.options, this.state.text);
            this.defaultTypeahead.current.getInput().select();
            if (this.props.onFocus) {
                this.props.onFocus();
            }
        }
    }

    static getValidData(type, min, max, selected, previous) {
        switch (type) {
            case "number":
                return Typeahead.validateNumber(parseFloat(selected), min, max, previous);
            case "text":
                let value = selected.toString();
                if (value) {
                    return value;
                } else {
                    return previous;
                }
            default:
                return selected;
        }
    }

    static validateNumber(selected, min, max, previous) {
        if (isNaN(selected)) {
            if (previous) {
                return previous;
            } else {
                return min;
            }
        } else {
            if (selected < min) {
                return min;
            } else if (selected > max) {
                return max;
            } else {
                return selected;
            }
        }
    }

    handleOnBlur() {
        if (this.defaultTypeahead.current) {
            let value = Typeahead.getValidData(this.props.type, this.props.min, this.props.max, this.defaultTypeahead.current.state.text, this.state.text);
            if (this.props.onBlur) {
                this.props.onBlur(this.props.stat, value);
            }
        }
    }

    handleOnChange() {
        if (this.defaultTypeahead.current) {
            let value = Typeahead.getValidData(this.props.type, this.props.min, this.props.max, this.defaultTypeahead.current.state.text, this.state.text);
            this.updateActiveItem(this.props.stat, this.props.options, value);
            let e = Typeahead.createDataPlaceholder(this.defaultTypeahead.current.state.text);
            this.props.onChange(this.props.stat, e);
            console.log('dead');
        }
    }

    updateActiveItem(id, options, value, index = -1) {
        let dropdown = document.getElementById(id);
        if (dropdown) {
            let maxScrollLength = Typeahead.getMaxScrollLength(dropdown);
            if ((index = options.indexOf(value.toString())) >= 0) {
                dropdown.scrollTop = (maxScrollLength / options.length) * (index + 0.5);
            } else {
                if (this.state.order === false) {
                    dropdown.scrollTop = dropdown.scrollTopMax;
                } else {
                    dropdown.scrollTop = 0;
                }
            }
            return true;
        }
        return false;
    }

    static getMaxScrollLength(input) {
        if ('scrollTopMax' in input) {
            return input.scrollTopMax;
        } else {
            return input.scrollHeight - input.clientHeight;
        }
    }

    static createDataPlaceholder(value) {
        return {target: {value: value}};
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
        if (this.props.value !== undefined && this.props.options && this.props.stat && this.props.onChange) {
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