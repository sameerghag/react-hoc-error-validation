import React, {Component} from 'react';

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

const withValidation = (config, WrappedComponent) => {
    return class WithValidator extends Component {
        constructor(props) {
            super(props);
       
            this.state = {
                error: config.rules
            };
        }

        handleOnBlur = (name = 'default', stateProps) => {
            const errorObj = Object.assign({}, this.state.error);
            const errorTexts = config.errorTexts;
            const rules = config.rules;
            
            const isValid = Validator.validate({value: stateProps[name].trim(), state: stateProps, rules: rules[name]});
            errorObj[name].invalid = false;
            if (!!isValid) {
                errorObj[name].invalid = errorTexts[name][isValid] ? errorTexts[name][isValid] : errorTexts.default[isValid];
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