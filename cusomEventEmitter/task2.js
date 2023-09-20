const EventEmitter = require("./task1.js");

class WithTime extends EventEmitter {
    execute(asyncFunc, ...args) {
        this.emit('begin');
        console.time('execute time');

        asyncFunc(...args, (err, data) => {
            if (err) {
                return this.emit('error', err);
            }

            this.emit('data', data);
            console.timeEnd('execute time');
            this.emit('end');
        });
    }
}

const withTime = new WithTime();

withTime.on('begin', () => console.log('About to execute'));
withTime.on('end', () => console.log('Done with execute'));

const readFile = (url, cb) => {
    fetch(url)
        .then((resp) => resp.json())
        .then(function(data) {
            cb(null, data);
        });
}

withTime.execute(readFile, 'https://jsonplaceholder.typicode.com/posts/1');
