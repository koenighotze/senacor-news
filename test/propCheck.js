'use strict';

module.exports = {
    hasAllProps(obj, props) {
        return props.reduce((acc, value) => {
            return acc && obj.hasOwnProperty(value);
        }, true);
    },
    allItemsHaveAllProps(array, props) {
        return array.reduce((acc, value) => {
            return acc && this.hasAllProps(value, props)
        }, true);
    }
}