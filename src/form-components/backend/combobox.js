"use strict";

const React = require('react');
const Combobox = require('react-widgets/lib/Combobox');


// TODO: onChange event
// TODO: onBlur event
// TODO: min/max check, etc ...
// XXX: z-index is issue for this component too
//      seem it's known issue, reported in alot siimlar dropdown library.


class CustomComboboxComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: props.value
        };

        // Convert <option key="" value="">...</option>
        this.data = props.children.map(item => ({
                        key: item.key,
                        value: item.props.value,
                        label: item.props.children}));

        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleOnChange(value) {
        // adapter for accessible via e.target.value
        const {props: {onChange}} = this;

        // XXX: ad-hoc fix for CriticalBuffField's child
        value = isNaN(value) ? value.value : value;

        if (onChange) {
            onChange({
                target: {
                    value
                }
            });
        }

        this.setState({value: value});
    }

    renderItem({item}) {
        return <div class="list-item">
            <span class="item-label">1 {item.label}</span>
        </div>;
    }

    render() {
        const {props:{className, debug}, state:{value}, data, ListItem} = this;

        return <>
            <Combobox
                data={data}
                defaultValue={value}
                itemComponent={ListItem}
                {...(className ? {className} : {})}
                onChange={this.handleOnChange.bind(this)}
                onSelect={item => this.setState({value: item.value})}
                textField="label"
                valueField="value" />
            {debug ? <p>TODO: onBlur event</p> : ""}
            </>;
    }
}

module.exports.Component = CustomComboboxComponent;
