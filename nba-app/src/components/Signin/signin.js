import React, {Component} from 'react';
import styles from './signin.css';
import {firebase} from '../../firebase';


import FormField from '../widgets/FormFields/formFields'

class Signin extends Component {
    state = {
        registerError: '',
        loading: false,
        formData: {
            email: {
                element: 'input',
                value: '',
                config: {
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'enter your email'
                },
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            password: {
                element: 'input',
                value: '',
                config: {
                    name: 'passwordl_input',
                    type: 'password',
                    placeholder: 'enter your password'
                },
                validation: {
                    required: true,
                    password: true
                },
                valid: false,
                touched: false,
                validationMessage: ''
            }
        }
    }

    updateForm = (element) => { //This function receives data on input update from child component with change function
        // Updating the state with the data from child component
        // Making the copy of prev state
        const newFormData = {
            ...this.state.formData
        }
        // What element we need to change. Id regards to element which changes
        const newElement = {
            ...newFormData[element.id]
        }

        // Checking the validation
        if(element.blur){
            let validData = this.validate(newElement);

            // Storing true or false in the valid element state
            newElement.valid = validData[0];
            // Adding the validation message from the function below to the state
            newElement.validationMessage = validData[1];

        }

        // Adding the touched state from the child element
        newElement.touched = element.blur;

        // Setting up the new element value as target value of input from child component
        newElement.value = element.event.target.value;
        newFormData[element.id] = newElement;
       
        // Setting up the new state. Now the input state remembers what we printed
        this.setState({
            formData: newFormData
        })
    }

    // Function for validate
    validate = (element) => {
        let error = [true, ''];

        // Checking the email validation
        if(element.validation.email) {
            const valid = /\S+@\S+\.\S+/.test(element.value); // Checking the value with regexp 
            const message = `${!valid ? 'Please enter the valid email' : ''}`; // If the field is not valid, returning the message
            error = !valid ? [valid, message] : error; // If is not valid, return the error message, if not - return the error (true state and nothing in message)
        }


        // Checking the password validation
        if(element.validation.password) {
            const valid = element.value.length >= 5; // Checking if the value is greater than 5 and 
            const message = `${!valid ? 'Must be greater than 5' : ''}`; // If the field is not valid, returning the message
            error = !valid ? [valid, message] : error; // If is not valid, return the error message, if not - return the error (true state and nothing in message)
        }


        // Checking the required validation
        if(element.validation.required) {
            const valid = element.value.trim() !== ''; // Checking if the value is not empty
            const message = `${!valid ? 'This field is required' : ''}`; // If the field is not valid, returning the message
            error = !valid ? [valid, message] : error; // If is not valid, return the error message, if not - return the error (true state and nothing in message)
        }
        return error;
    }

    // Function that submits the form. Event = event, type = true,false
    submitForm = (event, type) => {
        event.preventDefault();

        if(type !== null) {
            // Catching the data to submit
            let dataToSubmit = {};
            // Checking if the form is valid
            let formIsValid = true;

            // Loop through form data
            for(let key in this.state.formData) {
                dataToSubmit[key] = this.state.formData[key].value; // Entering the dataToSubmit object value
            }

            // Checking if the inputs are valid
            for(let key in this.state.formData) {
               formIsValid = this.state.formData[key].valid && formIsValid; // formIsValid is now true when key valid in formData is true and formIsValid is true
            }

            // If the form is valid
            if(formIsValid) {
                this.setState({
                    loading: true,
                    registerError: ''
                })
                
                //Checking if we want to register or login
                if(type) {
                    firebase.auth().signInWithEmailAndPassword(
                        dataToSubmit.email,
                        dataToSubmit.password
                    ).then(()=>{ //Promise when user is registered
                        this.props.history.push('/') //redirecting the user when registered
                    }).catch(error => {
                        this.setState({
                            loading: false,
                            registerError: error.message
                        })
                    })

                }else{
                    // Creating the register actions
                    firebase.auth()
                    .createUserWithEmailAndPassword(
                        dataToSubmit.email,
                        dataToSubmit.password
                    )
                    .then(()=>{ //Promise when user is registered
                        this.props.history.push('/') //redirecting the user when registered
                    }).catch(error => {
                        this.setState({
                            loading: false,
                            registerError: error.message
                        })
                    })
                }
            }
        }
    }

    // Function that renders the submit buttons and calls the submit function
    submitButton = () => (
        this.state.loading ? 
        'Loading...' :
        <div>
            <button onClick={(event) => {this.submitForm(event, false)}}>Register now</button>
            <button onClick={(event) => {this.submitForm(event, true)}}>Log in</button>
        </div>
    )

    // Function that shows an error message
    showError = () => (
        this.state.registerError !== '' ? 
        <div className={styles.error}>{this.state.registerError}</div>
        : ''
    )

    render(){
        return (
            <div className={styles.logContainer}>
                <form onSubmit={(event) => {this.submitForm(event, null)}}>
                    <h2>Register or log in</h2>
                    <FormField 
                        id={'email'}
                        formData={this.state.formData.email}
                        change={(element) => this.updateForm(element)} // onchange event
                    />
                    <FormField 
                        id={'password'}
                        formData={this.state.formData.password}
                        change={(element) => this.updateForm(element)} // onchange event
                    />

                    {this.submitButton()}
                    {this.showError()}
                </form>
            </div>
        )
    }
}

export default Signin;