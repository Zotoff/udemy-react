import React, { Component } from 'react';

class Controlled extends Component {

    state = {
        name: '',
        lastname: ''
    }


    handleNameChange = (event) => {
        this.setState({
            name: event.target.value
        })
    }
    handleLastNameChange = (event) => {
        this.setState({
            lastname: event.target.value
        })
    }

    submitHandler = (event) => {
        event.preventDefault();
        console.log(this.state);
    }

    render(){
        return(
            <div className="container">
                <form onSubmit={this.submitHandler}>
                    <div className="form_element">
                        <label>Enter name</label>
                        <input type="text" value={this.state.name} onChange={this.handleNameChange}/>
                    </div>
                    <div className="form_element">
                        <label>Enter Lastname</label>
                        <input type="text" value={this.state.lastname} onChange={this.handleLastNameChange}/>
                    </div>
                    <button>Sign in</button>
                </form>
            </div>
        )
    }
}

export default Controlled;