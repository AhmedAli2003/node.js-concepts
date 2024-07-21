class EventEmitter {
    listeners = {};

    #addListener(eventName, fn) {
        // Check if the event is already registered
        // If NOT, register it with empty array
        this.listeners[eventName] = this.listeners[eventName] || [];

        // Add the provided function to the array of listeners for the given event
        this.listeners[eventName].push(fn);

        return this;
    }
    on(eventName, fn) {
        return this.#addListener(eventName, fn);
    }

    #removeListener(eventName, fn) {
        const list = this.listeners[eventName];

        // Check if the event is registered
        if (list) {
            // Find the provided function in the array of listeners for the given event
            const index = list.indexOf(fn);

            // If the function is found, remove it from the array
            if (index > -1) {
                list.splice(index, 1);
            }

            // If there are no more listeners for the event, remove the event from the listeners object
            if (list.length === 0) {
                delete this.listeners[eventName];
            }
        }

        return this;
    }
    off(eventName, fn) {
        return this.#removeListener(eventName, fn);
    }

    once(eventName, fn) {
        // Check if the event is already registered
        // If NOT, register it with empty array
        this.listeners[eventName] = this.listeners[eventName] || [];

        // Registers a listener function that is called at most once for the specified event.
        // When the event is emitted, the listener is removed after it is called the first time.
        const wrapper = (...args) => {
            fn.apply(this, args);
            this.off(eventName, wrapper);
        };

        // Add the wrapped function to the array of listeners for the given event
        this.listeners[eventName].push(wrapper);

        return this;
    }

    emit(eventName, ...args) {
        const list = this.listeners[eventName];

        // Call all the listeners for the given event with the provided arguments
        if (list) {
            // Issue: Removing some functions because of `once` function affects the order
            // order of subsequent listener invocations.

            // Bad code:
            /*
            if (list) {
                list.forEach(fn => fn.apply(this, args));
            }
            */

            // Example:
            // listeners[eventName] => [fn1 (on), fn2 (once), fn3 (once)]
            // When calling emit with eventName, it will call fn1, fn2, and then fn3.
            // However, when calling fn2 with once, it will remove it from the listeners array.
            // As a result, fn3 will not be called.
            // After calling fn2, listeners[eventName] => [fn1 (on), fn3 (once)]
            // and the foreach counter will be incremented to index 2, but index 2 is not exist anymore
            // so it will exit the foreach without calling fn3

            // Solution: Use a copy of the listeners array to avoid this issue
            // By making a copy of the listeners array in the emit method,
            // the iteration over the listeners is not affected by any modifications to
            // the original array (such as removals caused by once).
            const listenersCopy = [...list];
            listenersCopy.forEach(fn => fn.apply(this, args));
        }

        return this;
    }

    listenerCount(eventName) {
        const listeners = this.listeners[eventName] || [];
        return listeners.length;
    }

    rawListeners(eventName) {
        return this.listeners[eventName] || [];
    }
}

module.exports = EventEmitter;
