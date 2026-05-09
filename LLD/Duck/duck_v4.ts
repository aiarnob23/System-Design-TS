//Take what varies and "ENCAPSULATE" it so it won’t affect the rest of your code.
// BEHAVIOR INTERFACES
// Encapsulate behaviors that vary across duck types
export interface FlyBehavior {
    fly(): void;
}

export interface QuackBehavior {
    quack(): void;
}

// FLY BEHAVIOR IMPLEMENTATIONS
// Different strategies for flying
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


// ABSTRACT DUCK CLASS
// Uses composition to delegate fly and quack behaviors
export abstract class Duck {
    flyBehavior: FlyBehavior;
    quackBehavior: QuackBehavior;

    constructor(flyBehavior: FlyBehavior, quackBehavior: QuackBehavior) {
        this.flyBehavior = flyBehavior;
        this.quackBehavior = quackBehavior;
    }

    swim(): void {
        console.log("All ducks float, even decoys!");
    }
    performFly() {
        this.flyBehavior.fly();
    }
    performQuack() {
        this.quackBehavior.quack();
    }
    abstract display(): void;
}

// CONCRETE DUCK IMPLEMENTATIONS
// Configure each duck with specific behaviors
class MallardDuck extends Duck {
    constructor() {
        super(new FlyWithWings(), new NormalQuack());
    }

    display(): void {
        console.log("This is a mallard duck");
    }
}

class RubberDuck extends Duck {
    constructor() {
        super(new CannotFly(), new Squeak());
    }

    display(): void {
        console.log("This is a fake rubber duck");
    }
}

const m1 = new MallardDuck();
m1.display();
m1.performFly();
m1.performQuack();

const r1 = new RubberDuck();
r1.display();
r1.performFly();
r1.performQuack();


// LIMITATIONS / IMPROVEMENT POINTS (Design Pattern Perspective)

// 1. Runtime behavior change is not supported yet.
//    Although behaviors are encapsulated, there is no setter method
//    to dynamically change fly or quack behavior at runtime.

// 2. Behavior objects are tightly configured in constructors.
//    Each duck decides its behavior during instantiation,
//    which limits flexibility from the client side.

// 3. Behavior classes may grow rapidly.
//    If many variations of flying or quacking are introduced,
//    the number of behavior classes can increase significantly.

// 4. Behavior classes currently contain only simple logic.
//    In real systems, additional state or configuration might
//    be needed for behaviors, which can increase complexity.

// 5. Client cannot easily reuse behavior instances.
//    Every duck creates new behavior objects instead of sharing them.