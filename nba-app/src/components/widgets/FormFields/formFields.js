import React from 'react'
import styles from './formFields.css'

const FormField = ({formData, change, id}) => {

    const renderTemplate = () => {
        let formTemplate = null;

        // Function that shows the error message
        const showError = () => {
            let errorMessage = null;

            // If is validation in formData and form element is not valid, rendering the error message
            if(formData.validation && !formData.valid) {
                errorMessage = (
                    <div className={styles.labelError}>
                        {formData.validationMessage}
                    </div>
                )
            }

            return errorMessage;
        }

        // Checking, what we have inside formData and rendering the necessary
        switch(formData.element) {
            case('input'):
                formTemplate = (
                    <div>
                        <input 
                           {...formData.config} // Spread operator for all options in props
                           value={formData.value}
                           onBlur = {(event)=>change({event, id, blur:true})} // Passing the change function from props at blur event
                           onChange={(event)=>change({event, id, blur:false})} // Passing the change function from props at change event
                        />
                        {
                            // Function that shows error message
                            showError()
                        }
                    </div>
                )
            break;
            case('select'):
                formTemplate = (
                    <div>
                        <select
                            value={formData.value}
                            name={formData.config.name}
                            onBlur = {(event)=>change({event, id, blur:true})} // Passing the change function from props at blur event
                            onChange={(event)=>change({event, id, blur:false})} // Passing the change function from props at change event
                        >
                            {formData.config.options.map((item, i) => (
                                <option key={i} value={item.id}>{item.name}</option>
                            ))}
                        </select>
                    </div>
                )
            break;
            default:
                formTemplate = null;
            break;
        }
        // Returning the form template
        return formTemplate;
    }

    return (
        <div>
            {renderTemplate()}
        </div>
    )
}

export default FormField;