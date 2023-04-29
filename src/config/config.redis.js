'use strict';
const redis = require('redis');
const client = redis.createClient(
    {
        port: 6379,
        host: "127.0.0.1"
    }
    // {
    //     socket: {
    //         host: 'redis-13309.c267.us-east-1-4.ec2.cloud.redislabs.com',
    //         port: '13309'
    //     },
    //     username: 'default',
    //     password: 'fkobQAerxCUk3KqkJnlN2pscXcAC9G28'
    // }
);
client.on('error', err => console.log('Redis Server Error', err));

// Cấu hình Redis Server để phát ra thông báo sự kiện khi một khóa đã hết hạn
//client.config('SET', 'notify-keyspace-events', 'Ex');

const get = async (key) => {
    return new Promise((resolve, reject) => {
        client.get(key, (err, result) => {
            if (err) {
                return reject(err)
            }
            resolve(result)
        })
    })

}

const set = async (key, count) => {
    return new Promise((resolve, reject) => {
        client.set(key, count, (err, result) => {
            if (err) {
                return reject(err)
            }
            resolve(result)
        })
    })
}

const incrby = async (key, count) => {
    return new Promise((resolve, reject) => {
        client.incrby(key, count, (err, result) => {
            if (err) {
                return reject(err)
            }
            resolve(result)
        })
    })
}

const decrby = async (key, count) => {
    return new Promise((resolve, reject) => {
        client.decrby(key, count, (err, result) => {
            if (err) {
                return reject(err)
            }
            resolve(resolve)
        })
    })
}

const exists = async (key) => {
    return new Promise((resolve, reject) => {
        client.exists(key, (err, result) => {
            if (err) {
                return reject(err)
            }
            resolve(result)
        })
    })
}
const setnx = async (key, count) => {
    return new Promise((resolve, reject) => {
        client.setnx(key, count, (err, result) => {
            if (err) {
                return reject(err)
            }
            resolve(result)
        })
    })
}
const configRedisDelayOrder = () => {
    client.config("SET", "notify-keyspace-events", "Ex", (err, reply) => {
        if (err) {
            console.log("Không thể thiết lập cấu hình Redis:", err);
        } else {
            console.log("Cấu hình Redis đã được thiết lập:", reply);
        }
    });
}
//đăng kí even npx redis-cli config set notify-keyspace-events Ex
const addDelayEventOrder = (bookTourId, delay) => {
    return new Promise((resolve, reject) => {
        client.set(bookTourId, "Cancel bookTour", "EX", delay, (err, result) => {
            if (err) {
                return reject(err)

            } resolve(result)
        })
    })
}
const evenListenerBookTourExprination = () => {
    client.psubscribe("__keyevent@0__:expired");
    client.on('pmessage', (pattern, channel, message) => {
        console.log(`message: `, message);
    })
}

module.exports = {
    get,
    set,
    incrby,
    decrby,
    exists,
    setnx,
    addDelayEventOrder,
    evenListenerBookTourExprination,
    configRedisDelayOrder
}