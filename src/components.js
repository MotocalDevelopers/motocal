"use strict";

const React = require('react');
const {FormControl, InputGroup} = require('react-bootstrap');
const Typeahead = require('react-bootstrap-typeahead').Typeahead;
const intl = require('./translate.js');
const {selector, generateTypeaheadData} = require('./global_const.js');

/**
 * Dynamic List component for Critical Buff inputs
 */
class CriticalBuffList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            count: props.initialCount || props.criticalArray.length,
            array: props.criticalArray
        };
    }

    /**
     * Notify event
     *
     * @param {number} count
     */
    handleOnCountChange(count) {
        if (this.props.onCountChange) {
            this.props.onCountChange(count);
        }
    }

    /**
     * Notify event
     * @param {Object} ref ... Reference of the input
     */
    handleOnBlur(e, ref) {
        if (this.props.onBlur) {
            if (ref) {
                this.props.onBlur(ref, "CriticalStatePlaceholder");
            }
        }
    }

    /**
     * Notify event
     * @param {Object} ref ... Reference of the input
     * @param {Object} e  ... Event
     */
    handleOnFocus(ref, e) {
        if (this.props.onFocus) {
            this.props.onFocus(ref, e);
        }
    }

    /**
     * @param {string} key
     * @param {number} idx
     * @param {Object} e  ... Event object
     *
     * when key is "count":
     *   Change array's size if needed.
     *
     * when key is "value" or "attackRatio":
     *   update value
     *
     */
    handleOnChange(key, idx, e) {
        let array = this.props.criticalArray;

        if (key === "count") {
            const count = e.target.value;

            while (count > array.length) {
                array.push({value: 0.0, attackRatio: 0.0});
            }
            if (array.length > count && this.props.truncate) {
                array.length = count;
            }

            this.setState({count: count, array: array});
            this.handleOnCountChange(count);
        } else if (key === "value" || key === "attackRatio") {
            array[idx][key] = e / 100;

            this.setState({array: array});
        }
    }

    /**
     * Render Count form and list of Value/AttackRatio forms
     *
     * @return {ReactElement}
     */
    render() {
        const {state: {count, array}, props: {locale, label, maxCount}} = this;

        return <React.Fragment>
            <strong>{intl.translate("数", locale)}</strong>
            <FormControl type="number"
                         min="0" max={maxCount} value={count}
                         onBlur={(e) => this.handleOnBlur(e, this.countField)}
                         onFocus={(e) => this.handleOnFocus(this.countField, e)}
                         ref={(ref) => this.countField = ref}
                         onChange={this.handleOnChange.bind(this, "count", null)}/>
            {array.slice(0, count).map(({value, attackRatio}, idx) =>
                <div key={label + idx}>
                    <strong>{intl.translate("発動率", locale)}#{idx + 1}</strong>
                    <InputGroup>
                        <Typeahead
                            id="criticalRateField"
                            defaultInputValue={(Math.round(100 * value)).toString()}
                            inputProps={generateTypeaheadData("number", '0', '100')}
                            labelKey={"value"}
                            onBlur={(e) => (this.handleOnBlur(e, this.state["criticalRateFieldTypeahead" + idx]))}
                            onChange={(e) => (this.handleOnChange("value", idx, e[0]))}
                            onInputChange={(e) => (this.handleOnChange("value", idx, e))}
                            onFocus={(e) => (this.handleOnFocus(this.state["criticalRateFieldTypeahead" + idx], e))}
                            renderMenu={(results, props) => this.props.renderMenu(results, props, this.state["criticalRateFieldTypeahead" + idx])}
                            filterBy={(a, b) => this.props.filterBy(a, b, this.props.placeHolder)}
                            ref={(ref) => this.state["criticalRateFieldTypeahead" + idx] = ref}
                            options={selector.criticalRateLevel}/>
                        <InputGroup.Addon>%</InputGroup.Addon>
                    </InputGroup>
                    <strong>{intl.translate("倍率", locale)}#{idx + 1}</strong>
                    <InputGroup>
                        <Typeahead
                            id="attackRatioField"
                            defaultInputValue={(Math.round(100 * attackRatio)).toString()}
                            inputProps={generateTypeaheadData("number", '0', '1000')}
                            labelKey={"attackRatio"}
                            onBlur={(e) => (this.handleOnBlur(e, this.state["attackRatioFieldTypeahead" + idx]))}
                            onChange={(e) => (this.handleOnChange("attackRatio", idx, e[0]))}
                            onInputChange={(e) => (this.handleOnChange("attackRatio", idx, e))}
                            renderMenu={(results, props) => this.props.renderMenu(results, props, this.state["attackRatioFieldTypeahead" + idx])}
                            filterBy={(a, b) => this.props.filterBy(a, b, this.props.placeHolder)}
                            onFocus={(e) => (this.handleOnFocus(this.state["attackRatioFieldTypeahead" + idx], e))}
                            ref={(ref) => this.state["attackRatioFieldTypeahead" + idx] = ref}
                            options={selector.buffLevel}/>
                        <InputGroup.Addon>%</InputGroup.Addon>
                    </InputGroup>
                </div>)}
        </React.Fragment>;
    }
}

CriticalBuffList.defaultProps = {
    maxCount: 20,
    initialCount: 0,
    truncate: true,
    label: "criticalBuff",
};


module.exports.CriticalBuffList = CriticalBuffList;
