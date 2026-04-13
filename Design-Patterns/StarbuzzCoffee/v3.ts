// DESIGN PATTERN USED
// Decorator Pattern
// - Attaches additional responsibilities (condiments) dynamically
// - Adds behavior without modifying existing classes
// - Promotes composition over inheritance
// - Uses "wrapping" to extend functionality at runtime


// COMPONENT (BASE CLASS)
// Defines common interface for all beverages
abstract class Beverage{
    description : string = "Unknown Beverage";
    getDescription():string{
        return this.description;
    }
    abstract cost():number;
}

// CONCRETE COMPONENTS
// Actual base objects (plain coffee without add-ons)
class HouseBlend extends Beverage{
    constructor(){
        super();
        this.description = "House Blend Coffee";
    }

    cost():number{
        return 10;
    }
}

class Decaf extends Beverage{
    constructor(){
        super();
        this.description = "Decaf Coffee";
    }
    cost():number{
        return 15;
    }
}

class DarkRoast extends Beverage{
    constructor(){
        super();
        this.description = "Dark Roast Coffee";
    }
    cost():number{
        return 20;
    }
}

class Espresso extends Beverage{
    constructor(){
        super();
        this.description = "Espresso Coffee";
    }
    cost():number{
        return 25;
    }
}

// DECORATOR BASE CLASS
// Must follow same interface as Beverage
// Ensures decorators can wrap beverages transparently
abstract class CondimentDecorator extends Beverage{
    abstract getDescription():string;
}

class Mocha extends CondimentDecorator{
    beverage : Beverage;

    constructor(beverage : Beverage){
        super();
        this.beverage = beverage;
    }

    getDescription(): string {
        return this.beverage.getDescription() + " + Mocha";
    }

    cost():number{
        return this.beverage.cost() + .75;
    }
}

// CONCRETE DECORATORS
// These wrap a Beverage and add extra behavior (cost + description)
class Whip extends CondimentDecorator{
    beverage : Beverage;
    constructor(beverage : Beverage){
        super();
        this.beverage = beverage;
    }

    getDescription(): string {
        return this.beverage.getDescription() + " + Whip";
    }

    cost():number{
        return this.beverage.cost() + .24;
    }
}

let bev : Beverage = new HouseBlend();
bev = new Mocha(bev);
bev = new Whip(bev);
bev = new Mocha(bev);
// Final structure:
// Mocha(
//   Whip(
//     Mocha(
//       HouseBlend
//     )
//   )
// )
console.log(bev.getDescription());
console.log(bev.cost());


// LIMITATIONS / IMPROVEMENT POINTS (Design Pattern Perspective)

// 1. Many small classes
//    Each new condiment requires a new decorator class.
//    Can lead to class explosion in large systems.

// 2. Complex object structure
//    Deep wrapping (nested decorators) can make debugging harder.

// 3. Order-sensitive behavior
//    The order of wrapping affects the result.
//    Example: Mocha(Whip(coffee)) != Whip(Mocha(coffee)) (in some cases).

// 4. Harder to trace actual object
//    Since everything is wrapped, identifying the "real" object
//    may require unwrapping layers mentally.

// 5. Slight performance overhead
//    Each decorator adds an extra function call layer (cost(), getDescription()).

// 6. Client-side composition responsibility
//    Client must know how to combine decorators correctly.