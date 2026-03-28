export interface WeatherMeasurement {
    temperature: number;
    humidity: number;
    pressure: number;
}

//observer
export interface Observer{
    update(measurement:WeatherMeasurement):void;
}

//subject
export interface Subject{
    registerObserver(observer : Observer) : void;
    removeObserver(observer : Observer) : void;
    notifyObservers():void;
}

//display element
export interface DisplayElement{
    display():void;
}

//weather / weatherData
export class WeatherData implements Subject{
    private observers: Set<Observer> = new Set();
    private measurement : WeatherMeasurement = {
        temperature : 0,
        humidity: 0,
        pressure: 0,
    };

    registerObserver(observer:Observer):void{
        this.observers.add(observer);
    }

    removeObserver(observer:Observer):void{
        this.observers.delete(observer);
    }

    notifyObservers():void{
        for(const observer of this.observers){
            observer.update(this.measurement);
        }
    }

    private measurementsChanged():void{
        this.notifyObservers();
    }
}