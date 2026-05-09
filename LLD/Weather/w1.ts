// DESIGN PATTERN USED
// Observer Pattern
// - Defines a one-to-many dependency between objects
// - When subject state changes, all observers are notified automatically
// - Promotes loose coupling between subject and observers


export interface WeatherMeasurement {
    temperature: number;
    humidity: number;
    pressure: number;
}


// OBSERVER INTERFACE
// Any display or component that wants updates must implement this
export interface Observer{
    update(measurement:WeatherMeasurement):void;
}


// SUBJECT INTERFACE
// Responsible for managing observers and sending updates
export interface Subject{
    registerObserver(observer : Observer) : void;
    removeObserver(observer : Observer) : void;
    notifyObservers():void;
}


// DISPLAY CONTRACT
// Ensures all display elements implement a display method
export interface DisplayElement{
    display():void;
}


// CONCRETE SUBJECT (Publisher)
// Holds the state and notifies observers when state changes
export class WeatherData implements Subject{

    // Using Set to avoid duplicate observers
    private observers: Set<Observer> = new Set();

    // Internal state (single source of truth)
    private measurement : WeatherMeasurement = {
        temperature : 0,
        humidity: 0,
        pressure: 0,
    };

    // Register a new observer
    registerObserver(observer:Observer):void{
        this.observers.add(observer);
    }

    // Remove an existing observer
    removeObserver(observer:Observer):void{
        this.observers.delete(observer);
    }

    // Notify all observers with latest data
    notifyObservers():void{
        for(const observer of this.observers){
            observer.update(this.measurement);
        }
    }

    // Called internally when measurements change
    private measurementsChanged():void{
        this.notifyObservers();
    }

    setMeasurements(measurement: WeatherMeasurement): void {
        this.measurement = measurement;
        this.measurementsChanged();
    }
}


// DISPLAY 1: CURRENT CONDITIONS
// Shows real-time weather values
export class CurrentConditionDisplay implements Observer, DisplayElement{

    private temparature = 0;
    private humidity = 0;
    private pressure = 0;

    // Called automatically when subject updates
    update(measurement:WeatherMeasurement):void{
        this.temparature = measurement.temperature;
        this.humidity = measurement.humidity;
        this.pressure = measurement.pressure;
        this.display();
    }

    display():void{
        console.log(
            `[Current] Temp: ${this.temparature}°C, Humidity: ${this.humidity}%, Pressure: ${this.pressure}`
        );
    }
}


// DISPLAY 2: FORECAST
// Uses pressure trend to predict weather
export class ForecastDisplay implements Observer, DisplayElement{

    private lastPressure = 0;
    private currentPressure = 0;

    update(measurement : WeatherMeasurement):void{
        this.lastPressure = this.currentPressure;
        this.currentPressure = measurement.pressure;

        // Auto display after update
        this.display();
    }

    display():void{
        if (this.currentPressure > this.lastPressure) {
            console.log("[Forecast] Improving weather ☀️");
        } 
        else if (this.currentPressure === this.lastPressure) {
            console.log("[Forecast] Same weather 😐");
        } 
        else {
            console.log("[Forecast] Cooler, rainy weather 🌧️");
        } 
    }
}



// LIMITATIONS / IMPROVEMENT POINTS (Design Pattern Perspective)

// 1. Tight update contract
//    All observers receive full WeatherMeasurement
//    even if they only need part of the data.

// 2. No push vs pull flexibility
//    Current design is PUSH-based (subject sends full data).
//    In some cases, PULL model (observer queries subject)
//    may be more efficient.

// 3. Missing state update API
//    WeatherData lacks a public method (setMeasurements)
//    to trigger updates → incomplete abstraction.

// 4. Observer execution order is not guaranteed
//    Using Set means iteration order is insertion-based,
//    but not strictly controlled.

// 5. Potential performance issue
//    If many observers exist, notifyObservers()
//    can become expensive (O(n)).

// 6. No error isolation
//    If one observer fails, others are affected.
//    Try-catch per observer could improve robustness.

// 7. Memory management risk
//    If observers are not removed properly,
//    it can lead to memory leaks in long-running systems.