import React, {Component} from 'react';

const errorTexts = {
    default: {
        empty: "Field should not be empty",
        tooShort: "Value length is short",
        tooLong: "Value's length is too long",
        invalidCharacters: "Value having invalid charactrs"
    },
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

class Validator {
    constructor(_ref) {
         console.log(_ref);
    }

    static validate({value, state, rules}) {
        let errorStatus = '';
        if (!value.trim()) {
            errorStatus = 'empty'
        } else if (value.trim().length > rules.maxLength) {
            errorStatus = 'tooLong';
        } else if (value.trim().length < rules.minLength) {
            errorStatus = 'tooShort';
        } else if (!rules.pattern.test(value.trim())) {
            errorStatus = 'invalidCharacters';
        }

        if (rules.check) {
            errorStatus = rules.check({value, state, previousStatus: errorStatus});
        }

        return errorStatus;
    }
}

const withValidation = (WrappedComponent) => {
    return class WithValidator extends Component {
        constructor(props) {
            super(props);
       
            const v = new Validator(WrappedComponent);
            
            this.state = {
                error: {
                    firstname: null,
                    lastname: null,
                    password: null,
                    email: null,
                }
            };
        }

        handleOnBlur = (name = 'default', stateProps) => {
            const errorObj = Object.assign({}, this.state.error);
            
            const isValid = Validator.validate({value: stateProps[name].trim(), state: stateProps, rules: rules[name]});
            if (!!isValid) {
                errorObj[name] = errorTexts[name][isValid] ? errorTexts[name][isValid] : errorTexts.default[isValid];
            }
    
            this.setState({
                error: errorObj
            });
        }

        render() {
            return (
                <WrappedComponent 
                    {...this.props}
                    handleOnBlur={this.handleOnBlur}
                    error={this.state.error} 
                />
            )
        }
    }
}

export default withValidation;