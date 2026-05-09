class MyClass {
    private static instance : MyClass;

    private constructor() {}

    public static getInstance(): MyClass {
        if(!MyClass.instance){
            MyClass.instance = new MyClass();
        }
        return MyClass.instance;
    }
}

const instance1 = MyClass.getInstance();
const instance2 = MyClass.getInstance();

console.log(instance1 === instance2);