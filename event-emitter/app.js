// const EventEmitter = require('events');
const EventEmitter = require('./event-emitter-impl');

const eventEmitter = new EventEmitter();

const FOO = 'foo';
const BAR = 'bar';

const foo1 = () => {
    console.log('foo1 called');
};

const foo2 = () => {
    console.log('foo2 called');
};

const foo3 = (x) => {
    console.log(`foo3 called with argument x: ${x}`);
};

const foo4 = (y) => {
    console.log(`foo4 called with argument y: ${y}`);
};

const bar1 = () => {
    console.log('bar1 called');
};

const bar2 = () => {
    console.log('bar2 called');
};

const bar3 = (x) => {
    console.log(`bar3 called with argument x: ${x}`);
};

eventEmitter.on(FOO, foo1);
eventEmitter.on(FOO, foo2);
eventEmitter.on(FOO, foo3);
eventEmitter.once(FOO, foo4);

eventEmitter.on(BAR, bar1);
eventEmitter.once(BAR, bar2);
eventEmitter.once(BAR, bar3);

eventEmitter.emit(FOO, 10);
// foo1 called
// foo2 called
// foo3 called with argument x: 10
// foo4 called with argument y: 10

eventEmitter.emit(FOO, 10);
// foo1 called
// foo2 called
// foo3 called with argument x: 10

eventEmitter.emit(BAR, 20);
// bar1 called
// bar2 called
// bar3 called with argument x: 20

eventEmitter.emit(BAR, 20);
// bar1 called

console.log(`FOO listeners count: ${eventEmitter.listenerCount(FOO)}`); // 3

eventEmitter.off(FOO, foo3);

eventEmitter.listenerCount(FOO);
console.log(`FOO listeners count: ${eventEmitter.listenerCount(FOO)}`); // 2

eventEmitter.listenerCount(BAR);
console.log(`BAR listeners count: ${eventEmitter.listenerCount(BAR)}`); // 1
