import  EventEmitter from "node:events";   

const myEmitter = new EventEmitter();

myEmitter.on("greet", (teacher) => {
    console.log(`class started by ${teacher}`);
});

myEmitter.on("exit", (teacher) => {
    console.log(`class finished by ${teacher}`);
});

myEmitter.emit("greet", "ANANT");
myEmitter.emit("exit", "ANANT");

myEmitter.on("greet", (teacher) => {
    console.log(`the class will be bunked by ${teacher}`);
});

myEmitter.on("exit", (teacher) => {
    console.log(`the class will forever be bunked by ${teacher}`);
});

myEmitter.emit("greet", "ANANT");
myEmitter.emit("exit", "ANANT");
