const errorTexts = {
    default: {
        empty: "Field should not be empty",
        tooShort: "Value length is short",
        tooLong: "Value's length is too long",
        invalidCharacters: "Value having invalid charactrs"
    }
};

const rules = {
    inutfield: {
        minLength: 1,
        maxLength: 70,
        pattern: /^[a-zA-Z0-9 .-]*$/
    },
    email: {
        minLength: 1,
        maxLength: 70,
        pattern: /^[a-zA-Z0-9 .-]*$/
    }
};

const customConfig = {
    onDirectActions: [],
    onBlurActions: ['empty', 'tooShort', 'tooLong', 'invalidCharacters'],
    default: "onBlurActions"
}

export {
    errorTexts,
    rules,
    customConfig
}