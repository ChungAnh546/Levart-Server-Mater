const express = require('express');
const app = express();
const { evenListenerBookTourExprination } = require('./src/config/config.redis');
evenListenerBookTourExprination();

app.listen(3010, () => {
    console.log('Event listen running at 3010');
})