console.log("this is the starting point of my code");
process.nextTick(()=>{
    console.log("this process.nextTick operator");

})
 setTimeout(() => {
    console.log("this is first timeout operator");
}, 10000);
console.log("this is the end point of my code");
setTimeout(() => {
    console.log("this is second timeout operator");
}, 5000);