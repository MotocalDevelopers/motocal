"use strict";

const React = require('react');
const Combobox = require('react-widgets/lib/Combobox');


// TODO: onChange event
// TODO: onBlur event
// TODO: min/max check, etc ...
// XXX: z-index is issue for this component too
//      seem it's known issue, reported in alot siimlar dropdown library.

/**
 * fixChildren
 *
 * This generator will filter unexpected text node,
 * Original motocal JSX code had spaces in the children.
 *
 * <FormControl> {list} </FormControl>
 *
 * that produce children: ["", Array, ""]
 *
 * we need is Array only.
 *
 * <FormControl>{list}</FormControl> also can solve.
 *
 * but that changes a lot legacy code. (that make code "diff" mess/complex if in mixed topics)
 * clean-up specific single topic should do that task.
 *
 * or pass the list view children is not good for this use case,
 * they can pass via props like ReactWidgets Combobox.
 */
function *fixChildren(children) {
    for (const item of children) {
        if (Array.isArray(item)) {
            yield *item.values();
        }
    }
}

function fix(children) {
    const fixed = Array.from(fixChildren(children));
    return fixed.length === 0 ? children : fixed;
}



class CustomComboboxComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: props.value
        };

        // Convert <option key="" value="">...</option>
        this.data = fix(props.children).map(item => ({
                        key: item.key,
                        value: item.props.value,
                        label: item.props.children}));

        // set notification handler
        this.onChange = props.onChange || (item => {});

        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleOnChange(value) {
        // adapter for accessible via e.target.value
        this.onChange({
            target: {
                value: value
            }
        });

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
