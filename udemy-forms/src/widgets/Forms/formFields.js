import React from 'react';

const FormFields = (props) => {

    const renderFields = () => {
        const formArray = [];

        for(let elementName in props.formData) {
            formArray.push({
                id: elementName,
                settings: props.formData[elementName]
            })
        }

        return formArray.map((item, i) => {
            return (
                <div key={i} className="form_element">
                    {renderTemplates(item)}
                </div>
            )
        })
    }

    const showLabel = (show, label) => {
        return show ? 
            <label>{label}</label>
        : null
    }

    // Working with changes
    const changeHandler = (event, id, blur) => {

        // Grabs the data from props
        const newState = props.formData;
        newState[id].value = event.target.value;

        // Running the validation when focused
        if(blur) {
            // Running checks on an input, newState[id] - which input we check
            let validData = validate(newState[id]);

            newState[id].valid = validData[0];
            newState[id].validationMessage = validData[1];
        }

        // Working with focus
        newState[id].touched = true;
        // Changing the state
        props.change(newState);
    }

    // Receives data, checks the rules
    const validate = (element) => {
        let error = [true, ''];

        // Checking the minLen validation property
        if(element.validation.minLen) {
            // Checking the length of element input
            const valid = element.value.length >= element.validation.minLen;
            const message = `${!valid ? 'min length is ' + element.validation.minLen : ''}`

            error = !valid ? [valid, message] : error
        }

        // Checking the required validation property
        if(element.validation.required){
            const valid = element.value.trim() !== ''; //Trimming the whitespaces
            const message = `${!valid ? 'this field is required' : ''}`

            error = !valid ? [valid, message] : error
        }

        return error;
    }

    // Shows the validation message in the template
    const showValidation = (data) => {
        let errorMessage = null;
        if(data.validation && !data.valid) {
            errorMessage = (
                <div className="label_error">
                    {data.validationMessage}
                </div>
            )
        }
        return errorMessage;
    }

    const renderTemplates = (data) => {
        let values = data.settings;
        let formTemplate = '';

        switch(values.element) {
            case('input'):
                formTemplate = (
                    <div>
                        {showLabel(values.label, values.labelText)}
                        <input 
                            {...values.config}
                            value={values.value}
                            onBlur={
                                (event) => changeHandler(event, data.id, true) //true - for working with blur prop
                            }
                            onChange={
                                (event) => changeHandler(event, data.id, false)
                            }
                        />
                        {showValidation(values)}
                    </div>
                )
            break;
            case('textarea'):
                formTemplate = (
                    <div>
                        {showLabel(values.label, values.labelText)}
                        <textarea
                            {...values.config}
                            value={values.value}
                            onChange={
                                (event) => changeHandler(event, data.id)
                            }
                        ></textarea>
                    </div>
                )
            break;
            case('select'):
                formTemplate = (
                    <div>
                        {showLabel(values.label, values.labelText)}
                        <select
                            value={values.value}
                            name={values.config.name}
                            onChange={
                                (event) => changeHandler(event, data.id)
                            }
                        >
                            {values.config.options.map((item, i) => {
                             return (
                                <option
                                    key={i}
                                    value={item.val}
                                >{item.text}</option>
                             )
                            })}
                        </select>
                    </div>
                )
            break;
            default: 
                formTemplate=null;
            break;
        }
        return formTemplate;
    }



    return (
        <div>
            {renderFields()}
        </div>
    )
}

export default FormFields;