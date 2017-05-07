module.exports = {
    "extends": "airbnb",
    rules: {
        "react/prefer-stateless-function": 0,
        "no-else-return": 0,
        "react/jsx-filename-extension": 0,
        "class-methods-use-this": 0,
    },
    globals: {
        _: true,
        React: true,
        document: true,
        PropTypes: true,
    }
};
