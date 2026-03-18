//interface
// Abstract base class representing a generic Duck
export abstract class Duck {

    swim(): void {
        console.log("All ducks float, even decoys!");
    }
    abstract display(): void;
}
export interface Quackable {
    quack(): void;
}
export interface Flyable {
    fly(): void;
}


// Concrete duck implementation
class MallardDuck extends Duck implements Quackable, Flyable {
    display(): void {
        console.log("I'm a real Mallard duck");
    }

    quack(): void {
        console.log('Quack Quack')
    }

    fly(): void {
        console.log("Can fly")
    }
}

class RubberDuck extends Duck implements Quackable {
    display(): void {
        console.log("I'm a fake rubber duck")
    }

    quack(): void {
        console.log("Quaaaaackkk")
    }
}

// Creating instances
let m1 = new MallardDuck();
m1.quack();
m1.display();
m1.swim();
let r1 = new RubberDuck();
r1.quack();
r1.display();
r1.swim();

// PROBLEMS WITH THIS DESIGN (from a Design Pattern perspective)

// 1. Code duplication:
//    Multiple duck classes that share the same behavior (e.g., fly or quack)
//    must implement identical methods, leading to repeated code.

// 2. Poor behavior reuse:
//    Behaviors like fly() and quack() are tied to individual classes,
//    making it difficult to reuse them across different duck types.

// 3. No runtime flexibility:
//    Duck behaviors are fixed at compile time. Changing behavior
//    (e.g., switching from normal fly to rocket fly) at runtime is not possible.

// 4. Tight coupling:
//    Duck classes are tightly coupled with their behavior implementations,
//    which reduces modularity and makes changes harder.

// 5. Hard to extend:
//    Adding a new behavior (e.g., GlideFly or SilentQuack)
//    requires modifying multiple duck classes.

// 6. Violates "Favor composition over inheritance":
//    Behavior is implemented directly inside classes instead of being
//    separated and composed dynamically.