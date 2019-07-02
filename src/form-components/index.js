"use strict";
/**
 * This component is currently uncompleted demo for #273
 */

// XXX: no error check in this sample.

// XXX: this sample implementation replace *ALL* FormControl which has componentClass
// that may have unexpected replace. we does not expect manual input for text value.
// (e.g. profile Job ... produce undefined reference, because manual input job does not exists in Jobs table)
//
// solution: add flag <FormControl switchable={true} ... />
//           that would be the minimam change for original code.
//           or another way to detect the switch for number input only.


const React = require('react');
const {Component:DefaultComponent} = require('./backend/bootstrap');


function SwitchComponent(props, backend="bootstrap") {
    // Swtich component class for componentClass="select" type="number" only
    if (props.componentClass && props.componentClass === "select")
    {
        const {Component} = require("./backend/" + (props.backend || backend));

        // avoid duplicate props.children
        const newProps = Object.assign({}, props);
        delete newProps.children;

        return <>
            {props.debug ? <p>backend: {props.backend || "bootstrap"}</p> : ""}
            <Component {...newProps}>{props.children}</Component>
            </>;
    }

    return <DefaultComponent {...props} />;
}


module.exports.SwitchComponent = SwitchComponent;

// for Bind 2nd "backend" parameter
module.exports.getFormControlClass = (backend) => (props) => SwitchComponent(props, backend);
