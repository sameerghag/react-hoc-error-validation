import React, { Component } from 'react'
import withValidation from './withValidation';

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

const customConfig = {
    onDirectActions: [],
    onBlurActions: ['empty', 'tooShort', 'tooLong', 'invalidCharacters'],
    default: "onBlurActions"
}
class FormComp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstname: '',
            lastname: '',
            password: '',
            email: '',
        };
    }

    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
    }

    render() {
        return (
        <div className="form-component">
            <div>
                <label>First Name: </label><br />
                <input 
                    type="text" 
                    name="firstname" 
                    id="firstname" 
                    value={this.state.firstname}
                    onChange={(e) => this.handleOnChange(e)}
                    onBlur={(e) => this.props.handleOnBlur(e.target.name, this.state)}
                />
                <div className="error-message">{this.props.error.firstname.invalid}</div>
            </div>
            <div>
                <label>Last Name: </label><br />
                <input 
                    type="text" 
                    name="lastname" 
                    id="lastname" 
                    value={this.state.lastname}
                    onChange={(e) => this.handleOnChange(e)}
                    onBlur={(e) => this.props.handleOnBlur(e.target.name, this.state)}
                />
                <div className="error-message">{this.props.error.lastname.invalid}</div>
            </div>
            <div>
                <label>Password: </label><br />
                <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    value={this.state.password}
                    onChange={(e) => this.handleOnChange(e)}
                    onBlur={(e) => this.props.handleOnBlur(e.target.name, this.state)}
                />
                <div className="error-message">{this.props.error.password.invalid}</div>
            </div>
            <div>
                <label>Email: </label><br />
                <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    value={this.state.email}
                    onChange={(e) => this.handleOnChange(e)}
                    onBlur={(e) => this.props.handleOnBlur(e.target.name, this.state)}
                />
                <div className="error-message">{this.props.error.email.invalid}</div>
            </div>
            <div>
                <button 
                    type="submit" 
                    name="submit"
                    onClick={(e) => this.handleSubmit(e)}
                >
                    Submit
                </button>
            </div>
        </div>
        )
    }
}

export default withValidation({rules, errorTexts, customConfig}, FormComp);