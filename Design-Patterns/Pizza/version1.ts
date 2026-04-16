// DESIGN PATTERN USED
// Simple Factory Pattern
// - Centralizes object creation logic inside a factory
// - Client (PizzaStore) does not directly instantiate objects
// - Reduces tight coupling and improves maintainability


// BASE CLASS
// Defines common structure and behavior for all pizzas
class Pizza {
    name?: string;

    constructor(name: string) {
        this.name = name;
    }

    // Common steps for making a pizza
    prepare(){
        console.log(`Preparing ${this.name}`);
    }

    bake(){
        console.log(`Baking ${this.name}`);
    }

    cut(){
        console.log(`Cutting ${this.name}`);
    }

    box(){
        console.log(`Boxing ${this.name}`);
    }
}


// FACTORY CLASS
// Responsible for creating pizza objects based on input type
class SimplePizzaFactory {

    createPizza(type: string): Pizza | null {

        // Decides which pizza to create
        switch (type) {

            case "cheese":
                return new Pizza("Cheese Pizza");

            case "pepperoni":
                return new Pizza("Pepperoni Pizza");

            case "veggie":
                return new Pizza("Veggie Pizza");

            case "clam":
                return new Pizza("Clam Pizza");

            default:
                return null;
        }
    }
}


// CLIENT CLASS
// PizzaStore uses the factory instead of creating objects directly
class PizzaStore {

    factory: SimplePizzaFactory;

    constructor(factory: SimplePizzaFactory){
        this.factory = factory;
    }

    // Handles the full pizza ordering process
    orderPizza(type: string){

        const pizza = this.factory.createPizza(type);

        // Safety check in case invalid type is passed
        if(pizza){
            pizza.prepare();
            pizza.bake();
            pizza.cut();
            pizza.box();
        } else {
            console.log("Invalid pizza type");
        }
    }  
}



// LIMITATIONS / IMPROVEMENT POINTS

// 1. Violates Open/Closed Principle
//    Adding a new pizza type requires modifying the factory (switch-case).

// 2. Not true GoF Factory Pattern
//    This is a "Simple Factory", not an official design pattern.

// 3. No polymorphism in pizza types
//    All pizzas use the same Pizza class (no specialized behavior).

// 4. String-based logic
//    Using strings ("cheese", "veggie") is error-prone and not type-safe.

// 5. Scalability issue
//    As pizza types grow, the factory becomes large and harder to maintain.