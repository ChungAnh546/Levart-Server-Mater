const express = require('express');

const app = express();
const { addDelayEventOrder, evenListenerBookTourExprination, configRedisDelayOrder } = require('./src/config/config.redis');
configRedisDelayOrder();
//evenListenerBookTourExprination();
app.get('/order', async (req, res) => {
    try {
        const id = req.query.id;
        console.log(id);
        await addDelayEventOrder(id, 5);

        return res.json({
            status: 'success',
            msg: {}
        })
    } catch (error) {
        console.log(error);
        //await addDelayEventOrder(678, 5);
    }
});

app.listen(3000, () => {
    console.log('The server running at 3000');
})