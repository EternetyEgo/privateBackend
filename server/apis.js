const express = require("express");

module.exports = (app) => {
    app.use(express.json());
    app.use(express.static('public'));
    app.use('/api/user', require('../routers/User'));
    app.use('/api/note', require('../routers/Note'));
};
