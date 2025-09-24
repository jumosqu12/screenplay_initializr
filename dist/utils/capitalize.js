"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.smartCapitalize = smartCapitalize;
function smartCapitalize(text) {
    return text
        .replace(/([a-z])([A-Z0-9])/g, '$1 $2') // minúscula seguida de mayúscula o número
        .replace(/([0-9])([a-zA-Z])/g, '$1 $2') // número seguido de letra
        .split(/[\s_]+/) // divide por espacio o guión bajo si existiera
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join('');
}
//# sourceMappingURL=capitalize.js.map