const express = require('express');
const app = express();
const { set, get, setnx, incrby, exists } = require('./src/config/config.redis');
//test 2 người mua cùng lúc nhưng số lượng có còn lại là 1 với redis
//dùng apache loughe test ->bin $ ab -n 40 -c 20 http://localhost:3000/order
app.get('/order', async (req, res) => {
    const time = new Date().getTime();
    console.log(`Time request: ${time}`);
    const slTonKho = 10;
    const keyName = 'ip';
    const keyDaBan = 'ipDaBan';
    const slMua = 1;


    const getKey = await exists(keyName);
    if (!getKey) {
        await setnx(keyName, 0);
    }

    const slBanRa = await incrby(keyName, slMua);
    console.log('truoc khi user order thanh cong thi so luong ban ra =', slBanRa);
    if (slBanRa > slTonKho) {
        console.log('Het Hang');
        return res.json({
            status: 'success',
            msg: 'ok',
            time

        });
    } else {
        await incrby(keyDaBan, slMua);
    }



    if (slBanRa > slTonKho) {
        await set('BanQua', slTonKho - slBanRa);
    }
    return res.json({
        status: 'success',
        msg: 'ok',
        time

    })

})
app.listen(3000, () => {
    console.log('The server running at 3000')
})