'use strict';

/**
 * makeState
 * @param {object} initState
 * @param {object} oldState
 * @param {string} locale {"ja", "en", "zh"}
 * @return {object} newState
 */
export function make_state(initState, oldState, locale="ja", dataName="serverData") {
    return Object.assign({}, oldState, {
        locale: locale,
        dataName: dataName,
        dataForLoad: initState
    });
}
