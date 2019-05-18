import React, { Component } from 'react'
import withValidation from './withValidation';

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
                <div className="error-message">{this.props.error.firstname}</div>
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
                <div className="error-message">{this.props.error.lastname}</div>
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
                <div className="error-message">{this.props.error.password}</div>
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
                <div className="error-message">{this.props.error.email}</div>
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

export default withValidation(FormComp);