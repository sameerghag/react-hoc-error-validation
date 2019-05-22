const errorTexts = {
    default: {
        empty: "Field should not be empty",
        tooShort: "Value length is short",
        tooLong: "Value's length is too long",
        invalidCharacters: "Value having invalid charactrs"
    },
    /*
    firstname: {
        empty: "Firstname should not be empty",
        tooLong: "Firstname should be less than 10 characters",
    },
    lastname: {
        empty: "Lastname should not be empty"
    },
    password: {
        empty: "Password should not be empty"
    },
    email: {
        empty: "Email should not be empty"
    }
    */
};

const rules = {
    firstname: {
        minLength: 1,
        maxLength: 10,
        pattern: /^[a-zA-Z0-9 .-]*$/
    },
    lastname: {
        minLength: 1,
        maxLength: 70,
        pattern: /^[a-zA-Z0-9 .-]*$/
    },
    password: {
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
};