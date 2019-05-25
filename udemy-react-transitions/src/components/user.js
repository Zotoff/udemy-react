import React, {Component} from 'react';
import UserTemplate from './user_template';

class User extends Component {
    state = {
        name: 'Francis',
        lastname: 'Jones',
        age: 25,
        hobbies: ['drinking', 'joking'],
        spanish: true,
        message(){console.log('Hey')},
        mother: 'Martha'
    }
    render() {
        return (
            <div>
                <UserTemplate {...this.state}/>
            </div>
        )
    }
}

export default User;