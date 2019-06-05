import React, { Component } from 'react';
import FormFields from '../widgets/Forms/formFields';

class User extends Component {

    state = {
        formData: {
            name: {
                element: 'input',
                value: '',
                label: true,
                labelText: 'Name',
                config: {
                    name: 'name_input',
                    type: 'text',
                    placeholder: 'enter your name'
                },
                validation: {
                    required: true,
                    minLen: 5
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            lastname: {
                element: 'input',
                value: '',
                label: true,
                labelText: 'Lastname',
                config: {
                    name: 'lastname_input',
                    type: 'text',
                    placeholder: 'enter your lastname'
                },
                validation: {
                    required: false
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            message: {
                element: 'textarea',
                value: '',
                label: true,
                labelText: 'Message',
                config: {
                    name: 'message',
                    rows: 4,
                    cols: 36

                },
                validation: {
                    required: false
                },
                valid: true
            },
            age: {
                element: 'select',
                value: '',
                label: true,
                labelText: 'age',
                config: {
                    name: 'age_input',
                    options: [
                        {val: '1', text: '10-20'},
                        {val: '2', text: '20-30'},
                        {val: '3', text: '30+'}
                    ]

                },
                validation: {
                    required: false
                },
                valid: true
            }
        }
    }

    updateForm = (newState) => {
        this.setState({
            formData: newState
        })
    }

    submitForm = (event) => {
        event.preventDefault();
        let formIsValid = true;

        let dataToSubmit = {};

        for(let key in this.state.formData) {
            dataToSubmit[key] = this.state.formData[key].value
        }

        // Checking for all validations and submitting the form

        for(let key in this.state.formData) {
            formIsValid = this.state.formData[key].valid && formIsValid;
        }
        if(formIsValid) {
            console.log(dataToSubmit);
        }
    }

    render(){
        return(
            <div className="container">
                <form onSubmit={this.submitForm}>
                    <FormFields 
                        formData = {this.state.formData}
                        onblur = {(newState) => this.updateForm(newState)}
                        change={(newState) => this.updateForm(newState)}                        
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default User;