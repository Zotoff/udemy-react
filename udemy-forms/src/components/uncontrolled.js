import React, { Component } from 'react';

class Uncontrolled extends Component {

    handleSubmit = (event) => {
        event.preventDefault();
        const value = {
            name: this.name.value,
            lastname: this.lastname.value
        }
        console.log(value);
    }

    render(){
        return(
            <div className="container">
                <form>
                    <div className="form_element">
                        <label>Enter name</label>
                        <input type="text" 
                            ref={input=>this.name=input}
                        />
                    </div>
                    <div className="form_element">
                        <label>Enter Lastname</label>
                        <input type="text"
                             ref={input=>this.lastname=input}
                        />
                    </div>
                    <button onClick={this.handleSubmit}>Sign in</button>
                </form>
            </div>
        )
    }
}

export default Uncontrolled;