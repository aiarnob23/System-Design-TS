//Inheritence
// Abstract base class representing a generic Duck
export abstract class Duck {
    quack(): void {
        console.log("Quack Quack")
    }

    swim(): void {
        console.log("All ducks float, even decoys!");
    }

    abstract fly():void;
    abstract display(): void;
}

// Concrete duck implementation
class MallardDuck extends Duck {
    display(): void {
        console.log("I'm a real Mallard duck");
    }
    fly(): void {
        console.log("Can fly")
    }
}

class RubberDuck extends Duck {
    display(): void {
        console.log("I'm a fake rubber duck")
    }
    fly():void {
        console.log("Cannot fly")
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

// PROBLEMS WITH THIS INHERITANCE-BASED DESIGN

// 1. Incorrect behavior modeling:
//    Some duck types (e.g., RubberDuck) cannot fly, but the base class
//    forces every subclass to implement fly(), leading to unrealistic behavior.

// 2. Behavior forced by inheritance:
//    All subclasses inherit quack() and must implement fly(),
//    even when the behavior does not logically apply.

// 3. Low flexibility:
//    Behaviors are fixed at compile time. Changing how a duck flies
//    (e.g., rocket fly vs normal fly) requires modifying the class.

// 4. Hard to extend:
//    Adding new duck behaviors may require modifying multiple subclasses.

// 5. Violates the "Favor composition over inheritance" principle:
//    Behaviors like flying and quacking are embedded in the class hierarchy
//    instead of being separated and reused independently.