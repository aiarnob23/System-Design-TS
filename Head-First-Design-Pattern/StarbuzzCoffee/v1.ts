
// ==============================
// DESIGN PATTERN ANALYSIS
// ==============================

// 1. ABSTRACTION (OOP Principle)
// 2. INHERITANCE
// 3. POLYMORPHISM (Runtime)
// 4. ENCAPSULATION

export abstract class Beverage {
    private description: string;
    constructor(description: string) {
        this.description = description;
    }

    public getDescription(): string {
        return this.description;
    }

    abstract cost(): number;
}


export class Espresso extends Beverage {
    private price: number;

    constructor(price: number) {
        super("Espresso - Regular - Good one");
        this.price = price;
    }

    cost(): number {
        return this.price;
    }
}

export class EspressoWithMocha extends Espresso {
    constructor(price: number) {
        super(price);
    }

    getDescription(): string {
        return super.getDescription() + " + Mocha";
    }
}

export class EspressoWithWhip extends Espresso {
    constructor(price: number) {
        super(price);
    }

    getDescription(): string {
        return super.getDescription() + " + Whip";
    }
}

const coffee = new Espresso(69);
console.log(coffee.getDescription());
console.log(coffee.cost());

const coffeeWithMocha = new EspressoWithMocha(69);
console.log(coffeeWithMocha.getDescription());
console.log(coffeeWithMocha.cost());

const coffeeWithWhip = new EspressoWithWhip(69);
console.log(coffeeWithWhip.getDescription());
console.log(coffeeWithWhip.cost());


// ==============================
// CODE LIMITATIONS / PROBLEMS
// ==============================

// 1. Price is fixed per object (less flexible)
// --------------------------------
// Espresso takes price from constructor.
// But in real system, price should be fixed internally
// (e.g., Espresso always 50 taka).

// 2. Description is static (not extendable)
// --------------------------------
// You cannot dynamically add "Mocha", "Whip" etc.
// Because no decorator/composition is used.

// 3. No runtime extensibility
// --------------------------------
// Once object is created, behavior cannot be changed.
// (No setter, no wrapping)

// 4. Tight coupling between class and price
// --------------------------------
// Espresso directly owns price.
// If pricing logic changes (discount, size),
// we must modify the class.

// 5. No scalability for toppings
// --------------------------------
// If you try to add combinations manually:
// EspressoWithMocha, EspressoWithWhip...
// → class explosion problem 

// 6. No interface usage
// --------------------------------
// Using abstract class is fine,
// but interface could make it more flexible in TS.

