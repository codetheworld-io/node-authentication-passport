// config/auth.js

module.exports = {

    'facebookAuth': {
        'clientID': process.env.FACEBOOK_ID, // App ID của bản
        'clientSecret': process.env.FACEBOOK_SECRET, // App Secret của bạn
        'callbackURL': 'http://localhost:8080/auth/facebook/callback'
    },

    'twitterAuth': {
        'consumerKey': process.env.TWITTER_KEY,
        'consumerSecret': process.env.SECRET,
        'callbackURL': 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth': {
        'clientID': process.env.GOOGLE_ID,
        'clientSecret': process.env.GOOGLE_SECRET,
        'callbackURL': 'http://localhost:8080/auth/google/callback'
    }

};