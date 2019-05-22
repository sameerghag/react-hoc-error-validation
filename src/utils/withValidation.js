import React, {Component} from 'react';
import {errorTexts, rules, customConfig} from './basicValidationConfig';

class Validator {
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
            
            this.errorTexts = Object.assign({}, config.errorTexts, errorTexts);
            this.rules = Object.assign({}, config.rules, rules);
            this.customConfig = config.customConfig ? config.customConfig : customConfig;
            
            this.state = {
                error: this.rules
            };
        }

        handleOnBlur = (name = 'default', stateProps) => {
            const errorObj = Object.assign({}, this.state.error);
            
            const isValid = Validator.validate({value: stateProps[name].trim(), state: stateProps, rules: this.rules[name]});
            errorObj[name].invalid = false;
            if (!!isValid) {
                errorObj[name].invalid = this.errorTexts[name] && this.errorTexts[name][isValid] ? this.errorTexts[name][isValid] : this.errorTexts.default[isValid];
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