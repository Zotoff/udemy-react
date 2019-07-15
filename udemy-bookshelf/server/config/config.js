const config = {
    production: {
        SECRET: process.env.SECRET,
        DATABASE: process.env.MONGODB_URI
    },
    default: {
        SECRET: 'SUPERSECRET',
        DATABASE: 'mongodb://localhost:27017/bookShelf'
    }
}

exports.get = function get(env){
    // If the environment is Heroku, returns the production, if not - returns the default params
    return config[env] || config.default;
}