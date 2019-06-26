import React, {Component} from 'react';
import FormField from '../widgets/FormFields/formFields';
import styles from './dashboard.min.css';
import {firebaseTeams, firebaseArticles, firebase} from '../../firebase';


import {Editor} from 'react-draft-wysiwyg';
import {EditorState, convertFromRaw, convertToRaw} from 'draft-js';
import {stateToHTML} from "draft-js-export-html";

import Uploader from '../widgets/FileUploader/fileuploader';

class Dashboard extends Component {
    state = {
        editorState: EditorState.createEmpty(), // creates the empty editor
        postError: '',
        loading: false,
        formData: {
            author: {
                element: 'input',
                value: '',
                config: {
                    name: 'author_input',
                    type: 'text',
                    placeholder: 'enter the author'
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            title: {
                element: 'input',
                value: '',
                config: {
                    name: 'title_input',
                    type: 'text',
                    placeholder: 'enter the title'
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            body: {
                id: 'texteditor',
                value: '',
                valid: true
            },
            teams: {
                element: 'select',
                value: '',
                config: {
                    name: 'teams_input',
                    options: []
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            image: {
                element: 'image',
                value: '',
                valid: true
            }

        }
    }

    // Grabbing the teams while component did mount

    componentDidMount(){
        this.loadTeams()
    }

    // Loading the teams information from Firebase

    loadTeams = () => {
        firebaseTeams.once('value')
        .then((snapshot) => {
            let teams = [];
            snapshot.forEach((childSnapshot) => {
                teams.push({
                    id: childSnapshot.val().teamId,
                    name: childSnapshot.val().city
                })
            })

            const newFormData = {...this.state.formData};
            const newElement = {...newFormData['teams']};

            newElement.config.options = teams;
            newFormData['teams'] = newElement;

            this.setState({
                formData: newFormData
            })
        })
    }

    // Updating the form
    updateForm = (element, content='') => { 
        //This function receives data on input update from child component with change function
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

        // Checking the second argument of a function.
        // If the second argument exists, setting up the new element value as target value of input from child component
        if(content === '') {
            newElement.value = element.event.target.value;
        } else {
            newElement.value = content;
        }
        newFormData[element.id] = newElement;

        // Setting up the new state. Now the input state remembers what we printed
        this.setState({
            formData: newFormData
        })
    }

    // Function for validate
    validate = (element) => {
        let error = [true, ''];

        // Checking the required validation
        if(element.validation.required) {
            const valid = element.value.trim() !== ''; // Checking if the value is not empty
            const message = `${!valid ? 'This field is required' : ''}`; // If the field is not valid, returning the message
            error = !valid ? [valid, message] : error; // If is not valid, return the error message, if not - return the error (true state and nothing in message)
        }
        return error;
    }

    submitForm = (event, type) => {
        event.preventDefault();
        // Catching the data to submit
        let dataToSubmit = {};
        // Checking if the form is valid
        let formIsValid = true;

        // Loop through form data
        for(let key in this.state.formData) {
            dataToSubmit[key] = this.state.formData[key].value; // Entering the dataToSubmit object value
        }

        console.log(dataToSubmit);

        if(formIsValid) {
            
            // The main target here is to grab the firebase articles and increment the id by one before submitting

            this.setState({
                loading: true,
                postError: ''
            })

            // Grabbing and ordering Firebase artices

            firebaseArticles.orderByChild('id')
            .limitToLast(1).once('value')
            .then(snapshot => {
                let articleId = null;
                snapshot.forEach(childSnapshot => {
                    articleId = childSnapshot.val().id
                });
                
                // Converting the data to the firebase timestamp

                dataToSubmit['date'] = firebase.database.ServerValue.TIMESTAMP
                dataToSubmit['id'] = articleId + 1;
                dataToSubmit['teams'] = parseInt(dataToSubmit['teams']);

                console.log(dataToSubmit);

                // Posting the information to firebase

                firebaseArticles.push(dataToSubmit)
                .then(
                    // Redirecting the user to the post
                    article => {
                        this.props.history.push(`/articles/${article.key}`)
                    }
                ).catch(e => {
                    this.setState({
                        postError: e.message
                    })
                })

            })



        } else {
            this.setState({
                postError: 'Something went wrong'
            })
        }
    }

    // Function that renders the submit buttons and calls the submit function
    submitButton = () => (
        this.state.loading ?
            'Loading...' :
            <div>
                <button type="submit">Add post</button>
            </div>
    )

    // Function that shows an error message
    showError = () => (
        this.state.postError !== '' ?
            <div className={styles.error}>{this.state.postError}</div>
            : ''
    )

    // Function that updates the editor state
    onEditorStateChange = (editorState) => {
        // Converting the data to raw format
        let contentState = editorState.getCurrentContent();
        let rawState = convertToRaw(contentState);

        // Converting the values into HTML
        let html = stateToHTML(contentState);

        // Updating the form
        this.updateForm({id: 'body'}, html);

        // Changing the state value
        this.setState({
            editorState
        })
    }

    // Stores the filename
    storeFilename = (filename) => {
        this.updateForm({id: 'image'}, filename)
    }

    render(){
        return(
            <div className={styles.postContainer}>
                <form onSubmit={this.submitForm}>
                    <h2>Add Post</h2>
                    <FormField
                        id={'author'}
                        formData={this.state.formData.author}
                        change={(element) => this.updateForm(element)} // onchange event
                    />
                    <FormField
                        id={'title'}
                        formData={this.state.formData.title}
                        change={(element) => this.updateForm(element)} // onchange event
                    />

                    <Editor
                        editorState={this.state.editorState}
                        wrapperClassName="myEditor-wrapper"
                        editorClassName="myEditor-editor"
                        onEditorStateChange={this.onEditorStateChange} // Typing in Editor what we typing
                    />
                    <FormField
                        id={'teams'}
                        formData={this.state.formData.teams}
                        change={(element) => this.updateForm(element)} // onchange event
                    />
                    <Uploader 
                        filename={(filename)=>this.storeFilename()}                        
                    />

                    {this.submitButton()}
                    {this.showError()}
                </form>
            </div>
        )
    }
}

export default Dashboard;