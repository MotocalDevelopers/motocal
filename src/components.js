"use strict";

const React = require('react');
const {FormControl, InputGroup} = require('react-bootstrap');
const intl = require('./translate.js');
const {selector} = require('./global_const.js');


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
     *
     * @param {string} key ... UNUSED
     * @param {Object} e  ... Event object
     */
    handleOnBlur(key, e){
        if (this.props.onBlur) {
            this.props.onBlur(e);
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
            const val = parseInt(e.target.value);

            array[idx][key] = val / 100;

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
              onBlur={this.handleOnBlur.bind(this)}
              onChange={this.handleOnChange.bind(this, "count", null)}/>
            {array.slice(0, count).map(({value,attackRatio}, idx) =>
            <div key={label + idx}>
                <strong>{intl.translate("発動率", locale)}#{idx+1}</strong>
                <InputGroup>
                    <FormControl
                      componentClass="select"
                      value={Math.round(100*value)}
                      onBlur={this.handleOnBlur.bind(this)}
                      onChange={this.handleOnChange.bind(this, "value", idx)}>
                      {selector.criticalRateLevel}
                    </FormControl>
                    <InputGroup.Addon>%</InputGroup.Addon>
                </InputGroup>
                <strong>{intl.translate("倍率", locale)}#{idx+1}</strong>
                <InputGroup>
                    <FormControl
                      componentClass="select"
                      value={Math.round(100*attackRatio)}
                      onBlur={this.handleOnBlur.bind(this)}
                      onChange={this.handleOnChange.bind(this, "attackRatio", idx)}>
                    {selector.buffLevel}
                    </FormControl>
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
