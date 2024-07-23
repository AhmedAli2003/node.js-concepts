# Event Emitter in Node.js

## Introduction

This folder contains an implementation of an Event Emitter from scratch. Event Emitters are a core concept in Node.js that facilitate the handling of asynchronous events. They allow you to create, emit, and listen for events in a clean and organized way.

## What is an Event Emitter?

An Event Emitter is a pattern used to handle asynchronous events. It allows different parts of your application to communicate with each other by emitting and listening for named events. The `events` module in Node.js provides a built-in implementation of an Event Emitter, but in this folder, we will create one from scratch to understand its inner workings.

## Why are Event Emitters Important?

### 1. **Decoupling Code**
Event Emitters help decouple code by allowing different parts of your application to communicate without requiring direct method calls. This leads to more modular and maintainable code.

### 2. **Handling Asynchronous Events**
They provide a way to handle asynchronous events, such as user interactions, I/O operations, or timed events, making it easier to manage and coordinate these events within your application.

### 3. **Improving Readability and Organization**
By using named events and listeners, you can improve the readability and organization of your code, making it clear what events are being emitted and handled.

## Implementation

In this folder, we have built an Event Emitter from scratch. This custom Event Emitter class allows you to register listeners for specific events, emit events, and remove event listeners.

## Example Usage

Here’s a basic example of how to use the Event Emitter:

```javascript
const EventEmitter = require('events');

const emitter = new EventEmitter();

// Register a listener for the 'greet' event
emitter.on('greet', (name) => {
  console.log(`Hello, ${name}!`);
});

// Emit the 'greet' event
emitter.emit('greet', 'World');

// Register another listener for the 'greet' event
const farewell = (name) => {
  console.log(`Goodbye, ${name}!`);
};
emitter.on('greet', farewell);

// Emit the 'greet' event again
emitter.emit('greet', 'John');

// Remove the 'farewell' listener
emitter.off('greet', farewell);

// Emit the 'greet' event once more
emitter.emit('greet', 'Alice');
