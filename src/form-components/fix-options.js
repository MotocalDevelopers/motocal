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


module.exports = fix;
