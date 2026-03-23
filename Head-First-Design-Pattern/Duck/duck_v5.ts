// DESIGN PATTERN USED
// Strategy Pattern
// - Encapsulates algorithms (fly / quack behaviors)
// - Allows behavior to change at runtime
// - Promotes composition over inheritance

// BEHAVIOR INTERFACES
export interface FlyBehavior {
    fly(): void;
}

export interface QuackBehavior {
    quack(): void;
}

// CONCRETE FLY STRATEGIES
// Different implementations of flying behavior.
class FlyWithWings implements FlyBehavior {
    fly(): void {
        console.log("Flying with wings");
    }
}

class CannotFly implements FlyBehavior {
    fly(): void {
        console.log("I cannot fly");
    }
}

class RocketFly implements FlyBehavior {
    fly(): void {
        console.log("Flying with rocket speed");
    }
}

// CONCRETE QUACK STRATEGIES
// Different implementations of quacking behavior.
class NormalQuack implements QuackBehavior {
    quack(): void {
        console.log("Quack Quack");
    }
}

class Squeak implements QuackBehavior {
    quack(): void {
        console.log("Squeak Squeak");
    }
}

// CONTEXT CLASS
// Duck delegates its behavior to FlyBehavior and QuackBehavior.
// Composition is used instead of inheritance.
abstract class Duck {
    flyBehavior!: FlyBehavior;
    quackBehavior!: QuackBehavior;

    constructor(flyBehavior: FlyBehavior, quackBehavior: QuackBehavior) {
        this.flyBehavior = flyBehavior;
        this.quackBehavior = quackBehavior;
    }

    performFly() {
        this.flyBehavior.fly();
    }
    performQuack() {
        this.quackBehavior.quack();
    }
    setFlyBehavior(flyBehavior: FlyBehavior) {
        this.flyBehavior = flyBehavior;
    }
    setQuackBehavior(quackBehavior: QuackBehavior) {
        this.quackBehavior = quackBehavior;
    }
    abstract display(): void;
}



// CONCRETE DUCK IMPLEMENTATION
// Configures the duck with default behaviors
class ModelDuck extends Duck {

    constructor() {
        super(new FlyWithWings(), new NormalQuack());
    }

    display(): void {
        console.log("This is a model duck");
    }
}

let m1 = new ModelDuck();
m1.display();
m1.performFly();     
// Change strategy at runtime
m1.setFlyBehavior(new RocketFly());
m1.performFly();// Flying with rocket speed



// LIMITATIONS / IMPROVEMENT POINTS (Design Pattern Perspective)

// 1. Strategy class count can grow quickly.
//    Each new variation of flying or quacking requires a new class.
//    In large systems this may lead to many small classes.

// 2. Object creation overhead.
//    Every duck instance creates its own behavior objects
//    (e.g., new FlyWithWings(), new NormalQuack()).
//    In high-scale systems, shared strategy instances could be reused.

// 3. Client awareness of strategies.
//    The client code must know which concrete strategy
//    (e.g., RocketFly, CannotFly) to use when changing behavior.

// 4. Configuration complexity.
//    As the number of strategies increases, selecting and managing
//    the correct combination of behaviors can become harder.

// 5. Over-engineering for simple scenarios.
//    If there are very few behavior variations, using Strategy Pattern
//    may add unnecessary complexity compared to simple inheritance.