// Abstract base class representing a generic Duck
export abstract class Duck {
    quack(): void {
        console.log("Quack Quack")
    }

    swim(): void {
        console.log("All ducks float, even decoys!");
    }

    abstract display(): void;
}

// Concrete duck implementation
class MallardDuck extends Duck {
    display(): void {
        console.log("I'm a real Mallard duck");
    }
}

// Creating an instance of MallardDuck
let m1 = new MallardDuck();
m1.quack();
m1.display();
m1.swim();