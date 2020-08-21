/* eslint-disable no-unused-vars */

function classDecorator<T extends {new (...args: any[]): {}}> (constructor: T) {
    return class extends constructor {
        newProperty = 'new property'
        hello = 'override'
    }
}

@classDecorator
class Greeter {
    property = 'property'
    hello: string
    constructor (m: string) {
        this.hello = m
    }
}

/**
 * hello: "override"
 * newProperty: "new property"
 * property: "property"
 */
// console.log(new Greeter('world'))

function enumerable (value: boolean) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        // console.log(target) 原型对象
        // console.log(propertyKey) greet
        // console.log(descriptor) 描述符
        descriptor.enumerable = value
    }
}

class Greeter2 {
    greeting: string
    constructor (message: string) {
        this.greeting = message
    }

    @enumerable(false)
    greet () {
        return 'Hello, ' + this.greeting
    }
}

function fn (x: string): void;
function fn (x: number): void;
function fn (x: number | string): string {
    return '' + x
}

console.log(fn(2))
