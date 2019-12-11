'use strict';

export function validateField(fieldName, value) {
    let isValid = false;

    switch (fieldName) {
        case 'email':
            isValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            break;
        case 'password':
            isValid = value.length >= 6;
            break;
        default:
            break;
    }
    return isValid;
}

