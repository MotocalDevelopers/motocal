"use strict";

const React = require('react');
const {Menu, MenuItem} = require('react-bootstrap-typeahead');
const DefaultTypeahead = require('react-bootstrap-typeahead').Typeahead;
const {InputGroup} = require('react-bootstrap');
const PropTypes = require('prop-types').PropTypes;
const Utilities = require('./utilities');

class Typeahead extends React.Component {
    constructor(props) {
        super(props);
        DefaultTypeahead.defaultProps.positionFixed = true;
        DefaultTypeahead.defaultProps.align = "left";
        DefaultTypeahead.defaultProps.highlightOnlyResult = true;
        DefaultTypeahead.defaultProps.flip = true;
        this.state = {
            text: props.value.toString(),
            order: true
        };
        this.defaultTypeahead = React.createRef();
        this.observer = undefined;
    }

    handleOnFocus() {
        if (this.defaultTypeahead.current) {
            this.setState({text: this.props.value.toString()});
            this.updateActiveItem(this.props.stat, this.props.options, this.state.text, this.state.order);
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
            this.updateActiveItem(this.props.stat, this.props.options, value, this.state.order);
            let e = Typeahead.createDataPlaceholder(this.defaultTypeahead.current.state.text);
            this.props.onChange(this.props.stat, e);
        }
    }

    updateActiveItem(id, options, value, order, index = -1) {
        let dropdown = document.getElementById(id);
        if (dropdown) {
            let maxScrollLength = Typeahead.getMaxScrollLength(dropdown);
            if ((index = options.indexOf(value.toString())) >= 0) {
                if (!order) {
                    index = options.length - index - 1;
                }
                dropdown.scrollTop = (maxScrollLength / options.length) * (index + 0.5);
            } else {
                if (this.state.order === false) {
                    dropdown.scrollTop = maxScrollLength
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
        if (!this.state.order) {
            results = results.reverse();
        }
        return (
            <Menu {...menuProps}>
                {
                    results.map(
                        (result, index) => (
                            <MenuItem option={result.id || result}
                                      position={index}
                                      className={(this.props.value.toString() === result) ? "active" : ""}
                                      key={index}>
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

    createObserver(instance, ref) {
        // eslint-disable-next-line no-undef
        let observerInstance = MutationObserver || WebKitMutationObserver || MozMutationObserver;
        this.observer = new observerInstance(function (mutations) {
            mutations.forEach(function () {
                this.updateScreenOrientation(instance, ref);
            });
        });
    }

    updateScreenOrientation(instance, ref) {
        if (instance.state.order !== $(ref.getInput()).offset().top < $('#' + ref.props.id).offset().top) {
            instance.setState({order: !instance.state.order});
            this.updateActiveItem(instance.props.stat, instance.props.options, ref.state.text, instance.state.order);
        }
    }

    onMenuToggle(isOpen) {
        if (isOpen) {
            $('#' + this.props.stat).ready(() => {
                this.updateScreenOrientation(this, this.defaultTypeahead.current);
                let menu = document.getElementById(this.props.stat);
                this.createObserver(this, this.defaultTypeahead.current);
                this.observer.observe(menu, {
                    attributes: true,
                    attributeFilter: ['style']
                });
            });
        } else {
            if (this.observer) {
                this.observer.disconnect();
                this.observer = undefined;
            }
        }
    }

    render() {
        let typeahead = "";
        if (this.props.value !== undefined && this.props.options && this.props.stat && this.props.onChange) {
            typeahead = <DefaultTypeahead
                id={this.props.stat}
                selected={[Utilities.getLabelFromId(this.props.options, this.props.value.toString())]}
                onFocus={this.handleOnFocus.bind(this)}
                onBlur={this.handleOnBlur.bind(this)}
                onChange={this.handleOnChange.bind(this)}
                renderMenu={this.renderMenu.bind(this)}
                onMenuToggle={this.onMenuToggle.bind(this)}
                filterBy={this.filterResults.bind(this)}
                ref={this.defaultTypeahead}
                options={this.props.options}/>
        }

        if (this.props.addon) {
            typeahead = <InputGroup>{typeahead}<InputGroup.Addon>{this.props.addon}</InputGroup.Addon></InputGroup>
        }

        return typeahead
    }

}

Typeahead.propTypes = {
    value: PropTypes.any.isRequired,
    options: PropTypes.arrayOf(PropTypes.any).isRequired,
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