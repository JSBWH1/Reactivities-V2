import { makeAutoObservable } from 'mobx'

// Define a class to represent the counter's state
export default class CounterStore {
    // Initial title and count values
    title = 'Counter store';
    count = 42;
    events: string[] = [
        `Initial count is ${this.count}`
    ]

    // Constructor runs when a new instance of CounterStore is created
    constructor() {
        // makeObservable tells MobX which properties should be reactive. 
        // In this case, makeAutoObservable has been used (does it for you and assumes 'class properties' such as title are observables and class methods will be actions)

        makeAutoObservable(this) 

        // could also put it in this way instead (but need to import makeObservable, observable and action)
        // makeObservable(this, {
        //     title: observable,  // MobX will track changes to 'title'
        //     count: observable,  // MobX will track changes to 'count'
        //     increment: action, 
        //     decrement: action
        // })
    }

    increment = (amount = 1) => {
        this.count += amount;
        this.events.push(`Incremented by ${amount} - Count is now ${this.count}`) 
    }

    decrement = (amount = 1) => {
        this.count -= amount;
        this.events.push(`Decremented by ${amount} - Count is now ${this.count}`)  
    }


    get eventCount() {
        return this.events.length 
    }

}

/* 

This file is to define a MobX store for managing client-side state related to a counter.
It sets up observable properties so that any React components using this store can automatically re-render when 'title' or 'count' changes.

*/ 