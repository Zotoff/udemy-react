import React from 'react';
import PropTypes from 'prop-types';

const UserTemplate = (props) => {
    return (
        <div>
            Template
        </div>
    );
};

// Checking the proptypes

UserTemplate.propTypes = {
    name:PropTypes.string,
    lastname:PropTypes.string,
    age:PropTypes.number,
    hobbies:PropTypes.array,
    spanish:PropTypes.bool,
    message:PropTypes.func,
    car:PropTypes.object,
}

export default UserTemplate;