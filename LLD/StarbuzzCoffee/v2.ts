// ==============================
// DESIGN PATTERN ANALYSIS
// ==============================
// 1. ABSTRACTION (OOP Principle)
// 2. INHERITANCE
// 3. POLYMORPHISM (Runtime)
// 4. ENCAPSULATION
// 5. STATIC MEMBER USAGE
// 6. FLAG-BASED DESIGN



abstract class Beverage {
    description: string;
    milk : boolean;
    soy : boolean;
    whip : boolean;

    constructor(description: string){
        this.description = description;
        this.milk = false;
        this.soy = false;
        this.whip = false;
    }

    getDescription(): string{
        return this.description;
    }

    cost():number{
        let total = 0;
        if(this.hasMilk()) total+=10;
        if(this.hasSoy()) total+=5;
        if(this.hasWhip()) total+=7;
        return total;
    }

    hasMilk():boolean{
        return this.milk;
    }
    setMilk():void{
        this.milk = true;
    }

    hasSoy():boolean{
        return this.soy;
    }
    setSoy():void{
        this.soy = true;
    }

    hasWhip():boolean{
        return this.whip;
    }
    setWhip():void{
        this.whip = true;
    }
}



class DarkRoast extends Beverage{
    static price = 100;
    constructor(){
        super("Darkkkkkk Roasttttttt")
    }

    public cost(): number {
        return DarkRoast.price+super.cost();
    }
}


const c = new DarkRoast();
c.setMilk();
console.log(c.cost());

// ==============================
// CODE LIMITATIONS / PROBLEMS
// ==============================

// 1. Class Becomes Bloated
// --------------------------------
// Adding new condiments (caramel, chocolate, etc.)
// requires modifying Beverage class → grows rapidly.

// 2. Violates Open/Closed Principle (OCP)
// --------------------------------
// Code is NOT closed for modification.
// Every new topping requires changing existing code.

// 3. Not Scalable for Combinations
// --------------------------------
// All condiments handled in one class using flags.
// Logic becomes complex as options increase.

// 4. Forces All Beverages to Support All Condiments
// --------------------------------
// Every drink has milk, soy, whip options,
// even if they don’t logically apply.

// 5. Tight Coupling Between Beverage and Condiments
// --------------------------------
// Beverage directly knows all condiment logic.
// No separation of responsibility.

// 6. No Dynamic Composition
// --------------------------------
// Cannot dynamically chain behaviors like:
// coffee → add mocha → add whip (cleanly)

// 7. Hard to Extend / Maintain
// --------------------------------
// Adding/removing features requires editing core class,
// increasing risk of bugs.

// --------Real-life mapping-----------
//     Problem	             Pattern
//    behavior change	     Strategy
//    features add	         Decorator 
//    plugin system	         Registry